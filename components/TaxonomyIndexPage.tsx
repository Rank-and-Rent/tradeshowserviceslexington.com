import Link from "next/link";

import { buildIndexPageContent } from "@/lib/content";
import { business, getTaxonomyCollection, type TaxonomySection } from "@/lib/site-data";
import { getRecoveredTaxonomyMediaUrl } from "@/lib/taxonomy-media";

type TaxonomyIndexPageProps = {
  section: TaxonomySection;
};

export function TaxonomyIndexPage({ section }: TaxonomyIndexPageProps) {
  const collection = getTaxonomyCollection(section);
  const content = buildIndexPageContent(section);
  const firstSlug = collection.generatedPages[0]?.slug ?? "";
  const heroImage = firstSlug ? getRecoveredTaxonomyMediaUrl(section, firstSlug) : null;

  return (
    <div className="page-shell">
      <section className="page-hero page-hero--media page-hero--index">
        {heroImage ? (
          <div className="page-hero__media" aria-hidden="true">
            <img alt="" loading="eager" src={heroImage} />
          </div>
        ) : null}
        <div className="page-hero__overlay" aria-hidden="true" />
        <div className="site-shell">
          <div className="page-hero__content">
            <p className="section-kicker section-kicker--light">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="page-hero__lead">{content.lead}</p>
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="site-shell">
          <div className="section-heading">
            <p className="section-kicker">{collection.heroLabel}</p>
            <h2>
              {collection.label} for {business.city.toUpperCase()} buyers and event teams
            </h2>
          </div>

            <div className="page-card-grid" style={{ marginTop: "36px" }}>
              {content.cards.map((card) => (
                <Link className="page-card" href={card.href} key={card.href}>
                <p className="page-card__kicker">{card.eyebrow}</p>
                <h3>{card.label}</h3>
                <p>{card.description}</p>
                <span className="page-card__link">Open guide</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {content.intro?.length ? (
        <section className="page-section">
          <div className="container">
            <div className="page-copy">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.deepSections?.length ? (
        <section className="page-section">
          <div className="container">
            {content.deepSections.map((ds) => (
              <section className="detail-section" key={ds.heading}>
                <h2>{ds.heading}</h2>
                {ds.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {ds.bullets ? (
                  <ul>
                    {ds.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </section>
      ) : null}

      {content.deepFaqs?.length ? (
        <section className="page-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Planner questions</p>
              <h2>{collection.label} planning questions</h2>
            </div>
            <div className="faq-list">
              {content.deepFaqs.map((faq) => (
                <article className="faq-list__item" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-section">
        <div className="site-shell">
          <div className="cta-band">
            <div>
              <p className="section-kicker section-kicker--light">Ready to brief your project?</p>
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
            </div>
            <Link className="button button--blue" href="/contact">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
