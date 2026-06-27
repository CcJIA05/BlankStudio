import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function useClickAuth(enabled: boolean) {
  const { isAuthenticated, openPasswordModal, logout } = useAuth();
  const clickCount = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled || isAuthenticated) return;

    const handleClick = () => {
      clickCount.current += 1;

      if (timerRef.current) clearTimeout(timerRef.current);

      if (clickCount.current >= 5) {
        clickCount.current = 0;
        openPasswordModal();
        return;
      }

      timerRef.current = setTimeout(() => {
        clickCount.current = 0;
      }, 1500);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, isAuthenticated, openPasswordModal]);

  return { isAuthenticated, logout };
}
