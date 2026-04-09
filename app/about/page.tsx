import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";
import { business, marketHighlights, resourceCards } from "@/lib/site-data";

const aboutCards = [
  {
    title: "Venue-aware planning",
    text: "Every route on the site is tied back to real venue guides, market research, labor posture, and event-format realities in the Des Moines and Central Iowa market, so the copy never has to pretend the same answer fits every room. That keeps the content rooted in actual buildings, actual corridors, and actual event patterns instead of abstract SEO language."
  },
  {
    title: "Broad trade show positioning",
    text: "The positioning stays intentionally broad across turnkey delivery, EAC coordination, labor, AV, logistics, fabrication, and conference or activation support because that is how real exhibit work arrives. The mix changes from one project to the next, and the site needs enough range to reflect that without sounding vague."
  },
  {
    title: "Project-led execution",
    text: "The point is to keep booth, venue, freight, graphics, labor, and show-site leadership on one readable operating path instead of splitting the brief into disconnected vendors with their own version of the schedule. When those parts are connected, the show feels calmer, and the client has a better sense of who owns what."
  }
] as const;

export default function AboutPage() {
  return (
    <SiteFrame>
      <div className="page-shell">
        <section className="page-hero">
          <div className="site-shell">
            <div className="page-hero__content">
              <p className="section-kicker section-kicker--light">About us</p>
              <h1>Project-led trade show delivery for Des Moines venues</h1>
              <p className="page-hero__lead">
                {business.name} is built around turnkey show execution: booth design,
                fabrication, labor, AV, logistics, exhibitor-appointed-contractor
                coordination, and{" "}
                <Link href="/services/show-site-supervision">onsite field leadership</Link>{" "}
                tied to one operating path.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="site-shell">
            <div className="page-copy">
              <p>
                This site is built around Des Moines&apos; actual meeting and convention
                landscape rather than a generic national template. The planning
                framework starts with the downtown convention core, expands into West
                Des Moines and the west corridor, moves through the{" "}
                <Link href="/locations/ankeny">north metro conference zone</Link>, and
                then includes the east-side fairgrounds and{" "}
                <Link href="/locations/altoona">east-side event cluster</Link> plus the{" "}
                <Link href="/locations/airport-corridor">airport-adjacent corridor</Link>.
                Those references are not decorative. They point the reader to the
                submarkets that genuinely change how freight is routed, how hotels are
                selected, and how the floor plan behaves once guests start moving
                through the space. The downtown core is a different planning problem
                from a suburban ballroom, and the copy acknowledges that instead of
                flattening both into one citywide statement.
              </p>
              <p>
                The operating model is intentionally project-led. Instead of splitting
                design, logistics, AV, graphics, labor, and field execution into
                disconnected silos, {business.name} treats them as one coordinated
                workflow. The result should be fewer handoff errors, cleaner venue
                communication, and a briefing path that helps buyers make decisions
                earlier, when those decisions still matter. That is the difference
                between a project that feels assembled at the last minute and a project
                that feels like it had an operating plan from the first conversation.
                It also gives internal teams something useful to work from, because the
                logistics path, the creative path, and the onsite path are all pointing
                at the same end state instead of competing with one another.
              </p>
              <p>
                That approach matters in a market like Des Moines because the same
                project can move from a downtown exhibit hall to a hotel ballroom, a
                fairgrounds building, or a corporate meeting room with very different
                access rules and service expectations. The site copy keeps those
                differences visible so the reader sees the real operating context, not
                just a polished headline. A good page should tell you whether the room
                is a fit, what needs confirmation, and what kind of support is likely to
                be needed before the move-in window opens. That is especially useful
                when a brand is comparing a one-off event with a repeat program or a
                regional rollout, because the best option is not always the most
                obvious one at first glance.
              </p>
              <p>
                The goal is not to sound broad for its own sake. The goal is to help
                exhibitors, agencies, sponsors, and venue teams understand what needs
                to happen first, what can wait, and which local variables matter most
                before the project moves into a live schedule. That framing is useful
                whether the work is a single booth, a recurring regional program, a
                conference floor, or a venue-led activation with more moving parts than
                the initial brief suggests. It also makes the site easier to use when
                the conversation starts with a general idea and then narrows into the
                exact service mix, venue, or market route that actually fits the event.
              </p>
              <p>
                It also gives the reader a clearer sense of the team behind the work.
                Some visitors are coming from a procurement angle and need to know where
                the scope begins and ends. Others are internal marketers trying to align
                a brand story with a building, a date, and a freight window. Others are
                venue teams or agencies trying to understand who can help solve the
                practical parts without overcomplicating the rest of the project. The
                site is written to help all of those people reach the same basic
                understanding.
              </p>
              <p>
                That is why the tone stays practical and local. Des Moines does not need
                a glossy generic narrative; it needs copy that knows the difference
                between the downtown convention core, a west-corridor hotel meeting, a
                fairgrounds show, and a north-metro conference program. Those are
                different planning situations, and the site reflects that reality in
                every route and every card.
              </p>
              <p>
                The pages are also meant to be useful for people who already know the
                market and just need a faster way to compare options. If you are
                deciding between a convention center, a hotel ballroom, or a fairgrounds
                hall, the site should help you understand which one changes the most
                downstream work and where the hidden friction is likely to appear.
                That kind of clarity helps a team move from curiosity into action
                without spending half the meeting decoding vague language.
              </p>
              <p>
                The bigger idea is simple: good planning copy does not just describe the
                business, it helps the buyer think. It gives structure to the questions
                that matter most, like what the venue requires, how the schedule should
                be set up, which services need to be ordered early, and what the field
                team will need once the event is live. That is the standard this site is
                trying to meet across every route.
              </p>
            </div>

            <div className="page-stat-grid">
              {marketHighlights.map((fact) => (
                <article className="page-stat-card" key={fact.label}>
                  <strong>{fact.label}</strong>
                  <span>{fact.value}</span>
                  <p>{fact.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-section--soft">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-kicker">What this site is designed to cover</p>
              <h2>Built for exhibitors, associations, sponsors, and venue teams</h2>
            </div>

            <div className="page-card-grid" style={{ marginTop: "36px" }}>
              {aboutCards.map((card) => (
                <article className="page-card" key={card.title}>
                  <p className="page-card__kicker">About the model</p>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="site-shell">
            <div className="section-heading">
              <p className="section-kicker">Next steps</p>
              <h2>Move from positioning into routes that help buyers plan</h2>
            </div>

            <div className="page-card-grid" style={{ marginTop: "36px" }}>
              {resourceCards.map((item) => (
                <Link className="page-card" href={item.href} key={item.href}>
                  <p className="page-card__kicker">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="page-card__link">Open route</span>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: "36px" }}>
              <div className="cta-band">
                <div>
                  <p className="section-kicker section-kicker--light">Ready to brief your project?</p>
                  <h2>Start with the venue, service mix, and show date.</h2>
                <p>
                  That is usually enough to identify the right venue guide, booth
                  path, service stack, and next-step planning sequence.
                </p>
              </div>
                <Link className="button button--dark" href="/contact">
                  Brief your project
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
