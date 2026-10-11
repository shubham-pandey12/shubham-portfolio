import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Award, BookOpen, BriefcaseBusiness,
  Check, ChevronDown, Cloud, Code2, Database, ExternalLink, Github,
  GraduationCap, Linkedin, Mail, MapPin, Menu, Moon, Search, Send,
  ShieldCheck, Sun, UserRound, X, Zap, Filter, CircleHelp, BarChart3,
  CalendarDays, Star, Sparkles, Copy, Twitter, Globe, Clock3
} from "lucide-react";
import {
  allSkills, articles, awards, companies, complementarySkills, certifications,
  profile, projects, skillGroups, type PortfolioProject
} from "./content";

const paths = ["/", "/projects", "/skills", "/awards", "/articles", "/about", "/contact"];
const navItems = [
  ["Home", "/"], ["Projects", "/projects"], ["Skills", "/skills"],
  ["Awards", "/awards"], ["Articles", "/articles"], ["About", "/about"], ["Contact", "/contact"],
] as const;
const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

function routePath() { return window.location.pathname.replace(/\/$/, "") || "/"; }
function isProjectDetail(path: string) { return path.startsWith("/projects/") && path !== "/projects"; }
function InternalLink({ to, navigate, className, children, ...props }: { to: string; navigate: (to: string) => void; className?: string; children: React.ReactNode; [key: string]: unknown }) {
  return <a href={to} className={className} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate(to); }} {...props}>{children}</a>;
}

function App() {
  const [path, setPath] = useState(routePath);
  const [dark, setDark] = useState(() => localStorage.getItem("portfolio-theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const pop = () => { setPath(routePath()); setMenuOpen(false); window.scrollTo(0, 0); };
    const scroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("popstate", pop); window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("popstate", pop); window.removeEventListener("scroll", scroll); };
  }, []);
  useEffect(() => { localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); }, [dark]);
  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [path]);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to.replace(/\/$/, "") || "/"); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const detail = isProjectDetail(path) ? projects.find((project) => path.endsWith(`/${project.slug}`)) : undefined;
  const currentPage = isProjectDetail(path) ? "/projects" : path;

  return <div className={dark ? "app dark" : "app light"}>
    <Header currentPage={currentPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} dark={dark} setDark={setDark} navigate={navigate}/>
    <main key={path}>
      {path === "/" && <HomePage navigate={navigate}/>}
      {path === "/projects" && <ProjectsPage navigate={navigate}/>}
      {path === "/skills" && <SkillsPage/>}
      {path === "/awards" && <AwardsPage navigate={navigate}/>}
      {path === "/articles" && <ArticlesPage/>}
      {path === "/about" && <AboutPage navigate={navigate}/>}
      {path === "/contact" && <ContactPage/>}
      {isProjectDetail(path) && <ProjectDetailPage project={detail ?? projects[0]} navigate={navigate}/>}
      {!paths.includes(path) && !isProjectDetail(path) && <NotFound navigate={navigate}/>}
    </main>
    <Footer navigate={navigate}/>
    <button className={`scroll-top${showTop ? " visible" : ""}`} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUpRight size={18}/></button>
  </div>;
}

function Header({ currentPage, menuOpen, setMenuOpen, dark, setDark, navigate }: { currentPage: string; menuOpen: boolean; setMenuOpen: (open: boolean) => void; dark: boolean; setDark: (dark: boolean) => void; navigate: (to: string) => void }) {
  return <header className="site-header">
    <div className="header-inner container">
      <InternalLink to="/" navigate={navigate} className="brand">{profile.name}</InternalLink>
      <nav className={`desktop-nav${menuOpen ? " mobile-open" : ""}`} aria-label="Primary navigation">
        {navItems.map(([label, to]) => <InternalLink key={to} to={to} navigate={navigate} className={`nav-item${currentPage === to ? " active" : ""}`}>{label}</InternalLink>)}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark(!dark)}>{dark ? <Moon size={17}/> : <Sun size={17}/>}</button>
        <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button>
      </div>
    </div>
  </header>;
}

