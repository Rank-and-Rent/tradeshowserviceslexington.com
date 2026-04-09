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

  return (
    <div className="page-shell">
      <section className="page-hero page-hero--index">
        <div className="site-shell">
          <div className="page-hero__content">
            <p className="section-kicker section-kicker--light">{content.eyebrow}</p>
            {(() => {
              const _kind = (section as any);
              const _first = ((collection as any)?.generatedPages?.[0]);
              const _slug = _first?.slug || "";
              const imgSrc = _slug ? getRecoveredTaxonomyMediaUrl(_kind as string, _slug as string) : null;
              return imgSrc ? (
                <img src={imgSrc} alt={((collection as any)?.label || "")} className="taxonomy-hero-image" style={{ width: "100%", maxHeight: 480, objectFit: "cover", borderRadius: 12, marginBottom: 24 }} loading="eager" />
              ) : null;
            })()}
            <h1>{content.title}</h1>
            <p className="page-hero__lead">{content.lead}</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-shell">
          <div className="page-copy">
            {content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="page-stat-grid">
            {content.facts.map((fact) => (
              <article className="page-stat-card" key={fact.label}>
                <strong>{fact.label}</strong>
                <span>{fact.value}</span>
                <p>{fact.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--soft">
        <div className="site-shell">
          <div className="section-heading">
            <p className="section-kicker">{collection.heroLabel}</p>
            <h2>
              {collection.label} for {business.city} buyers and event teams
            </h2>
          </div>

          <div className="page-card-grid" style={{ marginTop: "36px" }}>
            {content.cards.map((card) => (
              <Link className="page-card" href={card.href} key={card.href}>
                <p className="page-card__kicker">{card.eyebrow}</p>
                <h3>{card.label}</h3>
                <p>{card.description}</p>
                <span className="page-card__link">View page</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
