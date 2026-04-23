import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <div className="section-shell">
        <section className="section-hero">
          <div className="site-shell">
            <div className="section-hero__content">
              <p className="section-kicker section-kicker--light">Not found</p>
              <h1>Section not found</h1>
              <p className="section-hero__lead">
                Use the main navigation to return to Lexington services, venue guides,
                market maps, or the contact section.
              </p>
              <div style={{ marginTop: "18px" }}>
                <Link className="button button--dark" href="/">
                  Return home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
