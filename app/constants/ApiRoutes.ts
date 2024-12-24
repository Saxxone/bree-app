const ws = process.env.EXPO_PUBLIC_WS_URL;
const api_url = process.env.EXPO_PUBLIC_API_BASE_URL;
const api_routes = {
  login: api_url + "/auth/login",
  google_login: api_url + "/auth/login/google",
  google_signup: api_url + "/auth/signup/google",
  logout: api_url + "/auth/logout",
  register: api_url + "/user/register",
  posts: {
    base: api_url + "/posts",
    feed: api_url + "/posts/feed",
    create_post: api_url + "/posts/create-post",
    create_draft: api_url + "/posts/create-draft",
    update: (id: string) => api_url + `/posts/publish/${id}`,
    like: (id: string) => api_url + `/posts/like/${id}`,
    checkLike: (id: string) => api_url + `/posts/check-like/${id}`,
    bookmark: (id: string) => api_url + `/posts/bookmark/${id}`,
    checkBookmark: (id: string) => api_url + `/posts/check-bookmark/${id}`,
    getPostById: (id: string) => api_url + `/posts/${id}`,
    getComments: (id: string) => api_url + `/posts/comments/${id}`,
    getUserPosts: (id: string) => api_url + `/posts/user/${id}/posts`,
    getSearchResults: (search: string) => api_url + `/posts/search?q=${search}`,
    delete: (id: string) => api_url + `/posts/${id}`,
  },
  files: {
    upload: api_url + "/file/upload",
  },
  notifications: {
    get: api_url + "/notifications",
    delete: (id: string) => api_url + `/notifications/delete/${id}`,
  },
  chats: {
    base: ws, // Websocket URLs are handled differently
    create: ws + "/create", // Websocket URLs are handled differently
    delete: (id: string) => api_url + `/chats/delete/${id}`,
  },
  room: {
    rooms: api_url + "/rooms/all",
    findRoomByParticipantsOrCreate: (id: string, id2: string) =>
      api_url + `/rooms/find-create/?user1=${id}&user2=${id2}`,
    chats: (id: string) => api_url + `/rooms/chats/${id}`,
    room: (id: string) => api_url + `/rooms/${id}`,
    update: (id: string) => api_url + `/rooms/update/${id}`,
  },
  users: {
    get: (id: string) => api_url + `/user/${id}`,
    update: (id: string) => api_url + `/user/update/${id}`,
    search: (search: string) => api_url + `/user/search?q=${search}`,
  },
};

export default api_routes;
