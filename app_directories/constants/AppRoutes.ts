export const app_routes: Record<string, any> = {
  post: {
    home: "/(app)/(tabs)/(home)",
    compose: "/compose",
    edit: (id: string) => `/(app)/(home)/post/${id}/edit`,
    view: (id: string) => `/(app)/(tabs)/(home)/(post)/${id}`,
    view_media: (id: string) => `/(app)/(tabs)/(home)/(post)/media/${id}`,
  },
  auth: {
    login: "/(auth)/login",
    register: "/(auth)/register",
    forgot_password: "/(auth)forgot-password",
  },
};
