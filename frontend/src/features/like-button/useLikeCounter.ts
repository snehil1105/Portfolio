import { useEffect, useState } from "react";
import { apiClient } from "../../shared/api/apiClient";

export function useLikeCounter() {
  const [likes, setLikes] = useState<number>(() => {
    const saved = localStorage.getItem("portfolio_likes_count");
    return saved ? Math.max(0, parseInt(saved, 10)) : 0;
  });
  const [liked, setLiked] = useState(() => localStorage.getItem("portfolio_liked") === "true");

  const updateLikes = (count: number) => {
    setLikes((prev) => {
      const next = Math.max(prev, count);
      localStorage.setItem("portfolio_likes_count", String(next));
      return next;
    });
  };

  useEffect(() => {
    let active = true;

    // 1. Initial fetch from backend
    apiClient.get<{ likes: number }>("/api/likes")
      .then(res => {
        if (active && res && typeof res.likes === 'number') {
          updateLikes(res.likes);
        }
      })
      .catch(() => {
        // Fallback to /api/portfolio/likes
        apiClient.get<{ likes: number }>("/api/portfolio/likes")
          .then(res => {
            if (active && res && typeof res.likes === 'number') {
              updateLikes(res.likes);
            }
          })
          .catch(() => {});
      });

    // 2. Connect to SSE stream for real-time live like updates from other visitors
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(`${baseUrl}/api/portfolio/updates`);

      eventSource.addEventListener("LIKE_UPDATED", (event: MessageEvent) => {
        if (!active) return;
        try {
          const payload = JSON.parse(event.data);
          if (payload && typeof payload.likes === 'number') {
            updateLikes(payload.likes);
          }
        } catch (e) {
          console.error("Failed to parse SSE like update:", e);
        }
      });
    } catch (e) {
      console.warn("EventSource setup error for likes:", e);
    }

    return () => {
      active = false;
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const like = async () => {
    // Optimistic UI update for instant feedback
    const nextCount = likes + 1;
    updateLikes(nextCount);
    setLiked(true);
    localStorage.setItem("portfolio_liked", "true");

    try {
      let res: { likes: number } | null = null;
      try {
        res = await apiClient.post<{ likes: number }>("/api/likes");
      } catch (e) {
        res = await apiClient.post<{ likes: number }>("/api/portfolio/like");
      }

      if (res && typeof res.likes === 'number') {
        updateLikes(res.likes);
      }
    } catch (err) {
      console.warn("API like submission notice (optimistic update active):", err);
    }
  };

  return { likes, liked, like };
}
