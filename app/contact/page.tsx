import { ContactForm } from "@/components/ContactForm";
import { SiteFrame } from "@/components/SiteFrame";
import { business, serviceOptions } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <SiteFrame>
      <div className="page-shell">
        <section className="page-hero">
          <div className="site-shell">
            <div className="page-hero__content">
              <p className="section-kicker section-kicker--light">Contact us</p>
              <h1>Start the Des Moines project brief</h1>
              <p className="page-hero__lead">
                Share the show date, venue, service mix, and project details using the
                exact intake fields below. We use that information to frame schedule,
                delivery model, and next-step coordination.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="site-shell">
            <div className="contact-layout">
              <div className="contact-card">
                <p className="section-kicker">Base details</p>
                <h2>{business.name}</h2>
                <ul>
                  <li>{business.address}</li>
                  <li>{business.phone}</li>
                  <li>{business.email}</li>
                </ul>
                <p style={{ marginTop: "18px" }}>
                  Use the form to outline the exact show location and service scope.
                  That keeps the intake aligned with venue planning, logistics, and
                  show-week execution rather than sending a generic note.
                </p>
              </div>

              <div className="contact-card">
                <p className="section-kicker">Project brief</p>
                <h2>Use the full eight-field intake</h2>
                <p style={{ marginTop: "12px", marginBottom: "20px" }}>
                  The form stays intentionally specific so requests arrive with enough
                  detail to map the right Des Moines delivery path.
                </p>
                <ContactForm serviceOptions={serviceOptions} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
