import Link from "next/link";

import { HeroVideoDialog } from "@/components/HeroVideoDialog";
import { SiteFrame } from "@/components/SiteFrame";
import { business } from "@/lib/site-data";

type FeaturedWorkCard = {
  title: string;
  href: string;
  image?: string;
  tone: "photo" | "blue" | "sand" | "red";
};

const featuredWork = [
  {
    title: "Downtown convention execution with skywalk-connected logistics",
    href: "/venues/community-choice-convention-center",
    image: "/media/hero-candidate-2.jpg",
    tone: "photo"
  },
  {
    title: "West corridor corporate programs that move cleanly through hotel inventory",
    href: "/locations/west-des-moines",
    image: "/media/hero-candidate-1.jpg",
    tone: "photo"
  },
  {
    title: "Fairgrounds public-show logistics with a second-event-cluster mindset",
    href: "/venues/william-c-knapp-varied-industries-building",
    tone: "blue"
  },
  {
    title: "North metro association meetings built for repeat attendance and easy access",
    href: "/locations/ankeny",
    tone: "sand"
  },
  {
    title: "Activation and AV rollouts that keep the room, the message, and the timing aligned",
    href: "/services/brand-activation-production",
    tone: "red"
  }
] satisfies FeaturedWorkCard[];

const capabilityRows = [
  {
    title: "Experience Strategy & Show Planning",
    body:
      "The work starts with the real venue, show date, footprint, labor posture, and buyer objective. That keeps the operating model grounded before graphics, AV, freight, and field schedules start diverging into separate assumptions. It also makes it easier to spot where the brief is thin, which decisions need to be locked first, and whether the event belongs in a downtown convention room, a west-corridor hotel, or a fairgrounds building with a different access pattern. Good strategy work also surfaces the obvious trade-offs early, like whether the brand needs more impact, more speed, more reuse, or more control over the live room.",
    href: "/services/trade-show-strategy-and-pre-show-planning"
  },
  {
    title: "Creative, Content & Booth Development",
    body:
      "Design decisions are scoped with the room, traffic pattern, and build pressure in mind so the booth concept survives the handoff into fabrication, transport, and install with its core idea intact. That usually means checking sightlines, booth height, product display priorities, storage needs, and how the visitor story should unfold once someone steps into the space. In practice, this is where the team decides whether the booth should feel open and inviting, more product-dense, more private for conversations, or more theatrical because the brand needs the room to do heavier selling.",
    href: "/services/trade-show-booth-design"
  },
  {
    title: "Environmental Design & Fabrication",
    body:
      "Custom booths, modular systems, graphics, lounge environments, and reconfigurable builds are managed as one production path instead of a disconnected pile of vendors with overlapping deadlines. That gives the team a better way to balance finish quality, reuse, truck space, and the practical limits of the venue or hotel ballroom already in play. It also makes the asset conversation more realistic, because the choice is rarely between a perfect custom build and a budget shortcut; it is usually between a few workable approaches that each change transport, storage, and the next-show timeline.",
    href: "/services/custom-exhibit-fabrication"
  },
  {
    title: "Labor, AV & Show-Site Execution",
    body:
      "I&D, technical production, utilities, and field leadership are planned against the current venue guide so the live room behaves the way the brief promised and the day-of team is not improvising under pressure. The live part of the job is where the schedule, the building, and the people have to work together, and this is the layer that keeps that from turning into a scramble. It also gives the client a clearer picture of what has to happen at load-in, what can be delegated, and what has to be protected so the floor looks polished when the doors open.",
    href: "/services/trade-show-av-production"
  },
  {
    title: "Measurement, Reuse & Program Rollouts",
    body:
      "Storage, asset management, refurbishments, and multi-show rollouts matter because the best Des Moines project is usually the one that makes the next stop easier to brief, build, and repeat. When the system is built well, the team can move faster on the next market, protect the visual standard, and avoid re-solving the same problems every time the show calendar turns over. That matters for organizations that show in more than one city, because the exhibit becomes a platform rather than a one-off expense line.",
    href: "/services/multi-show-rollout-services"
  }
] as const;

const articleCards = [
  {
    tag: "Venue planning",
    title: "How Des Moines venue choice changes the production path from the first truck through the last strike cart",
    text:
      "Downtown halls, west-corridor hotels, and east-side conference spaces all create different labor, access, and order-flow assumptions, which is why the venue should come before the rest of the build logic.",
    href: "/venues"
  },
  {
    tag: "Market coverage",
    title: "Why the Bluegrass region should not be sold like one generic metro",
    text:
      "The downtown convention core, north metro, airport corridor, and east-side event cluster each need their own routing, staffing, and venue language, because the same project can feel very different in each of them.",
    href: "/locations"
  }
] as const;

