import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CodeXml,
  ExternalLink,
  Github,
  Globe,
  Image as ImageIcon,
  Rocket,
  UserRound,
  X,
} from "lucide-react";
import type { PortfolioProject, ProjectScreenshot } from "../../data/projects";
import { ProjectMetrics, DetailPanel } from "../../components/PortfolioUI";

export function ProjectDetailPage({
  project,
  navigate,
}: {
  project: PortfolioProject;
  navigate: (to: string) => void;
}) {
  const [moreFeatures, setMoreFeatures] = useState(false);
  const [openChallenge, setOpenChallenge] = useState<number | null>(0);
  const [moreChallenges, setMoreChallenges] = useState(false);
  const [moreTech, setMoreTech] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ProjectScreenshot | null>(null);
  const challenges = moreChallenges ? project.challenges : project.challenges.slice(0, 3);
  const resources = project.resources ?? [];
  const performanceMetrics = project.performanceMetrics ?? [];
  const hasExternalLinks = Boolean(project.githubUrl || project.demoUrl);

  useEffect(() => {
    if (!selectedImage) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedImage]);

  return (
    <main className="project-detail-page page-shell">
      <div className="container">
        <button className="back-link" type="button" onClick={() => navigate("/projects")}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to Projects
        </button>

        <header className="detail-heading reveal">
          <div className="project-state-tags">
            {project.featured && <span className="featured-flag">Featured Project</span>}
            {project.openSource && (
              <span className="tag-green">
                <CodeXml size={14} aria-hidden="true" /> Open Source
              </span>
            )}
            {project.projectKind && (
              <span className="tag-purple">
                <Rocket size={14} aria-hidden="true" /> {project.projectKind}
              </span>
            )}
            <span className="tag-green">{project.type}</span>
            <span className="project-detail-tag">{project.category}</span>
            {project.status && (
              <span
                className={`status-label ${project.status.toLowerCase() === "completed" ? "complete" : "ongoing"}`}
              >
                {project.status}
              </span>
            )}
          </div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          {(project.githubUrl || project.demoUrl) && (
            <div className="detail-header-actions">
              {project.githubUrl && (
                <a
                  className="github-button"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={16} aria-hidden="true" /> View on GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  className="detail-demo-button"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe size={16} aria-hidden="true" /> Live Demo
                </a>
              )}
            </div>
          )}
        </header>

        <div className="project-detail-grid">
          <div className="detail-main-column">
            {project.overview && (
              <DetailPanel title="Overview">
                <p>{project.overview}</p>
              </DetailPanel>
            )}

            {project.stack.length > 0 && (
              <DetailPanel title="Technologies & Tools">
                <div className="detail-tech-list">
                  {(moreTech ? project.stack : project.stack.slice(0, 24)).map((item, i) => (
                    <span key={`${item}-${i}`}>{item}</span>
                  ))}
                </div>
                {project.stack.length > 24 && (
                  <button
                    className="show-more-button"
                    type="button"
                    onClick={() => setMoreTech(!moreTech)}
                  >
                    {moreTech ? "Show Less" : `Show ${project.stack.length - 24} More`}
                  </button>
                )}
              </DetailPanel>
            )}

            {project.architecture.length > 0 && (
              <DetailPanel title="Architecture & System Design">
                <div className="architecture-diagram">
                  {project.architecture.map((item, i) => (
                    <div key={`${item}-${i}`}>
                      <span>{item}</span>
                      {i < project.architecture.length - 1 && (
                        <ArrowRight size={18} aria-hidden="true" />
                      )}
                    </div>
                  ))}
                </div>
              </DetailPanel>
            )}

            {performanceMetrics.length > 0 && (
              <DetailPanel title="Performance Metrics">
                <ProjectMetrics metrics={performanceMetrics} />
              </DetailPanel>
            )}

            {project.screenshots.length > 0 && (
              <DetailPanel title="Application Screenshots">
                <div className="screenshot-grid">
                  {project.screenshots.map((screenshot, i) => (
                    <button
                      className="project-screenshot"
                      key={`${screenshot.src}-${i}`}
                      type="button"
                      onClick={() => setSelectedImage(screenshot)}
                      aria-label={`View image: ${screenshot.caption}`}
                    >
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt || screenshot.caption}
                        loading="lazy"
                      />
                      <span>
                        <ImageIcon size={16} aria-hidden="true" /> View image
                      </span>
                      <small>{screenshot.caption}</small>
                    </button>
                  ))}
                </div>
              </DetailPanel>
            )}

            {resources.length > 0 && (
              <DetailPanel title="Additional Resources">
                <div className="detail-resources">
                  {resources.map((resource) => (
                    <a
                      key={`${resource.label}-${resource.url}`}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {resource.label} <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </DetailPanel>
            )}

            {project.features.length > 0 && (
              <DetailPanel title="Key Features">
                <ol className="feature-list">
                  {(moreFeatures ? project.features : project.features.slice(0, 8)).map(
                    (feature, i) => (
                      <li key={`${feature}-${i}`}>
                        <span>{i + 1}</span>
                        {feature}
                      </li>
                    ),
                  )}
                </ol>
                {project.features.length > 8 && (
                  <button
                    className="show-more-button"
                    type="button"
                    onClick={() => setMoreFeatures(!moreFeatures)}
                  >
                    <ChevronDown size={16} aria-hidden="true" />
                    {moreFeatures ? "Show Less" : `Show ${project.features.length - 8} More`}
                  </button>
                )}
              </DetailPanel>
            )}

            {project.challenges.length > 0 && (
              <DetailPanel title="Challenges & Solutions">
                <div className="challenge-list">
                  {challenges.map((item, i) => (
                    <article key={item.title}>
                      <button
                        type="button"
                        onClick={() => setOpenChallenge(openChallenge === i ? null : i)}
                        aria-expanded={openChallenge === i}
                      >
                        <strong>{item.title}</strong>
                        <ChevronDown size={16} aria-hidden="true" />
                      </button>
                      {openChallenge === i && (
                        <div className="challenge-content">
                          <p>
                            <b>Challenge:</b> {item.challenge}
                          </p>
                          <p>
                            <b>Solution:</b> {item.solution}
                          </p>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
                {project.challenges.length > 3 && (
                  <button
                    className="show-more-button"
                    type="button"
                    onClick={() => setMoreChallenges(!moreChallenges)}
                  >
                    {moreChallenges ? "Show Less" : `Show ${project.challenges.length - 3} More`}
                  </button>
                )}
              </DetailPanel>
            )}
          </div>

          <aside className="detail-sidebar">
            <DetailPanel title="Project Information">
              <div className="project-information">
                <div className="info-line">
                  <CodeXml size={18} aria-hidden="true" />
                  <span>
                    <b>Category</b>
                    <small>{project.category}</small>
                  </span>
                </div>
                <div className="info-line">
                  <Rocket size={18} aria-hidden="true" />
                  <span>
                    <b>Project Type</b>
                    <small>{project.type}</small>
                  </span>
                </div>
                {(project.startedAt || project.updatedAt) && (
                  <div className="info-line">
                    <CalendarDays size={18} aria-hidden="true" />
                    <span>
                      <b>Timeline</b>
                      {project.startedAt && <small>Started: {project.startedAt}</small>}
                      {project.updatedAt && <small>Last updated: {project.updatedAt}</small>}
                    </span>
                  </div>
                )}
                {project.role && (
                  <div className="info-line">
                    <UserRound size={18} aria-hidden="true" />
                    <span>
                      <b>Role</b>
                      <small>{project.role}</small>
                    </span>
                  </div>
                )}
              </div>
            </DetailPanel>
            {project.metrics.length > 0 && (
              <DetailPanel title="Project Metrics">
                <ProjectMetrics metrics={project.metrics} />
              </DetailPanel>
            )}
            {hasExternalLinks && (
              <DetailPanel title="External Links">
                {project.githubUrl && (
                  <a
                    className="external-project-link"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={18} aria-hidden="true" />
                    <span>View on GitHub</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    className="external-project-link"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Globe size={18} aria-hidden="true" />
                    <span>Live Demo</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
              </DetailPanel>
            )}
          </aside>
        </div>
      </div>

      {selectedImage && (
        <div
          className="project-image-dialog"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.caption}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null);
          }}
        >
          <button
            type="button"
            className="project-image-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <X size={22} />
          </button>
          <img src={selectedImage.src} alt={selectedImage.alt || selectedImage.caption} />
          <p>{selectedImage.caption}</p>
        </div>
      )}
    </main>
  );
}
