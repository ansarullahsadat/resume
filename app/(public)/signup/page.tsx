import type { Metadata } from "next";
import { Suspense } from "react";
import { SignupForm } from "@/features/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your free ResumeForge account",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center px-3 sm:px-4 py-8 sm:py-12 w-full max-w-full">
      <Suspense fallback={<div className="animate-pulse h-96 w-full max-w-md bg-muted rounded-xl" />}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
