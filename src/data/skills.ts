import skillsData from "./skills.json";
import { allSkills } from "./skillCatalog";
export const skillGroups = skillsData.skillGroups;
const coreSkillNames = new Set(
  skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)),
);
export const complementarySkills = allSkills.filter((skill) => !coreSkillNames.has(skill.name));
export { allSkills };
