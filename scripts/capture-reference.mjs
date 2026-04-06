import fs from "node:fs/promises";
import path from "node:path";

import { chromium, devices } from "playwright";

const ROOT =
  "/Users/jackgreenberg/Desktop/rank-and-rent/trade-shows/tradeshowservicesdesmoines.com";
const SOURCE = "https://www.wearesparks.com/";
const OUT_DIR = path.join(ROOT, "reference-captures");
const MIRRORED_DIR = path.join(OUT_DIR, "mirrored-assets");
const MIRRORED_CSS_DIR = path.join(MIRRORED_DIR, "css");
const MIRRORED_FONT_DIR = path.join(MIRRORED_DIR, "fonts");
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const desktopViewport = { width: 1440, height: 900 };
const tabletViewport = { width: 1024, height: 1366 };
const mobilePreset = devices["iPhone 14 Pro"];

const viewports = [
  {
    label: "desktop",
    file: "homepage-full.png",
    viewport: desktopViewport
  },
  {
    label: "tablet",
    file: "homepage-tablet.png",
    viewport: tabletViewport
  },
  {
    label: "mobile",
    file: "homepage-mobile.png",
    viewport: mobilePreset.viewport,
    deviceScaleFactor: mobilePreset.deviceScaleFactor,
    isMobile: true,
    hasTouch: mobilePreset.hasTouch
  }
];

const bandSpecs = [
  {
    file: "nav.png",
    type: "selector",
    selector: "header, .c-header, [role='banner']"
  },
  {
    file: "hero.png",
    type: "selector",
    selector: ".c-masthead"
  },
  {
    file: "mid-page-band-01-centered-text.png",
    type: "selector",
    selector: ".c-centered-text-block"
  },
  {
    file: "mid-page-band-02-featured-work.png",
    type: "selector",
    selector: ".c-featured-projects"
  },
  {
    file: "mid-page-band-03-capabilities.png",
    type: "selector",
    selector: ".c-capabilities-stack"
  },
  {
    file: "mid-page-band-04-related-content.png",
    type: "selector",
    selector: ".c-related-content"
  },
  {
    file: "cta-band.png",
    type: "selector",
    selector: ".c-50-50-cta"
  },
  {
    file: "footer.png",
    type: "selector",
    selector: "footer, [role='contentinfo']"
  }
];

function sanitizeFilenameFromUrl(urlString) {
  const url = new URL(urlString);
  const filename = `${url.hostname}${url.pathname}${url.search}`
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 140);

  return filename || "asset";
}

async function ensureDirs() {
  await fs.mkdir(path.join(ROOT, "scripts"), { recursive: true });
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(MIRRORED_CSS_DIR, { recursive: true });
  await fs.mkdir(MIRRORED_FONT_DIR, { recursive: true });
}

async function fetchText(urlString) {
  const response = await fetch(urlString, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/css,text/html,application/javascript;q=0.9,*/*;q=0.8"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${urlString}: ${response.status}`);
  }

  return response.text();
}

async function fetchBinary(urlString) {
  const response = await fetch(urlString, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "*/*"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch binary ${urlString}: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function mirrorStylesheet(urlString, seen = new Set()) {
  if (seen.has(urlString)) {
    return null;
  }

  seen.add(urlString);
  const css = await fetchText(urlString);
  const stylesheetName = `${sanitizeFilenameFromUrl(urlString)}.css`;
  const outputPath = path.join(MIRRORED_CSS_DIR, stylesheetName);
  await fs.writeFile(outputPath, css);

  const fontUrls = Array.from(
    css.matchAll(
      /url\((['"]?)(https?:\/\/[^'")]+\.(?:woff2?|ttf|otf)(?:\?[^'")]*)?)\1\)/gi
    ),
    (match) => match[2]
  );

  for (const fontUrl of fontUrls) {
    const fontBuffer = await fetchBinary(fontUrl);
    const fontName = path.basename(new URL(fontUrl).pathname);
    await fs.writeFile(path.join(MIRRORED_FONT_DIR, fontName), fontBuffer);
  }

  const imports = Array.from(
    css.matchAll(/@import\s+(?:url\()?['"]?(https?:\/\/[^'")]+)['"]?\)?/gi),
    (match) => match[1]
  );

  for (const importUrl of imports) {
    await mirrorStylesheet(importUrl, seen);
  }

  return {
    sourceUrl: urlString,
    mirroredCssPath: path.relative(ROOT, outputPath),
    mirroredFontsDir: path.relative(ROOT, MIRRORED_FONT_DIR)
  };
}

