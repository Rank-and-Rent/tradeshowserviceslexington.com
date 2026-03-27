import fs from "node:fs";
import path from "node:path";

import { buildDetailPageContent } from "../lib/content";
import { activeCollections } from "../lib/site-data";

const root = process.cwd();
const outputPath = path.join(root, "content-summary.json");

const taxonomySummaries = activeCollections.map((collection) => {
  const wordStats = collection.generatedPages.map((page) => {
    const content = buildDetailPageContent(collection.section, page.slug);

    return {
      slug: page.slug,
      label: page.label,
      wordCount: content.wordCount
    };
  });

  const underTargetPages = wordStats.filter((entry) => entry.wordCount < 1200);
  const minWordCount = Math.min(...wordStats.map((entry) => entry.wordCount));
  const maxWordCount = Math.max(...wordStats.map((entry) => entry.wordCount));

  return {
    section: collection.section,
    label: collection.label,
    routeBase: collection.routeBase,
    detailCount: collection.generatedPages.length,
    representativeSlugs: collection.representativeSampleSlugs,
    minWordCount,
    maxWordCount,
    allPagesMeet1200WordRequirement: underTargetPages.length === 0,
    sampleWordCounts: wordStats.slice(0, 5),
    underTargetPages
  };
});

const underTargetPages = taxonomySummaries.flatMap((entry) =>
  entry.underTargetPages.map((page) => ({
    section: entry.section,
    slug: page.slug,
    label: page.label,
    wordCount: page.wordCount
  }))
);

const summary = {
  generatedAt: new Date().toISOString(),
  activeTaxonomies: taxonomySummaries,
  finalCountsByTaxonomy: Object.fromEntries(
    taxonomySummaries.map((entry) => [entry.section, entry.detailCount])
  ),
  everyActiveDetailPageMeets1200WordRequirement: taxonomySummaries.every(
    (entry) => entry.allPagesMeet1200WordRequirement
  ),
  representativeSlugsChosenForQA: Object.fromEntries(
    taxonomySummaries.map((entry) => [entry.section, entry.representativeSlugs[0]])
  ),
  underTargetPages,
  totalActiveDetailPages: taxonomySummaries.reduce(
    (sum, entry) => sum + entry.detailCount,
    0
  )
};

fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
console.log(`Wrote ${outputPath}`);

if (underTargetPages.length > 0) {
  console.error(
    `Found ${underTargetPages.length} detail pages under the 1200-word requirement.`
  );
  process.exit(1);
}
