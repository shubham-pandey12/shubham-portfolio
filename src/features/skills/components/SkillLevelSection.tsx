import type { PortfolioSkill } from "../../../data/skillCatalog";
import { SkillCard } from "./SkillCard";

type SkillLevelSectionProps = { category: string; skills: PortfolioSkill[]; index: number };

export function SkillLevelSection({ category, skills, index }: SkillLevelSectionProps) {
  const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section
      className="skills-level-section skills-category-section reveal"
      aria-labelledby={`skills-category-${index}`}
    >
      <header className="skills-level-heading">
        <h2 id={`skills-category-${index}`}>{category}</h2>
        <span>{skills.length} skills</span>
      </header>
      <div className="skills-card-grid">
        {skills.map((skill, cardIndex) => (
          <SkillCard key={`${categoryId}-${skill.name}`} skill={skill} index={cardIndex} />
        ))}
      </div>
    </section>
  );
}
