import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Filter,
  Github,
  GraduationCap,
  Rocket,
  Search,
} from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
import pageContent from "../../data/pageContent.json";
import { InternalLink } from "../../components/InternalLink";
import "./projects.css";

type ProjectsPageProps = { navigate: (to: string) => void };

const sortOptions = [
  "Newest First",
  "Oldest First",
  "Title (A-Z)",
  "Title (Z-A)",
  "Category",
] as const;
export function ProjectsPage({
  navigate,
  projects,
}: ProjectsPageProps & { projects: PortfolioProject[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Newest First");
  const [category, setCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterWrapRef = useRef<HTMLDivElement>(null);
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

  useEffect(() => {
    if (!filtersOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!filterWrapRef.current?.contains(event.target as Node)) setFiltersOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [filtersOpen]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    let rows = projects.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        project.category,
        project.type,
        project.status,
        ...project.stack,
        ...project.metrics.map((metric) => `${metric.value} ${metric.label}`),
      ]
        .join(" ")
        .toLocaleLowerCase();
      return (
        searchableText.includes(normalizedQuery) &&
        (category === "All" || project.category === category)
      );
    });

    if (sort === "Category")
      rows = [...rows].sort(
        (a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
      );
    if (sort === "Title (A-Z)") rows = [...rows].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Title (Z-A)") rows = [...rows].sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "Oldest First") rows = [...rows].reverse();
    return rows;
  }, [query, sort, category, projects]);

  return (
    <section className="projects-page" aria-labelledby="projects-title">
      <div className="projects-container">
        <header className="projects-intro projects-enter">
          <h1 id="projects-title">
            <span>{pageContent.projects.title}</span>
          </h1>
          <p>{pageContent.projects.description}</p>
        </header>

        <div
          className="projects-controls projects-enter"
          style={{ "--enter-order": 1 } as React.CSSProperties}
        >
          <div className="projects-toolbar">
            <label className="projects-search">
              <Search size={20} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={pageContent.projects.searchPlaceholder}
                aria-label="Search projects and technologies"
              />
            </label>
            <div className="projects-toolbar-actions">
              <label className="projects-sort">
                <span className="sr-only">Sort projects</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as (typeof sortOptions)[number])}
                >
                  {sortOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown size={16} aria-hidden="true" />
              </label>
              <div className="projects-filter-wrap" ref={filterWrapRef}>
                <button
                  className="projects-filter-button"
                  type="button"
                  aria-expanded={filtersOpen}
                  aria-controls="projects-filter-menu"
                  onClick={() => setFiltersOpen((open) => !open)}
                >
                  <Filter size={16} aria-hidden="true" /> Filters
                </button>
                {filtersOpen && (
                  <div
                    className="projects-filter-menu"
                    id="projects-filter-menu"
                    role="group"
                    aria-label="Filter projects by category"
                  >
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={category === item ? "selected" : undefined}
                        aria-pressed={category === item}
                        onClick={() => {
                          setCategory(item);
                          setFiltersOpen(false);
                        }}
                      >
                        {item}
                        {category === item && <Check size={15} aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p
          className="projects-result-count projects-enter"
          style={{ "--enter-order": 2 } as React.CSSProperties}
          aria-live="polite"
        >
          Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects
        </p>

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} navigate={navigate} />
            ))}
          </div>
        ) : (
          <div
            className="projects-empty projects-enter"
            role="status"
            style={{ "--enter-order": 3 } as React.CSSProperties}
          >
            <Search size={22} aria-hidden="true" />
            <p>{pageContent.projects.emptyState}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              {pageContent.projects.clearFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  navigate,
}: {
  project: PortfolioProject;
  index: number;
  navigate: (to: string) => void;
}) {
  return (
    <div className="projects-card-link" style={{ "--card-order": index } as React.CSSProperties}>
      <article className="projects-card">
        <span className="projects-card-wash" aria-hidden="true" />
        <span className="projects-card-glow" aria-hidden="true" />
        <div className="projects-card-content">
          <div className="projects-card-heading">
            <h2>{project.title}</h2>
            {project.featured && <span className="projects-featured">Featured</span>}
          </div>
          <p className="projects-card-description">{project.description}</p>
          <div className="projects-badges" aria-label="Project type, category, and status">
            {project.type !== "Resume Project" && (
              <ProjectBadge kind="type" value={project.type} />
            )}
            <ProjectBadge kind="category" value={project.category} />
            {project.status && <ProjectBadge kind="status" value={project.status} />}
          </div>
          <div className="projects-technologies" aria-label="Technologies used">
            {project.stack.slice(0, 4).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
            {project.stack.length > 4 && (
              <span className="projects-more">+{project.stack.length - 4} more</span>
            )}
          </div>
          {project.metrics.length > 0 && (
            <div className="projects-metrics">
              {project.metrics.slice(0, 4).map((metric, metricIndex) => (
                <div key={`${metric.label}-${metricIndex}`}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          )}
          <div className="projects-card-actions">
            <InternalLink
              to={`/projects/${project.slug}`}
              navigate={navigate}
              className="projects-card-action"
            >
              View Details <ArrowRight size={16} aria-hidden="true" />
            </InternalLink>
            {project.githubUrl && (
              <a
                className="projects-github-action"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                title="View on GitHub"
              >
                <Github size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function ProjectBadge({ kind, value }: { kind: "type" | "category" | "status"; value: string }) {
  const normalized = value.toLocaleLowerCase();
  const badgeClass =
    kind === "type"
      ? normalized.includes("open")
        ? "open-source"
        : normalized.includes("side")
          ? "side-project"
          : normalized.includes("academic")
            ? "academic"
            : normalized.includes("professional")
              ? "professional"
              : "other-type"
      : kind === "status"
        ? normalized.includes("complete")
          ? "complete"
          : normalized.includes("development") || normalized.includes("ongoing")
            ? "ongoing"
            : "other-status"
        : `category-${normalized.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

  const TypeIcon =
    kind === "type"
      ? normalized.includes("open")
        ? Code2
        : normalized.includes("side")
          ? Rocket
          : normalized.includes("academic")
            ? GraduationCap
            : normalized.includes("professional")
              ? BriefcaseBusiness
              : null
      : null;

  return (
    <span className={`projects-badge projects-badge-${kind} ${badgeClass}`}>
      {TypeIcon && <TypeIcon size={13} aria-hidden="true" />}
      {value}
    </span>
  );
}
