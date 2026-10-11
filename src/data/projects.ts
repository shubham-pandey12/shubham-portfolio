import projectsData from "./projects.json";

export type Metric = { value: string; label: string };
export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  type: string;
  status: string;
  featured?: boolean;
  description: string;
  stack: string[];
  metrics: Metric[];
  overview: string;
  features: string[];
  challenges: { title: string; challenge: string; solution: string }[];
  architecture: string[];
  screenshots: string[];
  githubUrl?: string;
  demoUrl?: string;
};

export const projects = projectsData as PortfolioProject[];
