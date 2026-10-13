import { Award, ShieldCheck } from "lucide-react";
import { awards, certifications } from "../../data/recognition";
import { AwardCard, PageHeading, SectionHeader } from "../../components/PortfolioUI";

export function AwardsPage() {
  return (
    <div className="awards-page page-shell">
      <div className="container">
        <PageHeading
          title="Awards & Certifications"
          description="Professional recognitions and industry certifications. Replace each placeholder with your confirmed details."
        />
        <div className="content-section">
          <SectionHeader icon={<Award />} title="Featured Recognitions" />
          <div className="awards-grid">
            {awards.map((item, i) => (
              <AwardCard key={i} item={item} />
            ))}
          </div>
        </div>
        <div className="content-section">
          <SectionHeader icon={<ShieldCheck />} title="Cloud Certifications" />
          <div className="certification-grid">
            {certifications.map((item, i) => (
              <AwardCard key={i} item={item} />
            ))}
          </div>
        </div>
        <section className="professional-summary-box">
          <h2>Professional Summary</h2>
          <div className="summary-stats">
            {[
              ["TBD", "Certifications"],
              ["TBD", "Professional Awards"],
              ["TBD", "Azure Certifications"],
              ["TBD", "Other Certifications"],
            ].map(([value, label]) => (
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
