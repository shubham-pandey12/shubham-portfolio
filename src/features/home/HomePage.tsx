import { ArrowRight, BookOpen, Github, Linkedin, Mail, Twitter, UserRound } from "lucide-react";
import {
  profile,
  projects,
  skillGroups,
  complementarySkills,
  type PortfolioProject,
} from "../../data/home";
import { InternalLink } from "../../components/InternalLink";
import pageContent from "../../data/pageContent.json";
import { ProjectMetrics, ProjectTechList, SectionIntro } from "../../components/PortfolioUI";

export function HomePage({ navigate }: { navigate: (to: string) => void }) {
  const featuredDescription = (project: PortfolioProject) => project.description;
  return (
    <>
      <section className="home-hero">
        <div className="hero-ambient" aria-hidden="true">
          <span className="hero-glow hero-glow-blue" />
          <span className="hero-glow hero-glow-purple" />
          <span className="hero-glow hero-glow-pink" />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="availability-pill">
              <span className="green-dot">
                <i />
              </span>
              <span>{profile.availability}</span>
            </div>
            <div className="hero-intro">
              <h1>
                Hi, I'm <span className="gradient-text">{profile.name}</span>
              </h1>
              <p className="hero-role">
                {pageContent.home.heroRole}
                <span className="hero-subtitle">
                  {profile.education} · Power BI &amp; Microsoft Fabric
                </span>
              </p>
            </div>
            <p className="hero-bio">{pageContent.home.heroBio}</p>
            <div className="hero-awards">
              {pageContent.home.heroAwards.map((label, index) => (
                <span className={`award-chip ${index ? "orange-chip" : "blue-chip"}`} key={label}>
                  {label}
                </span>
              ))}
            </div>
            <div className="hero-tech">
              {pageContent.home.heroTech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="hero-actions">
              <InternalLink to="/projects" navigate={navigate} className="primary-button">
                View My Work <ArrowRight size={16} />
              </InternalLink>
              <InternalLink to="/contact" navigate={navigate} className="secondary-button">
                Get in Touch
              </InternalLink>
            </div>
            <SocialLinks />
          </div>
          <div className="hero-portrait-column">
            <div className="portrait-wrap">
              <div className="portrait-ring">
                <div className="portrait-placeholder">
                  <UserRound size={70} />
                  <span>
                    PLACEHOLDER
                    <br />
                    PROFILE IMAGE
                  </span>
                </div>
              </div>
              <div className="portrait-seal seal-left">
                <span>💻</span>
                <small>MAQ</small>
              </div>
              <div className="portrait-seal seal-right">
                <span>🎓</span>
                <small>IIIT</small>
              </div>
            </div>
            <div className="hero-mobile-awards">
              <span className="award-chip blue-chip">🏅 Award TBD</span>
              <span className="award-chip orange-chip">⭐ Certification TBD</span>
            </div>
            <div className="hero-stat-stack">
              {pageContent.home.heroStats.map((stat) => (
                <HeroStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="featured-section page-section reveal">
        <div className="container">
          <SectionIntro
            title={pageContent.home.featuredTitle}
            description={pageContent.home.featuredDescription}
          />
          <div className="featured-grid">
            {projects.slice(0, 3).map((project, index) => (
              <FeaturedProjectCard
                key={project.slug}
                project={project}
                index={index}
                navigate={navigate}
                description={featuredDescription(project)}
              />
            ))}
          </div>
          <div className="center-action">
            <InternalLink to="/projects" navigate={navigate} className="primary-button">
              View All Projects <ArrowRight size={15} />
            </InternalLink>
          </div>
        </div>
      </section>
      <HomeSkillsSection navigate={navigate} />
    </>
  );
}

export function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="hero-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export function SocialLinks() {
  return (
    <div className="social-row">
      <a href={profile.github} aria-label="GitHub" title="YOUR_GITHUB_URL">
        <Github size={20} />
      </a>
      <a href={profile.linkedin} aria-label="LinkedIn" title="YOUR_LINKEDIN_URL">
        <Linkedin size={20} />
      </a>
      <a href={profile.x} aria-label="X">
        <Twitter size={20} />
      </a>
      <a href={profile.blog} aria-label="Blog">
        <BookOpen size={20} />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email">
        <Mail size={20} />
      </a>
    </div>
  );
}

export function FeaturedProjectCard({
  project,
  index,
  navigate,
  description,
}: {
  project: PortfolioProject;
  index: number;
  navigate: (to: string) => void;
  description: string;
}) {
  return (
    <article
      className="featured-project-card"
      style={{ "--card-order": index } as React.CSSProperties}
    >
      <div className="featured-card-wash" aria-hidden="true" />
      <div className="featured-card-glow" aria-hidden="true" />
      <div className="featured-card-surface">
        <div className="project-label-row">
          <span className="category-label">{project.category}</span>
          <span
            className={`status-label ${project.status === "Completed" ? "complete" : "ongoing"}`}
          >
            {project.status}
          </span>
        </div>
        <div className="featured-project-copy">
          <InternalLink
            to={`/projects/${project.slug}`}
            navigate={navigate}
            className="project-title-link"
          >
            <h3>{project.title}</h3>
          </InternalLink>
          <p className="project-description">{description}</p>
        </div>
        <ProjectTechList stack={project.stack} />
        <ProjectMetrics metrics={project.metrics.slice(0, 2)} />
        <div className="card-actions">
          <InternalLink
            to={`/projects/${project.slug}`}
            navigate={navigate}
            className="card-primary-link"
          >
            View Details <ArrowRight size={15} />
          </InternalLink>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="View on GitHub"
              className="repo-link"
            >
              <Github size={17} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function HomeSkillsSection({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section id="skills" className="skills-home-section page-section reveal">
      <div className="container">
        <SectionIntro
          title="Skills & Technologies"
          description="Core technologies and tools across frontend development, application engineering, and business data platforms."
        />
        <div className="home-skill-groups">
          {skillGroups.map((group, i) => (
            <SkillSummaryCard key={group.title} group={group} order={i} />
          ))}
        </div>
        <h3 className="complement-title">Complementary Technologies</h3>
        <div className="complement-chip-list">
          {complementarySkills.map((item, i) => (
            <span
              style={{ "--chip-order": i } as React.CSSProperties}
              className={item.startsWith("PLACEHOLDER") ? "placeholder-chip" : undefined}
              key={`${item}-${i}`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="home-skill-stats">
          <div>
            <strong>16</strong>
            <span>Core Technologies</span>
          </div>
          <div>
            <strong>52+</strong>
            <span>Complementary Skills</span>
          </div>
          <div>
            <strong>TBD</strong>
            <span>Years Experience</span>
          </div>
          <div>
            <strong>TBD</strong>
            <span>Certifications</span>
          </div>
        </div>
        <div className="center-action">
          <InternalLink to="/skills" navigate={navigate} className="primary-button">
            View All Skills <ArrowRight size={15} />
          </InternalLink>
        </div>
      </div>
    </section>
  );
}

export function SkillSummaryCard({
  group,
  order,
}: {
  group: (typeof skillGroups)[number];
  order: number;
}) {
  return (
    <article
      style={{ "--skill-order": order } as React.CSSProperties}
      className={`skill-summary-card skill-${group.color}`}
    >
      <h3>
        <span className="skill-glyph">
          {group.title === "Frontend"
            ? "🎨"
            : group.title === "Backend"
              ? "⚙️"
              : group.title === "Database"
                ? "💾"
                : group.title === "DevOps"
                  ? "🚀"
                  : "🤖"}
        </span>
        {group.title}
      </h3>
      {group.skills.map((skill, i) => (
        <div className="summary-skill" key={skill.name}>
          <div>
            <span>
              {i === 0 ? "⚡" : i === 1 ? "📘" : "◆"} &nbsp;{skill.name}
            </span>
            <small>
              {skill.years}
              {skill.years === "TBD" ? "" : "y"}
            </small>
          </div>
          <div className="skill-track">
            <i style={{ width: `${[92, 66, 77][i % 3]}%` }} />
          </div>
        </div>
      ))}
    </article>
  );
}
