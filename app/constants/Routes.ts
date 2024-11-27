import type { RelativePathString } from "expo-router";

export const app_routes: Record<string, RelativePathString> = {
  login: "/screens/(auth)/login",
  register: "/screens/(auth)/register",
  forgotPassword: "/screens/(auth)/forgot-password",
};
