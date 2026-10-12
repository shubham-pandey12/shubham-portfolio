type SkillIconProps = {
  name: string;
  className?: string;
};

export function SkillIcon({ name, className = "" }: SkillIconProps) {
  return (
    <svg className={`skill-icon ${className}`} aria-hidden="true" focusable="false">
      <use href={`${import.meta.env.BASE_URL}skill-icons.svg#${name}`} />
    </svg>
  );
}
