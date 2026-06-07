"use client";

import type { ResumeData, ResumeStyle } from "@/types/resume";
import { ResumePage, PersonalHeader, renderSection } from "./shared-sections";

interface Props {
  data: ResumeData;
  style: ResumeStyle;
  sectionOrder: string[];
  sectionTitles: Record<string, string>;
  showPersonal: boolean;
  className?: string;
}

export function MinimalTemplate({
  data,
  style,
  sectionOrder,
  sectionTitles,
  showPersonal,
  className,
}: Props) {
  const ctx = { data, style, sectionTitles };

  return (
    <ResumePage className={className} style={style}>
      {showPersonal && <PersonalHeader {...ctx} layout="center" />}
      {sectionOrder.map((type) => {
        if (type === "personal") return null;
        return <div key={type}>{renderSection(type, ctx)}</div>;
      })}
    </ResumePage>
  );
}
