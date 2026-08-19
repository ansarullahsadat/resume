import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import {
  createRouteHandlerClient,
  getRedirectOrigin,
  safeRedirectPath,
} from "@/lib/supabase/route-handler";

/** Handles password-reset links from Supabase emails (?token_hash=&type=recovery). */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const origin = getRedirectOrigin(request);
  const next = safeRedirectPath(searchParams.get("next"), "/reset-password");

  if (token_hash && type) {
    const response = NextResponse.redirect(`${origin}${next}`);
    const supabase = createRouteHandlerClient(request, response);
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (!error) {
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=invalid_reset_link`);
}
