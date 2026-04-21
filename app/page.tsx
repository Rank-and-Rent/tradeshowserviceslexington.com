import Link from "next/link";

import { SiteFrame } from "@/components/SiteFrame";
import { getRecoveredTaxonomyMediaUrl } from "@/lib/taxonomy-media";

type FeaturedWorkCard = {
  title: string;
  href: string;
  image?: string;
  tone: "photo" | "blue" | "sand" | "red";
};

const featuredWork: FeaturedWorkCard[] = [
  {
    title: "Downtown convention execution with hotel-ring timing",
    href: "/venues/central-bank-center",
    tone: "blue",
    image: getRecoveredTaxonomyMediaUrl("services", "conference-and-venue-execution") ?? undefined
  },
  {
    title: "Newtown Pike programs that keep arrivals and load-in aligned",
    href: "/locations/newtown-pike-corridor",
    tone: "sand",
    image: getRecoveredTaxonomyMediaUrl("services", "trade-show-project-management") ?? undefined
  },
  {
    title: "Fairgrounds-scale logistics with a calmer field plan",
    href: "/venues/william-c-knapp-varied-industries-building",
    tone: "blue",
    image: getRecoveredTaxonomyMediaUrl("services", "show-site-supervision") ?? undefined
  },
  {
    title: "North-side meetings built for repeat attendance and easy access",
    href: "/locations/versailles",
    tone: "sand",
    image: getRecoveredTaxonomyMediaUrl("services", "trade-show-booth-design") ?? undefined
  },
  {
    title: "Activation and audio programs that keep the room and the message aligned",
    href: "/services/brand-activation-production",
    tone: "red",
    image: getRecoveredTaxonomyMediaUrl("services", "trade-show-av-production") ?? undefined
  }
];

const capabilityRows = [
  {
    title: "Venue-first strategy and show planning",
    body:
      "Every project starts with the building, the date, the footprint, and the audience goal. That order matters because the venue sets the rules that everything else has to obey: access windows, service ordering, labor assumptions, dock timing, and the way the room actually behaves once people are in it. Good planning also surfaces trade-offs early, like whether the brand needs more impact, more reuse, more speed, or more control over the live environment. When the brief starts that way, the rest of the work has a clearer shape from the first conversation to the final check before doors open. It also makes the team less likely to treat a venue like a blank canvas when the building already has a clear personality and a clear set of constraints.",
    href: "/services/trade-show-strategy-and-pre-show-planning"
  },
  {
    title: "Creative development and booth building",
    body:
      "Booth concepts are shaped around sightlines, product display, storage, traffic movement, and how the visitor experiences the brand in the first few seconds. The goal is to make a structure that survives fabrication, transport, install, and live use without losing the idea that made it worthwhile in the first place. That means checking scale, budget, height, private conversation needs, and the amount of visual pressure the room can support before the design gets locked. A good design conversation also protects the small operational details, like how staff enter the space, where literature or product storage disappears, and what the visitor sees first when they arrive at the booth edge.",
    href: "/services/trade-show-booth-design"
  },
  {
    title: "Fabrication, graphics, and reusable assets",
    body:
      "Custom fabrication, modular systems, graphics, and reconfigurable builds are easier to manage when they are treated as one coordinated production chain instead of a series of disconnected purchases. That makes it possible to balance finish quality, reuse, truck space, storage, and the practical limits of the venue already in play. It also keeps the asset conversation honest, because the choice is rarely between a perfect custom build and a cheap shortcut. It is usually between a few workable paths that each change freight, labor, and the next-show timeline in different ways. When those choices are made early, the team can protect the brand look without losing sight of what the truck, the dock, and the storage plan actually need.",
    href: "/services/custom-exhibit-fabrication"
  },
  {
    title: "Labor, audio, and show-day supervision",
    body:
      "Installation, dismantle, utilities, technical production, and field leadership need to be planned against the current venue guidance so the live room actually behaves the way the brief promised. The live part of the work is where the schedule, the building, and the people have to work together. Good field leadership keeps that from turning into a scramble by making the day-of chain of command clear enough to hold under pressure. It also gives the client a cleaner view of what needs attention at load-in, what can be delegated, and what needs protection so the floor looks finished when the doors open. The best version of this work feels calm because the decisions were already made before the room became crowded with carts, crates, and questions.",
    href: "/services/trade-show-av-production"
  },
  {
    title: "Reuse, storage, and multi-show rollouts",
    body:
      "Storage, asset management, refurbishments, and multi-show rollouts matter because the best Lexington project is usually the one that makes the next stop easier to brief, build, and repeat. A strong system can move faster on the next market, protect the visual standard, and avoid re-solving the same problems each time the calendar turns over. That matters for organizations that appear in more than one city because the exhibit becomes a platform rather than a one-off expense line. When the work is built with reuse in mind, the program gets more stable as it grows. The same logic also keeps the internal team from rebuilding a process every time the calendar changes, which is a hidden cost that rarely shows up until the work gets repetitive.",
    href: "/services/multi-show-rollout-services"
  }
] as const;

