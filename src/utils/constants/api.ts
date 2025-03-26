export const BASE_URL = "http://lk-stud.api.kreosoft.space/api";

export const routes = {
    auth: {
      me: "/Profile",
      login: "/Auth/login",
      logout: "/Auth/logot",
      refreshTokens: "/Auth/refresh",
    },
    user: {
      findAll: "/user",
      findOne: (id: number) => `/user/${id}`,
    },
  };