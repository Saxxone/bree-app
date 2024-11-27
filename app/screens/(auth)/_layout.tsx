import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { headerDark, headerLight } from "@/styles/main";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const header = colorScheme === "dark" ? headerDark : headerLight;
  return (
    <Stack screenOptions={header}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
