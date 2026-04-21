import Link from "next/link";

import { buildDetailPageContent } from "@/lib/content";
import {
  getVenueBySlug,
  getTaxonomyItem,
  type TaxonomySection
} from "@/lib/site-data";
import { getRecoveredTaxonomyMediaUrl } from "@/lib/taxonomy-media";

type TaxonomyDetailPageProps = {
  section: TaxonomySection;
  slug: string;
};

export function TaxonomyDetailPage({
  section,
  slug
}: TaxonomyDetailPageProps) {
  const item = getTaxonomyItem(section, slug);

  if (!item) {
    return null;
  }

  const content = buildDetailPageContent(section, slug);
  const venue = section === "venues" ? getVenueBySlug(slug) : undefined;
  const heroImage = getRecoveredTaxonomyMediaUrl(section, slug);

  const sectionLabel = section.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="page-shell">
      <section className="page-hero page-hero--media page-hero--detail">
        {heroImage ? (
          <div className="page-hero__media" aria-hidden="true">
            <img alt="" loading="eager" src={heroImage} />
          </div>
        ) : null}
        <div className="page-hero__overlay" aria-hidden="true" />
        <div className="site-shell">
          <div className="page-hero__content">
            <p className="section-kicker section-kicker--light">{content.eyebrow}</p>
            <h1>{item.label}</h1>
            <p className="page-hero__lead">{content.heroLead}</p>
          </div>

        </div>
      </section>

      <section className="page-section">
        <div className="site-shell">
          <div className="detail-layout">
            <article className="detail-content">
              <div className="panel">
                <div className="page-copy">
                  {content.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {venue ? (
                <section className="panel">
                  <h2>Verified venue facts</h2>
                  <ul>
                    {venue.verifiedFacts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="panel">
                <h2>Execution priorities</h2>
                <ul>
                  {content.focusList.map((itemText) => (
                    <li key={itemText}>{itemText}</li>
                  ))}
                </ul>
              </section>

              {content.sections.map((sectionContent) => (
                <section className="detail-section" key={sectionContent.heading}>
                  <h2>{sectionContent.heading}</h2>
                  {sectionContent.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {sectionContent.bullets ? (
                    <ul>
                      {sectionContent.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="detail-section">
                <h2>Frequently asked questions</h2>
                <div className="faq-list">
                  {content.faqs.map((faq) => (
                    <article className="faq-item" key={faq.question}>
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </section>
            </article>

            <aside className="sidebar-stack">
              <div className="sidebar-card sidebar-card--sticky">
                <nav className="breadcrumb" aria-label="Breadcrumb">
                  <Link href="/">Home</Link>
                  <span aria-hidden="true"> / </span>
                  <Link href={`/${section}`}>{sectionLabel}</Link>
                  <span aria-hidden="true"> / </span>
                  <span>{item.label}</span>
                </nav>
                <p className="section-kicker">{content.eyebrow}</p>
                <h2>{content.ctaTitle}</h2>
                <p>{content.ctaText}</p>
                <div style={{ marginTop: "18px" }}>
                  <Link className="button button--blue" href="/contact">
                    Start a Conversation
                  </Link>
                </div>
              </div>

              <div className="sidebar-card">
                <p className="section-kicker">More pages to explore</p>
                <div className="related-links">
                  {content.relatedLinks.map((link) => (
                    <Link className="related-link" href={link.href} key={link.href}>
                      <h3>{link.label}</h3>
                      <p>{link.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
