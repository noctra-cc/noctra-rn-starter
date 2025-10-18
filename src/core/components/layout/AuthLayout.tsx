import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();
  
  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6 py-10">
      {/* HEADER */}
      <View className="items-center mt-10 mb-8">
        <Image
          source={require("@/src/core/assets/images/react-logo.png")}
          resizeMode="contain"
          className="w-28 h-28 mb-4"
        />
        <Text className="text-3xl font-bold text-gray-900">My App</Text>
        <Text className="text-gray-500 mt-2 text-center">
          {t("brand.slogan")}
        </Text>
      </View>

      <View>{children}</View>
    </SafeAreaView>
  );
}
