package com.snehil.portfolio.controller;

import com.snehil.portfolio.entity.StreakSnapshot;
import com.snehil.portfolio.service.StreakService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/streaks")
public class StreakController {

    private final StreakService streakService;

    public StreakController(StreakService streakService) {
        this.streakService = streakService;
    }

    @GetMapping
    public ResponseEntity<List<StreakSnapshot>> getStreaks() {
        return ResponseEntity.ok(streakService.getStreakSnapshots());
    }
}