async function hideTransientOverlays(page) {
  const closeButtonLocators = [
    page.getByRole("button", { name: /close/i }),
    page.getByRole("button", { name: /allow selection/i }),
    page.getByRole("button", { name: /deny/i }),
    page.locator(
      [
        "#CybotCookiebotDialogBodyButtonDecline",
        "#CybotCookiebotDialogBodyButtonAccept",
        "[aria-label*='close' i]",
        "[id*='cookie'] button",
        "[class*='cookie'] button"
      ].join(", ")
    )
  ];

  for (const locator of closeButtonLocators) {
    const count = await locator.count().catch(() => 0);

    if (!count) {
      continue;
    }

    await locator.first().click({ force: true, timeout: 1500 }).catch(() => {});
    await page.waitForTimeout(150);
  }

  await page.evaluate(() => {
    if (document.documentElement) {
      document.documentElement.style.scrollBehavior = "auto";
    }

    if (document.body) {
      document.body.style.scrollBehavior = "auto";
      document.body.style.overflow = "auto";
    }

    const selectors = [
      "[role='dialog']",
      "#CybotCookiebotDialog",
      "#CybotCookiebotDialogBodyOverlay",
      "[class*='cookiebot']",
      "[id*='cookie']",
      "[class*='cookie']",
      ".grecaptcha-badge"
    ];

    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        node.style.display = "none";
        node.style.visibility = "hidden";
        node.style.pointerEvents = "none";
      });
    }
  });
}

async function waitForStableLoad(page) {
  await page.goto(SOURCE, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForLoadState("load", { timeout: 120000 });
  await page.waitForSelector(".c-masthead", { timeout: 30000 });
  await page.waitForFunction(() => document.fonts.status === "loaded", null, {
    timeout: 30000
  });
  await page.waitForTimeout(3000);
  await hideTransientOverlays(page);
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(200);
}

async function saveClip(page, file, clip) {
  await hideTransientOverlays(page);
  const pageBounds = await page.evaluate(() => ({
    width: Math.max(
      document.documentElement.scrollWidth,
      document.documentElement.clientWidth,
      document.body?.scrollWidth ?? 0
    ),
    height: Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight,
      document.body?.scrollHeight ?? 0
    )
  }));

  const normalizedClip = {
    x: Math.max(0, Math.min(clip.x, pageBounds.width - 1)),
    y: Math.max(0, Math.min(clip.y, pageBounds.height - 1)),
    width: Math.max(
      1,
      Math.min(clip.width, Math.max(1, pageBounds.width - Math.max(0, clip.x)))
    ),
    height: Math.max(
      1,
      Math.min(clip.height, Math.max(1, pageBounds.height - Math.max(0, clip.y)))
    )
  };

  await page.screenshot({
    path: path.join(OUT_DIR, file),
    clip: normalizedClip,
    animations: "disabled",
    captureBeyondViewport: true,
    timeout: 120000
  });
}

async function saveSelectorBand(page, spec) {
  const locator = page.locator(spec.selector).first();
  await locator.waitFor({ state: "visible", timeout: 15000 });
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await hideTransientOverlays(page);
  await locator.screenshot({
    path: path.join(OUT_DIR, spec.file),
    animations: "disabled",
    timeout: 120000
  });
}

async function captureBands(page) {
  for (const spec of bandSpecs) {
    await saveSelectorBand(page, spec);
  }
}

