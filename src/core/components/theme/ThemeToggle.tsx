import { useThemeStore } from "@/src/core/stores/useThemeStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(theme === "dark" ? 24 : 0) }],
  }));

  return (
    <Pressable
      onPress={toggleTheme}
      className="flex-row items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-neutral-800"
      accessibilityRole="button"
      accessibilityLabel="Toggle theme"
    >
      <Ionicons
        name={theme === "dark" ? "moon" : "sunny"}
        size={22}
        color={theme === "dark" ? "#FACC15" : "#2563EB"}
      />
      <View className="flex-row items-center">
        <Text className="text-base font-medium text-gray-800 dark:text-gray-100">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </Text>

        <View className="ml-3 w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full justify-center p-1">
          <Animated.View
            className="w-4 h-4 bg-white rounded-full shadow-md"
            style={animatedStyle}
          />
        </View>
      </View>
    </Pressable>
  );
}
