import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Filter,
  Github,
  GripVertical,
  GraduationCap,
  Rocket,
  Search,
  ArrowUp,
  ArrowDown,
  RotateCcw,
} from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
import pageContent from "../../data/pageContent.json";
import { InternalLink } from "../../components/InternalLink";
import {
  orderProjectsBySlug,
  projectOrderStorageKey,
  readSavedProjectOrder,
} from "./projectOrder";
import "./projects.css";

type ProjectsPageProps = { navigate: (to: string) => void };

const sortOptions = [
  "Custom Order",
  "Newest First",
  "Oldest First",
  "Title (A-Z)",
  "Title (Z-A)",
  "Category",
] as const;

function moveProjectSlug(order: string[], fromSlug: string, toSlug: string) {
  const fromIndex = order.indexOf(fromSlug);
  const targetIndex = order.indexOf(toSlug);
  if (fromIndex < 0 || targetIndex < 0 || fromIndex === targetIndex) return order;
  const nextOrder = [...order];
  const [movingSlug] = nextOrder.splice(fromIndex, 1);
  const newTargetIndex = nextOrder.indexOf(toSlug);
  nextOrder.splice(newTargetIndex + (fromIndex < targetIndex ? 1 : 0), 0, movingSlug);
  return nextOrder;
}

