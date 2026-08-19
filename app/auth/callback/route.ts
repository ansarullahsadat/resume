import { NextResponse, type NextRequest } from "next/server";
import {
  createRouteHandlerClient,
  getRedirectOrigin,
  safeRedirectPath,
} from "@/lib/supabase/route-handler";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const origin = getRedirectOrigin(request);
  const next = safeRedirectPath(searchParams.get("next"), "/dashboard");

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`);
    const supabase = createRouteHandlerClient(request, response);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
