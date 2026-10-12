import projectsData from "./projects.json";

export type Metric = { value: string; label: string };
export type ProjectScreenshot = { src: string; caption: string; alt?: string };
export type ProjectResource = { label: string; url: string };
export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  type: string;
  status: string;
  featured?: boolean;
  openSource?: boolean;
  projectKind?: string;
  startedAt?: string;
  updatedAt?: string;
  role?: string;
  description: string;
  stack: string[];
  metrics: Metric[];
  performanceMetrics?: Metric[];
  overview: string;
  features: string[];
  challenges: { title: string; challenge: string; solution: string }[];
  architecture: string[];
  screenshots: ProjectScreenshot[];
  resources?: ProjectResource[];
  githubUrl?: string;
  demoUrl?: string;
};

type ProjectData = Omit<PortfolioProject, "status"> & { status?: string };

export const projects = (projectsData as ProjectData[]).map((project) => ({
  ...project,
  status: project.status || "Completed",
}));
