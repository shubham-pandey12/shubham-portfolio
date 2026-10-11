import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Globe,
  Github,
  BriefcaseBusiness,
} from "lucide-react";
import type { PortfolioProject } from "../../data/projects";
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
  const challenges = moreChallenges ? project.challenges : project.challenges.slice(0, 3);
  return (
    <div className="project-detail-page page-shell">
      <div className="container">
        <button className="back-link" onClick={() => navigate("/projects")}>
          <ArrowLeft size={14} /> Back to Projects
        </button>
        <div className="detail-heading">
          <div className="project-state-tags">
            <span className="featured-flag">Featured Project</span>
            <span className="tag-green">
              {project.type === "PLACEHOLDER" ? "PLACEHOLDER TYPE" : project.type}
            </span>
            <span className="tag-purple">{project.category}</span>
            <span className="status-label complete">{project.status}</span>
          </div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          {project.githubUrl && (
            <a className="github-button" href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github size={15} /> View on GitHub
            </a>
          )}
        </div>
        <div className="project-detail-grid">
          <div className="detail-main-column">
            <DetailPanel title="Overview">
              <p>{project.overview}</p>
              <p>
                PLACEHOLDER: Add implementation context, scope, and your specific contribution where
                they are confirmed.
              </p>
            </DetailPanel>
            <DetailPanel title="Technologies & Tools">
              <div className="detail-tech-list">
                {(moreTech
                  ? [
                      ...project.stack,
                      "PLACEHOLDER TECHNOLOGY",
                      "PLACEHOLDER TECHNOLOGY",
                      "PLACEHOLDER TECHNOLOGY",
                      "PLACEHOLDER TECHNOLOGY",
                    ]
                  : project.stack
                ).map((item, i) => (
                  <span key={`${item}-${i}`}>{item}</span>
                ))}
              </div>
              {!moreTech && (
                <button className="show-more-button" onClick={() => setMoreTech(true)}>
                  Show {4} More
                </button>
              )}
            </DetailPanel>
            <DetailPanel title="Architecture & System Design">
              <div className="architecture-diagram">
                {project.architecture.map((item, i) => (
                  <div key={`${item}-${i}`}>
                    <span>{item}</span>
                    {i < project.architecture.length - 1 && <ArrowRight size={18} />}
                  </div>
                ))}
              </div>
              <p className="panel-caption">
                PLACEHOLDER: Replace this diagram and caption with the approved architecture.
              </p>
            </DetailPanel>
            <DetailPanel title="Performance Metrics">
              <div className="performance-placeholder">
                <div className="placeholder-window">
                  <span>PLACEHOLDER PERFORMANCE VISUALIZATION</span>
                  <div className="metric-bars">
                    {[70, 52, 84, 63, 42, 76].map((width, i) => (
                      <i key={i} style={{ width: `${width}%` }} />
                    ))}
                  </div>
                </div>
                <p>PLACEHOLDER: Add measured and verified project results.</p>
              </div>
            </DetailPanel>
            <DetailPanel title="Application Screenshots">
              <div className="screenshot-grid">
                {project.screenshots.map((caption, i) => (
                  <div className="screenshot-item" key={i}>
                    <div className="fake-screenshot">
                      <div className="fake-browser-bar">
                        <i />
                        <i />
                        <i />
                        <span>PLACEHOLDER_PREVIEW</span>
                      </div>
                      <div className="fake-screen-content">
                        <span className="fake-side-nav" />
                        <div>
                          <i />
                          <i />
                          <b />
                        </div>
                      </div>
                      <span className="image-placeholder-text">{caption}</span>
                    </div>
                    <p>{caption}</p>
                  </div>
                ))}
              </div>
            </DetailPanel>
            <DetailPanel title="Key Features">
              <ol className="feature-list">
                {(moreFeatures
                  ? [
                      ...project.features,
                      "PLACEHOLDER: Add a confirmed feature.",
                      "PLACEHOLDER: Add another verified feature.",
                    ]
                  : project.features.slice(0, 5)
                ).map((feature, i) => (
                  <li key={`${feature}-${i}`}>
                    <span>{i + 1}</span>
                    {feature}
                  </li>
                ))}
              </ol>
              {project.features.length > 5 && (
                <button className="show-more-button" onClick={() => setMoreFeatures(!moreFeatures)}>
                  <ChevronDown size={14} />
                  {moreFeatures ? "Show Less" : `Show ${project.features.length - 5} More`}
                </button>
              )}
            </DetailPanel>
            <DetailPanel title="Challenges & Solutions">
              <div className="challenge-list">
                {challenges.map((item, i) => (
                  <article key={item.title}>
                    <button onClick={() => setOpenChallenge(openChallenge === i ? null : i)}>
                      <strong>{item.title}</strong>
                      <ChevronDown size={15} />
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
                  onClick={() => setMoreChallenges(!moreChallenges)}
                >
                  {moreChallenges ? "Show Less" : `Show ${project.challenges.length - 3} More`}
                </button>
              )}
            </DetailPanel>
          </div>
          <aside className="detail-sidebar">
            <DetailPanel title="Project Information">
              <div className="info-line">
                <CalendarDays size={15} />
                <span>
                  <b>Timeline</b>
                  <small>
                    Started: YOUR_START_DATE
                    <br />
                    Last updated: YOUR_DATE
                  </small>
                </span>
              </div>
              <div className="info-line">
                <BriefcaseBusiness size={15} />
                <span>
                  <b>Role</b>
                  <small>
                    YOUR_ROLE
                    <br />
                    YOUR_TEAM
                  </small>
                </span>
              </div>
            </DetailPanel>
            <DetailPanel title="Project Metrics">
              <ProjectMetrics metrics={project.metrics.slice(0, 4)} />
            </DetailPanel>
            <DetailPanel title="External Links">
              {project.githubUrl && (
                <a
                  className="external-project-link"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={14} /> View on GitHub <ExternalLink size={13} />
                </a>
              )}
              {project.demoUrl && (
                <a
                  className="external-project-link"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe size={14} /> Live Demo <ExternalLink size={13} />
                </a>
              )}
              {!project.githubUrl && !project.demoUrl && (
                <p>Project links will be added when available.</p>
              )}
            </DetailPanel>
          </aside>
        </div>
      </div>
    </div>
  );
}
