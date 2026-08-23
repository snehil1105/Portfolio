package com.snehil.portfolio.service;

import com.snehil.portfolio.entity.LikeCounter;
import com.snehil.portfolio.repository.LikeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {

    private static final Logger log = LoggerFactory.getLogger(LikeService.class);
    private final LikeRepository repository;

    public LikeService(LikeRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public long incrementAndGet() {
        log.info("Incrementing page likes...");
        // Lookup by ID to ensure consistency and use standard entity-based save
        LikeCounter counter = repository.findById(1L)
                .orElseGet(() -> new LikeCounter(1L, 0L));
        
        counter.setCount(counter.getCount() + 1);
        repository.save(counter);
        
        log.info("Incremented likes. Current count: {}", counter.getCount());
        return counter.getCount();
    }

    @Transactional(readOnly = true)
    public long getCount() {
        return repository.findById(1L)
                .map(LikeCounter::getCount)
                .orElse(0L);
    }
}
