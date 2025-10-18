import AuthLayout from "@/src/core/components/layout/AuthLayout";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignupScreen() {
  const { t } = useTranslation();
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert(t("general.error"), t("auth.emailAndPasswordError"));
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert(t("auth.accountCreated"), t("auth.checkEmailToConfirm"), [
        { text: "OK", onPress: () => router.replace("/(auth)/signin") },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || t("auth.signupError"));
    }
  };

  return (
    <AuthLayout>
      <View className="gap-4">
        <View>
          <Text className="text-gray-700 mb-2 font-semibold">
            {t("auth.email")}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
            placeholder="mail@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-2 font-semibold">
            {t("auth.password")}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          disabled={loading}
          className={`mt-6 rounded-xl py-3 ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          <Text className="text-center text-white font-semibold text-lg">
            {loading ? t("auth.signingUp") : t("auth.signup")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signin")}
          className="mt-4"
        >
          <Text className="text-center text-blue-600">
            {t("auth.alreadyHaveAccount")}
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