async function captureViewport(browser, spec) {
  const context = await browser.newContext({
    viewport: spec.viewport,
    userAgent: USER_AGENT,
    isMobile: spec.isMobile,
    deviceScaleFactor: spec.deviceScaleFactor,
    hasTouch: spec.hasTouch
  });
  const page = await context.newPage();
  await waitForStableLoad(page);
  await page.screenshot({
    path: path.join(OUT_DIR, spec.file),
    fullPage: true,
    animations: "disabled",
    timeout: 120000
  });
  await page.close();
  await context.close();
}

async function recordScrollVideo(browser) {
  const context = await browser.newContext({
    viewport: desktopViewport,
    userAgent: USER_AGENT,
    recordVideo: {
      dir: OUT_DIR,
      size: desktopViewport
    }
  });
  const page = await context.newPage();
  await waitForStableLoad(page);

  const maxScroll = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight
  );

  for (let index = 0; index <= 18; index += 1) {
    const y = Math.round((maxScroll * index) / 18);
    await page.evaluate((scrollTop) => {
      window.scrollTo({ top: scrollTop, behavior: "instant" });
    }, y);
    await page.waitForTimeout(300);
    await hideTransientOverlays(page);
  }

  const video = page.video();
  await page.close();
  await context.close();

  if (!video) {
    throw new Error("Playwright did not produce a scroll video.");
  }

  const tempPath = await video.path();
  await fs.copyFile(tempPath, path.join(OUT_DIR, "homepage-scroll.webm"));
}

async function collectStyleDNA(page) {
  return page.evaluate(() => {
    const fonts = new Set();
    const selectors = [
      "body",
      "header.c-header",
      ".c-masthead h1",
      ".c-centered-text-block h2",
      ".c-capabilities-stack h2",
      ".c-related-content h2",
      ".c-50-50-cta h2",
      "footer"
    ];

    for (const selector of selectors) {
      const node = document.querySelector(selector);
      if (node) {
        fonts.add(getComputedStyle(node).fontFamily);
      }
    }

    const serializeNode = (node, selector) => {
      if (!(node instanceof HTMLElement)) {
        return null;
      }

      const rect = node.getBoundingClientRect();
      const styles = getComputedStyle(node);

      return {
        selector,
        className: node.className,
        text: node.textContent?.replace(/\s+/g, " ").trim() ?? "",
        backgroundColor: styles.backgroundColor,
        backgroundImage: styles.backgroundImage,
        color: styles.color,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        letterSpacing: styles.letterSpacing,
        borderRadius: styles.borderRadius,
        boxShadow: styles.boxShadow,
        padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`,
        margin: `${styles.marginTop} ${styles.marginRight} ${styles.marginBottom} ${styles.marginLeft}`,
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    };

    const sections = [
      ".c-masthead",
      ".c-centered-text-block",
      ".c-featured-projects",
      ".c-capabilities-stack",
      ".c-related-content",
      ".c-50-50-cta",
      "footer"
    ]
      .map((selector) => serializeNode(document.querySelector(selector), selector))
      .filter(Boolean);

    const hero = document.querySelector(".c-masthead");
    const heroHeading = hero?.querySelector("h1, h2");

    return {
      capturedAt: new Date().toISOString(),
      sourceUrl: location.href,
      breakpoints: [
        {
          label: "desktop",
          viewport: {
            width: 1440,
            height: 900
          }
        },
        {
          label: "tablet",
          viewport: {
            width: 1024,
            height: 1366
          }
        },
        {
          label: "mobile",
          viewport: {
            width: 393,
            height: 660
          }
        }
      ],
      desktop: {
        viewportLabel: "desktop",
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        body: serializeNode(document.body, "body"),
        fonts: Array.from(fonts).filter(Boolean),
        header: serializeNode(
          document.querySelector("header.c-header, header, [role='banner']"),
          "header.c-header"
        ),
        hero: hero
          ? {
              section: serializeNode(hero, ".c-masthead"),
              heading: heroHeading
                ? serializeNode(heroHeading, ".c-masthead h1, .c-masthead h2")
                : null,
              usesVideo: !!hero.querySelector("video"),
              playTrigger:
                hero.querySelector("button, a, [role='button']")?.textContent
                  ?.replace(/\s+/g, " ")
                  .trim() ?? null
            }
          : null,
        footer: serializeNode(document.querySelector("footer"), "footer"),
        sections,
        buttons: Array.from(
          document.querySelectorAll(
            ".c-featured-projects a, .c-50-50-cta a, .c-header a, button"
          )
        )
          .slice(0, 16)
          .map((node) => {
            const styles = getComputedStyle(node);

            return {
              selector: node.tagName.toLowerCase(),
              text: node.textContent?.replace(/\s+/g, " ").trim() ?? "",
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              fontFamily: styles.fontFamily,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              lineHeight: styles.lineHeight,
              letterSpacing: styles.letterSpacing,
              textTransform: styles.textTransform,
              borderRadius: styles.borderRadius,
              border: styles.border,
              padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`
            };
          })
      }
    };
  });
}

