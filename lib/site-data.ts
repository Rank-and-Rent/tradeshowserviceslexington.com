import fs from "node:fs";
import path from "node:path";

export const sectionOrder = [
  "services",
  "locations",
  "venues",
  "event-types",
  "booth-types",
  "industries",
  "capabilities",
  "rentals",
  "exhibit-types"
] as const;

export type TaxonomySection = (typeof sectionOrder)[number];

type PlanPage = {
  slug: string;
  label: string;
};

type TaxonomyNode = {
  label: string;
  routeBase: string;
  required: boolean;
  requiredCorePages: string[];
  generatedPages: PlanPage[];
  targetCount: number;
  actualGeneratedCount: number;
  representativeSampleSlugs: string[];
  rationale: string;
};

type TaxonomyPlan = {
  generatedAt: string;
  market: {
    city: string;
    state: string;
    domain: string;
    businessName: string;
  };
  services: TaxonomyNode;
  locations: TaxonomyNode;
  venues: TaxonomyNode;
  eventTypes: TaxonomyNode;
  boothTypes: TaxonomyNode;
  industries: TaxonomyNode;
  optionalTaxonomies: TaxonomyNode[];
  pageCountPlan: Record<string, number>;
};

export type VenueResearchRecord = {
  slug: string;
  name: string;
  city: string;
  region: string;
  venueType: string;
  address: string;
  parentVenue: string | null;
  confidence: string;
  sourceUrls: string[];
  verifiedFacts: string[];
  tradeShowFit: string[];
};

type VenueResearch = {
  generatedAt: string;
  market: {
    city: string;
    state: string;
    metro: string;
  };
  sourcePolicy: string;
  venueRecords: VenueResearchRecord[];
  excludedVenues: Array<{
    name: string;
    reason: string;
  }>;
  notes?: string[];
};

export type MarketLocationTarget = {
  slug: string;
  label: string;
  region: string;
  priority: "primary" | "secondary";
  reason: string;
};

type MarketResearch = {
  generatedAt: string;
  market: {
    city: string;
    state: string;
    businessName: string;
    address: string;
    serviceRadiusStrategy: string;
  };
  marketSignals: Array<{
    label: string;
    finding: string;
    sourceUrl: string;
  }>;
  regionalFramework: {
    meetingInfrastructureNotes: string[];
    accessibilityNotes: string[];
    destinationSupportNotes: string[];
  };
  demandDrivers: Array<{
    slug: string;
    label: string;
    sourceUrl: string;
    reason: string;
  }>;
  primaryVenueClusters: Array<{
    name: string;
    locations: string[];
    notes: string;
  }>;
  locationTargets: MarketLocationTarget[];
  notes?: string[];
  sources: Array<{
    label: string;
    url: string;
  }>;
};

type LaborResearch = {
  generatedAt: string;
  market: {
    city: string;
    state: string;
    metro: string;
  };
  overallAssessment: {
    laborModel: string;
    confidence: string;
    safePublicClaim: string;
  };
  verifiedFindings: Array<{
    slug: string;
    venue: string;
    finding: string;
  }>;
  venueSpecificOperatingPatterns: Array<{
    slug: string;
    pattern: string;
    copyUse: string;
  }>;
  approvedCopyPatterns: string[];
  avoidClaims: string[];
};

type SectionConfig = {
  label: string;
  singularLabel: string;
  eyebrow: string;
  pageTitlePrefix: string;
  heroLabel: string;
  cardLabel: string;
  ctaLabel: string;
};

export type HeaderNavItem = {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
  panel?: {
    title: string;
    text: string;
    href: string;
    buttonLabel: string;
  };
};

type HeaderUtilityAction = {
  label: string;
  href: string;
  variant: "phone" | "secondary";
};

type HomepageCard = {
  icon: string;
  title: string;
  text: string;
  href: string;
};

type HomepageInsightCard = {
  tag: string;
  title: string;
  text: string;
  href: string;
  accent: string;
};

const root = process.cwd();

function readJson<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(root, filename), "utf8")) as T;
}

