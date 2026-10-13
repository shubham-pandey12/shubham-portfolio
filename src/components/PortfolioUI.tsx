import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { profile } from "../data/profile";

export function ProjectTechList({ stack, max = 4 }: { stack: string[]; max?: number }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? stack : stack.slice(0, max);
  return (
    <div className="project-tech-list">
      {shown.map((item, i) => (
        <span key={`${item}-${i}`}>{item}</span>
      ))}
      {stack.length > max && (
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : `+ ${stack.length - max} more`}
        </button>
      )}
    </div>
  );
}

export function ProjectMetrics({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <div className={`project-metrics metric-count-${metrics.length}`}>
      {metrics.map((metric, i) => (
        <div key={`${metric.label}-${i}`}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

export function SectionIntro({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <div className="section-intro">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {eyebrow && <span>{eyebrow}</span>}
    </div>
  );
}

export function SectionHeader({
  icon,
  title,
  action,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="content-section-header">
      <h2>
        <span>{icon}</span>
        {title}
      </h2>
      {action && (
        <button onClick={onAction}>
          {action}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

export function Portrait({
  small = false,
  children,
}: {
  small?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={`portrait-wrap ${small ? "small-portrait" : ""}`}>
      <div className="portrait-ring">
        <div className="portrait-placeholder">
          <img
            className="portrait-image"
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
      {children}
    </div>
  );
}

export function DetailPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="detail-panel reveal">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function PageHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="page-heading">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
