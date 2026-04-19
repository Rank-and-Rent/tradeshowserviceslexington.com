import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { SiteFrame } from "@/components/SiteFrame";
import { contactPageCopy } from "@/lib/content";
import { business, serviceOptions } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <SiteFrame>
      <div className="content-page lex-contact">
        <section className="lex-contact__hero">
          <div className="lex-contact__hero-overlay" aria-hidden="true" />
          <div className="container lex-contact__hero-inner">
            <p className="lex-contact__eyebrow">{contactPageCopy.eyebrow}</p>
            <h1>{contactPageCopy.title}</h1>
            <p className="lex-contact__lead">{contactPageCopy.lead}</p>
          </div>
        </section>

        <section className="lex-contact__body">
          <div className="container lex-contact__layout">
            <aside className="lex-contact__details" aria-label="Lexington contact details">
              <p className="lex-contact__eyebrow lex-contact__eyebrow--dark">Base details</p>
              <h2>{business.name}</h2>
              <ul className="lex-contact__detail-list">
                <li>
                  <span aria-hidden="true" className="lex-contact__icon">◴</span>
                  <span>
                    <strong>Address</strong>
                    <br />
                    {business.address}
                  </span>
                </li>
                <li>
                  <span aria-hidden="true" className="lex-contact__icon">☏</span>
                  <span>
                    <strong>Phone</strong>
                    <br />
                    <a href={`tel:${business.phone.replace(/[^0-9+]/g, "")}`}>{business.phone}</a>
                  </span>
                </li>
                <li>
                  <span aria-hidden="true" className="lex-contact__icon">✉</span>
                  <span>
                    <strong>Email</strong>
                    <br />
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  </span>
                </li>
              </ul>
              {contactPageCopy.paragraphs.map((paragraph, idx) => (
                <p className="lex-contact__paragraph" key={`para-${idx}`}>{paragraph}</p>
              ))}
              <div className="lex-contact__links" aria-label="Related planning pages">
                {contactPageCopy.linkRows.map((link, idx) => (
                  <Link className="lex-contact__related-link" href={link.href} key={`${link.href}-${idx}`}>
                    {link.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </aside>

            <div className="lex-contact__form-card">
              <p className="lex-contact__eyebrow lex-contact__eyebrow--dark">Project brief</p>
              <h2>Tell us about your show</h2>
              <p className="lex-contact__form-note">Share the venue, dates, and what the booth needs to do on the floor. A senior Lexington producer replies within one business day.</p>
              <ContactForm serviceOptions={serviceOptions} />
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
