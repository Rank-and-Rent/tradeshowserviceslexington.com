"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  business,
  headerNavigation
} from "@/lib/chrome-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const phoneHref = `tel:${business.phone.replace(/[^0-9+]/g, "")}`;
  const desktopNav = headerNavigation.slice(0, 6);

  return (
    <header className={`site-header${open ? " site-header--open" : ""}`}>
      <div className="site-header__bar">
        <Link
          className="site-header__brand"
          href="/"
          aria-label={business.name}
          onClick={() => setOpen(false)}
        >
          <span className="site-header__brand-mark" aria-hidden="true">TS</span>
          <span className="site-header__brand-name">{business.name}</span>
        </Link>
        <nav className="site-header__nav-desktop" aria-label="Primary">
          {desktopNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <a className="site-header__phone" href={phoneHref}>
            {business.phone}
          </a>
          <Link className="site-header__cta" href="/contact">
            Get a quote
          </Link>
          <button
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="site-header__menu"
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`site-header__drawer${open ? " site-header__drawer--open" : ""}`}>
        <div className="site-header__drawer-inner">
          <button
            className="site-header__drawer-close"
            aria-label="Close menu"
            type="button"
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
          <nav className="site-header__nav" aria-label="Mobile">
            {headerNavigation.map((item) => (
              <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="site-header__drawer-meta">
            <div>
              <p className="site-header__meta-label">Contact</p>
              <a href={phoneHref}>{business.phone}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
