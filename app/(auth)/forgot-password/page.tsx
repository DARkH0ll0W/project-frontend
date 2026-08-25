// app/(auth)/forgot-password/page.tsx

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";

export default function ForgotPasswordPage() {
  return (
    <AuthCard>
      <AuthHeader
        title="Forgot Password"
        subtitle="Enter your email address"
      />

      <form className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-3 text-white hover:font-bold cursor-pointer hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
        >
          Send Reset Link
        </button>
      </form>
    </AuthCard>
  );
}