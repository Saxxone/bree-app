import type { RelativePathString } from "expo-router";

export const app_routes: Record<string, any> = {
  home: "/screens/(app)/(tabs)/(home)",
  login: "/screens/(auth)/login",
  register: "/screens/(auth)/register",
  forgotPassword: "/screens/(auth)/forgot-password",
  post: {
    home: "/screens/(app)/(tabs)/(home)",
    compose: "/screens/compose",
    edit: (id: string) => `/screens/(app)/(home)/post/${id}/edit`,
    view: (id: string) => `/screens/(app)/(tabs)/(home)/(post)/${id}`,
    view_media: (id: string) =>
      `/screens/(app)/(tabs)/(home)/(post)/media/${id}`,
  },
  auth: {
    login: "/screens/(auth)login",
    register: "/screens/(auth)register",
    forgotPassword: "/screens/(auth)forgot-password",
  },
};
