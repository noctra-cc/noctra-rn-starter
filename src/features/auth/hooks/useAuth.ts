import { useAuthStore } from "@/src/features/auth/store/useAuthStore";
import { AuthService } from "@/src/services/auth/auth.service";
import { useCallback, useState } from "react";

export function useAuth() {
  const { setSession, signOut: storeSignOut } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AuthService.signUp(email, password);
      setSession(data.session ?? null);
      return data;
    } catch (err: any) {
      setError(err.message || "Sign Up Error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AuthService.signIn(email, password);
      setSession(data.session ?? null);
      return data;
    } catch (err: any) {
      setError(err.message || "Sign In Error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setSession]);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await storeSignOut();
    } catch (err: any) {
      setError(err.message || "Sign Out Error");
    } finally {
      setLoading(false);
    }
  }, [storeSignOut]);

  return {
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };
}
