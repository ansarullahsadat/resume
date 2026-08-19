/** Production app URL — set NEXT_PUBLIC_APP_URL on Vercel. */
export function getServerAppUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv && !fromEnv.includes("localhost")) {
    return fromEnv;
  }

  // Vercel sets this automatically on every deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}

/** Client-safe app URL — prefers the current live origin over a stale localhost env. */
export function getAppUrl(): string {
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

    if (origin && !origin.includes("localhost")) {
      return origin;
    }
    if (fromEnv) return fromEnv;
    return origin || "http://localhost:3000";
  }

  return getServerAppUrl();
}

export function getAuthCallbackUrl(next = "/reset-password"): string {
  return `${getServerAppUrl()}/auth/callback?next=${encodeURIComponent(next)}`;
}

/** Preferred redirect for password-reset emails (Supabase appends token_hash). */
export function getAuthConfirmUrl(next = "/reset-password"): string {
  return `${getServerAppUrl()}/auth/confirm?next=${encodeURIComponent(next)}`;
}
