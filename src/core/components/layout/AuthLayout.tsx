import { useThemeStore } from "@/src/core/stores/useThemeStore";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "../theme/ThemeToggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-black" : "bg-white"} justify-center px-6 py-10`}
    >
      {/* 🔝 Absolute top-right toggle */}
      <View className="absolute top-16 right-6 z-10">
        <ThemeToggle />
      </View>

      {/* HEADER */}
      <View className="items-center mt-10 mb-8">
        <Image
          source={require("@/src/core/assets/images/react-logo.png")}
          resizeMode="contain"
          className="w-28 h-28 mb-4"
        />
        <Text className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          My App
        </Text>
        <Text className={`mt-2 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {t("brand.slogan")}
        </Text>
      </View>

      {/* CONTENT */}
      <View>{children}</View>
    </SafeAreaView>
  );
}
