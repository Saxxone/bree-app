export const app_routes: Record<string, any> = {
  post: {
    home: "/(tabs)/(home)",
    compose: "/compose",
    edit: (id: string) => `/(tabs)/(home)/post/${id}/edit`,
    view: (id: string) => `/(tabs)/(home)/(post)/${id}`,
    view_media: (id: string) => `/(tabs)/(home)/(post)/media/${id}`,
  },
  auth: {
    login: "/(auth)/login",
    register: "/(auth)/register",
    forgot_password: "/(auth)forgot-password",
  },
};
