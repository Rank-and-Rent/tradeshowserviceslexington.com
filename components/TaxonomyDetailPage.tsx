import Link from "next/link";

import { buildDetailPageContent } from "@/lib/content";
import {
  getTaxonomyCollection,
  getVenueBySlug,
  getTaxonomyItem,
  type TaxonomySection,
} from "@/lib/site-data";
import { getRecoveredTaxonomyMediaUrl } from "@/lib/taxonomy-media";

type TaxonomyDetailPageProps = {
  section: TaxonomySection;
  slug: string;
};

export function TaxonomyDetailPage({ section, slug }: TaxonomyDetailPageProps) {
  const item = getTaxonomyItem(section, slug);

  if (!item) {
    return null;
  }

  const collection = getTaxonomyCollection(section);
  const content = buildDetailPageContent(section, slug);
  const venue = section === "venues" ? getVenueBySlug(slug) : undefined;
  const heroImage = getRecoveredTaxonomyMediaUrl(section, slug);

  const sectionLabel = collection.label;
  const focusTitle =
    section === "venues"
      ? `${item.label} venue priorities`
      : section === "locations"
        ? `${item.label} location priorities`
        : `${item.label} priorities`;
  const faqTitle =
    section === "venues"
      ? `${item.label} venue questions`
      : section === "locations"
        ? `${item.label} location questions`
        : `${item.label} planning questions`;
  const ctaCopy =
    section === "venues"
      ? `Share the property, move-in window, and service list so ${item.label.toLowerCase()} can be lined up with house rules and dock timing.`
      : section === "locations"
        ? `Share the district, venue cluster, and travel window so ${item.label.toLowerCase()} can be judged against the way the market actually moves.`
        : `Share the venue, date, and the first scope issue you want solved so ${item.label.toLowerCase()} can be mapped to the real show plan.`;

  return (
    <div className="lex-detail">
      <section className="lex-detail__hero">
        {heroImage ? (
          <div className="lex-detail__hero-media" aria-hidden="true">
            <img alt="" loading="eager" src={heroImage} />
          </div>
        ) : null}
        <div className="lex-detail__hero-overlay" aria-hidden="true" />
        <div className="site-shell">
          <nav className="lex-detail__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${section}`}>{sectionLabel}</Link>
            <span aria-hidden="true">/</span>
            <span>{item.label}</span>
          </nav>

          <div className="lex-detail__hero-content">
            <p className="lex-detail__eyebrow">{content.eyebrow}</p>
            <h1>{item.label}</h1>
            <p className="lex-detail__lead">{content.heroLead}</p>
          </div>
        </div>
      </section>

      <section className="lex-detail__body">
        <div className="site-shell lex-detail__layout">
          <article className="lex-detail__article">
            <div className="lex-detail__intro">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {venue ? (
              <section className="lex-detail__section lex-detail__section--facts">
                <h2>Verified venue facts</h2>
                <ul className="lex-detail__facts">
                  {venue.verifiedFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="lex-detail__section">
              <h2>{focusTitle}</h2>
              <ul className="lex-detail__bullets">
                {content.focusList.map((itemText) => (
                  <li key={itemText}>{itemText}</li>
                ))}
              </ul>
            </section>

            {content.sections.map((sectionContent) => (
              <section className="lex-detail__section" key={sectionContent.heading}>
                <h2>{sectionContent.heading}</h2>
                {sectionContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {sectionContent.bullets?.length ? (
                  <ul className="lex-detail__bullets">
                    {sectionContent.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="lex-detail__section">
              <h2>{faqTitle}</h2>
              <div className="lex-detail__faqs">
                {content.faqs.map((faq) => (
                  <article className="lex-detail__faq" key={faq.question}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          </article>

          <aside className="lex-detail__sidebar">
            <div className="lex-detail__cta-card">
              <p className="section-kicker">{item.label} next step</p>
              <h2>{content.ctaTitle}</h2>
              <p>{ctaCopy}</p>
              <Link className="button button--blue" href="/contact">
                Start a Conversation
              </Link>
            </div>

            <div className="lex-detail__related">
              <p className="section-kicker">More sections to explore</p>
              <div className="lex-detail__related-list">
                {content.relatedLinks.map((link) => (
                  <Link className="lex-detail__related-link" href={link.href} key={link.href}>
                    <h3>{link.label}</h3>
                    <p>{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
