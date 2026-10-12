import { Award, BriefcaseBusiness, GraduationCap, Mail, MapPin } from "lucide-react";
import { awards, certifications, companies, profile, yearsOfExperience } from "../../data/about";
import pageContent from "../../data/pageContent.json";
import { PageHeading, Portrait } from "../../components/PortfolioUI";
import { allSkills } from "../../data/skillCatalog";
import { projects } from "../../data/projects";
import {
  AboutEducationCard,
  AboutExperienceCard,
  AboutRecognitionCard,
  AboutSectionTitle,
  CareerHighlights,
} from "./components/AboutSections";

export function AboutPage({ navigate }: { navigate: (to: string) => void }) {
  const content = pageContent.about;
  const recognitions = [...awards.slice(0, 2), ...certifications.slice(0, 4)];
  const stats = [
    [`${yearsOfExperience()}+`, "Years Exp.", "blue"],
    [String(certifications.length), "Certifications Listed", "purple"],
    [String(allSkills.length), "Skills Listed", "green"],
    [String(projects.length), "Resume Projects", "orange"],
  ];
  const careerStats = [
    [`${yearsOfExperience()}+`, "Years of Experience"],
    [String(projects.length), "Resume Projects"],
    [String(awards.length), "Professional Award"],
    [String(allSkills.length), "Skills Listed"],
  ];

  return (
    <main className="about-page about-reference page-shell">
      <div className="container">
        <PageHeading title={content.title} description={content.description} />
        <div className="about-reference-grid">
          <aside className="about-reference-profile">
            <div className="about-reference-portrait">
              <Portrait small />
            </div>
            <h2>{profile.name}</h2>
            <p className="about-reference-role">{profile.title}</p>
            <div className="about-reference-badges">
              {content.badges.map((badge, index) => (
                <span className={`about-badge about-badge-${index}`} key={badge}>
                  {badge}
                </span>
              ))}
            </div>
            <div className="about-profile-rule" />
            <div className="about-profile-details">
              <div>
                <MapPin />
                <span>{profile.location}</span>
              </div>
              <div>
                <Mail />
                <a
                  href={
                    !profile.email || profile.email.includes("YOUR_")
                      ? undefined
                      : `mailto:${profile.email}`
                  }
                >
                  {profile.email}
                </a>
              </div>
            </div>
            <div className="about-profile-rule" />
            <h3>Quick Stats</h3>
            <div className="about-reference-quick-stats">
              {stats.map(([value, label, tone]) => (
                <div className={`about-reference-stat ${tone}`} key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </aside>
          <section className="about-reference-summary">
            <h2>Professional Summary</h2>
            <div className="about-summary-copy">
              {content.professionalSummary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="about-profile-rule" />
            <h3>Professional Goals</h3>
            <div className="about-summary-copy about-goals-copy">
              <p>
                <strong>Seeking:</strong> {content.seeking}
              </p>
              <p>
                <strong>Focus Areas:</strong> {content.focusAreas}
              </p>
            </div>
            <div className="about-profile-rule" />
            <h3>Core Competencies</h3>
            <div className="about-reference-competencies">
              {content.competencies.map(({ title, items }) => (
                <div key={title}>
                  <h4>{title}</h4>
                  <ul>
                    {items.map((item, index) => (
                      <li key={`${item}-${index}`}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="about-reference-section">
          <AboutSectionTitle
            icon={<BriefcaseBusiness />}
            title={content.sectionTitles.experience}
          />
          <div className="about-reference-experience-list">
            {companies.map((item, index) => (
              <AboutExperienceCard key={`${item.company}-${index}`} item={item} />
            ))}
          </div>
        </section>

        <section className="about-reference-section">
          <AboutSectionTitle icon={<GraduationCap />} title={content.sectionTitles.education} />
          <div className="about-reference-education-grid">
            {content.education.map((item) => (
              <AboutEducationCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="about-reference-section">
          <div className="about-recognition-heading">
            <AboutSectionTitle icon={<Award />} title={content.sectionTitles.recognition} />
            <button type="button" onClick={() => navigate("/awards")}>
              View All <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="about-reference-recognition-grid">
            {recognitions.map((item, index) => (
              <AboutRecognitionCard key={`${item.title}-${index}`} item={item} />
            ))}
          </div>
        </section>

        <CareerHighlights
          stats={careerStats}
          metrics={content.careerMetrics}
          title={content.sectionTitles.career}
        />
      </div>
    </main>
  );
}
