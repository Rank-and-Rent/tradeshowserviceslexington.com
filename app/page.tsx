import Link from "next/link";

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
    title: "Downtown convention execution",
    href: "/venues/community-choice-convention-center",
    image: "/media/hero-candidate-2.jpg",
    tone: "photo"
  },
  {
    title: "West corridor corporate programs",
    href: "/locations/west-des-moines",
    image: "/media/hero-candidate-1.jpg",
    tone: "photo"
  },
  {
    title: "Fairgrounds public-show logistics",
    href: "/venues/william-c-knapp-varied-industries-building",
    tone: "blue"
  },
  {
    title: "Ankeny association meetings",
    href: "/locations/ankeny",
    tone: "sand"
  },
  {
    title: "Activation and AV rollouts",
    href: "/services/brand-activation-production",
    tone: "red"
  }
] satisfies FeaturedWorkCard[];

const capabilityRows = [
  {
    title: "Experience Strategy & Show Planning",
    body:
      "The work starts with the real venue, show date, footprint, labor posture, and buyer objective. That keeps the operating model grounded before graphics, AV, freight, and field schedules start diverging.",
    href: "/services/trade-show-strategy-and-pre-show-planning"
  },
  {
    title: "Creative, Content & Booth Development",
    body:
      "Design decisions are scoped with the room, traffic pattern, and build pressure in mind so the booth concept can survive the practical handoff into fabrication and install.",
    href: "/services/trade-show-booth-design"
  },
  {
    title: "Environmental Design & Fabrication",
    body:
      "Custom booths, modular systems, graphics, lounge environments, and reconfigurable builds are managed as one production path instead of a disconnected pile of vendors.",
    href: "/services/custom-exhibit-fabrication"
  },
  {
    title: "Labor, AV & Show-Site Execution",
    body:
      "I&D, technical production, utilities, and field leadership are planned against the current venue guide so the live room behaves the way the brief promised.",
    href: "/services/trade-show-av-production"
  },
  {
    title: "Measurement, Reuse & Program Rollouts",
    body:
      "Storage, asset management, refurbishments, and multi-show rollouts matter because the best Des Moines project is usually the one that makes the next stop easier.",
    href: "/services/multi-show-rollout-services"
  }
] as const;

const articleCards = [
  {
    tag: "Venue planning",
    title: "How Des Moines venue choice changes the production path",
    text:
      "Downtown halls, west-corridor hotels, fairgrounds buildings, and Altoona conference spaces all create different labor, access, and order-flow assumptions.",
    href: "/venues"
  },
  {
    tag: "Market coverage",
    title: "Why Central Iowa should not be sold like one generic metro",
    text:
      "The downtown convention core, north metro, airport corridor, and east-side event cluster each need their own routing, staffing, and venue language.",
    href: "/locations"
  }
] as const;

export default function HomePage() {
  return (
    <SiteFrame>
      <div className="home-page">
        <section className="sparks-hero">
          <div className="sparks-hero__media" />
          <div className="sparks-hero__scrim" />
          <div className="site-shell">
            <div className="sparks-hero__content">
              <div className="sparks-hero__headline">
                <h1>
                  Experiences for exhibitors who need planning, fabrication, and
                  field execution aligned.
                </h1>
              </div>
              <Link className="sparks-hero__play" href="/contact">
                <span className="sparks-hero__play-ring" aria-hidden="true" />
                <span>open brief</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-centered">
          <div className="site-shell">
            <p className="section-kicker">DES MOINES TRADE SHOW SERVICES</p>
            <h2>
              We integrate strategy, booth development, labor, logistics, and show-site
              execution into one accountable delivery path.
            </h2>
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
              We connect the moving parts from the brief through install, live days,
              and strike.
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
                Planning routes built around the rooms, service stacks, and market
                conditions exhibitors actually inherit.
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
              <h2>Ready to create something extraordinary?</h2>
              <span>get in touch</span>
            </Link>
          </div>
        </section>

        <section className="home-brief-band">
          <div className="site-shell home-brief-band__inner">
            <div>
              <h2>Planning updates on tap</h2>
              <p>
                Start with the venue, show date, service mix, and project details. We
                use that brief to map the cleanest Des Moines delivery path.
              </p>
            </div>
            <div className="home-brief-band__actions">
              <Link className="home-brief-band__button" href="/contact">
                Start a project brief
              </Link>
              <p>
                We care about the protection of your data. Read our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
