import { useState } from "react";
import { Award, BriefcaseBusiness, Search, Zap } from "lucide-react";
import { allSkills } from "../../data/skills";

const skillCategories = ["All", ...Array.from(new Set(allSkills.map((skill) => skill.category)))];
import { PageHeading, StatTile } from "../../components/PortfolioUI";

export function SkillsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = allSkills.filter(
    (skill) =>
      (category === "All" || skill.category === category) &&
      skill.name.toLowerCase().includes(query.toLowerCase()),
  );
  const tiers = ["Expert Level", "Advanced Level", "Intermediate Level", "Beginner Level"];
  return (
    <div className="skills-page page-shell">
      <div className="container">
        <PageHeading
          title="Technical Skills"
          description="Technologies and tools across software development. Items marked PLACEHOLDER need confirmation before publication."
        />
        <div className="skill-overview-stats">
          <StatTile icon={<Zap />} label="Expert Level" value="TBD" tone="blue" />
          <StatTile icon={<Award />} label="Certifications" value="TBD" tone="purple" />
          <StatTile icon={<BriefcaseBusiness />} label="Experience" value="TBD" tone="green" />
        </div>
        <label className="search-field skills-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills (e.g., TypeScript, Azure, Docker)..."
            aria-label="Search skills"
          />
        </label>
        <div className="skill-filter-row">
          {skillCategories.map((item) => (
            <button
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
              {item !== "All" && (
                <span>{allSkills.filter((skill) => skill.category === item).length}</span>
              )}
            </button>
          ))}
        </div>
        <div className="result-count">
          Showing <strong>{filtered.length}</strong> of {allSkills.length} skills
        </div>
        <div className="skill-tiers">
          {tiers.map((tier) => {
            const rows = filtered.filter((skill) => skill.tier === tier);
            if (!rows.length) return null;
            return (
              <section className="skill-tier" key={tier}>
                <div className="tier-heading">
                  <h2>{tier}</h2>
                  <span>{rows.length} skills</span>
                </div>
                <div className="detailed-skills-grid">
                  {rows.map((skill, i) => (
                    <SkillDetailCard key={`${skill.name}-${i}`} skill={skill} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <div className="proficiency-panel">
          <h2>Proficiency Distribution</h2>
          <div className="distribution-grid">
            {[
              ["TBD", "Expert", "green"],
              ["TBD", "Advanced", "blue"],
              ["TBD", "Intermediate", "orange"],
              ["TBD", "Beginner", "gray"],
            ].map(([value, label, tone]) => (
              <div key={label}>
                <strong className={`distribution-${tone}`}>{value}</strong>
                <span>{label}</span>
                <small>Placeholder</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillDetailCard({ skill }: { skill: (typeof allSkills)[number] }) {
  const percent = skill.placeholder ? 60 : 72;
  return (
    <article className={`detailed-skill-card${skill.placeholder ? " placeholder-skill" : ""}`}>
      <div className="skill-name-row">
        <span className="skill-symbol">
          {skill.placeholder
            ? "◆"
            : skill.name === "React"
              ? "⚛"
              : skill.name === "TypeScript"
                ? "📘"
                : "◈"}
        </span>
        <strong>{skill.name}</strong>
        {skill.placeholder && <small className="placeholder-label">PLACEHOLDER</small>}
        <b>
          {skill.years}
          <small>{skill.years === "TBD" ? "" : " years"}</small>
        </b>
      </div>
      <span className="skill-category-name">{skill.category}</span>
      <div className="skill-track">
        <i style={{ width: `${percent}%` }} />
      </div>
    </article>
  );
}
