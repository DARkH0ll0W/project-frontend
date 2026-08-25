"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterForm() {
  const { register } = useAuth();

  const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const payload = {
        full_name: formData.get("fullName") as string,
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirm_password: formData.get(
          "confirmPassword"
        ) as string,
      };

      if (
        payload.password !==
        payload.confirm_password
      ) {
        alert("Passwords do not match");
        return;
      }

      try {
        await register(payload);
      } catch (err: any) {
        console.error(
          "Registration failed:",
          err.response?.data || err
        );
      }
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          name="fullName"
          type="text"
          required
          placeholder="John Doe"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">
          User Name
        </label>

        <input
          name="username"
          type="text"
          required
          placeholder="Enter username"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          name="password"
          type="password"
          required
          placeholder="********"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Confirm Password
        </label>

        <input
          name="confirmPassword"
          type="password"
          required
          placeholder="********"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-500 py-3 text-white hover:font-bold cursor-pointer hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
      >
        Create Account
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline hover:font-bold"
        >
          Login
        </Link>
      </p>
    </form>
  );
}