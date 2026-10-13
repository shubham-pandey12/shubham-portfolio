import { useState } from "react";
import { ArrowRight, CalendarDays, ExternalLink, UserRound } from "lucide-react";
import type { companies } from "../data/profile";

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

export function AwardCard({
  item,
}: {
  item: {
    title: string;
    organization: string;
    date: string;
    description: string;
    type: string;
    id?: string;
    verifyUrl?: string;
  };
}) {
  return (
    <article className="award-card">
      <div className="award-kind">{item.type}</div>
      <h3>{item.title}</h3>
      <p className="award-org">{item.organization}</p>
      <p className="award-date">{item.date}</p>
      <p>{item.description}</p>
      {item.id && (
        <div className="credential-id">
          Credential ID: <strong>{item.id}</strong>
        </div>
      )}
      {item.verifyUrl && (
        <a href={item.verifyUrl} target="_blank" rel="noreferrer" className="verify-link">
          Verify <ExternalLink size={13} />
        </a>
      )}
    </article>
  );
}

export function Portrait({ small = false }: { small?: boolean }) {
  return (
    <div className={`portrait-wrap ${small ? "small-portrait" : ""}`}>
      <div className="portrait-ring">
        <div className="portrait-placeholder">
          <UserRound size={small ? 42 : 70} />
          <span>
            PLACEHOLDER
            <br />
            PROFILE IMAGE
          </span>
        </div>
      </div>
    </div>
  );
}

export function ExperienceCard({ item }: { item: (typeof companies)[number] }) {
  return (
    <article className="experience-card">
      <div className="experience-top">
        <div>
          <h3>{item.role}</h3>
          <strong>{item.company}</strong>
        </div>
        <span className="experience-date">
          <CalendarDays size={13} />
          {item.date}
        </span>
      </div>
      <p className="experience-meta">PLACEHOLDER LOCATION · PLACEHOLDER EMPLOYMENT TYPE</p>
      <p>{item.text}</p>
      <h4>Key Responsibilities:</h4>
      <ul>
        <li>PLACEHOLDER: Add a confirmed responsibility.</li>
        <li>PLACEHOLDER: Add another confirmed responsibility.</li>
      </ul>
      <h4>Key Achievements:</h4>
      <ul>
        <li>PLACEHOLDER: Add a verified achievement or remove this item.</li>
      </ul>
      <ProjectTechList
        stack={[
          "React",
          "TypeScript",
          "JavaScript",
          "PLACEHOLDER TECHNOLOGY",
          "PLACEHOLDER TECHNOLOGY",
        ]}
      />
    </article>
  );
}

export function EducationCard({
  title,
  area,
  organization,
  date,
  placeholder = false,
}: {
  title: string;
  area: string;
  organization: string;
  date: string;
  placeholder?: boolean;
}) {
  return (
    <article className={`education-card${placeholder ? " placeholder-card" : ""}`}>
      <h3>{title}</h3>
      <p className="education-area">{area}</p>
      <p>{organization}</p>
      <span>
        <CalendarDays size={13} />
        {date}
      </span>
      <p>
        {placeholder
          ? "PLACEHOLDER: Add verified education details."
          : "PLACEHOLDER: Add optional coursework, honors, or project details."}
      </p>
    </article>
  );
}

export function StatTile({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className={`stat-tile tone-${tone}`}>
      <span>{icon}</span>
      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
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
