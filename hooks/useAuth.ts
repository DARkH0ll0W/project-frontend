// hooks/useAuth.ts

"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import api from "@/lib/axios";
import { auth } from "@/lib/auth";

import {
  setLoading,
  setUser,
  logout,
} from "@/store/authSlice";

import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();

  const login = async (
    payload: LoginPayload
  ) => {
    try {
      dispatch(setLoading(true));

      const { data } =
        await api.post<AuthResponse>(
          "/auth/login/",
          payload
        );
      console.log("Login success", data);
      auth.setToken(data.access);

      dispatch(setUser(data.user));

      router.replace("/dashboard");
      router.refresh();

    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (
  payload: RegisterPayload
) => {
  try {
    dispatch(setLoading(true));

    const { data } =
      await api.post<AuthResponse>(
        "/auth/register/",
        payload
      );

    auth.setToken(data.access);

    dispatch(setUser(data.user));

    router.replace("/dashboard");
    router.refresh();

  } catch (error: any) {
    console.error(
      "Register error:",
      error.response?.data
    );
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

  const signOut = async () => {
    auth.removeToken();

    dispatch(logout());

    router.replace("/login");
    router.refresh();
  };

  return {
    login,
    register,
    signOut,
  };
}