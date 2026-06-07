"use client";

import type { ResumeData, ResumeStyle } from "@/types/resume";
import { cn } from "@/lib/utils";
import { ResumePage, renderSection } from "./shared-sections";

const SIDEBAR_TYPES = ["skills", "languages", "social"];

interface Props {
  data: ResumeData;
  style: ResumeStyle;
  sectionOrder: string[];
  sectionTitles: Record<string, string>;
  showPersonal: boolean;
  className?: string;
}

export function ModernTemplate({
  data,
  style,
  sectionOrder,
  sectionTitles,
  showPersonal,
  className,
}: Props) {
  const ctx = { data, style, sectionTitles };
  const sidebarCtx = { ...ctx, variant: "inverted" as const };
  const { personal } = data;
  const contact = [personal.email, personal.phone, personal.location, personal.website].filter(
    Boolean
  );

  const sidebarTypes = sectionOrder.filter((t) => SIDEBAR_TYPES.includes(t));
  const mainTypes = sectionOrder.filter(
    (t) => t !== "personal" && !SIDEBAR_TYPES.includes(t)
  );

  return (
    <ResumePage className={cn("p-0 overflow-hidden flex flex-col", className)} style={style}>
      <div className="flex flex-1 min-h-0">
        <aside
          className="w-[34%] shrink-0 p-[12mm] text-white"
          style={{ backgroundColor: style.accentColor }}
        >
          {showPersonal && (
            <header className="mb-6">
              <h1 className="text-2xl font-bold">{personal.fullName || "Your Name"}</h1>
              {personal.title && <p className="text-sm opacity-90 mt-2">{personal.title}</p>}
              <div className="mt-4 space-y-1 text-xs opacity-85">
                {contact.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </header>
          )}
          {sidebarTypes.map((type) => (
            <div key={type}>{renderSection(type, sidebarCtx)}</div>
          ))}
        </aside>
        <main className="flex-1 p-[15mm] min-w-0">
          {mainTypes.map((type) => (
            <div key={type}>{renderSection(type, ctx)}</div>
          ))}
        </main>
      </div>
    </ResumePage>
  );
}
