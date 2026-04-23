import { SiteFrame } from "@/components/SiteFrame";

export default function TermsPage() {
  return (
    <SiteFrame>
      <div className="section-shell">
        <section className="section-hero">
          <div className="site-shell">
            <div className="section-hero__content">
              <p className="section-kicker section-kicker--light">Terms</p>
              <h1>Terms of use</h1>
              <p className="section-hero__lead">
                By using these sections, you agree to use the information for lawful
                business and project-planning purposes.
              </p>
            </div>
          </div>
        </section>

        <section className="section-section">
          <div className="site-shell">
            <div className="legal-copy">
              <p>
                The information here is provided for general business and planning
                purposes. Venue sections, market guides, event-format sections, and
                service guides are meant to support buyer-facing planning and should not
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
                Content on these sections may not be reproduced or republished for external
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
