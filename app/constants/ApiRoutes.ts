const ws = process.env.EXPO_PUBLIC_WS_URL;
const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
const api_routes = {
  login: apiUrl + "/auth/login",
  google_login: apiUrl + "/auth/login/google",
  google_signup: apiUrl + "/auth/signup/google",
  logout: apiUrl + "/auth/logout",
  register: apiUrl + "/user/register",
  posts: {
    base: apiUrl + "/posts",
    feed: apiUrl + "/posts/feed",
    create_post: apiUrl + "/posts/create-post",
    create_draft: apiUrl + "/posts/create-draft",
    update: (id: string) => apiUrl + `/posts/publish/${id}`,
    like: (id: string, status: boolean) =>
      apiUrl + `/posts/like/${id}?status=${status}`,
    checkLike: (id: string) => apiUrl + `/posts/check-like/${id}`,
    bookmark: (id: string, status: boolean) =>
      apiUrl + `/posts/bookmark/${id}?status=${status}`,
    checkBookmark: (id: string) => apiUrl + `/posts/check-bookmark/${id}`,
    getPostById: (id: string) => apiUrl + `/posts/${id}`,
    getComments: (id: string) => apiUrl + `/posts/comments/${id}`,
    getUserPosts: (id: string) => apiUrl + `/posts/user/${id}/posts`,
    getSearchResults: (search: string) => apiUrl + `/posts/search?q=${search}`,
    delete: (id: string) => apiUrl + `/posts/${id}`,
  },
  files: {
    upload: apiUrl + "/file/upload",
  },
  notifications: {
    get: apiUrl + "/notifications",
    delete: (id: string) => apiUrl + `/notifications/delete/${id}`,
  },
  chats: {
    base: ws, // Websocket URLs are handled differently
    create: ws + "/create", // Websocket URLs are handled differently
    delete: (id: string) => apiUrl + `/chats/delete/${id}`,
  },
  room: {
    rooms: apiUrl + "/rooms/all",
    findRoomByParticipantsOrCreate: (id: string, id2: string) =>
      apiUrl + `/rooms/find-create/?user1=${id}&user2=${id2}`,
    chats: (id: string) => apiUrl + `/rooms/chats/${id}`,
    room: (id: string) => apiUrl + `/rooms/${id}`,
    update: (id: string) => apiUrl + `/rooms/update/${id}`,
  },
  users: {
    get: (id: string) => apiUrl + `/user/${id}`,
    update: (id: string) => apiUrl + `/user/update/${id}`,
    search: (search: string) => apiUrl + `/user/search?q=${search}`,
  },
};

export default api_routes;
