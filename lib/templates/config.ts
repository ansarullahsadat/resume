import type { TemplateId } from "@/types/resume";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  colors: string[];
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple layout with plenty of white space",
    category: "Classic",
    colors: ["#171717", "#2563eb", "#059669"],
  },
  {
    id: "ats-friendly",
    name: "ATS-Friendly",
    description: "Optimized for applicant tracking systems",
    category: "ATS",
    colors: ["#000000", "#1f2937", "#374151"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate-ready design for traditional industries",
    category: "Business",
    colors: ["#1e3a5f", "#374151", "#0f766e"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with bold accent colors",
    category: "Contemporary",
    colors: ["#7c3aed", "#2563eb", "#db2777"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with personality and unique typography",
    category: "Design",
    colors: ["#ea580c", "#0891b2", "#be185d"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Polished serif-style layout for senior roles",
    category: "Executive",
    colors: ["#1c1917", "#44403c", "#78716c"],
  },
];

export const FONT_OPTIONS = [
  { value: "Inter", label: "Inter" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Roboto", label: "Roboto" },
];

export const ACCENT_COLORS = [
  "#2563eb",
  "#7c3aed",
  "#059669",
  "#db2777",
  "#ea580c",
  "#0891b2",
  "#1e3a5f",
  "#171717",
];
