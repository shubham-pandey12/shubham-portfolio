import { Award, BriefcaseBusiness, Code2 } from "lucide-react";
import pageContent from "../../../data/pageContent.json";
import { companies } from "../../../data/profile";
import { certifications } from "../../../data/recognition";
import { allSkills } from "../../../data/skillCatalog";

type SkillsStatCardProps = {
  label: string;
  value: string;
  tone: "blue" | "purple" | "green";
  icon: typeof Code2;
};
const labels = pageContent.skills.overviewStats as {
  label: string;
  tone: "blue" | "purple" | "green";
}[];
const values = [allSkills.length, companies.length, certifications.length];
const icons = [Code2, BriefcaseBusiness, Award];

function SkillsStatCard({ label, value, tone, icon: Icon }: SkillsStatCardProps) {
  return (
    <article className={`skills-stat-card skills-stat-${tone}`}>
      <span className="skills-stat-icon" aria-hidden="true">
        <Icon />
      </span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

export function SkillsOverview() {
  return (
    <section className="skills-overview reveal" aria-label="Resume skill overview">
      {labels.map((stat, index) => (
        <SkillsStatCard
          key={stat.label}
          {...stat}
          value={String(values[index] ?? 0)}
          icon={icons[index] ?? Code2}
        />
      ))}
    </section>
  );
}
