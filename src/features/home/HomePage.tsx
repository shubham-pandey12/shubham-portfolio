import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Twitter, Globe } from "lucide-react";
import { profile, skillGroups, complementarySkills, type PortfolioProject } from "../../data/home";
import { yearsOfExperience } from "../../data/profile";
import { InternalLink } from "../../components/InternalLink";
import { SkillIcon } from "../../components/SkillIcon";
import pageContent from "../../data/pageContent.json";
import {
  Portrait,
  ProjectMetrics,
  ProjectTechList,
  SectionIntro,
} from "../../components/PortfolioUI";
import { companies } from "../../data/profile";
import type { PortfolioArticle } from "../../data/recognition";
import { orderProjectsBySlug, readSavedProjectOrder } from "../projects/projectOrder";

export function HomePage({
  navigate,
  projects,
  articles,
  certificateCount,
}: {
  navigate: (to: string) => void;
  projects: PortfolioProject[];
  articles: PortfolioArticle[];
  certificateCount: number;
}) {
  const [savedProjectOrder, setSavedProjectOrder] = useState(readSavedProjectOrder);
  const featuredDescription = (project: PortfolioProject) => project.description;
  const featuredProjects = useMemo(
    () => orderProjectsBySlug(projects, savedProjectOrder).slice(0, 3),
    [projects, savedProjectOrder],
  );
  useEffect(() => {
    const syncProjectOrder = () => setSavedProjectOrder(readSavedProjectOrder());
    window.addEventListener("storage", syncProjectOrder);
    return () => window.removeEventListener("storage", syncProjectOrder);
  }, []);
  const heroStats = [
    { value: `${yearsOfExperience()}+`, label: "Years Experience" },
    { value: String(projects.length), label: "Projects" },
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
            <Portrait>
              <div className="portrait-seal seal-left">
                <span>⭐️</span>
                {/* <small>{profile.company}</small> */}
              </div>
              <div className="portrait-seal seal-right">
                <span>🎓</span>
                <small>IIIT</small>
              </div>
            </Portrait>
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
            {featuredProjects.map((project, index) => (
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
      <section className="featured-section page-section reveal home-articles-section">
        <div className="container">
          <SectionIntro
            title={pageContent.home.articlesTitle}
            description={pageContent.home.articlesDescription}
          />
          <div className="featured-grid">
            {articles.slice(0, 3).map((article, index) => (
              <TechnicalArticleCard
                key={article.url || article.title}
                article={article}
                index={index}
              />
            ))}
          </div>
          <div className="center-action">
            <InternalLink to="/articles" navigate={navigate} className="primary-button">
              View All Articles <ArrowRight size={15} />
            </InternalLink>
          </div>
        </div>
      </section>
      <HomeSkillsSection navigate={navigate} certificateCount={certificateCount} />
    </>
  );
}

function TechnicalArticleCard({ article, index }: { article: PortfolioArticle; index: number }) {
  return (
    <article
      className="featured-project-card home-article-card"
      style={{ "--card-order": index } as React.CSSProperties}
    >
      <div className="featured-card-wash" aria-hidden="true" />
      <div className="featured-card-glow" aria-hidden="true" />
      <div className="featured-card-surface">
        <div className="project-label-row">
          <span className="category-label">{article.category}</span>
          <span className="home-article-date">{article.date}</span>
        </div>
        <div className="featured-project-copy">
          {article.url ? (
            <a
              href={article.url}
              className="project-title-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{article.title}</h3>
            </a>
          ) : (
            <h3 className="home-article-title">{article.title}</h3>
          )}
          <p className="project-description">{article.description}</p>
        </div>
        {article.url && (
          <div className="card-actions">
            <a
              href={article.url}
              className="card-primary-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Article <ArrowUpRight size={15} />
            </a>
          </div>
        )}
      </div>
    </article>
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

export function HomeSkillsSection({
  navigate,
  certificateCount,
}: {
  navigate: (to: string) => void;
  certificateCount: number;
}) {
  return (
    <section id="skills" className="skills-home-section page-section reveal">
      <div className="container">
        <SectionIntro
          title="Skills & Technologies"
          description="Core technologies I work with across full-stack development, cloud platforms, and tooling."
        />
        <div className="home-skill-groups">
          {skillGroups.map((group, i) => (
            <SkillSummaryCard key={group.title} group={group} order={i} />
          ))}
        </div>
        <h3 className="complement-title">Complementary Technologies</h3>
        <div className="complement-chip-list">
          {complementarySkills.map((skill, i) => (
            <span style={{ "--chip-order": i } as React.CSSProperties} key={skill.name}>
              <SkillIcon name={skill.icon} />
              {skill.name}
            </span>
          ))}
        </div>
        <div className="home-skill-stats">
          <div>
            <strong>{skillGroups.reduce((sum, group) => sum + group.skills.length, 0)}</strong>
            <span>Core Technologies</span>
          </div>
          <div>
            <strong>{complementarySkills.length}</strong>
            <span>Complementary Skills</span>
          </div>
          <div>
            <strong>{yearsOfExperience()}+</strong>
            <span>Years Experience</span>
          </div>
          <div>
            <strong>{certificateCount}</strong>
            <span>Certificates</span>
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
        <SkillIcon name={group.icon} className="skill-glyph" />
        {group.title}
      </h3>
      {group.skills.map((skill, index) => (
        <div className="summary-skill" key={skill.name}>
          <div>
            <span>
              <SkillIcon name={skill.icon} className="summary-skill-icon" />
              {skill.name}
            </span>
            <small>{skill.years}y</small>
          </div>
          <div className="skill-track">
            <i
              style={{ width: `${skill.progress}%`, "--bar-order": index } as React.CSSProperties}
            />
          </div>
        </div>
      ))}
    </article>
  );
}
