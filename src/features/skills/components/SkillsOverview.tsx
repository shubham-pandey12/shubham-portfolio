import { Award, CalendarDays, TrendingUp } from "lucide-react";

type SkillsStatCardProps = {
  label: string;
  value: string;
  tone: "blue" | "purple" | "green";
  icon: typeof TrendingUp;
};

const stats: SkillsStatCardProps[] = [
  { label: "Expert Level", value: "6", tone: "blue", icon: TrendingUp },
  { label: "Certifications", value: "8", tone: "purple", icon: Award },
  { label: "Experience", value: "6+", tone: "green", icon: CalendarDays },
];

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
      {stats.map((stat) => (
        <SkillsStatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
