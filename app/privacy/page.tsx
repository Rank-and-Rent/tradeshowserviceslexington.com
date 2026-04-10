import { SiteFrame } from "@/components/SiteFrame";

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <div className="page-shell">
        <section className="page-hero">
          <div className="site-shell">
            <div className="page-hero__content">
              <p className="section-kicker section-kicker--light">Privacy policy</p>
              <h1>Privacy policy</h1>
              <p className="page-hero__lead">
                The privacy notice below explains what information may be collected
                through the contact form and how it is used for follow-up communication
                and internal operations.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="site-shell">
            <div className="legal-copy">
              <p>
                Information submitted through the contact form may include the exact
                fields shown on the page: name, email, phone, company name, target
                show date, show location, service, and project details.
              </p>
              <p>
                Submitted information may be used to reply to requests, review service
                needs, prepare follow-up communication, coordinate next steps, and
                improve the way the business supports Lexington trade show planning and
                exhibitor project intake.
              </p>
              <p>
                This notice does not promise confidential treatment beyond normal
                operational handling. Do not submit sensitive financial, protected
                health, or other restricted information through the general contact
                form.
              </p>
              <p>
                Questions about the information collected here can be directed through
                the contact page using the same required intake fields.
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
