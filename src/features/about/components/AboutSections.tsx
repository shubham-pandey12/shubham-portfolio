import { CalendarDays, ExternalLink } from "lucide-react";
import { ProjectTechList } from "../../../components/PortfolioUI";
import type { Recognition } from "../../../data/recognition";

type Experience = {
  company: string;
  role: string;
  date: string;
  text: string;
  location: string;
  employmentType?: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
};

type Education = {
  title: string;
  area: string;
  organization: string;
  date: string;
  description: string;
};

export function AboutSectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="about-section-title">
      <span>{icon}</span>
      {title}
    </h2>
  );
}

export function AboutExperienceCard({ item }: { item: Experience }) {
  return (
    <article className="about-experience-card reveal">
      <div className="about-experience-header">
        <div>
          <h3>{item.role}</h3>
          <p className="about-company">{item.company}</p>
          {(item.location || item.employmentType) && (
            <p className="about-experience-meta">
              {[item.location, item.employmentType].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <div className="about-experience-date">
          <CalendarDays size={16} />
          <span>{item.date}</span>
        </div>
      </div>
      <p className="about-experience-description">{item.text}</p>
      <div className="about-experience-list">
        <h4>Key Responsibilities</h4>
        <ul>
          {item.responsibilities.map((responsibility, i) => (
            <li key={`${responsibility}-${i}`}>{responsibility}</li>
          ))}
        </ul>
      </div>
      <div className="about-experience-list">
        <h4>Key Achievements</h4>
        <ul>
          {item.achievements.map((achievement, i) => (
            <li key={`${achievement}-${i}`}>{achievement}</li>
          ))}
        </ul>
      </div>
      <ProjectTechList stack={item.technologies} max={8} />
    </article>
  );
}

export function AboutEducationCard({ item }: { item: Education }) {
  return (
    <article className="about-education-card reveal">
      <div className="about-education-heading">
        <h3>{item.title}</h3>
        <p>{item.area}</p>
        <span>{item.organization}</span>
      </div>
      <div className="about-education-date">
        <CalendarDays size={15} />
        {item.date}
      </div>
      <p className="about-education-description">{item.description}</p>
    </article>
  );
}

export function AboutRecognitionCard({ item }: { item: Recognition }) {
  return (
    <article className="about-recognition-card reveal">
      {item.imageUrl && (
        <a
          className="about-recognition-preview"
          href={item.pdfUrl || item.verifyUrl || item.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${item.title} certificate`}
        >
          <img
            src={item.imageUrl}
            alt={`${item.title} certificate`}
            loading="lazy"
            decoding="async"
          />
        </a>
      )}
      <span className="about-recognition-type">{item.type}</span>
      <h3>{item.title}</h3>
      <p>{item.organization}</p>
      <time>{item.date}</time>
      {item.verifyUrl && (
        <a
          className="about-recognition-link"
          href={item.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View certificate <ExternalLink size={13} />
        </a>
      )}
    </article>
  );
}

export function CareerHighlights({
  stats,
  metrics,
  title,
}: {
  stats: string[][];
  metrics: string[][];
  title: string;
}) {
  return (
    <section className="about-career-panel reveal">
      <h2>{title}</h2>
      <div className="about-career-stats">
        {stats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="about-career-divider" />
      <div className="about-career-metrics">
        {metrics.map(([value, label], i) => (
          <div key={label}>
            <strong className={i === 0 ? "plain-metric" : ""}>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
