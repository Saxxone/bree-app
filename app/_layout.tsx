import { SessionProvider } from "@/app/ctx";
import SnackBar from "@/app-directories/components/app/SnackBar";
import { DarkTheme, LightTheme } from "@/app-directories/constants/Theme";
import {
  SnackBarProvider,
  useSnackBar,
} from "@/app-directories/context/SnackBarProvider";
import { headerDark, headerLight } from "@/app-directories/styles/main";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const color_scheme = useColorScheme();
  const [loaded] = useFonts({
    "Outfit Black": require("@/app-directories/assets/fonts/outfit/Outfit-Black.ttf"),
    "Outfit ExtraBold": require("@/app-directories/assets/fonts/outfit/Outfit-ExtraBold.ttf"),
    "Outfit Bold": require("@/app-directories/assets/fonts/outfit/Outfit-Bold.ttf"),
    "Outfit SemiBold": require("@/app-directories/assets/fonts/outfit/Outfit-SemiBold.ttf"),
    "Outfit Medium": require("@/app-directories/assets/fonts/outfit/Outfit-Medium.ttf"),
    "Outfit Regular": require("@/app-directories/assets/fonts/outfit/Outfit-Regular.ttf"),
    "Outfit Light": require("@/app-directories/assets/fonts/outfit/Outfit-Light.ttf"),
    "Outfit ExtraLight": require("@/app-directories/assets/fonts/outfit/Outfit-ExtraLight.ttf"),
    "Outfit Thin": require("@/app-directories/assets/fonts/outfit/Outfit-Thin.ttf"),
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
          <SnackBarProvider>
            <LayoutContents />
          </SnackBarProvider>
        </QueryClientProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SessionProvider>
  );
}

function LayoutContents() {
  const color_scheme = useColorScheme();
  const header = color_scheme === "dark" ? headerDark : headerLight;
  const { snackBar, setSnackBar } = useSnackBar();
  const [showSnackBar, setShowSnackBar] = useState(false);

  const closeSnack = useCallback(() => {
    setSnackBar({
      ...snackBar,
      visible: false,
    });
  }, [snackBar, setSnackBar]);

  useEffect(() => {
    if (snackBar.visible !== showSnackBar) {
      setShowSnackBar(snackBar.visible);
    }
  }, [snackBar.visible, showSnackBar]);

  return (
    <>
      <Stack screenOptions={header}>
        <Stack.Screen
          name="screens/(app)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
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
      {showSnackBar && <SnackBar snack={snackBar} onClose={closeSnack} />}
    </>
  );
}
