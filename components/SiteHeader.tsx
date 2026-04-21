"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  business,
  headerNavigation,
  headerUtilityActions
} from "@/lib/chrome-data";

function BrandMark() {
  return (
    <span className="site-wordmark" aria-hidden="true">
      tslx<span className="site-wordmark__dot">.</span>
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

  const isSolid = pathname !== "/" || isScrolled;

  return (
    <>
      <header
        className={`site-header ${isSolid ? "site-header--solid" : ""} ${
          isMenuOpen ? "site-header--menu" : ""
        }`}
      >
        <div className="site-shell site-header__inner">
          <Link className="site-header__brand" href="/" aria-label={business.name}>
            <BrandMark />
          </Link>

          <div className="site-header__actions">
            {headerUtilityActions.map((action) => (
              <Link
                className={`site-header__pill site-header__pill--${action.variant}`}
                href={action.href}
                key={action.label}
              >
                {action.label}
              </Link>
            ))}

            <button
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              className={`site-header__toggle ${isMenuOpen ? "is-open" : ""}`}
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

      <div className={`site-menu ${isMenuOpen ? "is-open" : ""}`}>
        <div className="site-shell site-menu__layout">
          <div className="site-menu__primary">
            {headerNavigation.map((item) => (
              <section className="site-menu__group" key={item.label}>
                <Link className="site-menu__link" href={item.href}>
                  {item.label}
                </Link>

                {item.children?.length ? (
                  <ul className="site-menu__subnav">
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

          <aside className="site-menu__aside">
            <p className="site-menu__eyebrow">{business.legalName}</p>
            <h2>Project-led exhibit execution across Lexington and the Bluegrass region.</h2>
            <p>
              Quick links for services, venue guides, market maps, event formats,
              booth formats, and industry-specific planning pages.
            </p>
            <Link className="site-menu__cta" href="/contact">
              Open project brief
            </Link>

            <div className="site-menu__contact">
              <a href={`tel:${business.phone.replace(/[^0-9]/g, "")}`}>{business.phone}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
              <span>{business.address}</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
