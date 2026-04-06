import fs from "node:fs";
import path from "node:path";

import { activeCollections, business, type TaxonomySection } from "../lib/site-data";

type ManifestEntry = {
  id: string;
  route: string;
  pageType: string;
  taxonomyType: string;
  slug: string | null;
  filename: string;
  relativeOutputPath: string;
  usage: string;
  orientation: string;
  width: number;
  height: number;
  altText: string;
  sourceBrief: string;
  artDirection: string;
  subjectPriority: string;
  locationRelevance: string;
  required: boolean;
  notes: string;
};

type SectionConfig = {
  indexKey: string;
  detailKey: string;
  singularLabel: string;
  overviewLabel: string;
  locationRelevance: string;
  artDirection: string;
};

const root = process.cwd();
const manifestOutputPath = path.join(root, "IMAGE_MANIFEST.json");
const requirementsOutputPath = path.join(root, "IMAGE_REQUIREMENTS.txt");
const fallbackOutputPath = path.join(root, "hero-still-fallback.json");
const heroVideoSourcesPath = path.join(root, "hero-video-sources.json");
const heroLoopMp4Path = path.join(root, "public", "media", "hero-loop.mp4");
const heroLoopWebmPath = path.join(root, "public", "media", "hero-loop.webm");

const heroVideoCreated =
  fs.existsSync(heroVideoSourcesPath) &&
  (fs.existsSync(heroLoopMp4Path) || fs.existsSync(heroLoopWebmPath));

const reference = {
  referenceUrl: "https://wearesparks.com",
  referenceUsesHeroVideo: true,
  heroVideoCreated,
  stillHeroFallback: !heroVideoCreated,
  referenceMediaReused: false
} as const;

const sectionConfigMap: Record<TaxonomySection, SectionConfig> = {
  services: {
    indexKey: "servicesIndex",
    detailKey: "servicePages",
    singularLabel: "service",
    overviewLabel: "services overview",
    locationRelevance:
      "General Des Moines and Central Iowa exhibitor, conference, and expo relevance.",
    artDirection:
      "Premium trade show environment with clean sightlines, layered depth, and enough negative space for bold white page-title overlays."
  },
  locations: {
    indexKey: "locationsIndex",
    detailKey: "locationPages",
    singularLabel: "location",
    overviewLabel: "locations overview",
    locationRelevance:
      "Should feel regionally credible for downtown Des Moines, West Des Moines, Altoona, Ankeny, and the wider Central Iowa event market.",
    artDirection:
      "Use district, streetscape, convention, or conference-hotel cues that plausibly map to the specific Central Iowa submarket without overclaiming venue access."
  },
  venues: {
    indexKey: "venuesIndex",
    detailKey: "venuePages",
    singularLabel: "venue",
    overviewLabel: "venues overview",
    locationRelevance:
      "Use convention-center, expo-hall, fairgrounds, arena-club, ballroom, and hospitality cues only where they plausibly fit the researched Des Moines venue set.",
    artDirection:
      "Venue-forward frame with loading, hall, ballroom, concourse, or registration cues that supports venue planning copy without implying unverified branding or room setups."
  },
  "event-types": {
    indexKey: "eventTypesIndex",
    detailKey: "eventTypePages",
    singularLabel: "event type",
    overviewLabel: "event types overview",
    locationRelevance:
      "General Des Moines conference, expo, activation, association, and sponsor-program relevance.",
    artDirection:
      "Show event-format variety through stage moments, booth traffic, sponsor zones, or registration environments with premium but neutral branding."
  },
  "booth-types": {
    indexKey: "boothTypesIndex",
    detailKey: "boothTypePages",
    singularLabel: "booth type",
    overviewLabel: "booth types overview",
    locationRelevance:
      "General Des Moines exhibit-hall, ballroom, and sponsor-zone booth relevance.",
    artDirection:
      "Focus on booth geometry, sightlines, and materials rather than logos so each exhibit format reads differently at a glance."
  },
  industries: {
    indexKey: "industriesIndex",
    detailKey: "industryPages",
    singularLabel: "industry",
    overviewLabel: "industries overview",
    locationRelevance:
      "General Central Iowa exhibitor-demand, association, healthcare, manufacturing, agriculture, and conference-market relevance.",
    artDirection:
      "Blend industry cues into event environments subtly so the page still reads as trade-show work instead of generic corporate stock."
  },
  capabilities: {
    indexKey: "capabilitiesIndex",
    detailKey: "capabilityPages",
    singularLabel: "capability",
    overviewLabel: "capabilities overview",
    locationRelevance: "Inactive optional taxonomy for this market.",
    artDirection: "Inactive optional taxonomy for this market."
  },
  rentals: {
    indexKey: "rentalsIndex",
    detailKey: "rentalPages",
    singularLabel: "rental",
    overviewLabel: "rentals overview",
    locationRelevance: "Inactive optional taxonomy for this market.",
    artDirection: "Inactive optional taxonomy for this market."
  },
  "exhibit-types": {
    indexKey: "exhibitTypesIndex",
    detailKey: "exhibitTypePages",
    singularLabel: "exhibit type",
    overviewLabel: "exhibit types overview",
    locationRelevance: "Inactive optional taxonomy for this market.",
    artDirection: "Inactive optional taxonomy for this market."
  }
};

