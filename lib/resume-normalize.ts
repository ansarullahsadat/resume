import type { ResumeData, ResumeSection } from "@/types/resume";
import { DEFAULT_SECTIONS, createDefaultResumeData } from "@/types/resume";

function mergeSections(sections?: ResumeSection[]): ResumeSection[] {
  const existing = sections ?? [];
  const merged = DEFAULT_SECTIONS.map((def, index) => {
    const found = existing.find((s) => s.type === def.type);
    if (found) {
      return {
        ...def,
        ...found,
        type: def.type,
        title: found.title || def.title,
        order: typeof found.order === "number" ? found.order : index,
      };
    }
    return { ...def, order: index };
  });
  return merged.sort((a, b) => a.order - b.order);
}

/** Ensures resume data has all sections and fields required for a correct preview. */
export function normalizeResumeData(
  data: Partial<ResumeData> | null | undefined
): ResumeData {
  const defaults = createDefaultResumeData();
  if (!data) return defaults;

  return {
    ...defaults,
    ...data,
    personal: { ...defaults.personal, ...data.personal },
    summary: data.summary ?? "",
    experience: data.experience ?? [],
    education: data.education ?? [],
    skills: data.skills ?? [],
    projects: data.projects ?? [],
    certifications: data.certifications ?? [],
    languages: data.languages ?? [],
    social: data.social ?? [],
    sections: mergeSections(data.sections),
  };
}

export function getSectionTitles(data: ResumeData): Record<string, string> {
  return Object.fromEntries(data.sections.map((s) => [s.type, s.title]));
}

export function isPersonalVisible(data: ResumeData): boolean {
  return data.sections.some((s) => s.type === "personal" && s.visible);
}
