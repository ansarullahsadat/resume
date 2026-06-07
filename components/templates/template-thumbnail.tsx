"use client";

import { ScaledResumePreview } from "@/components/templates/scaled-resume-preview";
import { SAMPLE_RESUME_DATA } from "@/lib/templates/sample-resume-data";
import { DEFAULT_STYLE } from "@/types/resume";
import type { TemplateId } from "@/types/resume";
import { cn } from "@/lib/utils";

interface TemplateThumbnailProps {
  templateId: TemplateId;
  accentColor?: string;
  className?: string;
  selected?: boolean;
}

export function TemplateThumbnail({
  templateId,
  accentColor = "#2563eb",
  className,
  selected,
}: TemplateThumbnailProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border bg-white aspect-[3/4] w-full shadow-sm",
        selected && "ring-2 ring-primary ring-offset-1 ring-offset-background",
        className
      )}
    >
      <ScaledResumePreview
        data={SAMPLE_RESUME_DATA}
        style={{ ...DEFAULT_STYLE, accentColor }}
        templateId={templateId}
        mode="thumbnail"
        maxScale={1}
      />
    </div>
  );
}
