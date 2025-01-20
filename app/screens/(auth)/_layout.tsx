import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { headerDark, headerLight } from "@/app_directories/styles/main";

export default function AuthLayout() {
  const color_scheme = useColorScheme();
  const header = color_scheme === "dark" ? headerDark : headerLight;
  return (
    <Stack screenOptions={header}>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