export const business = {
  name: "Trade Show Services of Lexington",
  legalName: "Trade Show Services of Lexington",
  city: "Lexington",
  state: "KY",
  domain: "tradeshowserviceslexington.com",
  address: "300 W Vine St, Suite 200, Lexington, KY 40507",
  phone: "859-555-0147",
  email: "info@tradeshowserviceslexington.com"
} as const;

export const taxonomyPlan = readJson<TaxonomyPlan>("taxonomy-plan.json");
export const venueResearch = readJson<VenueResearch>("venue-research.json");
export const marketResearch = readJson<MarketResearch>("market-research.json");
export const laborResearch = readJson<LaborResearch>("labor-research.json");

const optionalTaxonomyNodeMap = Object.fromEntries(
  taxonomyPlan.optionalTaxonomies.map((node) => [
    node.routeBase.replace(/^\//, ""),
    node
  ])
) as Partial<Record<TaxonomySection, TaxonomyNode>>;

const sectionConfig: Record<TaxonomySection, SectionConfig> = {
  services: {
    label: "Services",
    singularLabel: "service",
    eyebrow: "Trade Show Services",
    pageTitlePrefix: `${business.city} trade show services`,
    heroLabel: "Service stack",
    cardLabel: "Service",
    ctaLabel: "Scope this service"
  },
  locations: {
    label: "Locations",
    singularLabel: "location",
    eyebrow: "Location Guides",
    pageTitlePrefix: `${business.city} location guides`,
    heroLabel: "Location guides",
    cardLabel: "Location",
    ctaLabel: "Plan this area"
  },
  venues: {
    label: "Venues",
    singularLabel: "venue",
    eyebrow: "Venue Planning",
    pageTitlePrefix: `${business.city} venue planning`,
    heroLabel: "Venue guides",
    cardLabel: "Venue",
    ctaLabel: "Coordinate this venue"
  },
  "event-types": {
    label: "Event Types",
    singularLabel: "event type",
    eyebrow: "Event Formats",
    pageTitlePrefix: `${business.city} event support`,
    heroLabel: "Format paths",
    cardLabel: "Event Type",
    ctaLabel: "Map this format"
  },
  "booth-types": {
    label: "Booth Types",
    singularLabel: "booth type",
    eyebrow: "Booth Formats",
    pageTitlePrefix: `${business.city} booth formats`,
    heroLabel: "Booth shapes",
    cardLabel: "Booth Type",
    ctaLabel: "Scope this booth"
  },
  industries: {
    label: "Industries",
    singularLabel: "industry",
    eyebrow: "Industry Planning",
    pageTitlePrefix: `${business.city} industry event support`,
    heroLabel: "Buyer-specific planning",
    cardLabel: "Industry",
    ctaLabel: "Plan this exhibitor profile"
  },
  capabilities: {
    label: "Capabilities",
    singularLabel: "capability",
    eyebrow: "Execution Depth",
    pageTitlePrefix: `${business.city} execution capabilities`,
    heroLabel: "Operational depth",
    cardLabel: "Capability",
    ctaLabel: "Use this capability"
  },
  rentals: {
    label: "Rentals",
    singularLabel: "rental",
    eyebrow: "Rental Programs",
    pageTitlePrefix: `${business.city} exhibit rentals`,
    heroLabel: "Rental paths",
    cardLabel: "Rental",
    ctaLabel: "Build this rental scope"
  },
  "exhibit-types": {
    label: "Exhibit Types",
    singularLabel: "exhibit type",
    eyebrow: "Environment Types",
    pageTitlePrefix: `${business.city} exhibit environments`,
    heroLabel: "Environment types",
    cardLabel: "Exhibit Type",
    ctaLabel: "Plan this environment"
  }
};

function getNodeForSection(section: TaxonomySection): TaxonomyNode {
  switch (section) {
    case "services":
      return taxonomyPlan.services;
    case "locations":
      return taxonomyPlan.locations;
    case "venues":
      return taxonomyPlan.venues;
    case "event-types":
      return taxonomyPlan.eventTypes;
    case "booth-types":
      return taxonomyPlan.boothTypes;
    case "industries":
      return taxonomyPlan.industries;
    case "capabilities":
    case "rentals":
    case "exhibit-types": {
      const node = optionalTaxonomyNodeMap[section];

      if (!node) {
        throw new Error(`No taxonomy node found for "${section}"`);
      }

      return node;
    }
  }
}

export type TaxonomyCollection = {
  section: TaxonomySection;
  label: string;
  singularLabel: string;
  eyebrow: string;
  routeBase: string;
  required: boolean;
  requiredCorePages: string[];
  generatedPages: PlanPage[];
  targetCount: number;
  actualGeneratedCount: number;
  representativeSampleSlugs: string[];
  rationale: string;
  pageTitlePrefix: string;
  heroLabel: string;
  cardLabel: string;
  ctaLabel: string;
};

export function getTaxonomyCollection(section: TaxonomySection): TaxonomyCollection {
  const node = getNodeForSection(section);
  const config = sectionConfig[section];

  return {
    section,
    label: config.label,
    singularLabel: config.singularLabel,
    eyebrow: config.eyebrow,
    routeBase: node.routeBase,
    required: node.required,
    requiredCorePages: node.requiredCorePages,
    generatedPages: node.generatedPages,
    targetCount: node.targetCount,
    actualGeneratedCount: node.actualGeneratedCount,
    representativeSampleSlugs: node.representativeSampleSlugs,
    rationale: node.rationale,
    pageTitlePrefix: config.pageTitlePrefix,
    heroLabel: config.heroLabel,
    cardLabel: config.cardLabel,
    ctaLabel: config.ctaLabel
  };
}

export const activeTaxonomySections = sectionOrder.filter(
  (section) => getTaxonomyCollection(section).actualGeneratedCount > 0
);

export const activeCollections = activeTaxonomySections.map((section) =>
  getTaxonomyCollection(section)
);

export type TaxonomyItem = PlanPage & {
  section: TaxonomySection;
};

export function getTaxonomyItem(
  section: TaxonomySection,
  slug: string
): TaxonomyItem | undefined {
  const item = getTaxonomyCollection(section).generatedPages.find(
    (entry) => entry.slug === slug
  );

  return item ? { ...item, section } : undefined;
}

export const activeVenues = getTaxonomyCollection("venues").generatedPages;
const activeVenueSlugSet = new Set(activeVenues.map((item) => item.slug));
export const activeVenueResearch = venueResearch.venueRecords.filter((venue) =>
  activeVenueSlugSet.has(venue.slug)
);

const activeLocationSlugSet = new Set(
  getTaxonomyCollection("locations").generatedPages.map((item) => item.slug)
);
export const activeLocationTargets = marketResearch.locationTargets.filter((location) =>
  activeLocationSlugSet.has(location.slug)
);

export function getVenueBySlug(slug: string): VenueResearchRecord | undefined {
  return activeVenueResearch.find((venue) => venue.slug === slug);
}

export function getLocationBySlug(slug: string): MarketLocationTarget | undefined {
  return activeLocationTargets.find((location) => location.slug === slug);
}

export function isTaxonomySection(value: string): value is TaxonomySection {
  return activeTaxonomySections.includes(value as TaxonomySection);
}

export function hashValue(input: string): number {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function pickItemsFromSection(
  section: TaxonomySection,
  seed: string,
  count: number,
  excludeSlug?: string
): TaxonomyItem[] {
  const items = getTaxonomyCollection(section).generatedPages.filter(
    (item) => item.slug !== excludeSlug
  );

  if (items.length === 0) {
    return [];
  }

  const selected: TaxonomyItem[] = [];
  const usedSlugs = new Set<string>();
  let cursor = hashValue(`${section}:${seed}`);

  while (selected.length < Math.min(count, items.length)) {
    const candidate = items[cursor % items.length];

    if (!usedSlugs.has(candidate.slug)) {
      usedSlugs.add(candidate.slug);
      selected.push({
        ...candidate,
        section
      });
    }

    cursor += 7;
  }

  return selected;
}

export function pickDemandDriver(seed: string) {
  return marketResearch.demandDrivers[
    hashValue(`driver:${seed}`) % marketResearch.demandDrivers.length
  ];
}

export function pickLaborFinding(seed: string) {
  return laborResearch.verifiedFindings[
    hashValue(`labor:${seed}`) % laborResearch.verifiedFindings.length
  ];
}

export function getVenuePattern(slug: string) {
  return laborResearch.venueSpecificOperatingPatterns.find(
    (pattern) => pattern.slug === slug
  );
}

export function formatVenueFit(venue: VenueResearchRecord): string {
  return venue.tradeShowFit.map((fit) => fit.replace(/-/g, " ")).join(", ");
}

export type RouteLink = {
  href: string;
  label: string;
  description: string;
};

export function pickRelatedRoutes(
  section: TaxonomySection,
  slug: string
): RouteLink[] {
  const links: RouteLink[] = [
    {
      href: `/${section}`,
      label: `Browse all ${getTaxonomyCollection(section).label.toLowerCase()}`,
      description: `View the full ${getTaxonomyCollection(section).label.toLowerCase()} set for ${business.city.toUpperCase()} and the wider Bluegrass region.`
    }
  ];

  activeTaxonomySections
    .filter((entry) => entry !== section)
    .slice(0, 5)
    .forEach((entry) => {
      const related = pickItemsFromSection(entry, `${slug}:${entry}`, 1)[0];

      if (!related) {
        return;
      }

      links.push({
        href: `/${entry}/${related.slug}`,
        label: related.label,
        description: `${getTaxonomyCollection(entry).cardLabel} guidance connected back to ${business.city.toUpperCase()} venue, logistics, and show-day planning.`
      });
    });

  return links;
}

export const serviceOptions = getTaxonomyCollection("services").generatedPages.map(
  (item) => item.label
);

export const contactFieldLabels = [
  "Name",
  "Email",
  "Phone",
  "Company Name",
  "Target Show Date",
  "Show Location",
  "Service",
  "Project Details"
] as const;

const clusterNames = marketResearch.primaryVenueClusters.map((cluster) => cluster.name);
const representativeVenueNames = activeVenueResearch.slice(0, 4).map((venue) => venue.name);

export const marketHighlights = [
  {
    label: "Convention nodes",
    value: "Downtown + Newtown Pike + South Lexington",
    body: marketResearch.market.serviceRadiusStrategy
  },
  {
    label: "Verified venues",
    value: `${activeVenueResearch.length} verified venues`,
    body: `Highlights include ${representativeVenueNames.join(", ")}.`
  },
  {
    label: "Location reach",
    value: `${activeLocationTargets.length} target markets`,
    body: `Primary clusters include ${clusterNames.slice(0, 3).join(", ")}.`
  },
  {
    label: "Labor posture",
    value: "Mixed / venue-directed",
    body: laborResearch.overallAssessment.safePublicClaim
  }
] as const;

export const headerUtilityActions: HeaderUtilityAction[] = [
  {
    label: "Contact",
    href: "/contact",
    variant: "secondary"
  }
];

export const headerNavigation: HeaderNavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Turnkey Trade Show Services", href: "/services/turnkey-trade-show-services" },
      { label: "Trade Show General Contracting", href: "/services/trade-show-general-contracting" },
      { label: "Trade Show AV Production", href: "/services/trade-show-av-production" },
      { label: "Expo Logistics and Shipping", href: "/services/expo-logistics-and-shipping" }
    ],
    panel: {
      title: "A service stack built around the venue and the schedule",
      text: "From booth design to labor, AV, freight, and show-day leadership, the right mix depends on the room, the calendar, and the venue rules already in play.",
      href: "/services",
      buttonLabel: "See services"
    }
  },
  {
    label: "Venues",
    href: "/venues",
    children: [
      { label: "Central Bank Center", href: "/venues/central-bank-center" },
      { label: "Hyatt Regency Lexington", href: "/venues/hyatt-regency-lexington" },
      { label: "Hilton Lexington/Downtown", href: "/venues/hilton-lexington-downtown" },
      { label: "Lexington Marriott City Center", href: "/venues/lexington-marriott-city-center" }
    ],
    panel: {
      title: "Venue guidance for downtown halls and hotel properties",
      text: "Each Lexington venue changes the way freight moves, labor is ordered, and guest traffic feels on the floor, so the building should shape the plan from the start.",
      href: "/venues",
      buttonLabel: "Browse venues"
    }
  },
  {
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Downtown Lexington", href: "/locations/downtown-lexington" },
      { label: "Newtown Pike Corridor", href: "/locations/newtown-pike-corridor" },
      { label: "Hamburg", href: "/locations/hamburg" },
      { label: "South Lexington", href: "/locations/south-lexington" }
    ],
    panel: {
      title: "Market mapping that reflects real planning differences",
      text: "Downtown, Newtown Pike, Hamburg, Beaumont, and the regional Bluegrass ring each create their own parking, hotel, and access behavior.",
      href: "/locations",
      buttonLabel: "View locations"
    }
  },
  {
    label: "Event Types",
    href: "/event-types",
    children: [
      { label: "Trade Show Services", href: "/event-types/trade-show-services" },
      { label: "Conference Services", href: "/event-types/conference-services" },
      { label: "Brand Activation Services", href: "/event-types/brand-activation-services" },
      { label: "User Conference Services", href: "/event-types/user-conference-services" }
    ],
    panel: {
      title: "Format paths for trade shows, conferences, and activations",
      text: "Use the event-type stack when the room needs to support exhibitors, sponsors, registration, and general-session work without losing the thread.",
      href: "/event-types",
      buttonLabel: "See event types"
    }
  },
  {
    label: "Booth Types",
    href: "/booth-types",
    children: [
      { label: "Custom Exhibit Booths", href: "/booth-types/custom-exhibit-booths" },
      { label: "Island Exhibit Booths", href: "/booth-types/island-exhibit-booths" },
      { label: "Inline Booth Displays", href: "/booth-types/inline-booth-displays" },
      { label: "Rental Exhibit Booths", href: "/booth-types/rental-exhibit-booths" }
    ],
    panel: {
      title: "Booth formats with different build, sightline, and labor needs",
      text: "Inline, island, custom, rental, and modular booths each create a different production path, so the format should match the footprint and the show objective.",
      href: "/booth-types",
      buttonLabel: "Explore booth types"
    }
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Agriculture and AgTech Expo Services", href: "/industries/agriculture-and-agtech-expo-services" },
      { label: "Healthcare Trade Show Services", href: "/industries/healthcare-trade-show-services" },
      { label: "Manufacturing Expo Services", href: "/industries/manufacturing-expo-services" },
      { label: "Education and Association Event Services", href: "/industries/education-and-association-event-services" }
    ],
    panel: {
      title: "Buyer-specific planning paths for real industries",
      text: "Healthcare, manufacturing, agriculture, education, and other verticals need different language, pacing, and exhibit priorities than a generic page can offer.",
      href: "/industries",
      buttonLabel: "Browse industries"
    }
  },
  {
    label: "About",
    href: "/about"
  }
];

