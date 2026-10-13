import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "./data/projects";
import { fetchPortfolioProjects } from "./data/githubProjects";
import { fetchPortfolioArticles } from "./data/githubArticles";
import { profile } from "./data/profile";
import { articles } from "./data/recognition";
import { Header, Footer, NotFound } from "./components/SiteLayout";
import { HomePage } from "./features/home/HomePage";
import { ProjectsPage } from "./features/projects/ProjectsPage";
import { ProjectDetailPage } from "./features/projects/ProjectDetailPage";
import { SkillsPage } from "./features/skills/SkillsPage";
import { AwardsPage } from "./features/awards/AwardsPage";
import { ArticlesPage } from "./features/articles/ArticlesPage";
import { AboutPage } from "./features/about/AboutPage";
import { ContactPage } from "./features/contact/ContactPage";

const paths = ["/", "/projects", "/skills", "/awards", "/articles", "/about", "/contact"];
const githubUsername = profile.github.replace(/\/+$/, "").split("/").pop() || "";
function routePath() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function isProjectDetail(path: string) {
  return path.startsWith("/projects/") && path !== "/projects";
}

function App() {
  const [path, setPath] = useState(routePath);
  const [allProjects, setAllProjects] = useState(projects);
  const [allArticles, setAllArticles] = useState(articles);
  const [dark, setDark] = useState(() => localStorage.getItem("portfolio-theme") !== "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const pop = () => {
      setPath(routePath());
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    const scroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("popstate", pop);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("popstate", pop);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  }, [dark]);
  useEffect(() => {
    let cancelled = false;
    if (!githubUsername) return;
    void fetchPortfolioProjects(githubUsername, projects).then((items) => {
      if (!cancelled) setAllProjects(items);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    let cancelled = false;
    void fetchPortfolioArticles(articles).then((items) => {
      if (!cancelled) setAllArticles(items);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>(".reveal")];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [path]);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to.replace(/\/$/, "") || "/");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const detail = isProjectDetail(path)
    ? allProjects.find((project) => path.endsWith(`/${project.slug}`))
    : undefined;
  const currentPage = isProjectDetail(path) ? "/projects" : path;

  return (
    <div className={dark ? "app dark" : "app light"}>
      <Header
        currentPage={currentPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        dark={dark}
        setDark={setDark}
        navigate={navigate}
      />
      <main key={path}>
        {path === "/" && (
          <HomePage navigate={navigate} projects={allProjects} articles={allArticles} />
        )}
        {path === "/projects" && <ProjectsPage navigate={navigate} projects={allProjects} />}
        {path === "/skills" && <SkillsPage />}
        {path === "/awards" && <AwardsPage />}
        {path === "/articles" && <ArticlesPage articles={allArticles} />}
        {path === "/about" && <AboutPage navigate={navigate} />}
        {path === "/contact" && <ContactPage />}
        {isProjectDetail(path) &&
          (detail ? (
            <ProjectDetailPage project={detail} navigate={navigate} />
          ) : (
            <NotFound navigate={navigate} />
          ))}
        {!paths.includes(path) && !isProjectDetail(path) && <NotFound navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
      <button
        className={`scroll-top${showTop ? " visible" : ""}`}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpRight size={18} />
      </button>
    </div>
  );
}

export default App;
