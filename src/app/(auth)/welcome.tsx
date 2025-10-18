import AuthLayout from "@/src/core/components/layout/AuthLayout";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  return (
    <AuthLayout>
      <View className="w-full mt-auto mb-8">
        <TouchableOpacity
          onPress={() => router.push("/(auth)/signin")}
          className="bg-blue-600 py-4 rounded-2xl mb-4"
        >
          <Text className="text-center text-white font-semibold text-lg">
            {t("auth.login")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signup")}
          className="border border-blue-600 py-4 rounded-2xl"
        >
          <Text className="text-center text-blue-600 font-semibold text-lg">
            {t("auth.signup")}
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
