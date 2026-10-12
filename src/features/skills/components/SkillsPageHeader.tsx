import pageContent from "../../../data/pageContent.json";
import { allSkills } from "../../../data/skillCatalog";
import { yearsOfExperience } from "../../../data/profile";

const categories = new Set(allSkills.map((skill) => skill.category));

export function SkillsPageHeader() {
  return (
    <header className="skills-page-header reveal">
      <h1>
        <span>{pageContent.skills.title}</span>
      </h1>
      <p>
        {allSkills.length} technologies and tools across {categories.size} categories, cultivated
        over {yearsOfExperience()}+ years of professional software development.
      </p>
    </header>
  );
}
