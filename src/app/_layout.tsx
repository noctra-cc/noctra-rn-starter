import "@/src/core/assets/styles/global.css";
import "@/src/core/lib/i18n";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
  );
}
