package com.snehil.portfolio.controller;

import com.snehil.portfolio.service.LikeService;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final LikeService likeService;

    public PortfolioController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping("/likes")
    public ResponseEntity<Map<String, Long>> getLikes() {
        return ResponseEntity.ok(Map.of("likes", likeService.getCount()));
    }

    @PostMapping("/like")
    public ResponseEntity<Map<String, Long>> like() {
        long updatedCount = likeService.incrementAndGet();
        return ResponseEntity.ok(Map.of("likes", updatedCount));
    }
}
