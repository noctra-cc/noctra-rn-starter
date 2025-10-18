import { useThemeStore } from "@/src/core/stores/useThemeStore";
import { useAuthGuard } from "@/src/features/auth/guards/useAuthGuard";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";

export default function TabsLayout() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const { t } = useTranslation();
  const { loading } = useAuthGuard();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
        },
        headerTitleStyle: {
          color: isDark ? "#fff" : "#000",
        },
        headerTintColor: isDark ? "#fff" : "#000",
        tabBarActiveTintColor: isDark ? "#fff" : "#2563EB",
        tabBarInactiveTintColor: isDark ? "#888" : "#555",
        tabBarStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
          borderTopWidth: 1,
          borderTopColor: isDark ? "#222" : "#eee",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("navigation.home"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
