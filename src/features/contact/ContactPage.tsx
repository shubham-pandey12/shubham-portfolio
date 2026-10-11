import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send, ShieldCheck, Twitter } from "lucide-react";
import { profile } from "../../data/profile";
import { PageHeading } from "../../components/PortfolioUI";
import pageContent from "../../data/pageContent.json";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="contact-page page-shell">
      <div className="container">
        <PageHeading
          title={pageContent.contact.title}
          description={pageContent.contact.description}
        />
        <div className="contact-layout">
          <aside className="contact-aside">
            <section className="contact-card">
              <h2>Contact Information</h2>
              <div>
                <Mail size={19} />
                <span>
                  Email<small>{profile.email}</small>
                </span>
              </div>
              <div>
                <MapPin size={19} />
                <span>
                  Location<small>{profile.location}</small>
                </span>
              </div>
            </section>
            <section className="contact-card">
              <h2>Connect With Me</h2>
              {profile.github.includes("YOUR_") ? (
                <span>
                  <Github size={20} /> GitHub · TBD
                </span>
              ) : (
                <a href={profile.github}>
                  <Github size={20} /> GitHub
                </a>
              )}
              {profile.linkedin.includes("YOUR_") ? (
                <span>
                  <Linkedin size={20} /> LinkedIn · TBD
                </span>
              ) : (
                <a href={profile.linkedin}>
                  <Linkedin size={20} /> LinkedIn
                </a>
              )}
              {profile.x.includes("YOUR_") ? (
                <span>
                  <Twitter size={20} /> X · TBD
                </span>
              ) : (
                <a href={profile.x}>
                  <Twitter size={20} /> X
                </a>
              )}
            </section>
            <section className="availability-card">
              <h3>Currently Available</h3>
              <p>{profile.availability}</p>
            </section>
          </aside>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2>Send Me a Message</h2>
            <label>
              Name *<input required placeholder="YOUR_NAME" />
            </label>
            <label>
              Email *<input type="email" required placeholder="YOUR_EMAIL@example.com" />
            </label>
            <label>
              Subject *<input required placeholder="YOUR_SUBJECT" />
            </label>
            <label>
              Message *<textarea required rows={5} placeholder="YOUR_MESSAGE" />
            </label>
            <button className="send-button" type="submit">
              <Send size={16} />
              {sent ? "Demo form received" : "Send Message"}
            </button>
            <p className="privacy-note">
              <ShieldCheck size={13} /> PLACEHOLDER: Connect a form provider before collecting
              messages.
            </p>
          </form>
        </div>
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {pageContent.contact.faq.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