export function ProjectsPage({
  navigate,
  projects,
}: ProjectsPageProps & { projects: PortfolioProject[] }) {
  const [query, setQuery] = useState("");
  const [customOrder, setCustomOrder] = useState<string[]>(readSavedProjectOrder);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>(() =>
    customOrder.length > 0 ? "Custom Order" : "Newest First",
  );
  const [category, setCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [orderEditing, setOrderEditing] = useState(false);
  const [draggedProjectSlug, setDraggedProjectSlug] = useState<string>();
  const [dropTargetSlug, setDropTargetSlug] = useState<string>();
  const [orderAnnouncement, setOrderAnnouncement] = useState("");
  const filterWrapRef = useRef<HTMLDivElement>(null);
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

  useEffect(() => {
    if (customOrder.length === 0) return;
    try {
      localStorage.setItem(projectOrderStorageKey, JSON.stringify(customOrder));
    } catch {
      // Reordering remains available for this session when storage is unavailable.
    }
  }, [customOrder]);

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

  const orderedProjects = useMemo(() => {
    if (sort === "Custom Order") return orderProjectsBySlug(projects, customOrder);
    const rows = [...projects];
    if (sort === "Category")
      return rows.sort(
        (a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
      );
    if (sort === "Title (A-Z)") return rows.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Title (Z-A)") return rows.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "Oldest First") return rows.reverse();
    return rows;
  }, [projects, sort, customOrder]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return orderedProjects.filter((project) => {
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
  }, [query, category, orderedProjects]);

  const startOrderEditing = () => {
    const initialOrder =
      customOrder.length > 0
        ? orderProjectsBySlug(projects, customOrder)
        : sort === "Custom Order"
          ? projects
          : orderedProjects;
    setCustomOrder(initialOrder.map((project) => project.slug));
    setSort("Custom Order");
    setQuery("");
    setCategory("All");
    setFiltersOpen(false);
    setDropTargetSlug(undefined);
    setOrderEditing(true);
    setOrderAnnouncement("Project order editing is on.");
  };

  const resetProjectOrder = () => {
    try {
      localStorage.removeItem(projectOrderStorageKey);
    } catch {
      // The in-memory order is still reset if storage is unavailable.
    }
    setCustomOrder([]);
    setSort("Newest First");
    setOrderEditing(false);
    setDraggedProjectSlug(undefined);
    setDropTargetSlug(undefined);
    setOrderAnnouncement("Project order reset to the default.");
  };

  const reorderProjects = (fromSlug: string, toSlug: string) => {
    if (!fromSlug || fromSlug === toSlug) return;
    const completeOrder = orderProjectsBySlug(projects, customOrder).map(
      (project) => project.slug,
    );
    const nextOrder = moveProjectSlug(completeOrder, fromSlug, toSlug);
    if (nextOrder === completeOrder) return;
    setCustomOrder(nextOrder);
    const projectTitle = projects.find((project) => project.slug === fromSlug)?.title || "Project";
    setOrderAnnouncement(
      `${projectTitle} moved to position ${nextOrder.indexOf(fromSlug) + 1} of ${nextOrder.length}.`,
    );
  };

  const moveProject = (slug: string, direction: -1 | 1) => {
    const completeOrder = orderProjectsBySlug(projects, customOrder).map(
      (project) => project.slug,
    );
    const currentIndex = completeOrder.indexOf(slug);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= completeOrder.length) return;
    [completeOrder[currentIndex], completeOrder[nextIndex]] = [
      completeOrder[nextIndex],
      completeOrder[currentIndex],
    ];
    setCustomOrder(completeOrder);
    const projectTitle = projects.find((project) => project.slug === slug)?.title || "Project";
    setOrderAnnouncement(
      `${projectTitle} moved to position ${nextIndex + 1} of ${completeOrder.length}.`,
    );
  };

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
          className={`projects-controls projects-enter${orderEditing ? " is-order-editing" : ""}`}
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
                disabled={orderEditing}
              />
            </label>
            <div className="projects-toolbar-actions">
              <label className="projects-sort">
                <span className="sr-only">Sort projects</span>
                <select
                  value={sort}
                  onChange={(event) => {
                    const nextSort = event.target.value as (typeof sortOptions)[number];
                    setSort(nextSort);
                    if (nextSort !== "Custom Order") setOrderEditing(false);
                  }}
                  disabled={orderEditing}
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
                  disabled={orderEditing}
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
              {orderEditing ? (
                <>
                  <button
                    className="projects-order-reset"
                    type="button"
                    onClick={resetProjectOrder}
                  >
                    <RotateCcw size={15} aria-hidden="true" /> Reset
                  </button>
                  <button
                    className="projects-order-done"
                    type="button"
                    onClick={() => {
                      setOrderEditing(false);
                      setDraggedProjectSlug(undefined);
                      setDropTargetSlug(undefined);
                      setOrderAnnouncement("Custom project order saved in this browser.");
                    }}
                  >
                    Done
                  </button>
                </>
              ) : (
                <button
                  className="projects-order-toggle"
                  type="button"
                  disabled={projects.length < 2}
                  onClick={startOrderEditing}
                >
                  <GripVertical size={16} aria-hidden="true" /> Edit order
                </button>
              )}
            </div>
          </div>
          {orderEditing && (
            <p className="projects-order-hint" role="status">
              Drag a project by its grip, or use the arrow buttons to move it. Your order is saved
              in this browser.
            </p>
          )}
        </div>

        <p
          className="projects-result-count projects-enter"
          style={{ "--enter-order": 2 } as React.CSSProperties}
          aria-live="polite"
        >
          Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects
        </p>

        {filteredProjects.length > 0 ? (
          <div className={`projects-grid${orderEditing ? " is-order-editing" : ""}`}>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                navigate={navigate}
                orderEditing={orderEditing}
                isDropTarget={dropTargetSlug === project.slug}
                position={index}
                total={filteredProjects.length}
                onMoveUp={() => moveProject(project.slug, -1)}
                onMoveDown={() => moveProject(project.slug, 1)}
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = "move";
                  event.dataTransfer.setData("text/plain", project.slug);
                  setDraggedProjectSlug(project.slug);
                }}
                onDragOver={(event) => {
                  if (!orderEditing || !draggedProjectSlug || draggedProjectSlug === project.slug)
                    return;
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  setDropTargetSlug(project.slug);
                }}
                onDrop={(event) => {
                  if (!orderEditing) return;
                  event.preventDefault();
                  reorderProjects(
                    event.dataTransfer.getData("text/plain") || draggedProjectSlug || "",
                    project.slug,
                  );
                  setDraggedProjectSlug(undefined);
                  setDropTargetSlug(undefined);
                }}
                onDragEnd={() => {
                  setDraggedProjectSlug(undefined);
                  setDropTargetSlug(undefined);
                }}
              />
            ))}
            <span className="sr-only" role="status" aria-live="polite">
              {orderAnnouncement}
            </span>
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
  orderEditing,
  isDropTarget,
  position,
  total,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  project: PortfolioProject;
  index: number;
  navigate: (to: string) => void;
  orderEditing: boolean;
  isDropTarget: boolean;
  position: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDragStart: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}) {
  return (
    <div
      className={`projects-card-link${isDropTarget ? " is-drop-target" : ""}`}
      style={{ "--card-order": index } as React.CSSProperties}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <article className="projects-card">
        <span className="projects-card-wash" aria-hidden="true" />
        <span className="projects-card-glow" aria-hidden="true" />
        <div className="projects-card-content">
          {orderEditing && (
            <div className="projects-card-order-tools" aria-label={`Reorder ${project.title}`}>
              <button
                className="projects-drag-handle"
                type="button"
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                aria-label={`Drag ${project.title} to reorder`}
                title="Drag to reorder"
              >
                <GripVertical size={17} aria-hidden="true" />
                <span>Drag to reorder</span>
              </button>
              <div className="projects-move-buttons">
                <button
                  type="button"
                  onClick={onMoveUp}
                  disabled={position === 0}
                  aria-label={`Move ${project.title} up`}
                  title="Move up"
                >
                  <ArrowUp size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onMoveDown}
                  disabled={position === total - 1}
                  aria-label={`Move ${project.title} down`}
                  title="Move down"
                >
                  <ArrowDown size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
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
