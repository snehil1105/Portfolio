import { useEffect, useState } from "react";
import { apiClient } from "../../shared/api/apiClient";

export type Platform = "LEETCODE" | "CODEFORCES";

export interface Streak {
  platform: Platform;
  totalSolved: number;
  currentStreak: number;
  lastUpdated: string;
  solvedToday?: string;
  submissionCalendar?: string;
}

const DEFAULT_STREAKS: Streak[] = [
  {
    platform: "LEETCODE",
    totalSolved: 56,
    currentStreak: 26,
    lastUpdated: "Today",
    solvedToday: "Sort List||https://leetcode.com/problems/sort-list/;;Online Stock Span||https://leetcode.com/problems/online-stock-span/",
    submissionCalendar: "{\"1788825600\": 1, \"1788912000\": 6, \"1788998400\": 4, \"1789084800\": 1, \"1789171200\": 1, \"1789257600\": 2, \"1789344000\": 2, \"1789430400\": 1, \"1789516800\": 1}"
  },
  {
    platform: "CODEFORCES",
    totalSolved: 28,
    currentStreak: 27,
    lastUpdated: "Today",
    solvedToday: "Watermelon||https://codeforces.com/problemset/problem/4/A",
    submissionCalendar: "{\"1789516800\": 1, \"1789430400\": 1, \"1789344000\": 1, \"1789171200\": 1, \"1789084800\": 1, \"1788998400\": 1, \"1788912000\": 1, \"1788825600\": 2, \"1788739200\": 1, \"1788652800\": 1, \"1788566400\": 1, \"1788480000\": 1, \"1788393600\": 1}"
  }
];

export function useStreaks() {
  const [streaks, setStreaks] = useState<Streak[]>(DEFAULT_STREAKS);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    // 1. Fetch initial Redis cache instantly
    apiClient.get<Streak[]>("/api/streaks")
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setStreaks(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          console.warn("Backend API offline, using cached snapshot state:", err);
          setError(null);
        }
      });

    // 2. Connect to real-time SSE stream for live updates
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(`${baseUrl}/api/coding-activity/stream`);

      eventSource.addEventListener("CODING_ACTIVITY_UPDATED", (event: MessageEvent) => {
        if (!active) return;
        try {
          const updated = JSON.parse(event.data);
          if (Array.isArray(updated) && updated.length > 0) {
            setStreaks(updated);
            setError(null);
          }
        } catch (e) {
          console.error("Failed to parse SSE coding activity update:", e);
        }
      });
    } catch (e) {
      console.warn("EventSource setup error:", e);
    }

    return () => {
      active = false;
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return { streaks, loading, error };
}
