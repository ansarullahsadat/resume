"use client";

import type { ResumeData, ResumeStyle } from "@/types/resume";
import { cn } from "@/lib/utils";
import { getResumeFontStack } from "@/lib/resume-fonts";

export type SectionVariant = "default" | "inverted";

export interface SectionRenderContext {
  data: ResumeData;
  style: ResumeStyle;
  sectionTitles: Record<string, string>;
  variant?: SectionVariant;
}

interface SectionProps extends SectionRenderContext {
  title?: string;
}

export function ResumePage({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: ResumeStyle;
}) {
  return (
    <div
      data-resume-page
      className={cn(
        "bg-white text-gray-900 w-[210mm] min-h-[297mm] p-[15mm] box-border shadow-sm shrink-0",
        className
      )}
      style={{
        fontFamily: getResumeFontStack(style?.fontFamily || "Inter"),
        fontSize: `${style?.fontSize || 14}px`,
        lineHeight: style?.lineHeight || 1.5,
      }}
    >
      {children}
    </div>
  );
}

export function PersonalHeader({
  data,
  style,
  layout = "center",
}: SectionProps & { layout?: "center" | "left" | "sidebar" }) {
  const { personal } = data;
  const contact = [personal.email, personal.phone, personal.location, personal.website].filter(
    Boolean
  );

  if (layout === "sidebar") {
    return (
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-white">{personal.fullName || "Your Name"}</h1>
        <p className="text-sm opacity-90 mt-1">
          {personal.title || "Your Professional Title"}
        </p>
        <div className="mt-4 space-y-1 text-xs opacity-80">
          {contact.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </header>
    );
  }

  return (
    <header className={cn("mb-6", layout === "center" && "text-center")}>
      <h1
        className="text-3xl font-bold tracking-tight"
        style={{ color: style.accentColor }}
      >
        {personal.fullName || "Your Name"}
      </h1>
      <p className="text-lg text-gray-600 mt-1">
        {personal.title || "Your Professional Title"}
      </p>
      {contact.length > 0 && (
        <div
          className={cn(
            "flex flex-wrap gap-3 mt-3 text-sm text-gray-500",
            layout === "center" && "justify-center"
          )}
        >
          {contact.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      )}
    </header>
  );
}

export function SummarySection({ data, style, sectionTitles, variant }: SectionProps) {
  if (!data.summary) return null;
  const title = sectionTitles.summary || "About";
  return (
    <Section title={title} style={style} variant={variant}>
      <p
        className={cn(
          "whitespace-pre-wrap",
          variant === "inverted" ? "text-white/90" : "text-gray-700"
        )}
      >
        {data.summary}
      </p>
    </Section>
  );
}

export function ExperienceSection({ data, style, sectionTitles, variant }: SectionProps) {
  if (!data.experience.length) return null;
  const title = sectionTitles.experience || "Experience";
  return (
    <Section title={title} style={style} variant={variant}>
      <div className="flex flex-col" style={{ gap: `${style.sectionSpacing}px` }}>
        {data.experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start flex-wrap gap-1">
              <div>
                <h4
                  className={cn(
                    "font-semibold",
                    variant === "inverted" ? "text-white" : "text-gray-900"
                  )}
                >
                  {exp.position}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: variant === "inverted" ? "rgba(255,255,255,0.85)" : style.accentColor }}
                >
                  {exp.company}
                </p>
              </div>
              <span
                className={cn(
                  "text-sm",
                  variant === "inverted" ? "text-white/70" : "text-gray-500"
                )}
              >
                {exp.startDate} – {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            {exp.location && (
              <p
                className={cn(
                  "text-xs",
                  variant === "inverted" ? "text-white/60" : "text-gray-500"
                )}
              >
                {exp.location}
              </p>
            )}
            {exp.description && (
              <p
                className={cn(
                  "mt-2 text-sm whitespace-pre-wrap",
                  variant === "inverted" ? "text-white/85" : "text-gray-700"
                )}
              >
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

export function EducationSection({ data, style, sectionTitles, variant }: SectionProps) {
  if (!data.education.length) return null;
  const title = sectionTitles.education || "Education";
  return (
    <Section title={title} style={style} variant={variant}>
      {data.education.map((edu) => (
        <div key={edu.id} className="mb-3 last:mb-0">
          <h4
            className={cn(
              "font-semibold",
              variant === "inverted" ? "text-white" : "text-gray-900"
            )}
          >
            {edu.degree}
            {edu.field ? ` in ${edu.field}` : ""}
          </h4>
          <p
            className="text-sm"
            style={{ color: variant === "inverted" ? "rgba(255,255,255,0.85)" : style.accentColor }}
          >
            {edu.institution}
          </p>
          <p
            className={cn(
              "text-xs",
              variant === "inverted" ? "text-white/60" : "text-gray-500"
            )}
          >
            {edu.startDate} – {edu.endDate}
          </p>
          {edu.description && (
            <p
              className={cn(
                "text-sm mt-1 whitespace-pre-wrap",
                variant === "inverted" ? "text-white/85" : "text-gray-600"
              )}
            >
              {edu.description}
            </p>
          )}
        </div>
      ))}
    </Section>
  );
}

export function SkillsSection({ data, style, sectionTitles, variant }: SectionProps) {
  if (!data.skills.length) return null;
  const title = sectionTitles.skills || "Skills";
  const inverted = variant === "inverted";
  return (
    <Section title={title} style={style} variant={variant}>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-sm"
            style={
              inverted
                ? { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }
                : { backgroundColor: `${style.accentColor}15`, color: style.accentColor }
            }
          >
            {skill}
          </span>
        ))}
      </div>
    </Section>
  );
}

export function ProjectsSection({ data, style, sectionTitles, variant }: SectionProps) {
  if (!data.projects.length) return null;
  const title = sectionTitles.projects || "Projects";
  return (
    <Section title={title} style={style} variant={variant}>
      {data.projects.map((project) => (
        <div key={project.id} className="mb-3 last:mb-0">
          <h4 className="font-semibold">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: variant === "inverted" ? "#fff" : style.accentColor }}
              >
                {project.name}
              </a>
            ) : (
              <span className={variant === "inverted" ? "text-white" : undefined}>
                {project.name}
              </span>
            )}
          </h4>
          {project.technologies && (
            <p
              className={cn(
                "text-xs",
                variant === "inverted" ? "text-white/60" : "text-gray-500"
              )}
            >
              {project.technologies}
            </p>
          )}
          {project.description && (
            <p
              className={cn(
                "text-sm mt-1 whitespace-pre-wrap",
                variant === "inverted" ? "text-white/85" : "text-gray-700"
              )}
            >
              {project.description}
            </p>
          )}
        </div>
      ))}
    </Section>
  );
}

