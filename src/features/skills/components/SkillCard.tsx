import type { PortfolioSkill } from "../../../data/skillCatalog";

type SkillCardProps = { skill: PortfolioSkill; index: number };

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <article className="skills-card" style={{ "--card-index": index } as React.CSSProperties}>
      <div className="skills-card-topline">
        <div className="skills-card-copy">
          <h3>
            {skill.icon && <span aria-hidden="true">{skill.icon}</span>}
            {skill.name}
          </h3>
          <span className="skills-category-badge">{skill.category}</span>
        </div>
        <span className="skills-source-badge">Resume</span>
      </div>
    </article>
  );
}