const articleCards = [
  {
    tag: "Venue planning",
    title: "Why downtown Lexington, the hotel ring, and the convention core do not ask for the same production sequence",
    text:
      "Central Bank Center, the attached hotels, and the surrounding downtown blocks all create different timing, access, and labor assumptions, so the building comes before the rest of the build logic.",
    href: "/venues"
  },
  {
    tag: "Market map",
    title: "How Lexington neighborhoods and nearby Bluegrass markets change the planning conversation",
    text:
      "Downtown Lexington, Newtown Pike, Hamburg, Beaumont, South Lexington, and the surrounding regional ring each create their own hotel, parking, and guest-flow behavior, which changes the way the work gets staged.",
    href: "/locations"
  }
] as const;

export default function HomePage() {
  return (
    <SiteFrame>
      <div className="home-page">
        <section className="sparks-hero">
          <div className="sparks-hero__media" aria-hidden="true" />
          <div className="sparks-hero__scrim" />
          <div className="site-shell">
            <div className="sparks-hero__content">
              <div className="sparks-hero__headline">
                <p className="sparks-hero__eyebrow">Lexington, Kentucky</p>
                <h1>
                  Trade show services built for Central Bank Center, Rupp Arena, Kentucky Horse Park, and the Bluegrass region.
                </h1>
                <p className="sparks-hero__lede">
                  Venue-first planning, booth build, logistics, and show-day field leadership working as one accountable delivery chain for Lexington programs and regional road shows.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-centered">
          <div className="site-shell">
            <Link className="section-kicker" href="/event-types/trade-show-services">
              Lexington trade show execution
            </Link>
            <h2>
              We integrate strategy, booth development, labor, logistics, and show-day execution into one accountable delivery chain.
            </h2>
            <p style={{ marginTop: "18px", maxWidth: "56rem" }}>
              Lexington works best when the building comes first and the rest of the work follows it. Downtown convention programs, hotel meetings on Newtown Pike, west-side business parks, east-side drive traffic, and the broader Bluegrass ring all create different timing and access behavior.
            </p>
            <p style={{ marginTop: "18px", maxWidth: "56rem" }}>
              A downtown convention floor usually needs tighter freight timing and stronger hotel coordination, while a ballroom off Newtown Pike may need easier parking, a cleaner hospitality path, or a different storage plan. Regional meetings add another layer when the audience is driving in and expects the room to feel simple and direct.
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
              <p className="section-kicker">Planning notes and market angles</p>
              <h2>
                Planning notes built around the rooms, service stacks, and local conditions exhibitors actually inherit.
              </h2>
            </div>

            <div className="home-articles__grid">
              {articleCards.map((card) => (
                <Link className="home-articles__card" href={card.href} key={card.href}>
                  <p>{card.tag}</p>
                  <h3>{card.title}</h3>
                  <span>{card.text}</span>
                  <strong>view guide</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-split-cta">
          <div className="home-split-cta__grid">
            <Link className="home-split-cta__panel home-split-cta__panel--light" href="/about">
              <p className="section-kicker">About Lexington</p>
              <h2>Project-led. Venue-aware. Execution-focused.</h2>
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
              <h2>Planning detail that keeps pace</h2>
              <p>
                Start with the venue, show date, service mix, and project details. That gives the planning team enough context to separate the big decisions from the small ones and map a cleaner Lexington delivery chain.
                It also makes it easier to protect the schedule if the room changes, the footprint shifts, or the event needs a different support mix than the first pass suggested.
              </p>
            </div>
            <div className="home-brief-band__actions">
              <Link className="button button--blue" href="/contact">
                Start a Project Brief
              </Link>
              <Link className="button button--dark" href="/venues">
                Review venue guides
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