export function CertificationsSection({ data, style, sectionTitles, variant }: SectionProps) {
  if (!data.certifications.length) return null;
  const title = sectionTitles.certifications || "Certifications";
  return (
    <Section title={title} style={style} variant={variant}>
      {data.certifications.map((cert) => (
        <div key={cert.id} className="mb-2 last:mb-0">
          <h4
            className={cn(
              "font-semibold text-sm",
              variant === "inverted" ? "text-white" : undefined
            )}
          >
            {cert.name}
          </h4>
          <p
            className={cn(
              "text-xs",
              variant === "inverted" ? "text-white/60" : "text-gray-500"
            )}
          >
            {cert.issuer} · {cert.date}
          </p>
        </div>
      ))}
    </Section>
  );
}

export function LanguagesSection({ data, style, sectionTitles, variant }: SectionProps) {
  if (!data.languages.length) return null;
  const title = sectionTitles.languages || "Languages";
  return (
    <Section title={title} style={style} variant={variant}>
      <div className="flex flex-wrap gap-4">
        {data.languages.map((lang) => (
          <div key={lang.id}>
            <span
              className={cn(
                "font-medium text-sm",
                variant === "inverted" ? "text-white" : undefined
              )}
            >
              {lang.name}
            </span>
            <span
              className={cn(
                "text-xs ml-2",
                variant === "inverted" ? "text-white/60" : "text-gray-500"
              )}
            >
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function SocialSection({ data, style, sectionTitles, variant }: SectionProps) {
  if (!data.social.length) return null;
  const title = sectionTitles.social || "Links";
  return (
    <Section title={title} style={style} variant={variant}>
      <div className="flex flex-col gap-1">
        {data.social.map((link) => (
          <a
            key={link.id}
            href={link.url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-sm hover:underline",
              variant === "inverted" ? "text-white/90" : undefined
            )}
            style={variant === "inverted" ? undefined : { color: style.accentColor }}
          >
            {link.platform}
            {link.url ? `: ${link.url}` : ""}
          </a>
        ))}
      </div>
    </Section>
  );
}

function Section({
  title,
  children,
  style,
  variant = "default",
}: {
  title: string;
  children: React.ReactNode;
  style: ResumeStyle;
  variant?: SectionVariant;
}) {
  const inverted = variant === "inverted";
  return (
    <section style={{ marginBottom: `${style.sectionSpacing}px` }}>
      <h3
        className={cn(
          "text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2",
          inverted && "text-white border-white/40"
        )}
        style={
          inverted
            ? undefined
            : { borderColor: style.accentColor, color: style.accentColor }
        }
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

export function renderSection(type: string, ctx: SectionRenderContext) {
  switch (type) {
    case "summary":
      return <SummarySection {...ctx} />;
    case "experience":
      return <ExperienceSection {...ctx} />;
    case "education":
      return <EducationSection {...ctx} />;
    case "skills":
      return <SkillsSection {...ctx} />;
    case "languages":
      return <LanguagesSection {...ctx} />;
    case "social":
      return <SocialSection {...ctx} />;
    case "projects":
      return <ProjectsSection {...ctx} />;
    case "certifications":
      return <CertificationsSection {...ctx} />;
    default:
      return null;
  }
}
