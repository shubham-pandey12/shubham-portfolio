import type { PortfolioSkill, SkillTier } from "../../../data/skillCatalog";
import { SkillCard } from "./SkillCard";

type SkillLevelSectionProps = {
  tier: SkillTier;
  skills: PortfolioSkill[];
  index: number;
};

const tierClasses: Record<SkillTier, string> = {
  "Expert Level": "expert",
  "Advanced Level": "advanced",
  "Intermediate Level": "intermediate",
  "Beginner Level": "beginner",
};

export function SkillLevelSection({ tier, skills, index }: SkillLevelSectionProps) {
  return (
    <section
      className={`skills-level-section skills-level-${tierClasses[tier]} reveal`}
      data-section-name={`skills_${tierClasses[tier]}`}
      aria-labelledby={`skills-tier-${index}`}
    >
      <header className="skills-level-heading">
        <h2 id={`skills-tier-${index}`}>{tier}</h2>
        <span>{skills.length} skills</span>
      </header>
      <div className="skills-card-grid">
        {skills.map((skill, cardIndex) => (
          <SkillCard key={skill.name} skill={skill} index={cardIndex} />
        ))}
      </div>
    </section>
  );
}
