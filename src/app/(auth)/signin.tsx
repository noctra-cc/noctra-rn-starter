import AuthLayout from "@/src/core/components/layout/AuthLayout";
import { Button, Input, Text } from "@/src/core/components/ui";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { signInSchema, type SignInForm } from "@/src/features/auth/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

export default function SignInScreen() {
  const { t } = useTranslation();
  const { signIn, loading } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data: SignInForm) => {
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
          label={t("auth.login")}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
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
