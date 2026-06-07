import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createDefaultResumeData, DEFAULT_STYLE } from "@/types/resume";
import { TEMPLATES } from "@/lib/templates/config";
import { normalizeTemplateId } from "@/lib/templates/validate";
import type { Json } from "@/types/database";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const title = body.title || "Untitled Resume";
  const templateId = normalizeTemplateId(body.template_id);
  const template = TEMPLATES.find((t) => t.id === templateId);
  const style = {
    ...DEFAULT_STYLE,
    accentColor: template?.colors[0] ?? DEFAULT_STYLE.accentColor,
  };

  const { data, error } = await supabase
    .from("resumes")
    .insert({
      user_id: user.id,
      title,
      template_id: templateId,
      status: "draft",
      data: createDefaultResumeData() as unknown as Json,
      style: style as unknown as Json,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
