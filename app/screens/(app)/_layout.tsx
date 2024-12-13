import { Text, useColorScheme } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/ctx";

import { headerDark, headerLight } from "@/styles/main";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const color_scheme = useColorScheme();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/screens/(auth)/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack screenOptions={color_scheme === "dark" ? headerDark : headerLight}>
      <Stack.Screen name="(profile)" />
      <Stack.Screen name="compose" />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
