// FIX: Provided full content for types.ts to resolve module errors.
export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  logo: string;
  role: string;
  period: string;
  description: string;
  tools: string[];
}

export interface CodeSample {
  name: string;
  description: string;
  tools: string[];
  sourceLink: string;
  demoLink?: string;
}

export interface WorkProject {
  name: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tools: string[];
  projectLink: string;
  githubLink?: string;
  isConfidential?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface NavLink {
    href: string;
    label: string;
    sublinks?: NavLink[];
}