"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function parseAuthParams(): URLSearchParams {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }

  const fromQuery = new URLSearchParams(window.location.search);
  const fromHash = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  const merged = new URLSearchParams(fromQuery);
  fromHash.forEach((value, key) => {
    if (!merged.has(key)) merged.set(key, value);
  });
  return merged;
}

/** Sends Supabase auth hash/query errors to forgot-password; forwards recovery tokens to reset page. */
export function AuthHashHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = parseAuthParams();
    if ([...params.keys()].length === 0) return;

    const error = params.get("error");
    const errorCode = params.get("error_code");
    const accessToken = params.get("access_token");
    const type = params.get("type");

    if (error === "access_denied") {
      window.history.replaceState(null, "", pathname);
      if (errorCode === "otp_expired") {
        router.replace("/forgot-password?error=expired");
      } else {
        router.replace("/forgot-password?error=invalid");
      }
      return;
    }

    if (accessToken && type === "recovery" && !pathname.startsWith("/reset-password")) {
      router.replace(`/reset-password${window.location.hash}`);
    }
  }, [pathname, router]);

  return null;
}
