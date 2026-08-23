package com.snehil.portfolio.service;

import com.snehil.portfolio.dto.StreakDTO;
import com.snehil.portfolio.entity.Platform;
import com.snehil.portfolio.entity.StreakSnapshot;
import com.snehil.portfolio.repository.StreakSnapshotRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StreakService {

    private static final Logger log = LoggerFactory.getLogger(StreakService.class);

    private final LeetCodeClient leetCodeClient;
    private final CodeforcesClient codeforcesClient;
    private final StreakSnapshotRepository snapshotRepository;

    public StreakService(
            LeetCodeClient leetCodeClient,
            CodeforcesClient codeforcesClient,
            StreakSnapshotRepository snapshotRepository) {
        this.leetCodeClient = leetCodeClient;
        this.codeforcesClient = codeforcesClient;
        this.snapshotRepository = snapshotRepository;
    }

    /**
     * Scheduled sync executing hourly (at minute 0 of every hour)
     */
    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void scheduledSync() {
        log.info("Starting scheduled coding platform streak synchronization...");
        syncLeetCode();
        syncCodeforces();
        log.info("Scheduled synchronization cycle finished.");
    }

    @Transactional
    public void syncLeetCode() {
        try {
            StreakDTO dto = leetCodeClient.fetchStreak();
            StreakSnapshot entity = dto.toEntity(Platform.LEETCODE);
            snapshotRepository.save(entity);
            log.info("LeetCode sync successful. Saved: {}", dto);
        } catch (Exception e) {
            log.warn("LeetCode sync failed. Keeping last snapshot database state. Error: {}", e.getMessage());
            // Deliberately catching and logging to keep last snapshot intact
        }
    }

    @Transactional
    public void syncCodeforces() {
        try {
            StreakDTO dto = codeforcesClient.fetchStreak();
            StreakSnapshot entity = dto.toEntity(Platform.CODEFORCES);
            snapshotRepository.save(entity);
            log.info("Codeforces sync successful. Saved: {}", dto);
        } catch (Exception e) {
            log.warn("Codeforces sync failed. Keeping last snapshot database state. Error: {}", e.getMessage());
            // Deliberately catching and logging to keep last snapshot intact
        }
    }

    /**
     * Retrieve the list of all snapshots currently cached in the DB.
     */
    @Transactional(readOnly = true)
    public List<StreakSnapshot> getStreakSnapshots() {
        return snapshotRepository.findAll();
    }
}
