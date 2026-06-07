import type { Resume, ResumeData, ResumeStyle, TemplateId } from "@/types/resume";
import { DEFAULT_STYLE } from "@/types/resume";
import { normalizeResumeData } from "@/lib/resume-normalize";

export interface ResumeRow {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  status: string;
  data: unknown;
  style: unknown;
  created_at: string;
  updated_at: string;
}

export function mapRowToResume(row: ResumeRow): Resume {
  return {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    template_id: (row.template_id as TemplateId) || "minimal",
    status: (row.status as "draft" | "published") || "draft",
    data: normalizeResumeData(row.data as ResumeData),
    style: { ...DEFAULT_STYLE, ...(row.style as Partial<ResumeStyle>) },
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
