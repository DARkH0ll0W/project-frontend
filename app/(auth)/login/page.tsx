// app/(auth)/login/page.tsx

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard>
      <AuthHeader
        title="Welcome Back"
        subtitle="Login to continue"
      />

      <LoginForm />
    </AuthCard>
  );
}