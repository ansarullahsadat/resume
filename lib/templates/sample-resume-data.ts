import type { ResumeData } from "@/types/resume";
import { DEFAULT_SECTIONS } from "@/types/resume";
/** Rich demo content so templates always look populated in previews. */
export const SAMPLE_RESUME_DATA: ResumeData = {
  personal: {
    fullName: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
  },
  summary:
    "Results-driven engineer with 6+ years building scalable web applications. Passionate about clean code, user experience, and mentoring teams.",
  experience: [
    {
      id: "sample-exp-1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      location: "Remote",
      startDate: "2021",
      endDate: "",
      current: true,
      description:
        "Led development of a customer dashboard used by 50k+ users.\nImproved page load times by 40% through performance optimization.",
    },
    {
      id: "sample-exp-2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      location: "New York, NY",
      startDate: "2018",
      endDate: "2021",
      current: false,
      description: "Built REST APIs and React frontends for B2B SaaS product.",
    },
  ],
  education: [
    {
      id: "sample-edu-1",
      institution: "State University",
      degree: "B.S. Computer Science",
      field: "",
      startDate: "2014",
      endDate: "2018",
      description: "",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  projects: [
    {
      id: "sample-proj-1",
      name: "Open Source CLI Tool",
      url: "https://github.com",
      description: "Developer productivity tool with 2k+ GitHub stars.",
      technologies: "TypeScript, Node.js",
    },
  ],
  certifications: [],
  languages: [{ id: "sample-lang-1", name: "English", proficiency: "Native" }],
  social: [{ id: "sample-social-1", platform: "LinkedIn", url: "linkedin.com/in/alex" }],
  sections: DEFAULT_SECTIONS.map((s) => ({ ...s })),
};

export function isResumeContentEmpty(data: ResumeData): boolean {
  const { personal } = data;
  return (
    !personal.fullName?.trim() &&
    !personal.title?.trim() &&
    !data.summary?.trim() &&
    data.experience.length === 0 &&
    data.education.length === 0 &&
    data.skills.length === 0
  );
}

/** Use sample content for preview when the resume has no user content yet. */
export function getPreviewResumeData(data: ResumeData): ResumeData {
  if (!isResumeContentEmpty(data)) return data;
  return {
    ...SAMPLE_RESUME_DATA,
    sections: data.sections,
  };
}
