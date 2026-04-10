import Link from "next/link";

import { buildDetailPageContent } from "@/lib/content";
import {
  business,
  getTaxonomyItem,
  getVenueBySlug,
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
  const statCards = venue
      ? [
        {
          label: "Venue type",
          value: venue.venueType.replace(/-/g, " ").toUpperCase()
        },
        {
          label: "City",
          value: venue.city.toUpperCase()
        },
        {
          label: "Region",
          value: venue.region.toUpperCase()
        }
      ]
    : [
        {
          label: "Focus area",
          value: item.section.replace(/-/g, " ")
        },
        {
          label: "City",
          value: `${business.city.toUpperCase()}, ${business.state.toUpperCase()}`
        },
        {
          label: "Execution path",
          value: "Project-led"
        }
      ];

  return (
    <div className="page-shell">
      <section className="page-hero page-hero--detail">
        <div className="site-shell">
          <div className="page-hero__content">
            <p className="section-kicker section-kicker--light">{content.eyebrow}</p>
            {(() => {
            const _kind = (section as any);
            const _slug = (slug as any);
            const imgSrc = _slug ? getRecoveredTaxonomyMediaUrl(_kind as string, _slug as string) : null;
            return imgSrc ? (
            <img src={imgSrc} alt={(slug as any)} className="taxonomy-hero-image" style={{ width: "100%", maxHeight: 480, objectFit: "cover", borderRadius: 12, marginBottom: 24 }} loading="eager" />
            ) : null;
            })()}
            <h1>{item.label}</h1>
            <p className="page-hero__lead">{content.heroLead}</p>
          </div>

          <div className="page-stat-grid" style={{ marginTop: "36px" }}>
            {statCards.map((card) => (
              <article className="page-stat-card" key={card.label}>
                <strong>{card.label}</strong>
                <span>{card.value}</span>
              </article>
            ))}
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
