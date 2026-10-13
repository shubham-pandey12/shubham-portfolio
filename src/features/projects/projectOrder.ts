import type { PortfolioProject } from "../../data/projects";

export const projectOrderStorageKey = "portfolio-project-order-v1";

export function readSavedProjectOrder(): string[] {
  try {
    const saved = localStorage.getItem(projectOrderStorageKey);
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed)
      ? [...new Set(parsed.filter((slug): slug is string => typeof slug === "string"))]
      : [];
  } catch {
    return [];
  }
}

export function orderProjectsBySlug(projects: PortfolioProject[], order: string[]) {
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));
  const ordered = order
    .map((slug) => projectsBySlug.get(slug))
    .filter((project): project is PortfolioProject => project !== undefined);
  const included = new Set(ordered.map((project) => project.slug));
  return [...ordered, ...projects.filter((project) => !included.has(project.slug))];
}
