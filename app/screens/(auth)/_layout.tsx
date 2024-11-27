import { header } from "@/styles/main";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={header}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
