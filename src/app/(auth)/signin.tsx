import AuthLayout from "@/src/core/components/layout/AuthLayout";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const { t } = useTranslation();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert(t("general.error"), t("auth.emailAndPasswordError"));
      return;
    }

    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(t("error"), error.message || t("signInFailed"));
    }
  };

  return (
    <AuthLayout>
      <View className="justify-center gap-4">
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
          onPress={handleSignIn}
          disabled={loading}
          className={`mt-6 rounded-xl py-3 ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          <Text className="text-center text-white font-semibold text-lg">
            {loading ? t("auth.logingIn") : t("auth.login")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signup")}
          className="mt-4"
        >
          <Text className="text-center text-blue-600">
            {t("auth.noAccount")}
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
