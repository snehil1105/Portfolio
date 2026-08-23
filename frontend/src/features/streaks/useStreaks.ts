import { useEffect, useState } from "react";
import { apiClient } from "../../shared/api/apiClient";

export type Platform = "LEETCODE" | "CODEFORCES";

export interface Streak {
  platform: Platform;
  totalSolved: number;
  currentStreak: number;
  lastUpdated: string;
  solvedToday?: string;
}

export function useStreaks() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    apiClient.get<Streak[]>("/api/streaks")
      .then((data) => {
        if (active) {
          setStreaks(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          console.error("Error fetching coding streaks:", err);
          setError("Offline");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { streaks, loading, error };
}
