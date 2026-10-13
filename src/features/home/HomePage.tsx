import { ArrowRight, Github, Linkedin, Mail, Twitter, UserRound, Globe } from "lucide-react";
import {
  profile,
  projects,
  skillGroups,
  complementarySkills,
  type PortfolioProject,
} from "../../data/home";
import { yearsOfExperience } from "../../data/profile";
import { InternalLink } from "../../components/InternalLink";
import pageContent from "../../data/pageContent.json";
import { ProjectMetrics, ProjectTechList, SectionIntro } from "../../components/PortfolioUI";
import { allSkills } from "../../data/skillCatalog";
import { companies } from "../../data/profile";
import { certifications } from "../../data/recognition";

export function HomePage({ navigate }: { navigate: (to: string) => void }) {
  const featuredDescription = (project: PortfolioProject) => project.description;
  const heroStats = [
    { value: `${yearsOfExperience()}+`, label: "Years Experience" },
    { value: String(projects.length), label: "Resume Projects" },
    { value: String(companies.length), label: "Companies" },
  ];
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
            {profile.availability && (
              <div className="availability-pill">
                <span className="green-dot">
                  <i />
                </span>
                <span>{profile.availability}</span>
              </div>
            )}
            <div className="hero-intro">
              <h1>
                Hi, I'm <span className="gradient-text">{profile.name}</span>
              </h1>
              <p className="hero-role">
                {pageContent.home.heroRole}
                <span className="hero-subtitle">{profile.subTitle}</span>
              </p>
            </div>
            <p className="hero-bio">{pageContent.home.heroBio}</p>
            <div className="hero-awards">
              {pageContent.home.heroAwards.map((label) => (
                <span className="award-chip blue-chip" key={label}>
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
                  <span>Profile photo</span>
                </div>
              </div>
              <div className="portrait-seal seal-left">
                <span>💻</span>
                <small>{profile.company}</small>
              </div>
              <div className="portrait-seal seal-right">
                <span>🎓</span>
                <small>IIIT</small>
              </div>
            </div>
            <div className="hero-mobile-awards">
              {pageContent.home.heroAwards.map((label) => (
                <span className="award-chip blue-chip" key={label}>
                  {label}
                </span>
              ))}
            </div>
            <div className="hero-stat-stack">
              {heroStats.map((stat) => (
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
      {profile.github && !profile.github.includes("YOUR_") && (
        <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
          <Github size={20} />
        </a>
      )}
      {profile.linkedin && !profile.linkedin.includes("YOUR_") && (
        <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <Linkedin size={20} />
        </a>
      )}
      {profile.x && !profile.x.includes("YOUR_") && (
        <a href={profile.x} aria-label="X">
          <Twitter size={20} />
        </a>
      )}
      {profile.portfolio && (
        <a href={profile.portfolio} aria-label="Portfolio" target="_blank" rel="noreferrer">
          <Globe size={20} />
        </a>
      )}
      {profile.email && !profile.email.includes("YOUR_") && (
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <Mail size={20} />
        </a>
      )}
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
        {complementarySkills.length > 0 && (
          <>
            <h3 className="complement-title">Complementary Technologies</h3>
            <div className="complement-chip-list">
              {complementarySkills.map((item, i) => (
                <span style={{ "--chip-order": i } as React.CSSProperties} key={`${item}-${i}`}>
                  {item}
                </span>
              ))}
            </div>
          </>
        )}
        <div className="home-skill-stats">
          <div>
            <strong>{allSkills.length}</strong>
            <span>Resume-listed Skills</span>
          </div>
          <div>
            <strong>{companies.length}</strong>
            <span>Companies</span>
          </div>
          <div>
            <strong>{certifications.length}</strong>
            <span>Certifications Listed</span>
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
      {group.skills.slice(0, 5).map((skill) => (
        <div className="summary-skill" key={skill.name}>
          <div>
            <span>◆ &nbsp;{skill.name}</span>
          </div>
        </div>
      ))}
      {group.skills.length > 5 && (
        <p className="home-skills-more">+ {group.skills.length - 5} more listed</p>
      )}
    </article>
  );
}
