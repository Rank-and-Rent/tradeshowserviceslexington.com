import Link from "next/link";

import { business, footerLegalLinks } from "@/lib/site-data";

const footerActions = [
  {
    label: "Call",
    href: `tel:${business.phone.replace(/[^0-9]/g, "")}`,
    glyph: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M6.94 4h2.72l1.36 4.84-1.74 1.74a16.14 16.14 0 0 0 4.14 4.14l1.74-1.74L20 14.34V17a2 2 0 0 1-2 2A14 14 0 0 1 5 6a2 2 0 0 1 1.94-2Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  },
  {
    label: "Email",
    href: `mailto:${business.email}`,
    glyph: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M4 6h16v12H4z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path
          d="m5 7 7 6 7-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  },
  {
    label: "About",
    href: "/about",
    glyph: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          fill="none"
          r="8"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 10.2v.1M12 12.6v3.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  },
  {
    label: "Contact",
    href: "/contact",
    glyph: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M12 3v18M3 12h18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  },
  {
    label: "Services",
    href: "/services",
    glyph: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M7 7h10M7 12h10M7 17h7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
    )
  }
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="site-footer__top">
          <Link aria-label={business.name} href="/">
            <span className="site-wordmark">
              tsdm<span className="site-wordmark__dot">.</span>
            </span>
          </Link>

          <div className="site-footer__social">
            {footerActions.map((link) => (
              <Link aria-label={link.label} href={link.href} key={link.label}>
                {link.glyph}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            margin: "1rem auto",
            maxWidth: "400px"
          }}
        >
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`}
            loading="lazy"
            title="Business location map"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0
            }}
          />
        </div>

        <div className="site-footer__rule" />

        <div className="site-footer__bottom">
          <div className="site-footer__legal">
            {footerLegalLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <p>
            © 2026 {business.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
