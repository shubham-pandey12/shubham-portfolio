import { Award, CalendarDays, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import pageContent from "../../../data/pageContent.json";
import { yearsOfExperience } from "../../../data/profile";
import { allSkills } from "../../../data/skillCatalog";

type SkillsStatCardProps = {
  label: string;
  value: string;
  tone: "blue" | "purple" | "green";
  icon: LucideIcon;
};
const labels = pageContent.skills.overviewStats as {
  label: string;
  tone: "blue" | "purple" | "green";
}[];
const values = [
  allSkills.filter((skill) => skill.tier === "Expert Level").length,
  `${yearsOfExperience()}+`,
];
const icons = [TrendingUp, Award, CalendarDays];

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

export function SkillsOverview({ certificateCount }: { certificateCount: number }) {
  const statValues = [values[0], certificateCount, values[1]];
  return (
    <section className="skills-overview reveal" aria-label="Resume skill overview">
      {labels.map((stat, index) => (
        <SkillsStatCard
          key={stat.label}
          {...stat}
          value={String(statValues[index] ?? 0)}
          icon={icons[index] ?? TrendingUp}
        />
      ))}
    </section>
  );
}
