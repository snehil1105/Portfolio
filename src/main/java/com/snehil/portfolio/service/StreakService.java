package com.snehil.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.snehil.portfolio.dto.StreakDTO;
import com.snehil.portfolio.entity.Platform;
import com.snehil.portfolio.entity.StreakSnapshot;
import com.snehil.portfolio.repository.StreakSnapshotRepository;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.stream.ObjectRecord;
import org.springframework.data.redis.connection.stream.StreamRecords;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StreakService {

    private static final Logger log = LoggerFactory.getLogger(StreakService.class);

    public static final String KEY_LEETCODE = "coding:leetcode:current";
    public static final String KEY_CODEFORCES = "coding:codeforces:current";
    public static final String STREAM_CODING_UPDATES = "coding:updates";

    private final LeetCodeClient leetCodeClient;
    private final CodeforcesClient codeforcesClient;
    private final StreakSnapshotRepository snapshotRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SseService sseService;
    private final ObjectMapper objectMapper;

    public StreakService(
            LeetCodeClient leetCodeClient,
            CodeforcesClient codeforcesClient,
            StreakSnapshotRepository snapshotRepository,
            RedisTemplate<String, Object> redisTemplate,
            SseService sseService,
            ObjectMapper objectMapper) {
        this.leetCodeClient = leetCodeClient;
        this.codeforcesClient = codeforcesClient;
        this.snapshotRepository = snapshotRepository;
        this.redisTemplate = redisTemplate;
        this.sseService = sseService;
        this.objectMapper = objectMapper;
    }

    /**
     * Cache-First Retrieval:
     * Reads Redis cached snapshot immediately (0ms wait time).
     * If Redis cache is empty, loads from DB, populates Redis, and returns.
     */
    public List<StreakSnapshot> getStreakSnapshots() {
        List<StreakSnapshot> result = new ArrayList<>();
        try {
            StreakSnapshot lc = getCachedSnapshot(KEY_LEETCODE);
            StreakSnapshot cf = getCachedSnapshot(KEY_CODEFORCES);

            if (lc != null) result.add(lc);
            if (cf != null) result.add(cf);

            if (!result.isEmpty()) {
                log.debug("Returned {} coding activity snapshots from Redis cache.", result.size());
                return result;
            }
        } catch (Exception e) {
            log.warn("Redis read failed for streak snapshots: {}", e.getMessage());
        }

        // Cache miss or Redis down: fallback to DB
        List<StreakSnapshot> dbSnapshots = snapshotRepository.findAll();
        populateRedisCacheFromDb(dbSnapshots);
        return dbSnapshots;
    }

    private StreakSnapshot getCachedSnapshot(String key) {
        Object val = redisTemplate.opsForValue().get(key);
        if (val == null) return null;
        if (val instanceof StreakSnapshot snapshot) return snapshot;
        try {
            return objectMapper.convertValue(val, StreakSnapshot.class);
        } catch (Exception e) {
            return null;
        }
    }

    private void populateRedisCacheFromDb(List<StreakSnapshot> dbSnapshots) {
        for (StreakSnapshot s : dbSnapshots) {
            if (s.getPlatform() == Platform.LEETCODE) {
                cacheSnapshot(KEY_LEETCODE, s);
            } else if (s.getPlatform() == Platform.CODEFORCES) {
                cacheSnapshot(KEY_CODEFORCES, s);
            }
        }
    }

    private void cacheSnapshot(String key, StreakSnapshot snapshot) {
        try {
            redisTemplate.opsForValue().set(key, snapshot);
        } catch (Exception e) {
            log.warn("Failed to set Redis cache key {}: {}", key, e.getMessage());
        }
    }

    /**
     * Scheduled synchronization executing every 30 minutes.
     */
    @Scheduled(cron = "0 0/30 * * * *")
    @Transactional
    public void scheduledSync() {
        log.info("Starting background scheduled coding activity sync...");
        boolean lcChanged = syncLeetCodeInternal();
        boolean cfChanged = syncCodeforcesInternal();

        if (lcChanged || cfChanged) {
            List<StreakSnapshot> currentSnapshots = getStreakSnapshots();
            sseService.broadcast("CODING_ACTIVITY_UPDATED", currentSnapshots);
        }
        log.info("Scheduled coding activity sync complete.");
    }

    @Transactional
    public boolean syncLeetCodeInternal() {
        try {
            StreakDTO dto = leetCodeClient.fetchStreak();
            StreakSnapshot newEntity = dto.toEntity(Platform.LEETCODE);
            StreakSnapshot oldEntity = getCachedSnapshot(KEY_LEETCODE);

            if (isSame(oldEntity, newEntity)) {
                log.info("LeetCode data unchanged. Skipping update.");
                return false;
            }

            snapshotRepository.save(newEntity);
            cacheSnapshot(KEY_LEETCODE, newEntity);
            publishCodingEvent(Platform.LEETCODE.name().toLowerCase(), newEntity);
            log.info("LeetCode sync successful and updated: {}", dto);
            return true;
        } catch (Exception e) {
            log.warn("LeetCode sync failed. Retaining current snapshot state. Error: {}", e.getMessage());
            return false;
        }
    }

    @Transactional
    public boolean syncCodeforcesInternal() {
        try {
            StreakDTO dto = codeforcesClient.fetchStreak();
            StreakSnapshot newEntity = dto.toEntity(Platform.CODEFORCES);
            StreakSnapshot oldEntity = getCachedSnapshot(KEY_CODEFORCES);

            if (isSame(oldEntity, newEntity)) {
                log.info("Codeforces data unchanged. Skipping update.");
                return false;
            }

            snapshotRepository.save(newEntity);
            cacheSnapshot(KEY_CODEFORCES, newEntity);
            publishCodingEvent(Platform.CODEFORCES.name().toLowerCase(), newEntity);
            log.info("Codeforces sync successful and updated: {}", dto);
            return true;
        } catch (Exception e) {
            log.warn("Codeforces sync failed. Retaining current snapshot state. Error: {}", e.getMessage());
            return false;
        }
    }

    public void syncLeetCode() {
        if (syncLeetCodeInternal()) {
            sseService.broadcast("CODING_ACTIVITY_UPDATED", getStreakSnapshots());
        }
    }

    public void syncCodeforces() {
        if (syncCodeforcesInternal()) {
            sseService.broadcast("CODING_ACTIVITY_UPDATED", getStreakSnapshots());
        }
    }

    private boolean isSame(StreakSnapshot oldS, StreakSnapshot newS) {
        if (oldS == null || newS == null) return false;
        return oldS.getTotalSolved() == newS.getTotalSolved()
                && oldS.getCurrentStreak() == newS.getCurrentStreak()
                && java.util.Objects.equals(oldS.getSolvedToday(), newS.getSolvedToday())
                && java.util.Objects.equals(oldS.getSubmissionCalendar(), newS.getSubmissionCalendar());
    }

    private void publishCodingEvent(String platform, StreakSnapshot snapshot) {
        try {
            Map<String, String> body = Map.of(
                "type", "CODING_ACTIVITY_UPDATED",
                "platform", platform,
                "timestamp", Instant.now().toString(),
                "totalSolved", String.valueOf(snapshot.getTotalSolved()),
                "currentStreak", String.valueOf(snapshot.getCurrentStreak())
            );
            ObjectRecord<String, Map<String, String>> record = StreamRecords.newRecord()
                .in(STREAM_CODING_UPDATES)
                .ofObject(body);
            redisTemplate.opsForStream().add(record);
        } catch (Exception e) {
            log.warn("Failed to publish coding event to Redis Stream: {}", e.getMessage());
        }
    }
}
