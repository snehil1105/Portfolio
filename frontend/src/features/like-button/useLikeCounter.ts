import { useEffect, useState } from "react";
import { apiClient } from "../../shared/api/apiClient";

export function useLikeCounter() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(() => localStorage.getItem("portfolio_liked") === "true");

  useEffect(() => {
    apiClient.get<{ likes: number }>("/api/likes")
      .then(res => {
        if (res && typeof res.likes === 'number') {
          setLikes(res.likes);
          // If the server was restarted (count is 0) but the user has local storage liked lock,
          // reset the liked state so they can like it again
          if (res.likes === 0 && liked) {
            setLiked(false);
            localStorage.removeItem("portfolio_liked");
          }
        }
      })
      .catch(err => console.error("Error fetching page likes:", err));
  }, [liked]);

  const like = async () => {
    if (liked) return;
    
    try {
      const res = await apiClient.post<{ likes: number }>("/api/likes");
      if (res && typeof res.likes === 'number') {
        setLikes(res.likes);
        setLiked(true);
        localStorage.setItem("portfolio_liked", "true");
      }
    } catch (err) {
      console.error("Error submitting page like:", err);
    }
  };

  return { likes, liked, like };
}
