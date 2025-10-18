import { Text } from "@/src/core/components/ui";
import { useThemeStore } from "@/src/core/stores/useThemeStore";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
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
        <Text variant="default" weight="bold" size="3xl">
          {t("brand.name")}
        </Text>
        <Text variant="muted" weight="regular" size="lg">
          {t("brand.slogan")}
        </Text>
      </View>

      {/* CONTENT */}
      <View>{children}</View>
    </SafeAreaView>
  );
}
