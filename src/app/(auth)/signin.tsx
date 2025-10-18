import AuthLayout from "@/src/core/components/layout/AuthLayout";
import { Button, Input, Text } from "@/src/core/components/ui";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

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
          label={t("auth.login")}
          loading={loading}
          onPress={handleSignIn}
        />
        <Link asChild href={"/(auth)/signup"}>
          <Button
            variant="ghost"
            size="lg"
            label={t("auth.noAccount")}
            disabled={loading}
          />
        </Link>
      </View>
    </AuthLayout>
  );
}
