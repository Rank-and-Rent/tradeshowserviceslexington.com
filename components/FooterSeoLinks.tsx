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
        "href": "/services/show-services-order-management",
        "label": "Show Services Order Management"
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
        "href": "/locations/downtown-lexington",
        "label": "Downtown Lexington"
      },
      {
        "href": "/locations/newtown-pike-corridor",
        "label": "Newtown Pike Corridor"
      },
      {
        "href": "/locations/hamburg",
        "label": "Hamburg"
      },
      {
        "href": "/locations/beaumont",
        "label": "Beaumont"
      },
      {
        "href": "/locations/south-lexington",
        "label": "South Lexington"
      },
      {
        "href": "/locations/nicholasville",
        "label": "Nicholasville"
      },
      {
        "href": "/locations/georgetown",
        "label": "Georgetown"
      },
      {
        "href": "/locations/versailles",
        "label": "Versailles"
      }
    ]
  },
  {
    "title": "Venues",
    "links": [
      {
        "href": "/venues/central-bank-center",
        "label": "Central Bank Center"
      },
      {
        "href": "/venues/hyatt-regency-lexington",
        "label": "Hyatt Regency Lexington"
      },
      {
        "href": "/venues/hilton-lexington-downtown",
        "label": "Hilton Lexington/Downtown"
      },
      {
        "href": "/venues/lexington-marriott-city-center",
        "label": "Lexington Marriott City Center"
      },
      {
        "href": "/venues/marriott-lexington-griffin-gate-golf-resort-and-spa",
        "label": "Marriott Lexington Griffin Gate Golf Resort & Spa"
      },
      {
        "href": "/venues/the-campbell-house-lexington",
        "label": "The Campbell House Lexington"
      },
      {
        "href": "/venues/embassy-suites-lexington-green",
        "label": "Embassy Suites Lexington Green"
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
        "href": "/industries/technology-and-software-expo-services",
        "label": "Technology and Software Expo Services"
      },
      {
        "href": "/industries/manufacturing-expo-services",
        "label": "Manufacturing Expo Services"
      },
      {
        "href": "/industries/agriculture-and-agtech-expo-services",
        "label": "Agriculture and AgTech Expo Services"
      },
      {
        "href": "/industries/equine-and-bourbon-industry-events",
        "label": "Equine and Bourbon Industry Events"
      },
      {
        "href": "/industries/financial-services-and-insurance-expo-services",
        "label": "Financial Services and Insurance Expo Services"
      },
      {
        "href": "/industries/logistics-and-distribution-expo-services",
        "label": "Logistics and Distribution Expo Services"
      },
      {
        "href": "/industries/education-and-association-event-services",
        "label": "Education and Association Event Services"
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
            {column.links.map((link, idx) => (
              <li key={`${link.href}-${idx}`}>
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
          {FOOTER_SEO_COMPANY.map((link, idx) => (
              <li key={`${link.href}-${idx}`}>
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
