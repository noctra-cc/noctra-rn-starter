import AuthLayout from "@/src/core/components/layout/AuthLayout";
import { Button, Input, Text } from "@/src/core/components/ui";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { signUpSchema, type SignUpForm } from "@/src/features/auth/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

export default function SignupScreen() {
  const { t } = useTranslation();
  const { signUp, loading } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data: SignUpForm) => {
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
            onChangeText={(text) => setValue("email", text)}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        <View>
          <Text variant="muted">{t("auth.password")}</Text>
          <Input
            size="lg"
            disabled={loading}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={(text) => setValue("password", text)}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>

        <Button
          size="lg"
          label={t("auth.signup")}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
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
