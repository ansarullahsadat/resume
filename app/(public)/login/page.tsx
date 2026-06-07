import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your ResumeForge account",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center px-3 sm:px-4 py-8 sm:py-12 w-full max-w-full">
      <Suspense fallback={<div className="animate-pulse h-96 w-full max-w-md bg-muted rounded-xl" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
