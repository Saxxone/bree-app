import { ThemeProvider } from "@react-navigation/native";
import { Appearance, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SessionProvider } from "@/ctx";
import { DarkTheme, LightTheme } from "@/constants/Theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
        <Stack>
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
        <StatusBar style="auto" />
      </ThemeProvider>
    </SessionProvider>
  );
}
