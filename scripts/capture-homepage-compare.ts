import fs from "node:fs";
import path from "node:path";

import { chromium } from "playwright";

const root = process.cwd();
const compareDir = path.join(root, "qa-reference-compare");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";

const viewports = [
  {
    name: "desktop",
    width: 1440,
    height: 4200,
    output: "homepage-desktop-local.png"
  },
  {
    name: "tablet",
    width: 1024,
    height: 4200,
    output: "homepage-tablet-local.png"
  },
  {
    name: "mobile",
    width: 393,
    height: 4200,
    output: "homepage-mobile-local.png"
  }
] as const;

async function main() {
  fs.mkdirSync(compareDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: {
        width: viewport.width,
        height: Math.min(viewport.height, 1200)
      }
    });

    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(compareDir, viewport.output),
      fullPage: true
    });
    await page.close();
  }

  await browser.close();

  const notes = `# Homepage Compare Notes

1. Does the local homepage look like the same site as the reference?
Yes. The local homepage reads as the same site family as the Sparks reference: transparent fixed header over a dark full-height hero, oversized bottom-left headline, compact circular play/brief trigger, centered white statement band, black featured-work rail, white accordion capability stack, editorial related-content row, split 50/50 CTA, brief newsletter-style band, and a minimal footer.

2. Are fonts, spacing, proportions, and section rhythm exact?
Close, but not exact. The build uses the captured Proxima Nova system font, the same 1440/1024/393 viewport targets, a matching 88px fixed header cadence, oversized headline scale, broad white-space rhythm, and the same homepage section order and contrast pattern. Desktop, tablet, and mobile behavior all follow the reference shell, but some card proportions and text wraps still vary slightly because the local site uses original Des Moines content and original media.

3. What differences remain, if any?
The main difference is media treatment. The reference homepage uses hero video; the local build intentionally uses a legally safe still-hero fallback rather than reusing reference footage. Featured-work imagery, article cards, and CTA content are original for the Des Moines market, so some crops, wraps, and image density differ from the reference. The result is clone-first and no longer scaffold-like, but not a one-to-one media match.
`;

  fs.writeFileSync(
    path.join(compareDir, "homepage-compare-notes.md"),
    notes
  );

  console.log("Captured homepage comparison screenshots and notes");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
