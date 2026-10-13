import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "./data/projects";
import { fetchPortfolioProjects } from "./data/githubProjects";
import { fetchPortfolioArticles } from "./data/githubArticles";
import { fetchPortfolioCertifications } from "./data/githubCertifications";
import { profile } from "./data/profile";
import { articles, certifications } from "./data/recognition";
import { Header, Footer, NotFound } from "./components/SiteLayout";

const HomePage = lazy(() =>
  import("./features/home/HomePage").then((module) => ({ default: module.HomePage })),
);
const ProjectsPage = lazy(() =>
  import("./features/projects/ProjectsPage").then((module) => ({ default: module.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import("./features/projects/ProjectDetailPage").then((module) => ({
    default: module.ProjectDetailPage,
  })),
);
const SkillsPage = lazy(() =>
  import("./features/skills/SkillsPage").then((module) => ({ default: module.SkillsPage })),
);
const AwardsPage = lazy(() =>
  import("./features/awards/AwardsPage").then((module) => ({ default: module.AwardsPage })),
);
const ArticlesPage = lazy(() =>
  import("./features/articles/ArticlesPage").then((module) => ({ default: module.ArticlesPage })),
);
const AboutPage = lazy(() =>
  import("./features/about/AboutPage").then((module) => ({ default: module.AboutPage })),
);
const ContactPage = lazy(() =>
  import("./features/contact/ContactPage").then((module) => ({ default: module.ContactPage })),
);

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
  const [allCertifications, setAllCertifications] = useState(certifications);
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
    if (!githubUsername || !(path === "/" || path === "/projects" || isProjectDetail(path))) return;
    void fetchPortfolioProjects(githubUsername, projects).then((items) => {
      if (!cancelled) setAllProjects(items);
    });
    return () => {
      cancelled = true;
    };
  }, [path]);
  useEffect(() => {
    let cancelled = false;
    if (path !== "/" && path !== "/articles") return;
    void fetchPortfolioArticles(articles).then((items) => {
      if (!cancelled) setAllArticles(items);
    });
    return () => {
      cancelled = true;
    };
  }, [path]);
  useEffect(() => {
    let cancelled = false;
    if (path !== "/" && path !== "/skills" && path !== "/awards" && path !== "/about") return;
    void fetchPortfolioCertifications(certifications).then((items) => {
      if (!cancelled) setAllCertifications(items);
    });
    return () => {
      cancelled = true;
    };
  }, [path]);
  useEffect(() => {
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
    const observeReveals = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>(".reveal:not(.revealed)")
        .forEach((node) => observer.observe(node));
    };
    observeReveals(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(".reveal:not(.revealed)")) observer.observe(node);
            observeReveals(node);
          }
        }),
      );
    });
    mutations.observe(document.querySelector("main")!, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
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
        <Suspense fallback={<div className="route-loading" aria-label="Loading page" />}>
          {path === "/" && (
            <HomePage
              navigate={navigate}
              projects={allProjects}
              articles={allArticles}
              certificateCount={allCertifications.length}
            />
          )}
          {path === "/projects" && <ProjectsPage navigate={navigate} projects={allProjects} />}
          {path === "/skills" && <SkillsPage certificateCount={allCertifications.length} />}
          {path === "/awards" && <AwardsPage certifications={allCertifications} />}
          {path === "/articles" && <ArticlesPage articles={allArticles} />}
          {path === "/about" && (
            <AboutPage navigate={navigate} certifications={allCertifications} />
          )}
          {path === "/contact" && <ContactPage />}
          {isProjectDetail(path) &&
            (detail ? (
              <ProjectDetailPage project={detail} navigate={navigate} />
            ) : (
              <NotFound navigate={navigate} />
            ))}
          {!paths.includes(path) && !isProjectDetail(path) && <NotFound navigate={navigate} />}
        </Suspense>
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
