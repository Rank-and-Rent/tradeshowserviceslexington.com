import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";
import { resourceCards } from "@/lib/site-data";

export default function BlogPage() {
  return (
    <SiteFrame>
      <div className="page-shell">
        <section className="page-hero">
          <div className="site-shell">
            <div className="page-hero__content">
              <p className="section-kicker section-kicker--light">Resources</p>
              <h1>Des Moines trade show planning routes and resource paths</h1>
              <p className="page-hero__lead">
                Use these routes to move from high-level planning into venue guides,
                service stacks, location coverage, and buyer-specific detail pages
                across the Des Moines market. The goal is to make the next decision
                easier by showing which route explains the room, which route explains
                the service mix, and which route explains the local market around it.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section page-section--soft">
          <div className="site-shell">
            <div className="page-card-grid">
              {resourceCards.map((item) => (
                <Link className="page-card" href={item.href} key={item.href}>
                  <p className="page-card__kicker">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="page-card__link">Explore route</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
