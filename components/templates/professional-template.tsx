"use client";

import type { ResumeData, ResumeStyle } from "@/types/resume";
import { ResumePage, PersonalHeader, renderSection } from "./shared-sections";

const SIDEBAR_TYPES = ["skills", "languages", "social", "certifications"];

interface Props {
  data: ResumeData;
  style: ResumeStyle;
  sectionOrder: string[];
  sectionTitles: Record<string, string>;
  showPersonal: boolean;
  className?: string;
}

export function ProfessionalTemplate({
  data,
  style,
  sectionOrder,
  sectionTitles,
  showPersonal,
  className,
}: Props) {
  const ctx = { data, style, sectionTitles };
  const mainTypes = sectionOrder.filter(
    (t) => t !== "personal" && !SIDEBAR_TYPES.includes(t)
  );
  const sidebarTypes = sectionOrder.filter((t) => SIDEBAR_TYPES.includes(t));

  return (
    <ResumePage className={className} style={style}>
      <div
        className="h-2 -mx-[15mm] -mt-[15mm] mb-6"
        style={{ backgroundColor: style.accentColor }}
      />
      {showPersonal && <PersonalHeader {...ctx} layout="left" />}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-1">
          {mainTypes.map((type) => (
            <div key={type}>{renderSection(type, ctx)}</div>
          ))}
        </div>
        {sidebarTypes.length > 0 && (
          <div className="space-y-1">
            {sidebarTypes.map((type) => (
              <div key={type}>{renderSection(type, ctx)}</div>
            ))}
          </div>
        )}
      </div>
    </ResumePage>
  );
}
