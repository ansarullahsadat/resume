import { create } from "zustand";
import type {
  Resume,
  ResumeData,
  ResumeStyle,
  ResumeSection,
  TemplateId,
} from "@/types/resume";
import { createDefaultResumeData, DEFAULT_STYLE } from "@/types/resume";

interface ResumeStore {
  resume: Resume | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  previewZoom: number;
  activeSection: string | null;

  setResume: (resume: Resume) => void;
  updateTitle: (title: string) => void;
  updateTemplate: (templateId: TemplateId) => void;
  updateData: (data: Partial<ResumeData>) => void;
  updateStyle: (style: Partial<ResumeStyle>) => void;
  updateSections: (sections: ResumeSection[]) => void;
  setActiveSection: (sectionId: string | null) => void;
  setPreviewZoom: (zoom: number) => void;
  setIsSaving: (saving: boolean) => void;
  setLastSaved: (date: Date) => void;
  setIsDirty: (dirty: boolean) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: null,
  isDirty: false,
  isSaving: false,
  lastSaved: null,
  previewZoom: 50,
  activeSection: "personal",

  setResume: (resume) => set({ resume, isDirty: false }),
  updateTitle: (title) =>
    set((state) => ({
      resume: state.resume ? { ...state.resume, title } : null,
      isDirty: true,
    })),
  updateTemplate: (templateId) =>
    set((state) => ({
      resume: state.resume ? { ...state.resume, template_id: templateId } : null,
      isDirty: true,
    })),
  updateData: (data) =>
    set((state) => ({
      resume: state.resume
        ? { ...state.resume, data: { ...state.resume.data, ...data } }
        : null,
      isDirty: true,
    })),
  updateStyle: (style) =>
    set((state) => ({
      resume: state.resume
        ? { ...state.resume, style: { ...state.resume.style, ...style } }
        : null,
      isDirty: true,
    })),
  updateSections: (sections) =>
    set((state) => ({
      resume: state.resume
        ? { ...state.resume, data: { ...state.resume.data, sections } }
        : null,
      isDirty: true,
    })),
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
  setPreviewZoom: (zoom) => set({ previewZoom: zoom }),
  setIsSaving: (saving) => set({ isSaving: saving }),
  setLastSaved: (date) => set({ lastSaved: date, isDirty: false }),
  setIsDirty: (dirty) => set({ isDirty: dirty }),
  reset: () =>
    set({
      resume: null,
      isDirty: false,
      isSaving: false,
      lastSaved: null,
      previewZoom: 50,
      activeSection: "personal",
    }),
}));

export function createEmptyResume(userId: string): Omit<Resume, "created_at" | "updated_at"> {
  return {
    id: crypto.randomUUID(),
    user_id: userId,
    title: "Untitled Resume",
    template_id: "minimal",
    status: "draft",
    data: createDefaultResumeData(),
    style: { ...DEFAULT_STYLE },
  };
}
