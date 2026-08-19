/** Origin from an incoming HTTP request (works on Vercel with zero env vars). */
export function getRequestOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (forwardedHost) {
    const host = forwardedHost.split(",")[0]?.trim();
    if (host) return `${forwardedProto}://${host}`;
  }

  return new URL(request.url).origin;
}

/** Fallback app URL when no request is available (local dev or background jobs). */
export function getServerAppUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv && !fromEnv.includes("localhost")) {
    return fromEnv;
  }

  // Vercel injects this automatically — no dashboard config required
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

export function getAuthCallbackUrl(next = "/reset-password", origin?: string): string {
  const base = (origin ?? getServerAppUrl()).replace(/\/$/, "");
  return `${base}/auth/callback?next=${encodeURIComponent(next)}`;
}

/** Preferred redirect for password-reset emails (Supabase appends token_hash). */
export function getAuthConfirmUrl(next = "/reset-password", origin?: string): string {
  const base = (origin ?? getServerAppUrl()).replace(/\/$/, "");
  return `${base}/auth/confirm?next=${encodeURIComponent(next)}`;
}
