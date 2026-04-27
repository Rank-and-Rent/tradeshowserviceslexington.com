import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";
import { aboutPageCopy } from "@/lib/content";
import { business, marketHighlights } from "@/lib/site-data";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Brief and venue read",
    body: "We start with the building. Central Bank Center, a downtown ballroom, a Newtown Pike corridor hotel, and a regional drive-in show all behave differently. The brief gets pinned to the actual room, dates, and goal before scope hardens.",
  },
  {
    step: "02",
    title: "Scope and freight plan",
    body: "Booth choice, graphics, AV, freight windows, labor calls, and show-service paperwork get written together. One plan, one budget, one timeline that survives the move from drawing to dock.",
  },
  {
    step: "03",
    title: "Floor delivery",
    body: "Site supervision runs the install, the live-day and the strike. The team that wrote the plan is the team on the floor, so decisions move at the speed of show week instead of waiting on a phone call.",
  },
  {
    step: "04",
    title: "Closeout and recall",
    body: "After strike, assets get inventoried, refurbished, and stored for the next cycle. Reuse, graphic swaps, and program updates make the second show easier to brief than the first.",
  },
];

const PRINCIPLES = [
  "Plans get tied to the venue manual, not to a generic template.",
  "Freight, labor, and show-service paperwork move together with the build.",
  "Custom, rental, and modular options are compared on the same brief.",
  "Site supervision is included by default; the dock is never run by a stranger.",
  "Repeat programs reuse what works and quietly retire what does not.",
  "The post-show debrief feeds the next event before invoices clear.",
];

export default function AboutPage() {
  return (
    <SiteFrame>
      <div className="lex-about">
        <section className="lex-about__hero">
          <div className="lex-about__hero-media" aria-hidden="true">
            <img
              alt=""
              src="/media/planned/services/services-trade-show-project-management-lexington-ky.webp"
              loading="eager"
            />
          </div>
          <div className="lex-about__hero-overlay" aria-hidden="true" />
          <div className="site-shell">
            <div className="lex-about__hero-content">
              <p className="lex-about__eyebrow">{aboutPageCopy.eyebrow}</p>
              <h1>{aboutPageCopy.title}</h1>
              <p className="lex-about__lead">{aboutPageCopy.lead}</p>
              <div className="lex-about__hero-cta">
                <Link className="button button--blue" href="/contact">Start a Project</Link>
                <Link className="lex-about__hero-link" href="/services">
                  See the service stack <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="lex-about__intro">
          <div className="site-shell lex-about__intro-grid">
            <div>
              <p className="section-kicker">Who we are</p>
              <h2>A Lexington trade show team that runs the project, not just the brief</h2>
            </div>
            <div className="lex-about__intro-copy">
              {aboutPageCopy.paragraphs.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="lex-about__metrics">
          <div className="site-shell">
            <div className="lex-about__metrics-grid">
              {marketHighlights.map((fact) => (
                <article className="lex-about__metric" key={fact.label}>
                  <p className="lex-about__metric-label">{fact.label}</p>
                  <h3>{fact.value}</h3>
                  <p>{fact.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lex-about__process">
          <div className="site-shell">
            <div className="lex-about__section-head">
              <p className="section-kicker">How we work</p>
              <h2>Four phases, one team, no handoffs</h2>
              <p className="lex-about__section-lead">
                The same crew that scopes the project supervises the floor. Plans hold together because the people who wrote them are the people who run them.
              </p>
            </div>
            <div className="lex-about__process-grid">
              {PROCESS_STEPS.map((step) => (
                <article className="lex-about__process-card" key={step.step}>
                  <span className="lex-about__process-step" aria-hidden="true">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lex-about__principles">
          <div className="site-shell lex-about__principles-grid">
            <div className="lex-about__principles-copy">
              <p className="section-kicker section-kicker--light">What stays consistent</p>
              <h2>How a project earns the right to repeat</h2>
              {aboutPageCopy.paragraphs.slice(2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="lex-about__principles-list">
              {PRINCIPLES.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lex-about__cta">
          <div className="site-shell lex-about__cta-inner">
            <div>
              <p className="section-kicker section-kicker--light">Plan a Lexington show</p>
              <h2>Bring us the venue and the date. We will hand back a real plan.</h2>
              <p>{`Reach the planning desk directly at ${business.phone} or ${business.email}.`}</p>
            </div>
            <div className="lex-about__cta-actions">
              <Link className="button button--blue" href="/contact">Start a Conversation</Link>
              <div className="lex-about__cta-links" aria-label="Related sections">
                {aboutPageCopy.linkRows.slice(0, 4).map((link) => (
                  <Link className="lex-about__cta-link" href={link.href} key={link.href}>
                    {link.label} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
