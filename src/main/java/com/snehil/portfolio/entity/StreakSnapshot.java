package com.snehil.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "streak_snapshots")
public class StreakSnapshot {

    @Id
    @Enumerated(EnumType.STRING)
    private Platform platform;

    private int totalSolved;
    private int currentStreak;
    private LocalDateTime lastUpdated;

    // Stores serialized solved problems for the current day: "Title||Url;;Title2||Url2"
    @Column(length = 2000)
    private String solvedToday;

    // Stores JSON formatted calendar submission history for exact streak heatmaps
    @Column(columnDefinition = "TEXT")
    private String submissionCalendar;

    public StreakSnapshot() {}

    public StreakSnapshot(Platform platform, int totalSolved, int currentStreak, LocalDateTime lastUpdated, String solvedToday, String submissionCalendar) {
        this.platform = platform;
        this.totalSolved = totalSolved;
        this.currentStreak = currentStreak;
        this.lastUpdated = lastUpdated;
        this.solvedToday = solvedToday;
        this.submissionCalendar = submissionCalendar;
    }

    public Platform getPlatform() {
        return platform;
    }

    public void setPlatform(Platform platform) {
        this.platform = platform;
    }

    public int getTotalSolved() {
        return totalSolved;
    }

    public void setTotalSolved(int totalSolved) {
        this.totalSolved = totalSolved;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getSolvedToday() {
        return solvedToday;
    }

    public void setSolvedToday(String solvedToday) {
        this.solvedToday = solvedToday;
    }

    public String getSubmissionCalendar() {
        return submissionCalendar;
    }

    public void setSubmissionCalendar(String submissionCalendar) {
        this.submissionCalendar = submissionCalendar;
    }
}
