import skillsData from "./skillCatalog.json";

export type PortfolioSkill = {
  name: string;
  category: string;
  icon?: string;
};

export const allSkills = skillsData as PortfolioSkill[];
