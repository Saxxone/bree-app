import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SessionProvider } from "@/ctx";
import { DarkTheme, LightTheme } from "@/constants/Theme";
import { headerDark, headerLight } from "./styles/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const color_scheme = useColorScheme();
  const header = color_scheme === "dark" ? headerDark : headerLight;
  const [loaded] = useFonts({
    "Outfit-Black": require("@/assets/fonts/outfit/Outfit-Black.ttf"),
    "Outfit-Bold": require("@/assets/fonts/outfit/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("@/assets/fonts/outfit/Outfit-ExtraBold.ttf"),
    "Outfit-ExtraLight": require("@/assets/fonts/outfit/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("@/assets/fonts/outfit/Outfit-Light.ttf"),
    "Outfit-Medium": require("@/assets/fonts/outfit/Outfit-Medium.ttf"),
    "Outfit-Regular": require("@/assets/fonts/outfit/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("@/assets/fonts/outfit/Outfit-SemiBold.ttf"),
    "Outfit-Thin": require("@/assets/fonts/outfit/Outfit-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <ThemeProvider value={color_scheme === "dark" ? DarkTheme : LightTheme}>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={header}>
            <Stack.Screen
              name="screens/(app)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="screens/(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Slot />
          </Stack>
        </QueryClientProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SessionProvider>
  );
}
