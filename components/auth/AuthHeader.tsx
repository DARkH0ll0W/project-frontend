// components/auth/AuthHeader.tsx

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-2 text-sm text-white">
        {subtitle}
      </p>
    </div>
  );
}