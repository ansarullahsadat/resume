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

export function CreativeTemplate({
  data,
  style,
  sectionOrder,
  sectionTitles,
  showPersonal,
  className,
}: Props) {
  const ctx = { data, style, sectionTitles };
  const { personal } = data;

  return (
    <ResumePage className={className} style={style}>
      {showPersonal && (
        <header className="relative mb-8 pb-6">
          <div
            className="absolute -left-4 top-0 w-1 h-full rounded-full"
            style={{ backgroundColor: style.accentColor }}
          />
          <h1
            className="text-4xl font-black tracking-tight"
            style={{ color: style.accentColor }}
          >
            {personal.fullName || "Your Name"}
          </h1>
          {personal.title && (
            <p className="text-xl text-gray-500 mt-2 font-light italic">{personal.title}</p>
          )}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
            {[personal.email, personal.phone, personal.location, personal.website]
              .filter(Boolean)
              .map((item, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: style.accentColor }}
                  />
                  {item}
                </span>
              ))}
          </div>
        </header>
      )}
      {sectionOrder
        .filter((t) => t !== "personal")
        .map((type) => (
          <div
            key={type}
            className="[&_h3]:normal-case [&_h3]:text-base [&_h3]:font-black"
          >
            {renderSection(type, ctx)}
          </div>
        ))}
    </ResumePage>
  );
}
