import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { EditorClient } from "@/features/editor/editor-client";
import type { Resume, ResumeData, ResumeStyle } from "@/types/resume";
import { DEFAULT_STYLE } from "@/types/resume";
import { normalizeResumeData } from "@/lib/resume-normalize";
import { normalizeTemplateId } from "@/lib/templates/validate";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: row, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single<{
      id: string;
      user_id: string;
      title: string;
      template_id: string;
      status: string;
      data: ResumeData;
      style: ResumeStyle;
      created_at: string;
      updated_at: string;
    }>();

  if (error || !row) notFound();

  const resume: Resume = {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    template_id: normalizeTemplateId(row.template_id),
    status: (row.status as "draft" | "published") || "draft",
    data: normalizeResumeData(row.data),
    style: { ...DEFAULT_STYLE, ...row.style },
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  return <EditorClient initialResume={resume} />;
}
