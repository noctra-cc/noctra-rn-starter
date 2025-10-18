import { ThemeToggle } from "@/src/core/components/theme/ThemeToggle";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black">
      <Text className="text-gray-700 mb-6 text-base">
        Edit <Text className="font-semibold">app/index.tsx</Text> to edit this screen.
      </Text>

      <ThemeToggle />

      <Pressable
        onPress={signOut}
        className="bg-red-500 px-8 py-3 rounded-2xl shadow-md shadow-red-400/40"
        android_ripple={{ color: "#f87171" }}
        style={({ pressed }) => [
          pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
        ]}
      >
        <Text className="text-white font-semibold text-lg tracking-wide">
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
}
