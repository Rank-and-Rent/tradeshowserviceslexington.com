import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";
import { aboutPageCopy } from "@/lib/content";
import { marketHighlights } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <SiteFrame>
      <div className="content-section">
        <section className="section-hero section-hero--media section-hero--about">
          <div className="section-hero__media" aria-hidden="true">
            <img
              alt=""
              src="/media/planned/services/services-trade-show-booth-design-lexington-ky.webp"
              loading="eager"
            />
          </div>
          <div className="section-hero__overlay" aria-hidden="true" />
          <div className="site-shell">
            <div className="section-hero__content">
              <p className="section-kicker section-kicker--light">{aboutPageCopy.eyebrow}</p>
              <h1>{aboutPageCopy.title}</h1>
              <p className="section-hero__lead">{aboutPageCopy.lead}</p>
            </div>
          </div>
        </section>

        <section className="section-section">
          <div className="container section-copy">
            {aboutPageCopy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="container">
            <div className="metric-strip">
              {marketHighlights.map((fact) => (
                <article className="metric-strip__card" key={fact.label}>
                  <p className="metric-strip__label">{fact.label}</p>
                  <h2>{fact.value}</h2>
                  <p>{fact.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-section section-section--tight">
          <div className="container two-column-copy">
            <div>
              <p className="section-kicker">Operational focus</p>
              <h2>Project planning that stays tied to the venue and the schedule</h2>
              <p>{aboutPageCopy.paragraphs[0]}</p>
              <p>{aboutPageCopy.paragraphs[1]}</p>
            </div>
            <div>
              <p>{aboutPageCopy.paragraphs[2]}</p>
              <p>{aboutPageCopy.paragraphs[3]}</p>
              <p>{aboutPageCopy.paragraphs[4]}</p>
              <div className="rich-link-row" aria-label="Related planning sections">
                {aboutPageCopy.linkRows.map((link) => (
                  <Link className="inline-link" href={link.href} key={link.href}>
                    {link.label}
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
