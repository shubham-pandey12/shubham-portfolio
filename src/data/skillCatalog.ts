import skillsData from "./skillCatalog.json";

export type PortfolioSkill = {
  name: string;
  category: string;
  icon: string;
  tier: SkillTier;
  years: number;
  progress: number;
};

export type SkillTier = "Expert Level" | "Advanced Level" | "Intermediate Level" | "Beginner Level";

export const allSkills = skillsData as PortfolioSkill[];
