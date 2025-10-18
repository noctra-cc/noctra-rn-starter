import { ThemeToggle } from "@/src/core/components/theme/ThemeToggle";
import { Button, Text } from "@/src/core/components/ui";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black px-8 gap-4">
      <Text variant="muted">
        Edit <Text className="font-semibold">app/index.tsx</Text> to edit this
        screen.
      </Text>

      <ThemeToggle />

      <Button onPress={signOut} label={t("auth.signOut")} />
    </View>
  );
}
