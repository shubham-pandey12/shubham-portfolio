import type { PortfolioProject } from "./projects";

const cacheKey = "portfolio-github-projects-v4";
const cacheDurationMs = 30 * 60 * 1000;

type GitHubRepository = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics: string[];
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
};

type CachedProjects = { savedAt: number; projects: PortfolioProject[] };

function readCache(): CachedProjects | undefined {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return undefined;
    const value = JSON.parse(cached) as CachedProjects;
    return Date.now() - value.savedAt < cacheDurationMs ? value : undefined;
  } catch {
    return undefined;
  }
}

function toProject(repository: GitHubRepository): PortfolioProject {
  const stack = [
    ...(repository.language ? [repository.language] : []),
    ...repository.topics
      .filter((topic) => topic !== "portfolio" && topic !== "portfolio-featured")
      .map((topic) => topic.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())),
  ].filter((technology, index, values) => values.indexOf(technology) === index);
  const description =
    repository.description?.trim() || "Explore this project and its source code on GitHub.";

  return {
    slug: repository.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    title: repository.name.replace(/[-_]/g, " "),
    category: repository.language || "Open Source",
    type: "GitHub Project",
    status: "Completed",
    featured: repository.topics.includes("portfolio-featured"),
    openSource: true,
    projectKind: repository.fork ? "Forked Repository" : "GitHub Repository",
    updatedAt: repository.updated_at,
    description,
    stack,
    metrics: [
      { value: String(repository.stargazers_count), label: "Stars" },
      { value: String(repository.forks_count), label: "Forks" },
    ],
    overview: description,
    features: [],
    challenges: [],
    architecture: [],
    screenshots: [],
    resources: [{ label: "README on GitHub", url: `${repository.html_url}#readme` }],
    githubUrl: repository.html_url,
    demoUrl: repository.homepage?.trim() || undefined,
  };
}

function mergeRepositories(
  curatedProjects: PortfolioProject[],
  repositories: GitHubRepository[],
): PortfolioProject[] {
  const synced = repositories
    .filter((repository) => !repository.private && !repository.archived)
    .map(toProject);
  return mergeSyncedProjects(curatedProjects, synced);
}

function mergeSyncedProjects(
  curatedProjects: PortfolioProject[],
  syncedProjects: PortfolioProject[],
): PortfolioProject[] {
  const syncedBySlug = new Map(syncedProjects.map((project) => [project.slug, project]));
  const curatedSlugs = new Set(curatedProjects.map((project) => project.slug));
  const enrichedCurated = curatedProjects.map((project) => {
    const synced = syncedBySlug.get(project.slug);
    if (!synced) return project;
    return {
      ...project,
      githubUrl: project.githubUrl || synced.githubUrl,
      demoUrl: project.demoUrl || synced.demoUrl,
    };
  });
  const additional = syncedProjects.filter((project) => !curatedSlugs.has(project.slug));
  return [...enrichedCurated, ...additional];
}

export async function fetchPortfolioProjects(
  username: string,
  curatedProjects: PortfolioProject[],
): Promise<PortfolioProject[]> {
  const cached = readCache();
  if (cached) {
    return mergeSyncedProjects(curatedProjects, cached.projects);
  }

  try {
    const params = new URLSearchParams({
      q: `user:${username} topic:portfolio fork:true`,
      sort: "updated",
      order: "desc",
      per_page: "100",
    });
    const response = await fetch(`https://api.github.com/search/repositories?${params}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const result = (await response.json()) as { items: GitHubRepository[] };
    const repositories = result.items.filter(
      (repository) => !repository.private && !repository.archived,
    );
    const syncedProjects = repositories.map(toProject);
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ savedAt: Date.now(), projects: syncedProjects }),
      );
    } catch {
      // The portfolio still works when browser storage is unavailable.
    }
    return mergeRepositories(curatedProjects, repositories);
  } catch {
    return curatedProjects;
  }
}
