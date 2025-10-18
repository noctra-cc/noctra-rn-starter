import { router } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export function useAuthGuard() {
  const { session, loading, initialize } = useAuthStore();

  useEffect(() => {
    initialize(); 
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/(auth)/welcome"); 
    }
  }, [loading, session]);

  return { session, loading };
}
