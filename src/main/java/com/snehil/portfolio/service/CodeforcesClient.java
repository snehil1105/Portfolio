package com.snehil.portfolio.service;

import com.snehil.portfolio.dto.StreakDTO;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class CodeforcesClient {

    private static final Logger log = LoggerFactory.getLogger(CodeforcesClient.class);
    private final RestClient restClient;
    private final String handle;

    public CodeforcesClient(
            @Value("${portfolio.codeforces.username:snehil}") String handle) {
        this.handle = handle;
        this.restClient = RestClient.builder()
                .baseUrl("https://codeforces.com/api")
                .defaultHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                .build();
    }

    public StreakDTO fetchStreak() {
        log.info("Fetching Codeforces stats and recent solved questions for user: {}", handle);

        try {
            Map<String, Object> response = restClient.get()
                    .uri("/user.status?handle={handle}", handle)
                    .retrieve()
                    .body(new ParameterizedTypeReference<Map<String, Object>>() {});

            if (response == null || !"OK".equals(response.get("status"))) {
                throw new RuntimeException("Invalid response status from Codeforces API");
            }

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> result = (List<Map<String, Object>>) response.get("result");
            if (result == null || result.isEmpty()) {
                log.info("No submissions found for Codeforces handle: {}", handle);
                return new StreakDTO(0, 0, "");
            }

            // Calculate total unique solved problems
            Set<String> solvedProblemIds = new HashSet<>();
            Set<LocalDate> solvedDates = new HashSet<>();
            
            LocalDate today = LocalDate.now(ZoneId.of("Asia/Kolkata"));
            LocalDate yesterday = today.minusDays(1);
            List<String> todayList = new ArrayList<>();
            Set<String> solvedTodayIds = new HashSet<>();

            for (Map<String, Object> submission : result) {
                String verdict = (String) submission.get("verdict");
                if ("OK".equals(verdict)) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> problem = (Map<String, Object>) submission.get("problem");
                    String problemId = null;
                    if (problem != null) {
                        Object contestId = problem.get("contestId");
                        Object index = problem.get("index");
                        if (contestId != null && index != null) {
                            problemId = contestId.toString() + "_" + index.toString();
                            solvedProblemIds.add(problemId);
                        }
                    }

                    // Extract date
                    Number creationTimeSeconds = (Number) submission.get("creationTimeSeconds");
                    if (creationTimeSeconds != null) {
                        LocalDate date = Instant.ofEpochSecond(creationTimeSeconds.longValue())
                                .atZone(ZoneId.of("Asia/Kolkata"))
                                .toLocalDate();
                        solvedDates.add(date);

                        // Check if solved today or yesterday (and deduplicate if multiple submissions exist for the same problem today)
                        if ((date.equals(today) || date.equals(yesterday)) && problem != null && problemId != null) {
                            if (!solvedTodayIds.contains(problemId)) {
                                solvedTodayIds.add(problemId);
                                String name = (String) problem.get("name");
                                Object contestId = problem.get("contestId");
                                Object index = problem.get("index");
                                if (name != null && contestId != null && index != null) {
                                    String url = "https://codeforces.com/contest/" + contestId + "/problem/" + index;
                                    todayList.add(name + "||" + url);
                                }
                            }
                        }
                    }
                }
            }

            int totalSolved = solvedProblemIds.size();
            int currentStreak = calculateCurrentStreak(solvedDates);
            String solvedToday = String.join(";;", todayList);

            log.info("Successfully fetched Codeforces stats. Solved: {}, Streak: {}, Solved Today: {}", 
                     totalSolved, currentStreak, solvedToday);
            return new StreakDTO(totalSolved, currentStreak, solvedToday);

        } catch (Exception e) {
            log.error("Failed to fetch Codeforces statistics for handle {}: {}", handle, e.getMessage());
            throw new RuntimeException("Codeforces client sync error", e);
        }
    }

    private int calculateCurrentStreak(Set<LocalDate> dates) {
        if (dates.isEmpty()) {
            return 0;
        }

        List<LocalDate> sortedDates = dates.stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

        LocalDate today = LocalDate.now(ZoneId.of("Asia/Kolkata"));
        LocalDate yesterday = today.minusDays(1);

        LocalDate mostRecent = sortedDates.get(0);
        if (!mostRecent.equals(today) && !mostRecent.equals(yesterday)) {
            return 0;
        }

        int streak = 1;
        LocalDate current = mostRecent;
        for (int i = 1; i < sortedDates.size(); i++) {
            LocalDate next = sortedDates.get(i);
            if (next.equals(current.minusDays(1))) {
                streak++;
                current = next;
            } else if (next.equals(current)) {
                // Same day, skip
            } else {
                break;
            }
        }
        return streak;
    }
}
