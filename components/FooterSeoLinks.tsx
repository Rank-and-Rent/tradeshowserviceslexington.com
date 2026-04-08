import Link from "next/link";

type FooterLink = { href: string; label: string };
type FooterColumn = { title: string; links: FooterLink[] };

const FOOTER_SEO_COLUMNS: FooterColumn[] = [
  {
    "title": "Services",
    "links": [
      {
        "href": "/services/turnkey-trade-show-services",
        "label": "Turnkey Trade Show Services"
      },
      {
        "href": "/services/trade-show-general-contracting",
        "label": "Trade Show General Contracting"
      },
      {
        "href": "/services/exhibitor-appointed-contractor-coordination",
        "label": "Exhibitor-Appointed Contractor Coordination"
      },
      {
        "href": "/services/trade-show-booth-design",
        "label": "Trade Show Booth Design"
      },
      {
        "href": "/services/custom-exhibit-fabrication",
        "label": "Custom Exhibit Fabrication"
      },
      {
        "href": "/services/trade-show-installation-and-dismantle",
        "label": "Trade Show Installation and Dismantle"
      },
      {
        "href": "/services/trade-show-labor-coordination",
        "label": "Trade Show Labor Coordination"
      },
      {
        "href": "/services/show-site-supervision",
        "label": "Show-Site Supervision"
      }
    ]
  },
  {
    "title": "Locations",
    "links": [
      {
        "href": "/locations/downtown-des-moines",
        "label": "Downtown Des Moines"
      },
      {
        "href": "/locations/east-village",
        "label": "East Village"
      },
      {
        "href": "/locations/western-gateway",
        "label": "Western Gateway"
      },
      {
        "href": "/locations/court-avenue-district",
        "label": "Court Avenue District"
      },
      {
        "href": "/locations/riverfront-des-moines",
        "label": "Riverfront Des Moines"
      },
      {
        "href": "/locations/ingersoll-avenue",
        "label": "Ingersoll Avenue"
      },
      {
        "href": "/locations/sherman-hill",
        "label": "Sherman Hill"
      },
      {
        "href": "/locations/drake-neighborhood",
        "label": "Drake Neighborhood"
      }
    ]
  },
  {
    "title": "Venues",
    "links": [
      {
        "href": "/venues/community-choice-convention-center",
        "label": "Community Choice Convention Center"
      },
      {
        "href": "/venues/emc-expo-center",
        "label": "EMC Expo Center"
      },
      {
        "href": "/venues/caseys-center",
        "label": "Casey's Center"
      },
      {
        "href": "/venues/hilton-des-moines-downtown",
        "label": "Hilton Des Moines Downtown"
      },
      {
        "href": "/venues/des-moines-marriott-downtown",
        "label": "Des Moines Marriott Downtown"
      },
      {
        "href": "/venues/embassy-suites-des-moines-downtown",
        "label": "Embassy Suites by Hilton Des Moines Downtown"
      },
      {
        "href": "/venues/renaissance-des-moines-savery-hotel",
        "label": "Renaissance Des Moines Savery Hotel"
      },
      {
        "href": "/venues/hotel-fort-des-moines",
        "label": "Hotel Fort Des Moines"
      }
    ]
  },
  {
    "title": "Industries",
    "links": [
      {
        "href": "/industries/healthcare-trade-show-services",
        "label": "Healthcare Trade Show Services"
      },
      {
        "href": "/industries/technology-trade-show-services",
        "label": "Technology Trade Show Services"
      },
      {
        "href": "/industries/manufacturing-expo-services",
        "label": "Manufacturing Expo Services"
      },
      {
        "href": "/industries/food-and-beverage-trade-show-services",
        "label": "Food and Beverage Trade Show Services"
      },
      {
        "href": "/industries/beauty-and-cosmetics-trade-show-services",
        "label": "Beauty and Cosmetics Trade Show Services"
      },
      {
        "href": "/industries/automotive-trade-show-services",
        "label": "Automotive Trade Show Services"
      },
      {
        "href": "/industries/retail-and-ecommerce-event-services",
        "label": "Retail and Ecommerce Event Services"
      },
      {
        "href": "/industries/industrial-trade-show-services",
        "label": "Industrial Trade Show Services"
      }
    ]
  }
];

const FOOTER_SEO_COMPANY: FooterLink[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export function FooterSeoLinks() {
  return (
    <nav
      aria-label="Footer"
      className="footer-seo-links"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))",
        gap: "1.5rem 2rem",
        padding: "2rem 1rem",
        width: "100%",
        maxWidth: "72rem",
        margin: "0 auto",
        fontSize: "0.875rem",
        lineHeight: 1.5,
      }}
    >
      {FOOTER_SEO_COLUMNS.map((column) => (
        <div key={column.title} className="footer-seo-links__column">
          <h3
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: "0.75rem",
            }}
          >
            {column.title}
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.4rem" }}>
            {column.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} style={{ color: "inherit", textDecoration: "none" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="footer-seo-links__column">
        <h3
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: "0.75rem",
          }}
        >
          Company
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.4rem" }}>
          {FOOTER_SEO_COMPANY.map((link) => (
            <li key={link.href}>
              <Link href={link.href} style={{ color: "inherit", textDecoration: "none" }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
