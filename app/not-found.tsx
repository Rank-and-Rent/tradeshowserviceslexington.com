import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <div className="page-shell">
        <section className="page-hero">
          <div className="site-shell">
            <div className="page-hero__content">
              <p className="section-kicker section-kicker--light">Not found</p>
              <h1>Page not found</h1>
              <p className="page-hero__lead">
                Use the main navigation to return to Des Moines services, venue guides,
                location coverage, or the contact page.
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
