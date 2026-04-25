import fs from "node:fs";
import path from "node:path";

import { chromium, type Page } from "playwright";
import type { Browser, Section } from "playwright";

const root = process.cwd();
const compareDir = path.join(root, "qa-reference-compare");
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const referenceStyleDnaPath = path.join(root, "reference-captures", "style-dna.json");

type StyleDna = {
  sourceUrl?: string;
  capturedAt?: string;
};

const referenceStyleDna = fs.existsSync(referenceStyleDnaPath)
  ? (JSON.parse(fs.readFileSync(referenceStyleDnaPath, "utf8")) as StyleDna)
  : null;

const viewports = [
  {
    name: "desktop",
    width: 1440,
    height: 900,
    output: "homepage-desktop-local.png"
  },
  {
    name: "tablet",
    width: 1024,
    height: 1180,
    output: "homepage-tablet-local.png"
  },
  {
    name: "mobile",
    width: 393,
    height: 844,
    output: "homepage-mobile-local.png"
  }
] as const;

async function waitForReady(section: Page) {
  await section.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await section.waitForLoadState("load");
  await section.evaluate(async () => {
    await document.fonts.ready;
  });
  await section.waitForTimeout(900);
}

async function recordScrollVideo(browser: Browser) {
  const context = await browser.newContext({
    viewport: {
      width: 1440,
      height: 900
    },
    recordVideo: {
      dir: compareDir,
      size: {
        width: 1440,
        height: 900
      }
    }
  });
  const section = await context.newPage();
  await waitForReady(section);

  const maxScroll = await section.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight
  );

  for (let index = 0; index <= 18; index += 1) {
    const y = Math.round((maxScroll * index) / 18);
    await section.evaluate((scrollTop) => {
      window.scrollTo({ top: scrollTop, behavior: "instant" });
    }, y);
    await section.waitForTimeout(300);
  }

  const video = section.video();
  await section.close();
  await context.close();

  if (!video) {
    throw new Error("Playwright did not produce a local scroll video.");
  }

  const tempPath = await video.path();
  fs.copyFileSync(tempPath, path.join(compareDir, "homepage-scroll-local.webm"));
}

async function main() {
  fs.mkdirSync(compareDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const viewport of viewports) {
    const section = await browser.newPage({
      viewport: {
        width: viewport.width,
        height: viewport.height
      }
    });

    await waitForReady(section);
    await section.screenshot({
      path: path.join(compareDir, viewport.output),
      fullPage: true
    });
    await section.close();
  }

  await recordScrollVideo(browser);
  await browser.close();

  const notes = `# Homepage Compare Notes

Reference context:
- Source: ${referenceStyleDna?.sourceUrl ?? "reference-captures/style-dna.json missing"}
- Captured at: ${referenceStyleDna?.capturedAt ?? "unknown"}

1. Does the local homepage look like the same site as the reference?
Pending reviewed verdict.

2. Are fonts, spacing, proportions, and section rhythm exact?
Pending reviewed verdict.

3. What differences remain, if any?
Pending reviewed verdict.

4. Does the scroll cadence match the reference, including sticky bands, pinned moments, overlap behavior, and footer arrival?
Pending reviewed verdict.
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