export const homepageHero = {
  eyebrow: `${business.city} trade show, exhibit, and event execution`,
  title: "A Lexington trade show team that keeps planning, fabrication, and field execution aligned.",
  highlight: "We handle exhibit production, labor, audio, logistics, and venue coordination as one delivery chain.",
  lead:
    "We help exhibitors, organizers, agencies, and venue teams turn the messy parts of a show into one readable project: booth design, fabrication, installation and dismantle, audio, freight, exhibitor-appointed-contractor coordination, labor, and show-day supervision across downtown Lexington, Newtown Pike, Hamburg, Beaumont, South Lexington, and the surrounding Bluegrass region.",
  primaryAction: {
    label: "Contact",
    href: "/contact"
  },
  secondaryAction: {
    label: "Venues",
    href: "/venues"
  }
} as const;

export const homepageServiceCards: HomepageCard[] = [
  {
    icon: "blueprint",
    title: "Venue-Ready Booth Design",
    text: "Booth concepts shaped around sightlines, aisle movement, and the production path that has to hold up once the room is live.",
    href: "/services/trade-show-booth-design"
  },
  {
    icon: "key",
    title: "General Contracting and EAC Coordination",
    text: "General-contractor style planning and exhibitor-appointed-contractor coordination kept on one schedule so responsibilities stay clear.",
    href: "/services/exhibitor-appointed-contractor-coordination"
  },
  {
    icon: "sliders",
    title: "Labor and I&D Execution",
    text: "Installation, dismantle, labor coordination, and field leadership planned against the venue guide and the event calendar already in motion.",
    href: "/services/trade-show-installation-and-dismantle"
  },
  {
    icon: "frame",
    title: "Fabrication and Graphic Production",
    text: "Custom fabrication, reconfigurable builds, and graphics managed together so the final booth feels deliberate instead of assembled from leftovers.",
    href: "/services/custom-exhibit-fabrication"
  },
  {
    icon: "archive",
    title: "AV and Technical Production",
    text: "LED, general-session, lighting, and technical support scoped to the room's actual power, rigging, and audio limits.",
    href: "/services/trade-show-av-production"
  },
  {
    icon: "calendar",
    title: "Show Services and Coordination",
    text: "Labor, utilities, audio, freight, decorator timing, and venue forms translated into one production chain the team can actually run.",
    href: "/services/show-services-order-management"
  }
];

