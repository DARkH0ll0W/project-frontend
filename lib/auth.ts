// lib/auth.ts



import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";

export const auth = {
  getToken() {
    return Cookies.get(TOKEN_KEY);
  },

  setToken(token: string) {
    Cookies.set(TOKEN_KEY, token, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });
  },

  removeToken() {
    Cookies.remove(TOKEN_KEY);
  },

  isAuthenticated() {
    return !!Cookies.get(TOKEN_KEY);
  },
};