async function collectAssetInventory(page) {
  return page.evaluate(() => {
    const unique = (values) => Array.from(new Set(values.filter(Boolean)));
    const resources = performance.getEntriesByType("resource").map((entry) => ({
      name: entry.name,
      initiatorType: entry.initiatorType
    }));

    return {
      capturedAt: new Date().toISOString(),
      referenceUrl: location.href,
      referenceUsesHeroVideo: !!document.querySelector(".c-masthead video"),
      stylesheets: unique(
        Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(
          (node) => node.href
        )
      ),
      scripts: unique(
        Array.from(document.querySelectorAll("script[src]")).map(
          (node) => node.src
        )
      ),
      images: unique(
        Array.from(document.querySelectorAll("img")).map(
          (node) => node.currentSrc || node.src
        )
      ),
      backgroundImages: unique(
        Array.from(
          document.querySelectorAll(
            "header, .c-masthead, .c-featured-projects, .c-capabilities-stack, .c-related-content, .c-50-50-cta, footer"
          )
        )
          .map((node) => getComputedStyle(node).backgroundImage)
          .filter((value) => value && value !== "none")
      ),
      videos: unique(
        Array.from(document.querySelectorAll("video")).flatMap((video) => [
          video.currentSrc || video.src,
          ...Array.from(video.querySelectorAll("source")).map(
            (source) => source.src
          )
        ])
      ),
      fonts: unique(
        Array.from(document.querySelectorAll("*"))
          .slice(0, 200)
          .map((node) => getComputedStyle(node).fontFamily)
      ),
      fontFiles: unique(
        resources
          .map((entry) => entry.name)
          .filter((name) => /\.(woff2?|ttf|otf)(\?|$)/i.test(name))
      ),
      internalLinks: unique(
        Array.from(document.querySelectorAll("a[href]"))
          .map((node) => node.href)
          .filter((href) => href.startsWith(location.origin))
      )
    };
  });
}

async function main() {
  await ensureDirs();
  const browser = await chromium.launch({ headless: true });

  for (const spec of viewports) {
    await captureViewport(browser, spec);
  }

  const context = await browser.newContext({
    viewport: desktopViewport,
    userAgent: USER_AGENT
  });
  const page = await context.newPage();
  await waitForStableLoad(page);
  await captureBands(page);

  const styleDNA = await collectStyleDNA(page);
  const assetInventory = await collectAssetInventory(page);
  const mirroredStylesheets = [];

  for (const stylesheet of assetInventory.stylesheets) {
    try {
      const mirrored = await mirrorStylesheet(stylesheet);
      if (mirrored) {
        mirroredStylesheets.push(mirrored);
      }
    } catch (error) {
      mirroredStylesheets.push({
        sourceUrl: stylesheet,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  styleDNA.mirroredStylesheets = mirroredStylesheets;
  assetInventory.mirroredStylesheets = mirroredStylesheets;

  await fs.writeFile(
    path.join(OUT_DIR, "style-dna.json"),
    `${JSON.stringify(styleDNA, null, 2)}\n`
  );
  await fs.writeFile(
    path.join(OUT_DIR, "asset-inventory.json"),
    `${JSON.stringify(assetInventory, null, 2)}\n`
  );

  await page.close();
  await context.close();
  await recordScrollVideo(browser);
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