export const homepageBenefitCards: HomepageCard[] = [
  {
    icon: "wallet",
    title: "Venue Fluency",
    text: "The plan starts with the building, which means labor posture, utilities, access, and room flow shape the scope early.",
    href: "/services/trade-show-strategy-and-pre-show-planning"
  },
  {
    icon: "eye",
    title: "Show-Site Control",
    text: "Graphics, audio, logistics, install, and punch-list decisions stay tied to one field-led calendar instead of drifting into separate inboxes.",
    href: "/services/show-site-supervision"
  },
  {
    icon: "tag",
    title: "Regional Market Map",
    text: "Downtown, Newtown Pike, Hamburg, Beaumont, and the surrounding Bluegrass drive market are treated as distinct planning environments, not one generic market pattern.",
    href: "/locations"
  }
];

export const homepageInsightCards: HomepageInsightCard[] = [
  {
    tag: "Downtown Convention Core",
    title: "Central Bank Center and the downtown convention core",
    text: "This is the page for programs that depend on attached hotels, loading discipline, and the exhibit-hall sequence downtown is built around.",
    href: "/venues/central-bank-center",
    accent: "gold"
  },
  {
    tag: "Newtown Pike Programs",
    title: "Newtown Pike hotel and resort delivery",
    text: "Programs on the north side behave differently from downtown, with parking, hotel behavior, and room flow changing the operating model fast.",
    href: "/locations/newtown-pike-corridor",
    accent: "blue"
  },
  {
    tag: "Regional Scale",
    title: "Marriott Lexington Griffin Gate and the north-side resort corridor",
    text: "The north-side resort corridor matters because it creates a second real event environment beyond the downtown core for retreats, overflow, and hospitality-heavy programs.",
    href: "/venues/marriott-lexington-griffin-gate-golf-resort-and-spa",
    accent: "slate"
  }
];