function slugifyRoute(route: string) {
  return route
    .replace(/^\//, "")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9-]/gi, "")
    .toLowerCase();
}

function createEntry(entry: ManifestEntry) {
  return entry;
}

function createPlannedFilename(route: string) {
  return `${slugifyRoute(route)}-${business.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.webp`;
}

function createStaticEntry(
  id: string,
  route: string,
  pageType: string,
  filename: string,
  relativeOutputPath: string,
  usage: string,
  altText: string,
  sourceBrief: string,
  artDirection: string,
  subjectPriority: string,
  locationRelevance: string,
  notes: string
) {
  return createEntry({
    id,
    route,
    pageType,
    taxonomyType: "shared",
    slug: null,
    filename,
    relativeOutputPath,
    usage,
    orientation: "landscape",
    width: 1600,
    height: 900,
    altText,
    sourceBrief,
    artDirection,
    subjectPriority,
    locationRelevance,
    required: true,
    notes
  });
}

function buildIndexSection(section: TaxonomySection) {
  const collection = activeCollections.find((entry) => entry.section === section);

  if (!collection) {
    return null;
  }

  const config = sectionConfigMap[section];
  const filename = createPlannedFilename(collection.routeBase);

  return {
    key: config.indexKey,
    entries: [
      createEntry({
        id: `${section}-index-hero`,
        route: collection.routeBase,
        pageType: "taxonomy-index",
        taxonomyType: section,
        slug: null,
        filename,
        relativeOutputPath: `public/media/planned/${filename}`,
        usage: `${config.overviewLabel} hero still`,
        orientation: "landscape",
        width: 1600,
        height: 900,
        altText: `${collection.label} overview image for ${business.name}`,
        sourceBrief:
          `Create or source an original still image for the ${collection.label.toLowerCase()} index page. Do not reuse reference photography or imply unverified venue conditions. Keep the frame plausible for Des Moines and Central Iowa trade show work.`,
        artDirection: config.artDirection,
        subjectPriority: collection.label,
        locationRelevance: config.locationRelevance,
        required: true,
        notes:
          "This slot documents the final dedicated index hero asset even though the current live build uses shared still photography and CSS-based surfaces."
      })
    ]
  };
}

function buildDetailSection(section: TaxonomySection) {
  const collection = activeCollections.find((entry) => entry.section === section);

  if (!collection) {
    return null;
  }

  const config = sectionConfigMap[section];

  return {
    key: config.detailKey,
    entries: collection.generatedPages.map((page) => {
      const route = `${collection.routeBase}/${page.slug}`;
      const filename = createPlannedFilename(route);

      return createEntry({
        id: `${section}-${page.slug}-hero`,
        route,
        pageType: "taxonomy-detail",
        taxonomyType: section,
        slug: page.slug,
        filename,
        relativeOutputPath: `public/media/planned/${slugifyRoute(collection.routeBase)}/${filename}`,
        usage: `${config.singularLabel} detail hero still`,
        orientation: "landscape",
        width: 1600,
        height: 900,
        altText: `${page.label} planning image for ${business.name}`,
        sourceBrief:
          `Create or source an original still image for the ${page.label} page. Keep the frame plausible for Des Moines exhibit, event, booth, or venue planning without reusing reference photography or implying unverified venue conditions.`,
        artDirection: config.artDirection,
        subjectPriority: page.label,
        locationRelevance: config.locationRelevance,
        required: true,
        notes:
          "Required final image slot even where the current live build reuses shared stills or CSS-driven art direction."
      });
    })
  };
}

function buildManifest() {
  const manifest: Record<string, unknown> = {
    generatedAt: new Date().toISOString(),
    project: {
      name: business.name,
      domain: business.domain,
      city: business.city,
      state: business.state
    },
    reference,
    homepage: [
      createStaticEntry(
        "homepage-hero",
        "/",
        "homepage",
        "hero-candidate-2.jpg",
        "public/media/hero-candidate-2.jpg",
        "homepage hero still",
        "Des Moines trade show crowd and expo-hall hero background",
        "Use a legally reusable expo-hall crowd still with enough depth, atmosphere, and neutral branding to support the Sparks-style dark hero composition.",
        "Wide convention-hall scene with strong depth, darkened overlay support, and enough negative space for the oversized bottom-left headline.",
        "Homepage hero",
        "General Des Moines and Central Iowa trade show relevance.",
        "Reference hero video was not reused. This sourced still is the approved legal fallback."
      ),
      createStaticEntry(
        "homepage-featured-rail",
        "/",
        "homepage",
        "homepage-featured-rail-des-moines.webp",
        "public/media/planned/homepage-featured-rail-des-moines.webp",
        "featured work rail art family",
        "Des Moines featured-work card art family",
        "Create a cohesive still set for the featured-work rail with no reference-media reuse and no readable third-party branding.",
        "Editorial case-study card direction with high contrast, premium event texture, and enough variation for five distinct workstreams.",
        "Homepage featured-work rail",
        "Downtown convention, west corridor, fairgrounds, and Central Iowa program relevance.",
        "Current live build mixes two sourced stills with three CSS-gradient panels."
      ),
      createStaticEntry(
        "homepage-article-cards",
        "/",
        "homepage",
        "homepage-article-cards-des-moines.webp",
        "public/media/planned/homepage-article-cards-des-moines.webp",
        "related-content card art family",
        "Des Moines editorial article-card still family",
        "Create an editorial still family for the related-content band that feels like original trade-show reporting rather than copied case-study imagery.",
        "Newsroom-style event photography or abstract planning textures with restrained branding and premium contrast.",
        "Homepage article cards",
        "General Des Moines planning and venue-research relevance.",
        "Current live build uses text-forward cards without dedicated imagery."
      )
    ],
    about: [
      createStaticEntry(
        "about-hero",
        "/about",
        "core-page",
        "hero-candidate-1.jpg",
        "public/media/hero-candidate-1.jpg",
        "about page hero still",
        "Des Moines audience and stage atmosphere hero background",
        "Use a dark, premium conference or activation still that supports the internal-page hero overlay without borrowing reference media.",
        "Stage, audience, or event-floor frame with broad negative space and enough texture for large white title overlays.",
        "About page hero",
        "General Des Moines and Central Iowa event relevance.",
        "Shared still currently used across internal page heroes."
      )
    ],
    contact: [
      createStaticEntry(
        "contact-hero",
        "/contact",
        "core-page",
        "contact-hero-des-moines.webp",
        "public/media/planned/contact-hero-des-moines.webp",
        "contact page hero still",
        "Des Moines contact page planning still",
        "Create or source an original still that supports project-intake messaging with neutral branding and premium event-production cues.",
        "Operational trade-show moment with schedules, show-floor prep, or stage-management detail rather than generic handshake imagery.",
        "Contact page hero",
        "General Des Moines project-brief relevance.",
        "Current live build uses the shared internal-hero still."
      )
    ],
    shared: [
      createStaticEntry(
        "shared-internal-hero",
        "/",
        "shared",
        "hero-candidate-1.jpg",
        "public/media/hero-candidate-1.jpg",
        "shared internal-page hero still",
        "Shared dark event-production hero still for internal pages",
        "Maintain one legally reusable dark still that can cover internal hero treatments until dedicated stills are sourced for each core page.",
        "Audience, stage, or expo atmosphere with low visual noise and strong dark contrast.",
        "Shared internal hero system",
        "General Des Moines and Central Iowa event relevance.",
        "Used as a fallback shared hero asset across internal routes."
      ),
      createStaticEntry(
        "shared-site-icon",
        "/icon.svg",
        "shared",
        "icon.svg",
        "app/icon.svg",
        "site icon",
        "Trade Show Services of Des Moines site icon",
        "Keep the icon minimal, geometric, and derived from the site wordmark without reusing any reference brand mark.",
        "Minimal monochrome mark that stays consistent with the black-and-white Sparks-inspired shell.",
        "Shared brand assets",
        "Site-wide relevance.",
        "Existing app icon is already local and not mirrored from the reference."
      )
    ]
  };

  const staticSections = [
    buildIndexSection("services"),
    buildIndexSection("locations"),
    buildIndexSection("venues"),
    buildIndexSection("event-types"),
    buildIndexSection("booth-types"),
    buildIndexSection("industries"),
    buildDetailSection("services"),
    buildDetailSection("locations"),
    buildDetailSection("venues"),
    buildDetailSection("event-types"),
    buildDetailSection("booth-types"),
    buildDetailSection("industries")
  ].filter(Boolean) as Array<{ key: string; entries: ManifestEntry[] }>;

  staticSections.forEach((section) => {
    manifest[section.key] = section.entries;
  });

  return manifest;
}

function writeImageRequirements(manifest: Record<string, unknown>) {
  const lines = [
    `Trade Show Services of Des Moines Image Requirements`,
    ``,
    `Project: ${business.name}`,
    `Domain: ${business.domain}`,
    `City: ${business.city}, ${business.state}`,
    ``,
    `Reference behavior: the source homepage uses hero video.`,
    `Hero decision: no local hero video was created because the project uses a legal still-hero fallback instead of watermarked or unverifiable footage.`,
    `Still fallback asset: public/media/hero-candidate-2.jpg`,
    `Media policy: do not reuse any reference photography or reference video from ${reference.referenceUrl}.`,
    ``,
    `Current live assets already in this project`,
    `- public/media/hero-candidate-2.jpg is the homepage hero still fallback.`,
    `- public/media/hero-candidate-1.jpg is the shared internal-page hero still.`,
    `- Featured-work rail panels currently mix these stills with original CSS-based gradient surfaces.`,
    ``,
    `Required image direction`,
    `- Use original stills, licensed reusable stills, or commissioned illustration only.`,
    `- Favor convention-center, expo-hall, fairgrounds, conference-hotel, sponsor-activation, and show-floor environments relevant to Des Moines and Central Iowa.`,
    `- Avoid visible third-party logos, readable venue branding, watermarks, low-resolution source material, and obvious AI artifacts.`,
    `- Preserve negative space for large white title overlays and the Sparks-style black/white layout system used throughout the site.`,
    `- Keep every taxonomy image plausibly distinct from adjacent pages, especially venue pages and nearby location pages.`,
    ``,
    `Active taxonomy counts`
  ];

  activeCollections.forEach((collection) => {
    lines.push(`- ${collection.label}: ${collection.generatedPages.length} detail pages`);
  });

  lines.push(
    ``,
    `Manifest path: ${manifestOutputPath}`,
    `Hero fallback manifest: ${fallbackOutputPath}`,
    `Generated at: ${new Date().toISOString()}`,
    `Manifest sections: ${Object.keys(manifest).join(", ")}`
  );

  fs.writeFileSync(requirementsOutputPath, lines.join("\n"));
}

function writeHeroFallbackManifest() {
  const fallback = {
    generatedAt: new Date().toISOString(),
    referenceUrl: reference.referenceUrl,
    reason:
      "Reference hero video was not recreated because no clean, legally reusable, watermark-free local footage set was assembled during this build window.",
    selectedFallbackAsset: {
      filename: "hero-candidate-2.jpg",
      relativePath: "public/media/hero-candidate-2.jpg",
      usage: "Homepage hero still fallback",
      notes:
        "Approved still fallback for the Sparks-style dark hero. Reference media was not reused."
    }
  };

  fs.writeFileSync(fallbackOutputPath, JSON.stringify(fallback, null, 2));
}

const manifest = buildManifest();

fs.writeFileSync(manifestOutputPath, JSON.stringify(manifest, null, 2));
writeImageRequirements(manifest);
writeHeroFallbackManifest();

console.log(`Wrote ${manifestOutputPath}`);
console.log(`Wrote ${requirementsOutputPath}`);
console.log(`Wrote ${fallbackOutputPath}`);
