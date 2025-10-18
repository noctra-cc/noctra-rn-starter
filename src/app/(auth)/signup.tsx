import AuthLayout from "@/src/core/components/layout/AuthLayout";
import { Button, Input, Text } from "@/src/core/components/ui";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

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
          <Text variant="muted">{t("auth.email")}</Text>
          <Input
            size="lg"
            disabled={loading}
            placeholder="mail@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text variant="muted">{t("auth.password")}</Text>
          <Input
            size="lg"
            disabled={loading}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button
          size="lg"
          label={t("auth.signup")}
          loading={loading}
          onPress={handleSignUp}
        />
        <Link asChild href={"/(auth)/signin"}>
          <Button
            variant="ghost"
            size="lg"
            label={t("auth.alreadyHaveAccount")}
            disabled={loading}
          />
        </Link>
      </View>
    </AuthLayout>
  );
}
