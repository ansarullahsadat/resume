export type SectionType =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "social";

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  url: string;
  description: string;
  technologies: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  order: number;
  content: Record<string, unknown>;
}

export type TemplateId =
  | "minimal"
  | "professional"
  | "modern"
  | "creative"
  | "ats-friendly"
  | "executive";

export interface ResumeStyle {
  accentColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  sectionSpacing: number;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  social: SocialLink[];
  sections: ResumeSection[];
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  template_id: TemplateId;
  status: "draft" | "published";
  data: ResumeData;
  style: ResumeStyle;
  created_at: string;
  updated_at: string;
}

export const DEFAULT_STYLE: ResumeStyle = {
  accentColor: "#2563eb",
  fontFamily: "Inter",
  fontSize: 14,
  lineHeight: 1.5,
  sectionSpacing: 16,
};

export const DEFAULT_SECTIONS: ResumeSection[] = [
  { id: "personal", type: "personal", title: "Personal Information", visible: true, order: 0, content: {} },
  { id: "summary", type: "summary", title: "About / Summary", visible: true, order: 1, content: {} },
  { id: "experience", type: "experience", title: "Work Experience", visible: true, order: 2, content: {} },
  { id: "education", type: "education", title: "Education", visible: true, order: 3, content: {} },
  { id: "skills", type: "skills", title: "Skills", visible: true, order: 4, content: {} },
  { id: "projects", type: "projects", title: "Projects", visible: true, order: 5, content: {} },
  { id: "certifications", type: "certifications", title: "Certifications", visible: true, order: 6, content: {} },
  { id: "languages", type: "languages", title: "Languages", visible: true, order: 7, content: {} },
  { id: "social", type: "social", title: "Social Links", visible: true, order: 8, content: {} },
];

export function createDefaultResumeData(): ResumeData {
  return {
    personal: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    social: [],
    sections: DEFAULT_SECTIONS.map((s) => ({ ...s })),
  };
}
