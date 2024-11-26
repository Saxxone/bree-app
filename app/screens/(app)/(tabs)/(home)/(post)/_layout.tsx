import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="post"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
