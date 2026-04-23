import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";
import { blogPageCopy } from "@/lib/content";

const resourceCards = [
  {
    title: "Venue Planning Guides",
    body: blogPageCopy.paragraphs[1],
    href: "/venues",
  },
  {
    title: "Event Format Playbooks",
    body: blogPageCopy.paragraphs[2],
    href: "/event-types",
  },
  {
    title: "Booth and Rental Paths",
    body: blogPageCopy.paragraphs[3],
    href: "/booth-types",
  },
] as const;

export default function BlogPage() {
  return (
    <SiteFrame>
      <div className="content-section">
        <section className="inner-hero">
          <div className="container">
            <p className="section-kicker">{blogPageCopy.eyebrow}</p>
            <h1>{blogPageCopy.title}</h1>
            <p className="inner-hero__lead">{blogPageCopy.lead}</p>
          </div>
        </section>

        <section className="section-section">
          <div className="container">
            <div className="section-copy">
              {blogPageCopy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="taxonomy-grid">
              {resourceCards.map((card) => (
                <Link className="taxonomy-card" href={card.href} key={card.href}>
                  <p className="taxonomy-card__eyebrow">Resource path</p>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
