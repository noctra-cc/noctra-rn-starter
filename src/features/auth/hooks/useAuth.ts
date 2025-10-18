import { AuthService } from "@/src/services/auth/AuthService";
import { useCallback, useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AuthService.signUp(email, password);
      return data;
    } catch (err: any) {
      setError(err.message || "Error al registrarse");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AuthService.signIn(email, password);
      return data;
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await AuthService.signOut();
    } catch (err: any) {
      setError(err.message || "Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };
}
