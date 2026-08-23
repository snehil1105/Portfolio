package com.snehil.portfolio.service;

import com.snehil.portfolio.dto.StreakDTO;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class LeetCodeClient {

    private static final Logger log = LoggerFactory.getLogger(LeetCodeClient.class);
    private final RestClient restClient;
    private final String username;

    public LeetCodeClient(
            @Value("${portfolio.leetcode.username:snehil}") String username) {
        this.username = username;
        this.restClient = RestClient.builder()
                .baseUrl("https://leetcode.com/graphql")
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                .build();
    }

    public StreakDTO fetchStreak() {
        log.info("Fetching LeetCode stats and recent submissions for user: {}", username);

        String query = "query getUserProfile($username: String!) { " +
                "  matchedUser(username: $username) { " +
                "    submitStats { " +
                "      acSubmissionNum { " +
                "        difficulty " +
                "        count " +
                "      } " +
                "    } " +
                "    userCalendar { " +
                "      streak " +
                "    } " +
                "  } " +
                "  recentAcSubmissionList(username: $username, limit: 15) { " +
                "    title " +
                "    titleSlug " +
                "    timestamp " +
                "  } " +
                "}";

        Map<String, Object> requestBody = Map.of(
                "query", query,
                "variables", Map.of("username", username)
        );

        try {
            Map<String, Object> response = restClient.post()
                    .body(requestBody)
                    .retrieve()
                    .body(new ParameterizedTypeReference<Map<String, Object>>() {});

            if (response == null || !response.containsKey("data")) {
                throw new RuntimeException("Invalid response format from LeetCode API");
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> data = (Map<String, Object>) response.get("data");
            if (data == null || !data.containsKey("matchedUser")) {
                throw new RuntimeException("LeetCode user not found or response is empty");
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> matchedUser = (Map<String, Object>) data.get("matchedUser");
            if (matchedUser == null) {
                throw new RuntimeException("LeetCode user data is null");
            }

            // Extract total solved count
            int totalSolved = 0;
            @SuppressWarnings("unchecked")
            Map<String, Object> submitStats = (Map<String, Object>) matchedUser.get("submitStats");
            if (submitStats != null) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> acSubmissionNum = (List<Map<String, Object>>) submitStats.get("acSubmissionNum");
                if (acSubmissionNum != null) {
                    for (Map<String, Object> submission : acSubmissionNum) {
                        if ("All".equals(submission.get("difficulty"))) {
                            totalSolved = ((Number) submission.get("count")).intValue();
                            break;
                        }
                    }
                }
            }

            // Extract streak
            int streak = 0;
            @SuppressWarnings("unchecked")
            Map<String, Object> userCalendar = (Map<String, Object>) matchedUser.get("userCalendar");
            if (userCalendar != null && userCalendar.get("streak") != null) {
                streak = ((Number) userCalendar.get("streak")).intValue();
            }

            // Extract questions solved today & yesterday
            String solvedToday = "";
            if (data.containsKey("recentAcSubmissionList")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> submissions = (List<Map<String, Object>>) data.get("recentAcSubmissionList");
                if (submissions != null) {
                    LocalDate today = LocalDate.now(ZoneId.of("Asia/Kolkata"));
                    LocalDate yesterday = today.minusDays(1);
                    List<String> todayList = new ArrayList<>();
                    
                    for (Map<String, Object> sub : submissions) {
                        Object tsObj = sub.get("timestamp");
                        if (tsObj != null) {
                            long tsSecs = Long.parseLong(tsObj.toString());
                            LocalDate subDate = Instant.ofEpochSecond(tsSecs)
                                    .atZone(ZoneId.of("Asia/Kolkata"))
                                    .toLocalDate();
                            
                            if (subDate.equals(today) || subDate.equals(yesterday)) {
                                String title = (String) sub.get("title");
                                String slug = (String) sub.get("titleSlug");
                                if (title != null && slug != null) {
                                    String url = "https://leetcode.com/problems/" + slug + "/";
                                    todayList.add(title + "||" + url);
                                }
                            }
                        }
                    }
                    if (!todayList.isEmpty()) {
                        solvedToday = String.join(";;", todayList);
                    }
                }
            }

            log.info("Successfully fetched LeetCode stats. Solved: {}, Streak: {}, Solved Today: {}", 
                     totalSolved, streak, solvedToday);
            return new StreakDTO(totalSolved, streak, solvedToday);

        } catch (Exception e) {
            log.error("Failed to fetch LeetCode statistics for username {}: {}", username, e.getMessage());
            throw new RuntimeException("LeetCode client sync error", e);
        }
    }
}
