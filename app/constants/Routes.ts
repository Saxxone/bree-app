import type { RelativePathString } from "expo-router";

export const app_routes: Record<string, any> = {
  home: "/screens/(app)/(home)",
  login: "/screens/(auth)/login",
  register: "/screens/(auth)/register",
  forgotPassword: "/screens/(auth)/forgot-password",
  post: {
    home: "/screens/(app)/(home)",
    compose: "/screens/compose",
    edit: (id: string) => `/screens/(app)/(home)/post/${id}/edit`,
    view: (id: string) => `/screens/(app)/(home)/post/${id}`,
    view_media: "/screens/(app)/(home)/post/media",
  },
};
