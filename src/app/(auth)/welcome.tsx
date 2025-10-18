import AuthLayout from "@/src/core/components/layout/AuthLayout";
import { Button } from "@/src/core/components/ui";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  return (
    <AuthLayout>
      <View className="w-full mt-auto mb-8 gap-4">
        <Link asChild href="/(auth)/signin">
          <Button size="lg" label={t("auth.login")}/>
        </Link>

        <Link asChild href="/(auth)/signup">
          <Button size="lg" variant="outline" label={t("auth.signup")}/>
        </Link>
      </View>
    </AuthLayout>
  );
}
