import pageContent from "../../../data/pageContent.json";

export function SkillsPageHeader() {
  return (
    <header className="skills-page-header reveal">
      <h1>
        <span>{pageContent.skills.title}</span>
      </h1>
      <p>{pageContent.skills.description}</p>
    </header>
  );
}