export const homepageSplitCallout = {
  eyebrow: "Need a cleaner planning path?",
  title: "Build the next Lexington event around the venue guide that actually fits the room.",
  text:
    "Downtown convention work, Newtown Pike hotel meetings, South Lexington programs, Hamburg corporate events, and Bluegrass regional spillover all need different timing, utilities, labor language, and freight assumptions. Start with the venue, service mix, and show date and we can map the cleanest path.",
  href: "/contact",
  buttonLabel: "Start a Project Brief"
} as const;

export const resourceCards = [
  {
    label: "Venues",
    title: "Downtown, hotel-ring, and regional venue guides",
    description:
      "Move from the market view into venue-specific planning, exhibitor-kit review, and service-order timing without guessing how the building works. These guides help the reader compare a downtown convention campus, a hotel ballroom, a resort meeting property, and a regional event space with enough detail to understand which building changes the schedule the most. The goal is not to make the venue sound larger than it is. The goal is to show how the room, the dock, the guest flow, the service process, and the sponsor path actually behave once the project starts to tighten. A strong venue guide should make the loading sequence easier to imagine, the hotel relationship easier to read, and the room behavior easier to plan against before the first truck arrives. It should also make it easier to see whether the venue is better suited to a polished conference, a product-heavy expo, or a hospitality-forward program that needs the room to work quietly in the background.",
    href: "/venues",
    tone: "blue"
  },
  {
    label: "Locations",
    title: "Lexington and Bluegrass market mapping",
    description:
      "Use the location stack to see how downtown, Newtown Pike, Hamburg, Beaumont, South Lexington, and the surrounding Bluegrass ring change execution. The point of the location pages is to show where hotel behavior shifts, where parking gets easier or harder, and where a project is likely to pick up or lose time before the event even begins. That makes the market feel concrete instead of generic and helps the planner choose the right submarket before the brief gets too wide. It also helps the reader see whether the project belongs in the convention core, the hotel corridors, or a regional setting that pulls from a broader drive market and needs a different level of coordination. The useful part of that clarity is that it helps the client understand what kind of pace, travel pattern, and support structure the event will actually need.",
    href: "/locations",
    tone: "slate"
  },
  {
    label: "Services",
    title: "Project-led service stacks",
    description:
      "Compare labor, audio, fabrication, GC coordination, logistics, and show-day supervision without flattening them into generic bundles. These pages make it easier to see which services anchor the project, which ones support the build, and which ones have to be confirmed early so the timeline stays realistic. That keeps the reader focused on how the work is actually run rather than on a list of disconnected offerings. It also helps the client understand which parts of the work need the earliest attention, which parts can be phased later, and which parts are most likely to affect the room once the calendar gets tight. The result is a cleaner sense of where the schedule can stretch and where it needs to stay fixed.",
    href: "/services",
    tone: "gold"
  },
  {
    label: "Industries",
    title: "Buyer-specific planning paths",
    description:
      "Industry pages connect the same Lexington venue logic to healthcare, manufacturing, agriculture, equine, association, and university-facing demand. Each sector brings its own language, own priorities, and own tolerance for risk, which changes what the room should emphasize and how the support model should be framed. The pages are built to help the reader feel understood quickly and then move into the planning choices that fit the sector instead of a generic exhibit pattern. That means the wording can sound more specific, the planning advice can sound more useful, and the reader can see why one audience wants a different mix of proof points, pacing, and visual emphasis than another. The better the sector fit, the easier it becomes to keep the room credible to the people who walk into it.",
    href: "/industries",
    tone: "charcoal"
  }
] as const;

