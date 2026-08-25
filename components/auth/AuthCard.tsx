// components/auth/AuthCard.tsx

import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border bg-opacity-25 bg-white p-8 shadow-lg bg-hero2 bg-cover bg-center text-white">
      {children}
    </div>
  );
}