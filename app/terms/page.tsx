import { SiteFrame } from "@/components/SiteFrame";

export default function TermsPage() {
  return (
    <SiteFrame>
      <div className="page-shell">
        <section className="page-hero">
          <div className="site-shell">
            <div className="page-hero__content">
              <p className="section-kicker section-kicker--light">Terms</p>
              <h1>Terms of use</h1>
              <p className="page-hero__lead">
                By using these pages, you agree to use the information for lawful
                business and project-planning purposes.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="site-shell">
            <div className="legal-copy">
              <p>
                The information here is provided for general business and planning
                purposes. Venue pages, market pages, event-format pages, and
                service pages are meant to support buyer-facing planning and should not
                be treated as legal advice, labor advice, or event-manual replacement
                instructions.
              </p>
              <p>
                Venue requirements, organizer rules, service ordering systems, and
                labor expectations can change between shows. Always confirm final
                operating details directly with the venue and event organizer before
                relying on public planning copy.
              </p>
              <p>
                Content on these pages may not be reproduced or republished for external
                commercial purposes without permission. Internal use for planning,
                review, and business communication is permitted.
              </p>
              <p>
                Submitted information may be used only for follow-up communication and
                internal planning purposes related to Lexington trade show services,
                market planning, and event support.
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
