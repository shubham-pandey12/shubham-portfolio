import { useMemo, useState } from "react";
import { allSkills, type SkillTier } from "../../data/skillCatalog";
import { ProficiencyDistribution } from "./components/ProficiencyDistribution";
import { SkillLevelSection } from "./components/SkillLevelSection";
import { SkillsControls } from "./components/SkillsControls";
import { SkillsOverview } from "./components/SkillsOverview";
import { SkillsPageHeader } from "./components/SkillsPageHeader";
import "./skills.css";

import pageContent from "../../data/pageContent.json";

const skillCategories = [...new Set(allSkills.map((skill) => skill.category))];
const skillTiers = pageContent.skills.tiers as SkillTier[];

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
          Showing <strong>{filteredSkills.length}</strong> of {allSkills.length} skills
        </p>
        <div className="skills-tier-list">
          {skillTiers.map((tier, index) => {
            const tierSkills = filteredSkills.filter((skill) => skill.tier === tier);
            if (tierSkills.length === 0) return null;

            return <SkillLevelSection key={tier} tier={tier} skills={tierSkills} index={index} />;
          })}
        </div>
        <ProficiencyDistribution skills={filteredSkills} />
      </div>
    </div>
  );
}
