package com.snehil.portfolio.service;

import com.snehil.portfolio.entity.LikeCounter;
import com.snehil.portfolio.repository.LikeRepository;
import java.time.Instant;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.stream.ObjectRecord;
import org.springframework.data.redis.connection.stream.StreamRecords;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    private static final Logger log = LoggerFactory.getLogger(LikeService.class);
    private static final String REDIS_LIKE_KEY = "portfolio:likes";
    private static final String STREAM_LIKE_EVENTS = "portfolio:like-events";

    private final LikeRepository repository;
    private final StringRedisTemplate stringRedisTemplate;
    private final SseService sseService;

    public LikeService(
            LikeRepository repository,
            StringRedisTemplate stringRedisTemplate,
            SseService sseService) {
        this.repository = repository;
        this.stringRedisTemplate = stringRedisTemplate;
        this.sseService = sseService;
    }

    public long getCount() {
        try {
            String val = stringRedisTemplate.opsForValue().get(REDIS_LIKE_KEY);
            long dbVal = fetchFromDb();
            if (val != null) {
                long redisVal = Long.parseLong(val);
                if (dbVal > redisVal) {
                    stringRedisTemplate.opsForValue().set(REDIS_LIKE_KEY, String.valueOf(dbVal));
                    return dbVal;
                }
                return redisVal;
            }
            return initCacheFromDb();
        } catch (Exception e) {
            log.warn("Redis read failed for likes, falling back to Database. Error: {}", e.getMessage());
            return fetchFromDb();
        }
    }

    public long incrementAndGet() {
        log.info("Incrementing page likes...");
        try {
            // Ensure cache is initialized with highest available count
            long currentCount = getCount();
            Long newCountObj = stringRedisTemplate.opsForValue().increment(REDIS_LIKE_KEY);
            long newCount = (newCountObj != null) ? newCountObj : currentCount + 1;

            if (newCount <= currentCount) {
                newCount = currentCount + 1;
                stringRedisTemplate.opsForValue().set(REDIS_LIKE_KEY, String.valueOf(newCount));
            }

            // Log event to Redis Stream
            publishToStream(newCount);

            // Broadcast real-time SSE update to connected clients
            sseService.broadcast("LIKE_UPDATED", Map.of("likes", newCount));

            // Asynchronously persist updated count to PostgreSQL database
            persistToDbAsync(newCount);

            log.info("Incremented likes via Redis. Current count: {}", newCount);
            return newCount;
        } catch (Exception e) {
            log.warn("Redis unavailable for like increment ({}), falling back to direct database transactional increment.", e.getMessage());
            return incrementInDb();
        }
    }

    private synchronized long incrementInDb() {
        try {
            LikeCounter counter = repository.findById(1L)
                    .orElseGet(() -> new LikeCounter(1L, 0L));
            long newCount = counter.getCount() + 1;
            counter.setCount(newCount);
            repository.save(counter);
            
            // Broadcast SSE update
            try {
                sseService.broadcast("LIKE_UPDATED", Map.of("likes", newCount));
            } catch (Exception ignored) {}

            log.info("Database like increment succeeded. New count: {}", newCount);
            return newCount;
        } catch (Exception e) {
            log.error("Failed to increment likes in Database: {}", e.getMessage());
            return fetchFromDb() + 1;
        }
    }

    private synchronized long initCacheFromDb() {
        long countInDb = fetchFromDb();
        try {
            String current = stringRedisTemplate.opsForValue().get(REDIS_LIKE_KEY);
            if (current != null) {
                long currentVal = Long.parseLong(current);
                long maxVal = Math.max(currentVal, countInDb);
                stringRedisTemplate.opsForValue().set(REDIS_LIKE_KEY, String.valueOf(maxVal));
                return maxVal;
            }
            stringRedisTemplate.opsForValue().set(REDIS_LIKE_KEY, String.valueOf(countInDb));
            return countInDb;
        } catch (Exception e) {
            log.warn("Failed to set Redis like cache: {}", e.getMessage());
            return countInDb;
        }
    }

    private long fetchFromDb() {
        return repository.findById(1L)
                .map(LikeCounter::getCount)
                .orElse(0L);
    }

    private void publishToStream(long newCount) {
        try {
            Map<String, String> body = Map.of(
                "type", "PORTFOLIO_LIKE",
                "newCount", String.valueOf(newCount),
                "timestamp", Instant.now().toString()
            );
            ObjectRecord<String, Map<String, String>> record = StreamRecords.newRecord()
                .in(STREAM_LIKE_EVENTS)
                .ofObject(body);
            stringRedisTemplate.opsForStream().add(record);
        } catch (Exception e) {
            log.warn("Failed to publish like event to Redis Stream: {}", e.getMessage());
        }
    }

    @Async
    public void persistToDbAsync(long newCount) {
        try {
            LikeCounter counter = repository.findById(1L)
                    .orElseGet(() -> new LikeCounter(1L, 0L));
            if (newCount > counter.getCount()) {
                counter.setCount(newCount);
                repository.save(counter);
                log.info("Async PostgreSQL persistence updated like count to: {}", newCount);
            }
        } catch (Exception e) {
            log.error("PostgreSQL async persistence failed for count {}: {}", newCount, e.getMessage());
        }
    }
}
