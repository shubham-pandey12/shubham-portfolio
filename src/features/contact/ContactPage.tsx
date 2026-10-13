import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send, ShieldCheck, Twitter, Globe } from "lucide-react";
import { profile } from "../../data/profile";
import { PageHeading } from "../../components/PortfolioUI";
import pageContent from "../../data/pageContent.json";

function ContactInformationCard() {
  return (
    <section className="contact-reference-card reveal">
      <h2>Contact Information</h2>
      <div className="contact-reference-items">
        <div className="contact-reference-item">
          <Mail aria-hidden="true" />
          <div>
            <h3>Email</h3>
            {profile.email.includes("YOUR_") ? (
              <span>{profile.email}</span>
            ) : (
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            )}
          </div>
        </div>
        <div className="contact-reference-item">
          <MapPin aria-hidden="true" />
          <div>
            <h3>Location</h3>
            <p>{profile.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLinksCard() {
  const links = [
    { label: "GitHub", url: profile.github, icon: Github },
    { label: "LinkedIn", url: profile.linkedin, icon: Linkedin },
    { label: "X", url: profile.x, icon: Twitter },
    { label: "Portfolio", url: profile.portfolio, icon: Globe },
  ].filter(({ url }) => Boolean(url) && !url.includes("YOUR_"));
  return (
    <section className="contact-reference-card reveal">
      <h2>Connect With Me</h2>
      <div className="contact-reference-socials">
        {links.length ? (
          links.map(({ label, url, icon: Icon }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer">
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))
        ) : (
          <p className="contact-reference-empty">
            Social links can be added in <code>src/data/profile.json</code>.
          </p>
        )}
      </div>
    </section>
  );
}

function ContactForm({ onSent }: { onSent: () => void }) {
  const content = pageContent.contact;
  return (
    <section className="contact-reference-card contact-message-card reveal">
      <h2>{content.formTitle}</h2>
      <form
        className="contact-reference-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSent();
        }}
      >
        {content.formFields.map((field) => (
          <div className="contact-reference-field" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required
              placeholder={field.placeholder}
            />
          </div>
        ))}
        <div className="contact-reference-field">
          <label htmlFor={content.messageField.id}>{content.messageField.label}</label>
          <textarea
            id={content.messageField.id}
            name={content.messageField.id}
            rows={content.messageField.rows}
            required
            placeholder={content.messageField.placeholder}
          />
        </div>
        <button className="contact-reference-submit" type="submit">
          <Send aria-hidden="true" />
          {content.submitLabel}
        </button>
      </form>
      <div className="contact-reference-privacy">
        <ShieldCheck aria-hidden="true" />
        <p>{content.privacyNote}</p>
      </div>
    </section>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const content = pageContent.contact;
  return (
    <main className="contact-page contact-reference page-shell">
      <div className="container">
        <div className="reveal">
          <PageHeading title={content.title} description={content.description} />
        </div>
        <div className="contact-reference-layout">
          <aside className="contact-reference-aside">
            <ContactInformationCard />
            <SocialLinksCard />
            {profile.availability && (
              <section className="contact-reference-availability reveal">
                <h2>Availability</h2>
                <p>{profile.availability}</p>
              </section>
            )}
          </aside>
          <div className="contact-reference-main">
            {sent ? (
              <div className="contact-reference-success" role="status">
                {content.submitSuccess}
              </div>
            ) : (
              <ContactForm onSent={() => setSent(true)} />
            )}
          </div>
        </div>
        <section className="contact-reference-faq reveal">
          <h2>Frequently Asked Questions</h2>
          <div className="contact-reference-faq-grid">
            {content.faq.map(([title, text]) => (
              <article className="contact-reference-card reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
