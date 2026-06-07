"use client";

import type { ResumeData, ResumeStyle, TemplateId } from "@/types/resume";
import {
  getSectionTitles,
  isPersonalVisible,
  normalizeResumeData,
} from "@/lib/resume-normalize";
import { MinimalTemplate } from "./minimal-template";
import { ProfessionalTemplate } from "./professional-template";
import { ModernTemplate } from "./modern-template";
import { CreativeTemplate } from "./creative-template";
import { AtsFriendlyTemplate } from "./ats-friendly-template";
import { ExecutiveTemplate } from "./executive-template";

interface ResumeRendererProps {
  data: ResumeData;
  style: ResumeStyle;
  templateId: TemplateId;
  className?: string;
}

export function ResumeRenderer({ data, style, templateId, className }: ResumeRendererProps) {
  const normalizedData = normalizeResumeData(data);
  const sortedSections = [...normalizedData.sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const sectionOrder = sortedSections.map((s) => s.type);
  const sectionTitles = getSectionTitles(normalizedData);
  const showPersonal = isPersonalVisible(normalizedData);

  const props = {
    data: normalizedData,
    style,
    className,
    sectionOrder,
    sectionTitles,
    showPersonal,
  };

  switch (templateId) {
    case "professional":
      return <ProfessionalTemplate {...props} />;
    case "modern":
      return <ModernTemplate {...props} />;
    case "creative":
      return <CreativeTemplate {...props} />;
    case "ats-friendly":
      return <AtsFriendlyTemplate {...props} />;
    case "executive":
      return <ExecutiveTemplate {...props} />;
    default:
      return <MinimalTemplate {...props} />;
  }
}
