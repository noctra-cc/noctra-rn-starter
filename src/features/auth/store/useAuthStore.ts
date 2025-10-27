import { supabase } from "@/src/core/lib/supabase";
import { create } from "zustand";

interface AuthState {
  session: any | null;
  loading: boolean;
  setSession: (session: any | null) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: true,

  setSession: (session) => set({ session }),

  initialize: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (!error) {
      set({ session: data.session, loading: false });
    } else {
      set({ session: null, loading: false });
    }

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        set({ session });
      }
    );
  },

  signOut: async () => {
    set({ session: null, loading: false });
  },
}));