export const footerMenuLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Venues", href: "/venues" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" }
] as const;

export const footerPlanningLinks = [
  {
    title: "Downtown convention district venue guides",
    href: "/venues/central-bank-center",
    label: "Venue"
  },
  {
    title: "West Lexington hotel and conference planning",
    href: "/locations/beaumont",
    label: "West"
  },
  {
    title: "Hamburg and east-Lexington event planning",
    href: "/locations/hamburg",
    label: "East"
  }
] as const;

export const footerContactLinks = [
  {
    label: business.legalName,
    href: "/about"
  },
  {
    label: business.phone,
    href: `tel:${business.phone.replace(/[^0-9]/g, "")}`
  },
  {
    label: business.email,
    href: `mailto:${business.email}`
  },
  {
    label: business.address,
    href: "/contact"
  }
] as const;

export const footerUtilityLinks = [
  {
    label: "Call",
    shortLabel: "P",
    href: `tel:${business.phone.replace(/[^0-9]/g, "")}`
  },
  {
    label: "Email",
    shortLabel: "@",
    href: `mailto:${business.email}`
  },
  {
    label: "Locations",
    shortLabel: "M",
    href: "/locations"
  }
] as const;

export const footerLegalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Resource Hub", href: "/blog" },
  { label: "Contact", href: "/contact" }
] as const;

export const footerCoverageLine = [
  "Downtown Lexington",
  "Newtown Pike Corridor",
  "Hamburg",
  "South Lexington",
  "Bluegrass region"
].join(" | ");

export function getRepresentativeRoutes(): string[] {
  const routes = ["/", "/about"];

  activeCollections.forEach((collection) => {
    routes.push(collection.routeBase);

    const sampleSlug = collection.representativeSampleSlugs[0];

    if (sampleSlug) {
      routes.push(`${collection.routeBase}/${sampleSlug}`);
    }
  });

  routes.push("/contact");

  return routes;
}

export function getAllSiteRoutes(): string[] {
  const routes = ["/", "/about", "/blog", "/contact", "/privacy", "/terms"];

  activeCollections.forEach((collection) => {
    routes.push(collection.routeBase);

    collection.generatedPages.forEach((page) => {
      routes.push(`${collection.routeBase}/${page.slug}`);
    });
  });

  return routes;
}
