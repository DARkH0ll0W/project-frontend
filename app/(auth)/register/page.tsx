// app/(auth)/register/page.tsx

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard>
      <AuthHeader
        title="Create Account"
        subtitle="Get started in minutes"
      />

      <RegisterForm />
    </AuthCard>
  );
}