export default function HomePage() {
  return (
    <SiteFrame>
      <div className="home-page">
        <section className="sparks-hero">
          <div className="sparks-hero__media" aria-hidden="true">
            <video
              autoPlay
              className="sparks-hero__video"
              loop
              muted
              playsInline
              poster="/media/hero-poster.png"
            >
              <source src="/media/hero-loop.webm" type="video/webm" />
              <source src="/media/hero-loop.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="sparks-hero__scrim" />
          <div className="site-shell">
            <div className="sparks-hero__content">
              <div className="sparks-hero__headline">
                <h1>
                  Experiences for exhibitors who need planning, fabrication, and field execution aligned around one real operating plan.
                </h1>
              </div>
              <HeroVideoDialog />
            </div>
          </div>
        </section>

        <section className="home-centered">
          <div className="site-shell">
            <Link className="section-kicker" href="/event-types/trade-show-services">
              DES MOINES TRADE SHOW EXECUTION
            </Link>
            <h2>
              We integrate strategy, booth development, labor, logistics, and show-site execution into one accountable delivery path.
            </h2>
            <p style={{ marginTop: "18px", maxWidth: "56rem" }}>
              Coverage extends into the <Link href="/locations/ankeny">north metro</Link>,
              the <Link href="/locations/altoona">east-side conference cluster</Link>, and
              the <Link href="/locations/airport-corridor">airport-adjacent corridor</Link>{" "}
              so the planning path stays tied to the actual Central Iowa submarkets buyers use.
              That matters because a downtown convention schedule, a West Des Moines hotel
              program, and a fairgrounds activation all ask for different timing, routing,
              and labor assumptions even when the brand objective sounds similar.
              The useful part of that context is that it changes the conversation from
              "what can we do?" to "what is the cleanest way to make this work here?"
              In other words, the market tells you where the friction will appear before
              the first truck is loaded.
              It also keeps the team honest about what is venue-specific and what can
              travel cleanly from one program to the next. That kind of discipline is
              helpful whether the work is a downtown expo, a west-corridor conference,
              or a regional activation that needs to feel consistent across multiple
              stops.
            </p>
          </div>
        </section>

        <section className="home-featured">
          <div className="site-shell">
            <div className="home-featured__heading">
              <p className="section-kicker section-kicker--light">SELECT WORKSTREAMS</p>
              <Link href="/services">View the full service stack</Link>
            </div>

            <div className="home-featured__rail">
              {featuredWork.map((item) => (
                <Link
                  className={`home-featured__card home-featured__card--${item.tone}`}
                  href={item.href}
                  key={item.href}
                  style={
                    item.image
                      ? {
                          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.52)), url(${item.image})`
                        }
                      : undefined
                  }
                >
                  <span>featured work</span>
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-accordion">
          <div className="site-shell">
              <p className="section-kicker">INTEGRATED DELIVERY LAYERS</p>
              <h2>
                We connect the moving parts from the brief through install, live days, and strike.
              </h2>

            <div className="home-accordion__stack">
              {capabilityRows.map((item, index) => (
                <details className="home-accordion__item" key={item.href} open={index === 0}>
                  <summary>
                    <span>{item.title}</span>
                    <span className="home-accordion__icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </summary>
                  <div className="home-accordion__body">
                    <p>{item.body}</p>
                    <Link href={item.href}>View planning path</Link>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="home-articles">
          <div className="site-shell">
            <div className="home-articles__intro">
              <p className="section-kicker">News, trends and insights</p>
              <h2>
                Planning routes built around the rooms, service stacks, and market conditions exhibitors actually inherit.
              </h2>
            </div>

            <div className="home-articles__grid">
              {articleCards.map((card) => (
                <Link className="home-articles__card" href={card.href} key={card.href}>
                  <p>{card.tag}</p>
                  <h3>{card.title}</h3>
                  <span>{card.text}</span>
                  <strong>view article</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-split-cta">
          <div className="home-split-cta__grid">
            <Link className="home-split-cta__panel home-split-cta__panel--light" href="/about">
              <p className="section-kicker">about {business.city.toLowerCase()}</p>
              <h2>Project-led. Venue-aware. Execution-obsessed.</h2>
              <span>who we are</span>
            </Link>

            <Link className="home-split-cta__panel home-split-cta__panel--dark" href="/contact">
              <p className="section-kicker section-kicker--light">let&apos;s talk</p>
              <h2>Ready to turn the next show into a cleaner, calmer build?</h2>
              <span>get in touch</span>
            </Link>
          </div>
        </section>

        <section className="home-brief-band">
          <div className="site-shell home-brief-band__inner">
            <div>
              <h2>Planning updates on tap</h2>
              <p>
                Start with the venue, show date, service mix, and project details. We use that brief to map the cleanest Des Moines delivery path. That usually means the planning team can separate the big decisions from the small ones and move into the right route faster.
                It also means the client can make a decision with enough context to avoid
                last-minute changes that usually cost more time than they save. If the
                venue, footprint, or delivery model changes, the plan can adapt without
                forcing the whole project to start over.
              </p>
            </div>
            <div className="home-brief-band__actions">
              <Link className="button button--blue" href="/services">
                Browse services
              </Link>
              <Link className="button button--ghost" href="/venues">
                Explore venues
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
