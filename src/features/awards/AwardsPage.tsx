import { Award, ExternalLink, ShieldCheck, Trophy } from "lucide-react";
import { awards, certifications } from "../../data/recognition";
import pageContent from "../../data/pageContent.json";
import { PageHeading, SectionHeader } from "../../components/PortfolioUI";

function RecognitionCard({
  item,
  featured = false,
}: {
  item: (typeof awards)[number];
  featured?: boolean;
}) {
  return (
    <article className={`recognition-card reveal${featured ? " recognition-card-featured" : ""}`}>
      <div className="recognition-card-content">
        <div className="recognition-icon" aria-hidden="true">
          {featured ? <Trophy size={27} /> : <Award size={27} />}
        </div>
        <div className="recognition-details">
          <span className="recognition-type">{item.type}</span>
          <h3>{item.title}</h3>
          <p className="recognition-meta">
            {item.organization} <span>•</span> {item.date}
          </p>
          <p className="recognition-description">{item.description}</p>
          {item.id && (
            <p className="recognition-id">
              Credential ID: <strong>{item.id}</strong>
            </p>
          )}
          {item.verifyUrl && (
            <a className="recognition-link" href={item.verifyUrl} target="_blank" rel="noreferrer">
              {featured ? "Learn More" : "Verify"} <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function AwardsPage() {
  const content = pageContent.awards;
  const azureCertifications = certifications.filter(({ title, organization }) =>
    `${title} ${organization}`.toLowerCase().includes("azure"),
  ).length;
  const summaryStats = content.summaryStats.map((stat) => ({
    ...stat,
    value:
      stat.label === "Certifications Listed"
        ? String(certifications.length)
        : stat.label === "Professional Award"
          ? String(awards.length)
          : stat.label === "Azure Certifications"
            ? String(azureCertifications)
            : stat.label === "Other Certifications"
              ? String(certifications.length - azureCertifications)
              : stat.value,
  }));
  return (
    <main className="awards-page page-shell">
      <div className="awards-container container">
        <PageHeading title={content.title} description={content.description} />
        <section className="awards-content-section">
          <SectionHeader icon={<Trophy />} title={content.awardsHeading} />
          <div className="awards-grid">
            {awards.map((item) => (
              <RecognitionCard key={item.title} item={item} featured />
            ))}
          </div>
        </section>
        <section className="awards-content-section">
          <SectionHeader icon={<ShieldCheck />} title={content.certificationsHeading} />
          <div className="certification-grid">
            {certifications.length > 0 ? (
              certifications.map((item) => <RecognitionCard key={item.title} item={item} />)
            ) : (
              <p className="awards-empty-state">{content.emptyCertifications}</p>
            )}
          </div>
        </section>
        <section className="professional-summary-box awards-summary reveal">
          <h2>{content.summaryHeading}</h2>
          <div className="summary-stats">
            {summaryStats.map(({ value, label }) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
