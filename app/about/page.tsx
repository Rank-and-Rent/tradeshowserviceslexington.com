import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";
import { business, marketHighlights, resourceCards } from "@/lib/site-data";

const aboutCards = [
  {
    title: "Venue-aware planning",
    text: "Every route on the site is tied back to real venue guides, market research, labor posture, and event-format realities in the Des Moines and Central Iowa market."
  },
  {
    title: "Broad trade show positioning",
    text: "The positioning stays intentionally broad across turnkey delivery, EAC coordination, labor, AV, logistics, fabrication, and conference or activation support."
  },
  {
    title: "Project-led execution",
    text: "The point is to keep booth, venue, freight, graphics, labor, and show-site leadership on one readable operating path instead of splitting the brief into disconnected vendors."
  }
] as const;

export default function AboutPage() {
  return (
    <SiteFrame>
      <div className="page-shell">
        <section className="page-hero">
          <div className="site-shell">
            <div className="page-hero__content">
              <p className="section-kicker section-kicker--light">About us</p>
              <h1>Project-led trade show delivery for Des Moines venues</h1>
              <p className="page-hero__lead">
                {business.name} is built around turnkey show execution: booth design,
                fabrication, labor, AV, logistics, exhibitor-appointed-contractor
                coordination, and show-site supervision tied to one operating path.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="site-shell">
            <div className="page-copy">
              <p>
                This site is built around Des Moines&apos; actual meeting and convention
                landscape rather than a generic national template. The planning
                framework starts with the downtown convention core, expands into West
                Des Moines and the west corridor, moves through the Ankeny and north
                metro conference zone, and then includes the east-side fairgrounds and
                Altoona event cluster plus the airport corridor.
              </p>
              <p>
                The operating model is intentionally project-led. Instead of splitting
                design, logistics, AV, graphics, labor, and field execution into
                disconnected silos, {business.name} treats them as one coordinated
                workflow. The result should be fewer handoff errors, cleaner venue
                communication, and a briefing path that helps buyers make decisions
                earlier, when those decisions still matter.
              </p>
            </div>

            <div className="page-stat-grid">
              {marketHighlights.map((fact) => (
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
              <p className="section-kicker">What this site is designed to cover</p>
              <h2>Built for exhibitors, associations, sponsors, and venue teams</h2>
            </div>

            <div className="page-card-grid" style={{ marginTop: "36px" }}>
              {aboutCards.map((card) => (
                <article className="page-card" key={card.title}>
                  <p className="page-card__kicker">About the model</p>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-kicker">Next steps</p>
              <h2>Move from positioning into routes that help buyers plan</h2>
            </div>

            <div className="page-card-grid" style={{ marginTop: "36px" }}>
              {resourceCards.map((item) => (
                <Link className="page-card" href={item.href} key={item.href}>
                  <p className="page-card__kicker">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="page-card__link">Open route</span>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: "36px" }}>
              <div className="cta-band">
                <div>
                  <p className="section-kicker section-kicker--light">Ready to brief your project?</p>
                  <h2>Start with the venue, service mix, and show date.</h2>
                  <p>
                    That is usually enough to identify the right venue guide, booth
                    path, service stack, and next-step planning sequence.
                  </p>
                </div>
                <Link className="button button--dark" href="/contact">
                  Brief your project
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
