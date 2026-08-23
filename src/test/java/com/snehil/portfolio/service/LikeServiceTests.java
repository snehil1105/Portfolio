package com.snehil.portfolio.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.snehil.portfolio.entity.LikeCounter;
import com.snehil.portfolio.repository.LikeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LikeServiceTests {

    @Autowired
    private LikeService likeService;

    @Autowired
    private LikeRepository likeRepository;

    @BeforeEach
    void setUp() {
        // Reset count to 0 for tests
        LikeCounter counter = likeRepository.findById(1L).orElseGet(() -> new LikeCounter(1L, 0L));
        counter.setCount(0L);
        likeRepository.save(counter);
    }

    @Test
    void testInitialCount() {
        assertEquals(0L, likeService.getCount());
    }

    @Test
    void testIncrementAndGet() {
        long updated = likeService.incrementAndGet();
        assertEquals(1L, updated);
        assertEquals(1L, likeService.getCount());

        updated = likeService.incrementAndGet();
        assertEquals(2L, updated);
        assertEquals(2L, likeService.getCount());
    }
}
