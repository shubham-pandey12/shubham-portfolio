import { useMemo, useState } from "react";
import { allSkills } from "../../data/skillCatalog";
import { SkillLevelSection } from "./components/SkillLevelSection";
import { SkillsControls } from "./components/SkillsControls";
import { SkillsOverview } from "./components/SkillsOverview";
import { SkillsPageHeader } from "./components/SkillsPageHeader";
import "./skills.css";

const skillCategories = [...new Set(allSkills.map((skill) => skill.category))];

export function SkillsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filteredSkills = useMemo(
    () =>
      allSkills.filter(
        (skill) =>
          (category === "All" || skill.category === category) &&
          skill.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );

  return (
    <div className="skills-reference-page">
      <div className="skills-reference-container">
        <SkillsPageHeader />
        <SkillsOverview />
        <SkillsControls
          categories={skillCategories}
          skills={allSkills}
          query={query}
          selectedCategory={category}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
        />
        <p className="skills-result-count" aria-live="polite">
          Showing <strong>{filteredSkills.length}</strong> of {allSkills.length} resume-listed
          skills
        </p>
        <div className="skills-tier-list">
          {skillCategories.map((item, index) => {
            const categorySkills = filteredSkills.filter((skill) => skill.category === item);
            if (!categorySkills.length) return null;
            return (
              <SkillLevelSection key={item} category={item} skills={categorySkills} index={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
