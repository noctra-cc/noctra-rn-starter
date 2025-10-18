import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export function useAuthGuard() {
  const { session, loading, initialize } = useAuthStore();

  useEffect(() => {
    initialize(); // ✅ starts Supabase session check and listener
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      // router.replace("/(auth)/welcome"); // redirect when logged out
    }
  }, [loading, session]);

  return { session, loading };
}
