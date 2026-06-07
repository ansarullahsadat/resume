"use client";

import { useEffect, useRef, useCallback } from "react";
import { useResumeStore } from "@/store/resume-store";
import { toast } from "sonner";

export function useAutoSave(resumeId: string, debounceMs = 2000) {
  const { resume, isDirty, setIsSaving, setLastSaved, setIsDirty } = useResumeStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const save = useCallback(async () => {
    if (!resume || !isDirty) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/resumes/${resumeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: resume.title,
          template_id: resume.template_id,
          status: resume.status,
          data: resume.data,
          style: resume.style,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");
      setLastSaved(new Date());
    } catch {
      toast.error("Failed to auto-save resume");
    } finally {
      setIsSaving(false);
    }
  }, [resume, isDirty, resumeId, setIsSaving, setLastSaved]);

  useEffect(() => {
    if (!isDirty || !resume) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(save, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resume, isDirty, save, debounceMs]);

  return { save };
}
