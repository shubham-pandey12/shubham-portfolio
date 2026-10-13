import pageContent from "../../../data/pageContent.json";
import { allSkills } from "../../../data/skillCatalog";

const categories = new Set(allSkills.map((skill) => skill.category));

export function SkillsPageHeader() {
  return (
    <header className="skills-page-header reveal">
      <h1>
        <span>{pageContent.skills.title}</span>
      </h1>
      <p>
        {allSkills.length} technologies and practices across {categories.size} categories, listed in
        your resumes.
      </p>
    </header>
  );
}
