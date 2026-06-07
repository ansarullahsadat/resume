"use client";

import { useResumeStore } from "@/store/resume-store";
import { ResumeRenderer } from "@/components/templates/resume-renderer";

/** Full-size, off-screen resume used for PDF export and print (not the scaled preview). */
export function ResumeExportTarget() {
  const { resume } = useResumeStore();
  if (!resume) return null;

  return (
    <div
      id="resume-export"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-50 bg-white opacity-0"
      style={{ width: "210mm" }}
    >
      <ResumeRenderer
        data={resume.data}
        style={resume.style}
        templateId={resume.template_id}
      />
    </div>
  );
}
