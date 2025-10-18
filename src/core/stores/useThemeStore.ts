import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme } from "nativewind";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: (Appearance.getColorScheme() as Theme) || "light",

      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        colorScheme.set(newTheme);
      },

      setTheme: (theme) => {
        set({ theme });
        colorScheme.set(theme);
      },
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
