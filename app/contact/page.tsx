import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { SiteFrame } from "@/components/SiteFrame";
import { contactPageCopy } from "@/lib/content";
import { business, serviceOptions } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <SiteFrame>
      <div className="content-page">
        <section className="inner-hero">
          <div className="container">
            <p className="section-kicker">{contactPageCopy.eyebrow}</p>
            <h1>{contactPageCopy.title}</h1>
            <p className="inner-hero__lead">{contactPageCopy.lead}</p>
          </div>
        </section>

        <section className="page-section">
          <div className="container contact-layout">
            <div className="contact-card">
              <p className="section-kicker">Base details</p>
              <h2>{business.name}</h2>
              <ul>
                <li>{business.address}</li>
                <li>{business.phone}</li>
                <li>{business.email}</li>
              </ul>
              {contactPageCopy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="rich-link-row" aria-label="Related planning pages">
                {contactPageCopy.linkRows.map((link) => (
                  <Link className="inline-link" href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="contact-card contact-card--form">
              <ContactForm serviceOptions={serviceOptions} />
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
