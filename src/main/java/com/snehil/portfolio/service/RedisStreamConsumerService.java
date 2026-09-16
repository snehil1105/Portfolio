package com.snehil.portfolio.service;

import com.snehil.portfolio.entity.LikeCounter;
import com.snehil.portfolio.repository.LikeRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class RedisStreamConsumerService {

    private static final Logger log = LoggerFactory.getLogger(RedisStreamConsumerService.class);
    private static final String STREAM_LIKE_EVENTS = "portfolio:like-events";
    private static final String STREAM_CODING_UPDATES = "coding:updates";

    private final StringRedisTemplate stringRedisTemplate;
    private final LikeRepository likeRepository;

    public RedisStreamConsumerService(
            StringRedisTemplate stringRedisTemplate,
            LikeRepository likeRepository) {
        this.stringRedisTemplate = stringRedisTemplate;
        this.likeRepository = likeRepository;
    }

    /**
     * Periodically process like events from the Redis Stream to ensure durable PostgreSQL synchronization.
     */
    @Scheduled(fixedRate = 10000)
    public void processLikeEventsStream() {
        try {
            List<MapRecord<String, Object, Object>> records = stringRedisTemplate.opsForStream()
                    .read(org.springframework.data.redis.connection.stream.StreamOffset.fromStart(STREAM_LIKE_EVENTS));

            if (records == null || records.isEmpty()) {
                return;
            }

            log.info("Processing {} events from Redis stream '{}'", records.size(), STREAM_LIKE_EVENTS);
            for (MapRecord<String, Object, Object> record : records) {
                Object newCountObj = record.getValue().get("newCount");
                if (newCountObj != null) {
                    try {
                        long count = Long.parseLong(newCountObj.toString());
                        LikeCounter counter = likeRepository.findById(1L)
                                .orElseGet(() -> new LikeCounter(1L, 0L));
                        if (counter.getCount() < count) {
                            counter.setCount(count);
                            likeRepository.save(counter);
                            log.info("Stream consumer updated PostgreSQL like count to {}", count);
                        }
                    } catch (Exception e) {
                        log.warn("Error persisting stream like event to DB: {}", e.getMessage());
                    }
                }
            }
        } catch (Exception e) {
            log.debug("Redis stream read skipped: {}", e.getMessage());
        }
    }
}