function HomePage({ navigate }: { navigate: (to: string) => void }) {
  const featuredDescription = (project: PortfolioProject) => {
    if (project.slug === "luxtripper-deals-enquiries") return "Frontend work on travel deals and enquiry flows.";
    if (project.slug === "multi-tenant-cms") return "Multi-tenant content management with reusable website configurations and shared publishing workflows.";
    return project.description;
  };
  return <>
    <section className="home-hero">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-glow hero-glow-blue"/>
        <span className="hero-glow hero-glow-purple"/>
        <span className="hero-glow hero-glow-pink"/>
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="availability-pill"><span className="green-dot"><i/></span><span>{profile.availability}</span></div>
          <div className="hero-intro">
            <h1>Hi, I'm <span className="gradient-text">{profile.name}</span></h1>
            <p className="hero-role">Software Engineer | Frontend &amp; Data Platforms<span className="hero-subtitle">{profile.education} · Power BI &amp; Microsoft Fabric</span></p>
          </div>
          <p className="hero-bio">I build <strong>thoughtful web experiences</strong> with React, Next.js, TypeScript, and Node.js. My background spans frontend and full-stack work, and business data solutions using Power BI, Microsoft Fabric, and Dataverse. I’ve worked with MAQ Software, Techolution, DrinkPrime, GeeksforGeeks, and Luxtripper. Personal projects include React applications and an AI Interview Thinking Partner.</p>
          <div className="hero-awards"><span className="award-chip blue-chip">🏅 PLACEHOLDER AWARD</span><span className="award-chip orange-chip">⭐ PLACEHOLDER CERTIFICATION</span></div>
          <div className="hero-tech">{["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "REST APIs", "Power BI", "Microsoft Fabric", "Dataverse", "SQL", "Full-Stack Development"].map((item) => <span key={item}>{item}</span>)}</div>
          <div className="hero-actions"><InternalLink to="/projects" navigate={navigate} className="primary-button">View My Work <ArrowRight size={16}/></InternalLink><InternalLink to="/contact" navigate={navigate} className="secondary-button">Get in Touch</InternalLink></div>
          <SocialLinks/>
        </div>
        <div className="hero-portrait-column">
          <div className="portrait-wrap"><div className="portrait-ring"><div className="portrait-placeholder"><UserRound size={70}/><span>PLACEHOLDER<br/>PROFILE IMAGE</span></div></div>
            <div className="portrait-seal seal-left"><span>💻</span><small>MAQ</small></div><div className="portrait-seal seal-right"><span>🎓</span><small>IIIT</small></div>
          </div>
          <div className="hero-mobile-awards"><span className="award-chip blue-chip">🏅 Award TBD</span><span className="award-chip orange-chip">⭐ Certification TBD</span></div>
          <div className="hero-stat-stack"><HeroStat value="TBD" label="Years Experience"/><HeroStat value="TBD" label="Projects Delivered"/><HeroStat value="TBD" label="Certifications"/></div>
        </div>
      </div>
    </section>
    <section className="featured-section page-section reveal">
      <div className="container">
        <SectionIntro title="Featured Projects" description="A selection of professional contributions and personal projects across frontend development, data experiences, and AI tools."/>
        <div className="featured-grid">{projects.slice(0, 3).map((project, index) => <FeaturedProjectCard key={project.slug} project={project} index={index} navigate={navigate} description={featuredDescription(project)}/>)}</div>
        <div className="center-action"><InternalLink to="/projects" navigate={navigate} className="primary-button">View All Projects <ArrowRight size={15}/></InternalLink></div>
      </div>
    </section>
    <HomeSkillsSection navigate={navigate}/>
  </>;
}

function HeroStat({ value, label }: { value: string; label: string }) { return <div className="hero-stat"><strong>{value}</strong><span>{label}</span></div>; }
function SocialLinks() { return <div className="social-row"><a href={profile.github} aria-label="GitHub" title="YOUR_GITHUB_URL"><Github size={20}/></a><a href={profile.linkedin} aria-label="LinkedIn" title="YOUR_LINKEDIN_URL"><Linkedin size={20}/></a><a href={profile.x} aria-label="X"><Twitter size={20}/></a><a href={profile.blog} aria-label="Blog"><BookOpen size={20}/></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={20}/></a></div>; }

function SectionIntro({ title, description, eyebrow }: { title: string; description?: string; eyebrow?: string }) {
  return <div className="section-intro"><h2>{title}</h2>{description && <p>{description}</p>}{eyebrow && <span>{eyebrow}</span>}</div>;
}
function FeaturedProjectCard({ project, index, navigate, description }: { project: PortfolioProject; index: number; navigate: (to: string) => void; description: string }) {
  return <article className="featured-project-card" style={{ "--card-order": index } as React.CSSProperties}>
    <div className="featured-card-wash" aria-hidden="true"/>
    <div className="featured-card-glow" aria-hidden="true"/>
    <div className="featured-card-surface">
      <div className="project-label-row"><span className="category-label">{project.category}</span><span className={`status-label ${project.status === "Completed" ? "complete" : "ongoing"}`}>{project.status}</span></div>
      <div className="featured-project-copy">
        <InternalLink to={`/projects/${project.slug}`} navigate={navigate} className="project-title-link"><h3>{project.title}</h3></InternalLink>
        <p className="project-description">{description}</p>
      </div>
      <ProjectTechList stack={project.stack}/>
      <ProjectMetrics metrics={project.metrics.slice(0, 2)}/>
      <div className="card-actions"><InternalLink to={`/projects/${project.slug}`} navigate={navigate} className="card-primary-link">View Details <ArrowRight size={15}/></InternalLink><a href={`https://github.com/YOUR_GITHUB_URL/${project.slug}`} aria-label="View on GitHub" title="YOUR_GITHUB_URL" className="repo-link"><Github size={17}/></a></div>
    </div>
  </article>;
}
function ProjectTechList({ stack, max = 4 }: { stack: string[]; max?: number }) {
  const [expanded, setExpanded] = useState(false); const shown = expanded ? stack : stack.slice(0, max);
  return <div className="project-tech-list">{shown.map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}{stack.length > max && <button onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : `+ ${stack.length - max} more`}</button>}</div>;
}
function ProjectMetrics({ metrics }: { metrics: { value: string; label: string }[] }) { return <div className={`project-metrics metric-count-${metrics.length}`}>{metrics.map((metric, i) => <div key={`${metric.label}-${i}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>; }

function HomeSkillsSection({ navigate }: { navigate: (to: string) => void }) {
  return <section id="skills" className="skills-home-section page-section reveal"><div className="container">
    <SectionIntro title="Skills & Technologies" description="Core technologies and tools across frontend development, application engineering, and business data platforms."/>
    <div className="home-skill-groups">{skillGroups.map((group, i) => <SkillSummaryCard key={group.title} group={group} order={i}/>)}</div>
    <h3 className="complement-title">Complementary Technologies</h3><div className="complement-chip-list">{complementarySkills.map((item, i) => <span style={{ "--chip-order": i } as React.CSSProperties} className={item.startsWith("PLACEHOLDER") ? "placeholder-chip" : undefined} key={`${item}-${i}`}>{item}</span>)}</div>
    <div className="home-skill-stats"><div><strong>16</strong><span>Core Technologies</span></div><div><strong>52+</strong><span>Complementary Skills</span></div><div><strong>TBD</strong><span>Years Experience</span></div><div><strong>TBD</strong><span>Certifications</span></div></div>
    <div className="center-action"><InternalLink to="/skills" navigate={navigate} className="primary-button">View All Skills <ArrowRight size={15}/></InternalLink></div>
  </div></section>;
}
function SkillSummaryCard({ group, order }: { group: (typeof skillGroups)[number]; order: number }) {
  return <article style={{ "--skill-order": order } as React.CSSProperties} className={`skill-summary-card skill-${group.color}`}><h3><span className="skill-glyph">{group.title === "Frontend" ? "🎨" : group.title === "Backend" ? "⚙️" : group.title === "Database" ? "💾" : group.title === "DevOps" ? "🚀" : "🤖"}</span>{group.title}</h3>
    {group.skills.map((skill, i) => <div className="summary-skill" key={skill.name}><div><span>{i === 0 ? "⚡" : i === 1 ? "📘" : "◆"} &nbsp;{skill.name}</span><small>{skill.years}{skill.years === "TBD" ? "" : "y"}</small></div><div className="skill-track"><i style={{ width: `${[92, 66, 77][i % 3]}%` }}/></div></div>)}
  </article>;
}

function ProjectsPage({ navigate }: { navigate: (to: string) => void }) {
  const [query, setQuery] = useState(""); const [sort, setSort] = useState("Newest First"); const [category, setCategory] = useState("All"); const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = useMemo(() => {
    let rows = projects.filter((project) => `${project.title} ${project.description} ${project.stack.join(" ")} ${project.category}`.toLowerCase().includes(query.toLowerCase()) && (category === "All" || project.category === category));
    if (sort === "Category") rows = [...rows].sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
    if (sort === "Title (A-Z)") rows = [...rows].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Title (Z-A)") rows = [...rows].sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "Oldest First") rows = [...rows].reverse(); return rows;
  }, [query, sort, category]);
  return <div className="projects-page page-shell">
    <div className="container">
      <PageHeading title="All Projects" description="Explore my portfolio of projects spanning frontend engineering, data experiences, full-stack development, and AI tools."/>
      <div className="project-toolbar"><label className="search-field"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects, technologies..." aria-label="Search projects"/></label><label className="sort-field"><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort projects">{["Newest First", "Oldest First", "Title (A-Z)", "Title (Z-A)", "Category"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14}/></label><div className="filter-wrap"><button className="outline-button" onClick={() => setFiltersOpen(!filtersOpen)}><Filter size={14}/> Filters</button>{filtersOpen && <div className="filter-popover">{categories.slice(1).map((item) => <button key={item} className={category === item ? "chosen" : ""} onClick={() => setCategory(category === item ? "All" : item)}>{item}{category === item && <Check size={14}/>}</button>)}</div>}</div></div>
      <div className="result-count">Showing <strong>{filtered.length}</strong> of {projects.length} projects</div>
      <div className="all-projects-grid">{filtered.map((project, index) => <ProjectListCard key={project.slug} project={project} index={index} navigate={navigate}/>)}</div>
      {filtered.length === 0 && <div className="empty-results">No projects match that search.</div>}
    </div>
  </div>;
}
function ProjectListCard({ project, index, navigate }: { project: PortfolioProject; index: number; navigate: (to: string) => void }) {
  return <article className="project-list-card">
    <div className="list-card-title-row"><InternalLink to={`/projects/${project.slug}`} navigate={navigate}><h3>{project.title}</h3></InternalLink>{project.featured && <span className="featured-flag">Featured</span>}</div>
    <p>{project.description}</p>
    <div className="project-state-tags"><span className={project.type === "Professional" ? "tag-cyan" : project.type === "PLACEHOLDER" ? "tag-gray" : "tag-purple"}>{project.type === "PLACEHOLDER" ? "PLACEHOLDER PROJECT" : project.type}</span><span className="category-label">{project.category}</span><span className={project.status === "Completed" ? "status-label complete" : "status-label ongoing"}>{project.status}</span></div>
    <ProjectTechList stack={project.stack} max={4}/><ProjectMetrics metrics={project.metrics.slice(0, index % 3 === 0 ? 4 : 2)}/>
    <InternalLink to={`/projects/${project.slug}`} navigate={navigate} className="view-details-link">View Details <ArrowRight size={14}/></InternalLink>
  </article>;
}

function SkillsPage() {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("All");
  const filtered = allSkills.filter((skill) => (category === "All" || skill.category === category) && skill.name.toLowerCase().includes(query.toLowerCase()));
  const tiers = ["Expert Level", "Advanced Level", "Intermediate Level", "Beginner Level"];
  return <div className="skills-page page-shell"><div className="container">
    <PageHeading title="Technical Skills" description="Technologies and tools across software development. Items marked PLACEHOLDER need confirmation before publication."/>
    <div className="skill-overview-stats"><StatTile icon={<Zap/>} label="Expert Level" value="TBD" tone="blue"/><StatTile icon={<Award/>} label="Certifications" value="TBD" tone="purple"/><StatTile icon={<BriefcaseBusiness/>} label="Experience" value="TBD" tone="green"/></div>
    <label className="search-field skills-search"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills (e.g., TypeScript, Azure, Docker)..." aria-label="Search skills"/></label>
    <div className="skill-filter-row">{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}{item !== "All" && <span>{allSkills.filter((skill) => skill.category === item).length}</span>}</button>)}</div>
    <div className="result-count">Showing <strong>{filtered.length}</strong> of {allSkills.length} skills</div>
    <div className="skill-tiers">{tiers.map((tier) => {const rows = filtered.filter((skill) => skill.tier === tier); if (!rows.length) return null; return <section className="skill-tier" key={tier}><div className="tier-heading"><h2>{tier}</h2><span>{rows.length} skills</span></div><div className="detailed-skills-grid">{rows.map((skill, i) => <SkillDetailCard key={`${skill.name}-${i}`} skill={skill}/>)}</div></section>;})}</div>
    <div className="proficiency-panel"><h2>Proficiency Distribution</h2><div className="distribution-grid">{[["TBD","Expert","green"],["TBD","Advanced","blue"],["TBD","Intermediate","orange"],["TBD","Beginner","gray"]].map(([value,label,tone]) => <div key={label}><strong className={`distribution-${tone}`}>{value}</strong><span>{label}</span><small>Placeholder</small></div>)}</div></div>
  </div></div>;
}
function SkillDetailCard({ skill }: { skill: (typeof allSkills)[number] }) {
  const percent = skill.placeholder ? 60 : 72;
  return <article className={`detailed-skill-card${skill.placeholder ? " placeholder-skill" : ""}`}><div className="skill-name-row"><span className="skill-symbol">{skill.placeholder ? "◆" : skill.name === "React" ? "⚛" : skill.name === "TypeScript" ? "📘" : "◈"}</span><strong>{skill.name}</strong>{skill.placeholder && <small className="placeholder-label">PLACEHOLDER</small>}<b>{skill.years}<small>{skill.years === "TBD" ? "" : " years"}</small></b></div><span className="skill-category-name">{skill.category}</span><div className="skill-track"><i style={{ width: `${percent}%` }}/></div></article>;
}
function StatTile({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) { return <div className={`stat-tile tone-${tone}`}><span>{icon}</span><div><strong>{value}</strong><small>{label}</small></div></div>; }

function AwardsPage({ navigate }: { navigate: (to: string) => void }) {
  return <div className="awards-page page-shell"><div className="container"><PageHeading title="Awards & Certifications" description="Professional recognitions and industry certifications. Replace each placeholder with your confirmed details."/>
    <div className="content-section"><SectionHeader icon={<Award/>} title="Featured Recognitions"/><div className="awards-grid">{awards.map((item, i) => <AwardCard key={i} item={item}/>)}</div></div>
    <div className="content-section"><SectionHeader icon={<ShieldCheck/>} title="Cloud Certifications"/><div className="certification-grid">{certifications.map((item, i) => <AwardCard key={i} item={item}/>)}</div></div>
    <section className="professional-summary-box"><h2>Professional Summary</h2><div className="summary-stats">{[["TBD","Certifications"],["TBD","Professional Awards"],["TBD","Azure Certifications"],["TBD","Other Certifications"]].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
  </div></div>;
}
function SectionHeader({ icon, title, action, onAction }: { icon: React.ReactNode; title: string; action?: string; onAction?: () => void }) { return <div className="content-section-header"><h2><span>{icon}</span>{title}</h2>{action && <button onClick={onAction}>{action}<ArrowRight size={14}/></button>}</div>; }
function AwardCard({ item }: { item: { title: string; organization: string; date: string; description: string; type: string; id?: string } }) {
  return <article className="award-card"><div className="award-kind">{item.type}</div><h3>{item.title}</h3><p className="award-org">{item.organization}</p><p className="award-date">{item.date}</p><p>{item.description}</p>{item.id && <div className="credential-id">Credential ID: <strong>{item.id}</strong></div>}<a href="https://YOUR_CREDENTIAL_URL" className="verify-link">Verify <ExternalLink size={13}/></a></article>;
}

function ArticlesPage() {
  return <div className="articles-page page-shell"><div className="container"><div className="articles-intro"><span className="eyebrow-pill"><BookOpen size={15}/> Technical Writing</span><h1>Latest Articles</h1><p>Latest 15 articles about software engineering, frontend development, and technology.</p></div><div className="articles-placeholder-grid">{articles.map((item, i) => <article key={i} className="article-card"><div className="article-image-placeholder"><span>PLACEHOLDER ARTICLE IMAGE</span></div><div className="article-card-body"><span className="category-label">{item.category}</span><h2>{item.title}</h2><p>{item.description}</p><div className="article-card-footer"><span>{item.date}</span><a href={item.url}>Read Article <ArrowUpRight size={14}/></a></div></div></article>)}</div></div></div>;
}

function AboutPage({ navigate }: { navigate: (to: string) => void }) {
  return <div className="about-page page-shell"><div className="container">
    <PageHeading title="About Me" description="Software engineering and frontend development with a focus on useful, clear digital experiences."/>
    <div className="about-summary-grid">
      <aside className="about-profile-card"><Portrait small/><h2>{profile.name}</h2><p>{profile.title}</p><div className="about-badges"><span>PLACEHOLDER AWARD</span><span>PLACEHOLDER CERTIFICATION</span></div><p className="about-location"><MapPin size={14}/>{profile.location}</p><a href={`mailto:${profile.email}`} className="about-email"><Mail size={14}/>{profile.email}</a><h3>Quick Stats</h3><div className="quick-stats-grid">{[["TBD","Years Exp.","blue"],["TBD","Certifications","purple"],["TBD","Technologies","green"],["TBD","Projects","orange"]].map(([value,label,tone]) => <div className={`quick-stat ${tone}`} key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></aside>
      <section className="about-narrative"><h2>Professional Summary</h2><p>{profile.biography}</p><p>I currently work at {profile.company}. My previous experience includes Techolution, DrinkPrime, and GeeksforGeeks. More detailed responsibilities, outcomes, and project context can be added after you confirm the specifics.</p><p>My education is a B.Tech in Information Technology from IIIT Vadodara. This profile keeps dates, performance figures, and awards as explicit placeholders until verified.</p><hr/><h3>Professional Goals</h3><p><strong>Seeking:</strong> YOUR_TARGET_ROLE — replace this placeholder with the roles and opportunities you want to highlight.</p><p><strong>Focus Areas:</strong> React, Next.js, TypeScript, application experiences, data platforms, and practical AI tooling.</p><hr/><h3>Core Competencies</h3><div className="competency-grid">{[["Frontend Engineering",["React and Next.js", "TypeScript and JavaScript", "Accessible responsive interfaces"]],["Full Stack Development",["Node.js", "SQL and data integration", "REST API workflows"]],["Data & Platforms",["Power BI", "Microsoft Fabric", "Dataverse"]],["Quality & Collaboration",["PLACEHOLDER: Add confirmed practices", "PLACEHOLDER: Add confirmed tools", "PLACEHOLDER: Add team contributions"]]].map(([title,items]) => <div key={title as string}><h4>{title as string}</h4><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
    </div>
    <section className="content-section experience-section"><SectionHeader icon={<BriefcaseBusiness/>} title="Professional Experience"/><div className="experience-list">{companies.map((item, i) => <ExperienceCard key={`${item.company}-${i}`} item={item}/>)}</div></section>
    <section className="content-section education-section"><SectionHeader icon={<GraduationCap/>} title="Education"/><div className="education-grid"><EducationCard title="B.Tech in Information Technology" area="Information Technology" organization="Indian Institute of Information Technology, Vadodara" date="YOUR_START_DATE – YOUR_END_DATE"/><EducationCard title="PLACEHOLDER DEGREE" area="YOUR FIELD OF STUDY" organization="YOUR INSTITUTION" date="YOUR_START_DATE – YOUR_END_DATE" placeholder/></div></section>
    <section className="content-section"><SectionHeader icon={<Award/>} title="Featured Certifications & Awards" action="View All" onAction={() => navigate("/awards")}/><div className="about-cert-grid">{[...awards.slice(0, 2), ...certifications.slice(0, 4)].map((item, i) => <AwardCard key={i} item={item}/>)}</div></section>
    <section className="career-highlights"><h2>Career Highlights</h2><div className="career-grid">{[["TBD","Years of Experience"],["TBD","Projects Delivered"],["TBD","Certifications"],["TBD","Technologies"],["TBD","Users Served"],["TBD","Test Coverage"],["TBD","Time Saved"],["TBD","Response Time"]].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
  </div></div>;
}
function Portrait({ small = false }: { small?: boolean }) { return <div className={`portrait-wrap ${small ? "small-portrait" : ""}`}><div className="portrait-ring"><div className="portrait-placeholder"><UserRound size={small ? 42 : 70}/><span>PLACEHOLDER<br/>PROFILE IMAGE</span></div></div></div>; }
function ExperienceCard({ item }: { item: (typeof companies)[number] }) {
  return <article className="experience-card"><div className="experience-top"><div><h3>{item.role}</h3><strong>{item.company}</strong></div><span className="experience-date"><CalendarDays size={13}/>{item.date}</span></div><p className="experience-meta">PLACEHOLDER LOCATION · PLACEHOLDER EMPLOYMENT TYPE</p><p>{item.text}</p><h4>Key Responsibilities:</h4><ul><li>PLACEHOLDER: Add a confirmed responsibility.</li><li>PLACEHOLDER: Add another confirmed responsibility.</li></ul><h4>Key Achievements:</h4><ul><li>PLACEHOLDER: Add a verified achievement or remove this item.</li></ul><ProjectTechList stack={["React", "TypeScript", "JavaScript", "PLACEHOLDER TECHNOLOGY", "PLACEHOLDER TECHNOLOGY"]}/></article>;
}
function EducationCard({ title, area, organization, date, placeholder = false }: { title: string; area: string; organization: string; date: string; placeholder?: boolean }) { return <article className={`education-card${placeholder ? " placeholder-card" : ""}`}><h3>{title}</h3><p className="education-area">{area}</p><p>{organization}</p><span><CalendarDays size={13}/>{date}</span><p>{placeholder ? "PLACEHOLDER: Add verified education details." : "PLACEHOLDER: Add optional coursework, honors, or project details."}</p></article>; }

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <div className="contact-page page-shell"><div className="container"><PageHeading title="Get in Touch" description="Have a project in mind or want to discuss opportunities? Use the contact links below after replacing the placeholders."/>
    <div className="contact-layout"><aside className="contact-aside"><section className="contact-card"><h2>Contact Information</h2><a href={`mailto:${profile.email}`}><Mail size={19}/><span>Email<small>{profile.email}</small></span></a><div><MapPin size={19}/><span>Location<small>{profile.location}</small></span></div></section><section className="contact-card"><h2>Connect With Me</h2><a href={profile.github}><Github size={20}/> GitHub</a><a href={profile.linkedin}><Linkedin size={20}/> LinkedIn</a><a href={profile.x}><Twitter size={20}/> X</a></section><section className="availability-card"><h3>Currently Available</h3><p>PLACEHOLDER: Replace with your current availability and preferred opportunities.</p></section></aside>
      <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><h2>Send Me a Message</h2><label>Name *<input required placeholder="YOUR_NAME"/></label><label>Email *<input type="email" required placeholder="YOUR_EMAIL@example.com"/></label><label>Subject *<input required placeholder="YOUR_SUBJECT"/></label><label>Message *<textarea required rows={5} placeholder="YOUR_MESSAGE"/></label><button className="send-button" type="submit"><Send size={16}/>{sent ? "Demo form received" : "Send Message"}</button><p className="privacy-note"><ShieldCheck size={13}/> PLACEHOLDER: Connect a form provider before collecting messages.</p></form></div>
    <section className="faq-section"><h2>Frequently Asked Questions</h2><div className="faq-grid">{[["Response Time","PLACEHOLDER: Add your expected response time."],["Project Types","PLACEHOLDER: Add the projects you are open to."],["Consultation","PLACEHOLDER: Add consultation availability."],["Collaboration","PLACEHOLDER: Add collaboration preferences."]].map(([title,text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  </div></div>;
}

function ProjectDetailPage({ project, navigate }: { project: PortfolioProject; navigate: (to: string) => void }) {
  const [moreFeatures, setMoreFeatures] = useState(false); const [openChallenge, setOpenChallenge] = useState<number | null>(0); const [moreChallenges, setMoreChallenges] = useState(false); const [moreTech, setMoreTech] = useState(false);
  const challenges = moreChallenges ? project.challenges : project.challenges.slice(0, 3);
  return <div className="project-detail-page page-shell"><div className="container">
    <button className="back-link" onClick={() => navigate("/projects")}><ArrowLeft size={14}/> Back to Projects</button>
    <div className="detail-heading"><div className="project-state-tags"><span className="featured-flag">Featured Project</span><span className="tag-green">{project.type === "PLACEHOLDER" ? "PLACEHOLDER TYPE" : project.type}</span><span className="tag-purple">{project.category}</span><span className="status-label complete">{project.status}</span></div><h1>{project.title}</h1><p>{project.description}</p><a className="github-button" href={`https://github.com/YOUR_GITHUB_URL/${project.slug}`}><Github size={15}/> View on GitHub</a></div>
    <div className="project-detail-grid"><div className="detail-main-column">
      <DetailPanel title="Overview"><p>{project.overview}</p><p>PLACEHOLDER: Add implementation context, scope, and your specific contribution where they are confirmed.</p></DetailPanel>
      <DetailPanel title="Technologies & Tools"><div className="detail-tech-list">{(moreTech ? [...project.stack, "PLACEHOLDER TECHNOLOGY", "PLACEHOLDER TECHNOLOGY", "PLACEHOLDER TECHNOLOGY", "PLACEHOLDER TECHNOLOGY"] : project.stack).map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}</div>{!moreTech && <button className="show-more-button" onClick={() => setMoreTech(true)}>Show {4} More</button>}</DetailPanel>
      <DetailPanel title="Architecture & System Design"><div className="architecture-diagram">{project.architecture.map((item, i) => <div key={`${item}-${i}`}><span>{item}</span>{i < project.architecture.length - 1 && <ArrowRight size={18}/>}</div>)}</div><p className="panel-caption">PLACEHOLDER: Replace this diagram and caption with the approved architecture.</p></DetailPanel>
      <DetailPanel title="Performance Metrics"><div className="performance-placeholder"><div className="placeholder-window"><span>PLACEHOLDER PERFORMANCE VISUALIZATION</span><div className="metric-bars">{[70,52,84,63,42,76].map((width,i)=><i key={i} style={{width:`${width}%`}}/>)}</div></div><p>PLACEHOLDER: Add measured and verified project results.</p></div></DetailPanel>
      <DetailPanel title="Application Screenshots"><div className="screenshot-grid">{project.screenshots.map((caption,i)=><div className="screenshot-item" key={i}><div className="fake-screenshot"><div className="fake-browser-bar"><i/><i/><i/><span>PLACEHOLDER_PREVIEW</span></div><div className="fake-screen-content"><span className="fake-side-nav"/><div><i/><i/><b/></div></div><span className="image-placeholder-text">{caption}</span></div><p>{caption}</p></div>)}</div></DetailPanel>
      <DetailPanel title="Key Features"><ol className="feature-list">{(moreFeatures ? [...project.features, "PLACEHOLDER: Add a confirmed feature.", "PLACEHOLDER: Add another verified feature."] : project.features.slice(0, 5)).map((feature,i)=><li key={`${feature}-${i}`}><span>{i+1}</span>{feature}</li>)}</ol>{project.features.length > 5 && <button className="show-more-button" onClick={() => setMoreFeatures(!moreFeatures)}><ChevronDown size={14}/>{moreFeatures ? "Show Less" : `Show ${project.features.length - 5} More`}</button>}</DetailPanel>
      <DetailPanel title="Challenges & Solutions"><div className="challenge-list">{challenges.map((item,i)=><article key={item.title}><button onClick={() => setOpenChallenge(openChallenge === i ? null : i)}><strong>{item.title}</strong><ChevronDown size={15}/></button>{openChallenge === i && <div className="challenge-content"><p><b>Challenge:</b> {item.challenge}</p><p><b>Solution:</b> {item.solution}</p></div>}</article>)}</div>{project.challenges.length > 3 && <button className="show-more-button" onClick={() => setMoreChallenges(!moreChallenges)}>{moreChallenges ? "Show Less" : `Show ${project.challenges.length - 3} More`}</button>}</DetailPanel>
    </div><aside className="detail-sidebar"><DetailPanel title="Project Information"><div className="info-line"><CalendarDays size={15}/><span><b>Timeline</b><small>Started: YOUR_START_DATE<br/>Last updated: YOUR_DATE</small></span></div><div className="info-line"><BriefcaseBusiness size={15}/><span><b>Role</b><small>YOUR_ROLE<br/>YOUR_TEAM</small></span></div></DetailPanel><DetailPanel title="Project Metrics"><ProjectMetrics metrics={project.metrics.slice(0,4)}/></DetailPanel><DetailPanel title="External Links"><a className="external-project-link" href={`https://github.com/YOUR_GITHUB_URL/${project.slug}`}><Github size={14}/> View on GitHub <ExternalLink size={13}/></a><a className="external-project-link" href="https://YOUR_DEMO_URL"><Globe size={14}/> Live Demo <ExternalLink size={13}/></a></DetailPanel></aside></div>
  </div></div>;
}
function DetailPanel({ title, children }: { title: string; children: React.ReactNode }) { return <section className="detail-panel"><h2>{title}</h2>{children}</section>; }

function PageHeading({ title, description }: { title: string; description?: string }) { return <div className="page-heading"><h1>{title}</h1>{description && <p>{description}</p>}</div>; }
function Footer({ navigate }: { navigate: (to: string) => void }) {
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <div className="footer-brand"><InternalLink to="/" navigate={navigate}>{profile.name}</InternalLink><p>{profile.title}</p><span><MapPin size={16}/>{profile.location}</span></div>
      <div className="footer-quick"><h3>Quick Links</h3><nav>{[["Projects","/projects"],["Skills","/skills"],["About","/about"],["Contact","/contact"]].map(([label,to])=><InternalLink key={to} to={to} navigate={navigate}>{label}</InternalLink>)}</nav></div>
      <div className="footer-connect"><h3>Connect</h3><div><a target="_blank" rel="noopener noreferrer" href={profile.github} aria-label="GitHub"><Github size={20}/></a><a target="_blank" rel="noopener noreferrer" href={profile.linkedin} aria-label="LinkedIn"><Linkedin size={20}/></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={20}/></a></div></div>
    </div>
    <div className="footer-divider" role="separator" aria-orientation="horizontal"/>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p><p>Open to opportunities · Last updated {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}</p></div>
  </div></footer>;
}
function NotFound({ navigate }: { navigate: (to: string) => void }) { return <div className="not-found container"><h1>Page not found</h1><InternalLink to="/" navigate={navigate} className="primary-button">Back Home <ArrowRight size={15}/></InternalLink></div>; }

export default App;
