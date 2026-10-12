import type { PortfolioSkill, SkillTier } from "../../../data/skillCatalog";

type ProficiencyDistributionProps = { skills: PortfolioSkill[] };

const tiers: { key: SkillTier; label: string; tone: string }[] = [
  { key: "Expert Level", label: "Expert", tone: "expert" },
  { key: "Advanced Level", label: "Advanced", tone: "advanced" },
  { key: "Intermediate Level", label: "Intermediate", tone: "intermediate" },
  { key: "Beginner Level", label: "Beginner", tone: "beginner" },
];

export function ProficiencyDistribution({ skills }: ProficiencyDistributionProps) {
  return (
    <section className="skills-distribution reveal" aria-labelledby="skills-distribution-title">
      <h2 id="skills-distribution-title">Proficiency Distribution</h2>
      <div className="skills-distribution-grid">
        {tiers.map(({ key, label, tone }) => {
          const count = skills.filter((skill) => skill.tier === key).length;
          const percent = skills.length ? Math.round((count / skills.length) * 100) : 0;

          return (
            <div className="skills-distribution-item" key={key}>
              <strong className={`skills-distribution-count ${tone}`}>{count}</strong>
              <span>{label}</span>
              <small>{percent}%</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}
