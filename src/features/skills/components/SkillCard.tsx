import type { PortfolioSkill } from "../../../data/skillCatalog";

type SkillCardProps = {
  skill: PortfolioSkill;
  index: number;
};

export function SkillCard({ skill, index }: SkillCardProps) {
  const progressStyle = {
    "--skill-progress": `${skill.progress}%`,
    "--card-index": index,
  } as React.CSSProperties;

  return (
    <article className="skills-card" style={progressStyle}>
      <div className="skills-card-topline">
        <div className="skills-card-copy">
          <h3>
            {skill.icon && <span aria-hidden="true">{skill.icon}</span>}
            {skill.name}
          </h3>
          <span className="skills-category-badge">{skill.category}</span>
        </div>
        <div className="skills-card-years">
          <strong>{skill.years}</strong>
          <span>years</span>
        </div>
      </div>
      <div
        className="skills-progress-track"
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.progress}
      >
        <span />
      </div>
    </article>
  );
}
