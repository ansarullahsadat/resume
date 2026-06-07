"use client";

import type { ResumeData, ResumeStyle } from "@/types/resume";
import { cn } from "@/lib/utils";
import { ResumePage, PersonalHeader, renderSection } from "./shared-sections";

interface Props {
  data: ResumeData;
  style: ResumeStyle;
  sectionOrder: string[];
  sectionTitles: Record<string, string>;
  showPersonal: boolean;
  className?: string;
}

export function ExecutiveTemplate({
  data,
  style,
  sectionOrder,
  sectionTitles,
  showPersonal,
  className,
}: Props) {
  const ctx = { data, style, sectionTitles };
  const executiveStyle: ResumeStyle = {
    ...style,
    fontFamily: style.fontFamily === "Inter" ? "Georgia" : style.fontFamily,
  };

  return (
    <ResumePage className={cn("[&_*]:tracking-normal", className)} style={executiveStyle}>
      {showPersonal && (
        <div className="border-b-2 border-stone-800 pb-5 mb-6">
          <PersonalHeader {...ctx} layout="left" style={executiveStyle} />
        </div>
      )}
      {sectionOrder
        .filter((t) => t !== "personal")
        .map((type) => (
          <div
            key={type}
            className="[&_h3]:normal-case [&_h3]:text-base [&_h3]:font-semibold [&_h3]:border-stone-800 [&_h3]:text-stone-800"
          >
            {renderSection(type, { ...ctx, style: executiveStyle })}
          </div>
        ))}
    </ResumePage>
  );
}
