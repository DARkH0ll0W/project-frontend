"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      identifier: formData.get("identifier") as string,
      password: formData.get("password") as string,
    };

    console.log(payload);

    try {
      await login(payload);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="identifier"
          className="mb-2 block text-sm font-medium"
        >
          Username or Email
        </label>

        <input
          id="identifier"
          name="identifier"
          type="text"
          required
          placeholder="Username or Email"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:underline hover:font-bold"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-500 py-3 text-white hover:bg-slate-800 hover:font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
      >
        Sign In
      </button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline hover:font-bold"
        >
          Register
        </Link>
      </p>
    </form>
  );
}