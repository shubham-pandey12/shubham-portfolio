import skillsData from "./skillCatalog.json";

export type SkillTier = "Expert Level" | "Advanced Level" | "Intermediate Level" | "Beginner Level";
export type PortfolioSkill = {
  name: string;
  category: string;
  tier: SkillTier;
  years: number;
  icon?: string;
  progress: number;
};

export const allSkills = skillsData as PortfolioSkill[];
