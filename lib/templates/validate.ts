import { TEMPLATES } from "@/lib/templates/config";
import type { TemplateId } from "@/types/resume";

export const TEMPLATE_IDS = TEMPLATES.map((t) => t.id) as TemplateId[];

export function isValidTemplateId(id: string): id is TemplateId {
  return TEMPLATE_IDS.includes(id as TemplateId);
}

export function normalizeTemplateId(id: string | null | undefined): TemplateId {
  if (id && isValidTemplateId(id)) return id;
  return "minimal";
}
