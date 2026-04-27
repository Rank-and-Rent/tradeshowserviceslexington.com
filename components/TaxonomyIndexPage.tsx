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

  const tiles = collection.generatedPages.map((page) => {
    const image = getRecoveredTaxonomyMediaUrl(section, page.slug);
    return {
      slug: page.slug,
      label: page.label,
      href: `/${section}/${page.slug}`,
      image,
    };
  });

  return (
    <div className="lex-tax">
      <section className="lex-tax__hero">
        {heroImage ? (
          <div className="lex-tax__hero-media" aria-hidden="true">
            <img alt="" loading="eager" src={heroImage} />
          </div>
        ) : null}
        <div className="lex-tax__hero-overlay" aria-hidden="true" />
        <div className="site-shell">
          <div className="lex-tax__hero-content">
            <p className="lex-tax__eyebrow">{collection.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="lex-tax__lead">{content.lead}</p>
          </div>
        </div>
      </section>

      <section className="lex-tax__grid-section">
        <div className="site-shell">
          <div className="lex-tax__grid-heading">
            <p className="section-kicker">{collection.heroLabel}</p>
            <h2>
              {collection.label} for {business.city} buyers and event teams
            </h2>
          </div>

          <div className="lex-tax__tile-grid">
            {tiles.map((tile) => (
              <Link className="lex-tax__tile" href={tile.href} key={tile.href}>
                {tile.image ? (
                  <img alt="" className="lex-tax__tile-image" loading="lazy" src={tile.image} />
                ) : (
                  <span className="lex-tax__tile-fallback" aria-hidden="true">
                    {tile.label.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="lex-tax__tile-overlay" aria-hidden="true" />
                <span className="lex-tax__tile-content">
                  <span className="lex-tax__tile-kicker">{collection.singularLabel}</span>
                  <span className="lex-tax__tile-label">{tile.label}</span>
                  <span className="lex-tax__tile-arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {content.intro?.length ? (
        <section className="lex-tax__copy-section">
          <div className="site-shell lex-tax__narrow">
            <div className="lex-tax__copy">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.deepSections?.length ? (
        <section className="lex-tax__copy-section lex-tax__copy-section--soft">
          <div className="site-shell lex-tax__narrow">
            {content.deepSections.map((ds) => (
              <section className="lex-tax__deep" key={ds.heading}>
                <h2>{ds.heading}</h2>
                {ds.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {ds.bullets?.length ? (
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
        <section className="lex-tax__copy-section">
          <div className="site-shell lex-tax__narrow">
            <div className="lex-tax__faq-heading">
              <p className="section-kicker">Planner questions</p>
              <h2>{collection.label} planning questions</h2>
            </div>
            <div className="lex-tax__faqs">
              {content.deepFaqs.map((faq) => (
                <article className="lex-tax__faq" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="lex-tax__cta-section">
        <div className="site-shell">
          <div className="lex-tax__cta">
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
