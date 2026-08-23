package com.snehil.portfolio.config;

import com.snehil.portfolio.entity.LikeCounter;
import com.snehil.portfolio.entity.Platform;
import com.snehil.portfolio.entity.StreakSnapshot;
import com.snehil.portfolio.repository.LikeRepository;
import com.snehil.portfolio.repository.StreakSnapshotRepository;
import com.snehil.portfolio.service.StreakService;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final LikeRepository likeRepository;
    private final StreakSnapshotRepository streakRepository;
    private final StreakService streakService;

    public DataInitializer(
            LikeRepository likeRepository, 
            StreakSnapshotRepository streakRepository,
            StreakService streakService) {
        this.likeRepository = likeRepository;
        this.streakRepository = streakRepository;
        this.streakService = streakService;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Initializing database default records...");

        // Initialize Like Counter if missing
        if (!likeRepository.existsById(1L)) {
            LikeCounter initialCounter = new LikeCounter(1L, 0L);
            likeRepository.save(initialCounter);
            log.info("Seeded initial LikeCounter record with count 0.");
        } else {
            log.info("LikeCounter already exists. Current count: {}", likeRepository.getCount());
        }

        // Initialize Streak Snapshots if missing
        for (Platform platform : Platform.values()) {
            if (!streakRepository.existsById(platform)) {
                StreakSnapshot snapshot = new StreakSnapshot(
                    platform,
                    0,
                    0,
                    LocalDateTime.now(),
                    ""
                );
                streakRepository.save(snapshot);
                log.info("Seeded initial StreakSnapshot for {}.", platform);
            } else {
                log.info("StreakSnapshot for {} already exists.", platform);
            }
        }

        log.info("Database initialization completed successfully.");

        // Trigger an initial synchronization cycle immediately on boot
        log.info("Triggering initial competitive programming sync on startup...");
        try {
            streakService.syncLeetCode();
        } catch (Exception e) {
            log.warn("Initial LeetCode sync failed: {}", e.getMessage());
        }
        try {
            streakService.syncCodeforces();
        } catch (Exception e) {
            log.warn("Initial Codeforces sync failed: {}", e.getMessage());
        }
        log.info("Initial startup sync complete.");
    }
}
