import { Award, BriefcaseBusiness, GraduationCap, Mail, MapPin } from "lucide-react";
import pageContent from "../../data/pageContent.json";
import { awards, certifications, companies, profile } from "../../data/about";
import {
  AwardCard,
  EducationCard,
  ExperienceCard,
  PageHeading,
  Portrait,
  SectionHeader,
} from "../../components/PortfolioUI";

export function AboutPage({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div className="about-page page-shell">
      <div className="container">
        <PageHeading title={pageContent.about.title} description={pageContent.about.description} />
        <div className="about-summary-grid">
          <aside className="about-profile-card">
            <Portrait small />
            <h2>{profile.name}</h2>
            <p>{profile.title}</p>
            <div className="about-badges">
              <span>PLACEHOLDER AWARD</span>
              <span>PLACEHOLDER CERTIFICATION</span>
            </div>
            <p className="about-location">
              <MapPin size={14} />
              {profile.location}
            </p>
            <a href={`mailto:${profile.email}`} className="about-email">
              <Mail size={14} />
              {profile.email}
            </a>
            <h3>Quick Stats</h3>
            <div className="quick-stats-grid">
              {pageContent.about.quickStats.map(([value, label, tone]) => (
                <div className={`quick-stat ${tone}`} key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </aside>
          <section className="about-narrative">
            <h2>Professional Summary</h2>
            <p>{profile.biography}</p>
            <p>
              I currently work at {profile.company}. My previous experience includes Techolution,
              DrinkPrime, and GeeksforGeeks. More detailed responsibilities, outcomes, and project
              context can be added after you confirm the specifics.
            </p>
            <p>PLACEHOLDER: Add verified education details.</p>
            <hr />
            <h3>Professional Goals</h3>
            <p>
              <strong>Seeking:</strong> YOUR_TARGET_ROLE — replace this placeholder with the roles
              and opportunities you want to highlight.
            </p>
            <p>
              <strong>Focus Areas:</strong> React, Next.js, TypeScript, application experiences,
              data platforms, and practical AI tooling.
            </p>
            <hr />
            <h3>Core Competencies</h3>
            <div className="competency-grid">
              {pageContent.about.competencies.map(({ title, items }) => (
                <div key={title as string}>
                  <h4>{title as string}</h4>
                  <ul>
                    {(items as string[]).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
        <section className="content-section experience-section">
          <SectionHeader icon={<BriefcaseBusiness />} title="Professional Experience" />
          <div className="experience-list">
            {companies.map((item, i) => (
              <ExperienceCard key={`${item.company}-${i}`} item={item} />
            ))}
          </div>
        </section>
        <section className="content-section education-section">
          <SectionHeader icon={<GraduationCap />} title="Education" />
          <div className="education-grid">
            <EducationCard
              title="B.Tech in Information Technology"
              area="Information Technology"
              organization="Indian Institute of Information Technology, Vadodara"
              date="YOUR_START_DATE – YOUR_END_DATE"
            />
            <EducationCard
              title="PLACEHOLDER DEGREE"
              area="YOUR FIELD OF STUDY"
              organization="YOUR INSTITUTION"
              date="YOUR_START_DATE – YOUR_END_DATE"
              placeholder
            />
          </div>
        </section>
        <section className="content-section">
          <SectionHeader
            icon={<Award />}
            title="Featured Certifications & Awards"
            action="View All"
            onAction={() => navigate("/awards")}
          />
          <div className="about-cert-grid">
            {[...awards.slice(0, 2), ...certifications.slice(0, 4)].map((item, i) => (
              <AwardCard key={i} item={item} />
            ))}
          </div>
        </section>
        <section className="career-highlights">
          <h2>Career Highlights</h2>
          <div className="career-grid">
            {pageContent.about.careerStats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
