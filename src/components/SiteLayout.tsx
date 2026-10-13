import { ArrowRight, Github, Linkedin, Mail, MapPin, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "../data/profile";

const navItems = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Skills", "/skills"],
  ["Awards", "/awards"],
  ["Articles", "/articles"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;
import { InternalLink } from "./InternalLink";
export function Header({
  currentPage,
  menuOpen,
  setMenuOpen,
  dark,
  setDark,
  navigate,
}: {
  currentPage: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
  navigate: (to: string) => void;
}) {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <InternalLink to="/" navigate={navigate} className="brand">
          {profile.name}
        </InternalLink>
        <nav
          className={`desktop-nav${menuOpen ? " mobile-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map(([label, to]) => (
            <InternalLink
              key={to}
              to={to}
              navigate={navigate}
              className={`nav-item${currentPage === to ? " active" : ""}`}
            >
              {label}
            </InternalLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark(!dark)}
          >
            {dark ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer({ navigate }: { navigate: (to: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <InternalLink to="/" navigate={navigate}>
              {profile.name}
            </InternalLink>
            <p>{profile.title}</p>
            <span>
              <MapPin size={16} />
              {profile.location}
            </span>
          </div>
          <div className="footer-quick">
            <h3>Quick Links</h3>
            <nav>
              {[
                ["Projects", "/projects"],
                ["Skills", "/skills"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <InternalLink key={to} to={to} navigate={navigate}>
                  {label}
                </InternalLink>
              ))}
            </nav>
          </div>
          <div className="footer-connect">
            <h3>Connect</h3>
            <div>
              {profile.github && !profile.github.includes("YOUR_") && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={profile.github}
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {profile.linkedin && !profile.linkedin.includes("YOUR_") && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={profile.linkedin}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {profile.email && !profile.email.includes("YOUR_") && (
                <a href={`mailto:${profile.email}`} aria-label="Email">
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="footer-divider" role="separator" aria-orientation="horizontal" />
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>
            Last updated {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function NotFound({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div className="not-found container">
      <h1>Page not found</h1>
      <InternalLink to="/" navigate={navigate} className="primary-button">
        Back Home <ArrowRight size={15} />
      </InternalLink>
    </div>
  );
}
