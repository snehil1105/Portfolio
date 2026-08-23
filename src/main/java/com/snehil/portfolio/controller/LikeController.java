package com.snehil.portfolio.controller;

import com.snehil.portfolio.service.LikeService;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private static final Logger log = LoggerFactory.getLogger(LikeController.class);
    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Long>> getLikes() {
        long count = likeService.getCount();
        return ResponseEntity.ok(Map.of("likes", count));
    }

    @PostMapping
    public ResponseEntity<Map<String, Long>> incrementLikes() {
        long updatedCount = likeService.incrementAndGet();
        return ResponseEntity.ok(Map.of("likes", updatedCount));
    }
}
