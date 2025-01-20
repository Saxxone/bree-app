export const app_routes: Record<string, any> = {
  post: {
    home: "/screens/(app)/(tabs)/(home)",
    compose: "/screens/compose",
    edit: (id: string) => `/screens/(app)/(home)/post/${id}/edit`,
    view: (id: string) => `/screens/(app)/(tabs)/(home)/(post)/${id}`,
    view_media: (id: string) =>
      `/screens/(app)/(tabs)/(home)/(post)/media/${id}`,
  },
  auth: {
    login: "/screens/(auth)/login",
    register: "/screens/(auth)/register",
    forgot_password: "/screens/(auth)forgot-password",
  },
};
