"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  business,
  headerNavigation
} from "@/lib/chrome-data";

function BrandMark() {
  return (
    <span className="site-brand" aria-label={business.name}>
      <img
        alt={business.name}
        className="site-brand__logo"
        src="/logo.png"
      />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const isHome = pathname === "/";
  const isSolid = !isHome || isScrolled;
  const phoneHref = `tel:${business.phone.replace(/[^0-9]/g, "")}`;

  return (
    <>
      <header
        className={`site-header-v3 ${isSolid ? "is-solid" : "is-transparent"} ${
          isMenuOpen ? "is-menu-open" : ""
        }`}
      >
        <div className="site-header-v3__inner">
          <Link className="site-header-v3__brand" href="/" aria-label={business.name}>
            <BrandMark />
          </Link>

          <nav className="site-header-v3__nav" aria-label="Primary">
            {headerNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  className={`site-header-v3__nav-link ${isActive ? "is-active" : ""}`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="site-header-v3__actions">
            <a className="site-header-v3__phone" href={phoneHref}>
              {business.phone}
            </a>
            <Link className="site-header-v3__cta" href="/contact">
              Start a Project
            </Link>
            <button
              aria-controls="site-menu-overlay"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              className={`site-header-v3__toggle ${isMenuOpen ? "is-open" : ""}`}
              onClick={() => setIsMenuOpen((current) => !current)}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`site-menu-v3 ${isMenuOpen ? "is-open" : ""}`}
        id="site-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="site-menu-v3__inner">
          <div className="site-menu-v3__primary">
            {headerNavigation.map((item) => (
              <section className="site-menu-v3__group" key={item.label}>
                <Link className="site-menu-v3__link" href={item.href}>
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <ul className="site-menu-v3__sublinks">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="site-menu-v3__aside">
            <p className="site-menu-v3__eyebrow">{business.legalName}</p>
            <h2>Project-led exhibit execution across Lexington and the Bluegrass region.</h2>
            <p className="site-menu-v3__pitch">
              Venue-first planning, booth build, logistics, and show-day field leadership working as one accountable delivery chain.
            </p>
            <Link className="site-menu-v3__cta" href="/contact">
              Open a project brief
            </Link>
            <div className="site-menu-v3__contact">
              <a href={phoneHref}>{business.phone}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
              <span>{business.address}</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
