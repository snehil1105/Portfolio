package com.snehil.portfolio.dto;

import com.snehil.portfolio.entity.Platform;
import com.snehil.portfolio.entity.StreakSnapshot;
import java.time.LocalDateTime;

public class StreakDTO {

    private int totalSolved;
    private int currentStreak;
    private String solvedToday;
    private String submissionCalendar;

    public StreakDTO() {}

    public StreakDTO(int totalSolved, int currentStreak, String solvedToday) {
        this.totalSolved = totalSolved;
        this.currentStreak = currentStreak;
        this.solvedToday = solvedToday;
        this.submissionCalendar = "{}";
    }

    public StreakDTO(int totalSolved, int currentStreak, String solvedToday, String submissionCalendar) {
        this.totalSolved = totalSolved;
        this.currentStreak = currentStreak;
        this.solvedToday = solvedToday;
        this.submissionCalendar = submissionCalendar;
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

    public StreakSnapshot toEntity(Platform platform) {
        return new StreakSnapshot(platform, this.totalSolved, this.currentStreak, LocalDateTime.now(), this.solvedToday, this.submissionCalendar);
    }

    @Override
    public String toString() {
        return "StreakDTO{" +
                "totalSolved=" + totalSolved +
                ", currentStreak=" + currentStreak +
                ", solvedToday='" + solvedToday + '\'' +
                ", submissionCalendar='" + submissionCalendar + '\'' +
                '}';
    }
}
