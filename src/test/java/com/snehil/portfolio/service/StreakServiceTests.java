package com.snehil.portfolio.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import com.snehil.portfolio.dto.StreakDTO;
import com.snehil.portfolio.entity.Platform;
import com.snehil.portfolio.entity.StreakSnapshot;
import com.snehil.portfolio.repository.StreakSnapshotRepository;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class StreakServiceTests {

    @Autowired
    private StreakService streakService;

    @Autowired
    private StreakSnapshotRepository snapshotRepository;

    @MockBean
    private LeetCodeClient leetCodeClient;

    @MockBean
    private CodeforcesClient codeforcesClient;

    @BeforeEach
    void setUp() {
        snapshotRepository.deleteAll();
        // Seed default empty states just like DataInitializer
        snapshotRepository.save(new StreakSnapshot(Platform.LEETCODE, 0, 0, LocalDateTime.now()));
        snapshotRepository.save(new StreakSnapshot(Platform.CODEFORCES, 0, 0, LocalDateTime.now()));
    }

    @Test
    void testSuccessfulSync() {
        // Arrange
        when(leetCodeClient.fetchStreak()).thenReturn(new StreakDTO(150, 7));
        when(codeforcesClient.fetchStreak()).thenReturn(new StreakDTO(220, 12));

        // Act
        streakService.syncLeetCode();
        streakService.syncCodeforces();

        // Assert LeetCode
        StreakSnapshot lcSnapshot = snapshotRepository.findById(Platform.LEETCODE).orElse(null);
        assertNotNull(lcSnapshot);
        assertEquals(150, lcSnapshot.getTotalSolved());
        assertEquals(7, lcSnapshot.getCurrentStreak());

        // Assert Codeforces
        StreakSnapshot cfSnapshot = snapshotRepository.findById(Platform.CODEFORCES).orElse(null);
        assertNotNull(cfSnapshot);
        assertEquals(220, cfSnapshot.getTotalSolved());
        assertEquals(12, cfSnapshot.getCurrentStreak());
    }

    @Test
    void testResilienceOnClientFailure() {
        // Step 1: Establish a good snapshot in the database
        when(leetCodeClient.fetchStreak()).thenReturn(new StreakDTO(150, 7));
        streakService.syncLeetCode();

        StreakSnapshot initialSnapshot = snapshotRepository.findById(Platform.LEETCODE).orElse(null);
        assertNotNull(initialSnapshot);
        assertEquals(150, initialSnapshot.getTotalSolved());

        // Step 2: Mock a connection failure / exception
        when(leetCodeClient.fetchStreak()).thenThrow(new RuntimeException("LeetCode API Timeout"));

        // Step 3: Run sync again (should catch exception and log)
        streakService.syncLeetCode();

        // Step 4: Verify that the DB data was NOT overwritten or cleared, it keeps the old value
        StreakSnapshot finalSnapshot = snapshotRepository.findById(Platform.LEETCODE).orElse(null);
        assertNotNull(finalSnapshot);
        assertEquals(150, finalSnapshot.getTotalSolved());
        assertEquals(7, finalSnapshot.getCurrentStreak());
    }
}
