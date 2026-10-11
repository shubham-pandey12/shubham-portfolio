import { Award, CalendarDays, TrendingUp } from "lucide-react";
import pageContent from "../../../data/pageContent.json";

type SkillsStatCardProps = {
  label: string;
  value: string;
  tone: "blue" | "purple" | "green";
  icon: typeof TrendingUp;
};
const statItems = pageContent.skills.overviewStats as {
  label: string;
  value: string;
  tone: "blue" | "purple" | "green";
}[];
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

export function SkillsOverview() {
  return (
    <section className="skills-overview reveal" aria-label="Skills overview">
      {statItems.map((stat, index) => (
        <SkillsStatCard key={stat.label} {...stat} icon={icons[index] ?? TrendingUp} />
      ))}
    </section>
  );
}
