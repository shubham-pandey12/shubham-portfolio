import { Search } from "lucide-react";
import type { PortfolioSkill } from "../../../data/skillCatalog";

type SkillsControlsProps = {
  categories: string[];
  skills: PortfolioSkill[];
  query: string;
  selectedCategory: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
};

function SkillSearch({
  query,
  onQueryChange,
}: Pick<SkillsControlsProps, "query" | "onQueryChange">) {
  return (
    <label className="skills-search-field">
      <Search aria-hidden="true" />
      <span className="visually-hidden">Search skills</span>
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search skills (e.g., TypeScript, Azure, Docker)..."
      />
    </label>
  );
}

function SkillCategoryFilters({
  categories,
  skills,
  selectedCategory,
  onCategoryChange,
}: Pick<SkillsControlsProps, "categories" | "skills" | "selectedCategory" | "onCategoryChange">) {
  return (
    <div className="skills-category-filters" role="group" aria-label="Filter skills by category">
      {["All", ...categories].map((item) => {
        const count =
          item === "All" ? skills.length : skills.filter((skill) => skill.category === item).length;
        const selected = selectedCategory === item;

        return (
          <button
            type="button"
            key={item}
            className={selected ? "selected" : ""}
            aria-pressed={selected}
            onClick={() => onCategoryChange(item)}
          >
            {item}
            {item !== "All" && <span>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function SkillsControls(props: SkillsControlsProps) {
  return (
    <section className="skills-controls reveal" aria-label="Find a skill">
      <div className="skills-search-wrap">
        <SkillSearch query={props.query} onQueryChange={props.onQueryChange} />
      </div>
      <SkillCategoryFilters
        categories={props.categories}
        skills={props.skills}
        selectedCategory={props.selectedCategory}
        onCategoryChange={props.onCategoryChange}
      />
    </section>
  );
}
