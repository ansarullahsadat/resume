"use client";

import type { ResumeData, ResumeStyle } from "@/types/resume";
import { ResumePage, renderSection } from "./shared-sections";

interface Props {
  data: ResumeData;
  style: ResumeStyle;
  sectionOrder: string[];
  sectionTitles: Record<string, string>;
  showPersonal: boolean;
  className?: string;
}

export function AtsFriendlyTemplate({
  data,
  style,
  sectionOrder,
  sectionTitles,
  showPersonal,
  className,
}: Props) {
  const { personal } = data;

  const atsStyle: ResumeStyle = {
    ...style,
    accentColor: "#000000",
    fontFamily: "Arial",
    fontSize: 12,
  };

  const ctx = { data, style: atsStyle, sectionTitles };

  return (
    <ResumePage className={className} style={atsStyle}>
      {showPersonal && (
        <header className="mb-4 border-b border-black pb-3">
          <h1 className="text-xl font-bold">{personal.fullName || "Your Name"}</h1>
          {personal.title && <p className="text-sm">{personal.title}</p>}
          <p className="text-xs mt-1">
            {[personal.email, personal.phone, personal.location, personal.website]
              .filter(Boolean)
              .join(" | ")}
          </p>
        </header>
      )}
      {sectionOrder
        .filter((t) => t !== "personal")
        .map((type) => (
          <div
            key={type}
            className="[&_h3]:text-black [&_h3]:border-black [&_h3]:text-xs [&_span]:rounded-none [&_span]:bg-transparent [&_span]:text-black [&_span]:border [&_span]:border-gray-300 [&_span]:px-2"
          >
            {renderSection(type, ctx)}
          </div>
        ))}
    </ResumePage>
  );
}
