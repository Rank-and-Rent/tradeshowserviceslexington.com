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
  name: "Trade Show Services of Des Moines",
  legalName: "Trade Show Services of Des Moines",
  city: "Des Moines",
  state: "IA",
  domain: "tradeshowservicesdesmoines.com",
  address: "699 Walnut St, Suite 400, Des Moines, IA 50309",
  phone: "555-555-5615",
  email: "info@tradeshowdisplaydesmoines.com"
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
    heroLabel: "Service mix",
    cardLabel: "Service",
    ctaLabel: "Brief this service path"
  },
  locations: {
    label: "Locations",
    singularLabel: "location",
    eyebrow: "Market Coverage",
    pageTitlePrefix: `${business.city} market coverage`,
    heroLabel: "Metro coverage",
    cardLabel: "Location",
    ctaLabel: "Plan this market"
  },
  venues: {
    label: "Venues",
    singularLabel: "venue",
    eyebrow: "Venue Planning",
    pageTitlePrefix: `${business.city} venue planning`,
    heroLabel: "Venue playbooks",
    cardLabel: "Venue",
    ctaLabel: "Coordinate this venue"
  },
  "event-types": {
    label: "Event Types",
    singularLabel: "event type",
    eyebrow: "Event Formats",
    pageTitlePrefix: `${business.city} event support`,
    heroLabel: "Format coverage",
    cardLabel: "Event Type",
    ctaLabel: "Map this format"
  },
  "booth-types": {
    label: "Booth Types",
    singularLabel: "booth type",
    eyebrow: "Booth Formats",
    pageTitlePrefix: `${business.city} booth formats`,
    heroLabel: "Booth planning",
    cardLabel: "Booth Type",
    ctaLabel: "Scope this booth"
  },
  industries: {
    label: "Industries",
    singularLabel: "industry",
    eyebrow: "Industry Coverage",
    pageTitlePrefix: `${business.city} industry event support`,
    heroLabel: "Buyer-specific coverage",
    cardLabel: "Industry",
    ctaLabel: "Plan this exhibitor profile"
  },
  capabilities: {
    label: "Capabilities",
    singularLabel: "capability",
    eyebrow: "Execution Capabilities",
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
    heroLabel: "Rental options",
    cardLabel: "Rental",
    ctaLabel: "Build this rental scope"
  },
  "exhibit-types": {
    label: "Exhibit Types",
    singularLabel: "exhibit type",
    eyebrow: "Environment Types",
    pageTitlePrefix: `${business.city} exhibit environments`,
    heroLabel: "Environment planning",
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
      description: `View the full ${getTaxonomyCollection(section).label.toLowerCase()} stack for ${business.city} and the wider Central Iowa market.`
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
        description: `${getTaxonomyCollection(entry).cardLabel} guidance connected back to ${business.city} venue, logistics, and show-site planning.`
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
    value: "Downtown + West + East",
    body: marketResearch.market.serviceRadiusStrategy
  },
  {
    label: "Verified venues",
    value: `${activeVenueResearch.length} real venues`,
    body: `Coverage includes ${representativeVenueNames.join(", ")}.`
  },
  {
    label: "Location coverage",
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
      title: "Project-led execution for Central Iowa show calendars",
      text: "Map the service mix across booths, labor, AV, logistics, graphics, and venue coordination before show week compresses the schedule.",
      href: "/services",
      buttonLabel: "See services"
    }
  },
  {
    label: "Venues",
    href: "/venues",
    children: [
      { label: "Community Choice Convention Center", href: "/venues/community-choice-convention-center" },
      { label: "EMC Expo Center", href: "/venues/emc-expo-center" },
      { label: "Ron Pearson Center", href: "/venues/ron-pearson-center" },
      { label: "Richard O. Jacobson Exhibition Center", href: "/venues/richard-o-jacobson-exhibition-center" }
    ],
    panel: {
      title: "Venue playbooks across downtown, west, and east-side halls",
      text: "Start with the building so utilities, labor posture, access, and room flow shape the plan early.",
      href: "/venues",
      buttonLabel: "Browse venues"
    }
  },
  {
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Downtown Des Moines", href: "/locations/downtown-des-moines" },
      { label: "West Des Moines", href: "/locations/west-des-moines" },
      { label: "Ankeny", href: "/locations/ankeny" },
      { label: "Altoona", href: "/locations/altoona" }
    ],
    panel: {
      title: "Metro coverage with real submarket differences",
      text: "Downtown, the west corridor, the fairgrounds and Altoona cluster, and the north metro do not operate like the same venue district.",
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
      title: "Formats across trade shows, conferences, and activations",
      text: "Keep exhibit, sponsor, registration, and general-session work under one readable operating model.",
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
      title: "Exhibit formats that stay venue-ready",
      text: "Compare booth geometry, fabrication pressure, sightlines, and install requirements without flattening every format into the same answer.",
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
      title: "Buyer-specific planning paths",
      text: "Use the industry stack when the project needs to sound like the buyer's market instead of generic trade-show copy.",
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
  title: "A Des Moines trade show team that",
  highlight: "delivers exhibit, labor, and venue execution.",
  lead:
    "We help exhibitors, organizers, agencies, and venue teams manage booth design, fabrication, installation and dismantle, AV, logistics, exhibitor-appointed-contractor coordination, and show-site supervision across downtown Des Moines, West Des Moines, Ankeny, Altoona, the fairgrounds, and the wider Central Iowa market.",
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
    text: "Booth concepts and branded environments framed around venue flow, attendee movement, and the actual service path.",
    href: "/services/trade-show-booth-design"
  },
  {
    icon: "key",
    title: "General Contracting and EAC Coordination",
    text: "General-contractor style planning and exhibitor-appointed-contractor coordination kept on one readable schedule.",
    href: "/services/exhibitor-appointed-contractor-coordination"
  },
  {
    icon: "sliders",
    title: "Labor and I&D Execution",
    text: "Installation, dismantle, field leadership, and labor coordination scoped around the actual venue and event calendar.",
    href: "/services/trade-show-installation-and-dismantle"
  },
  {
    icon: "frame",
    title: "Fabrication and Graphic Production",
    text: "Custom fabrication, reconfigurable builds, and graphics held together under one project-led operating path.",
    href: "/services/custom-exhibit-fabrication"
  },
  {
    icon: "archive",
    title: "AV and Technical Production",
    text: "LED, general-session, lighting, and technical support planned against the room's real operating constraints.",
    href: "/services/trade-show-av-production"
  },
  {
    icon: "calendar",
    title: "Show Services and Coordination",
    text: "Labor, utilities, AV, freight, decorator timing, and venue forms translated into one readable production path.",
    href: "/services/show-services-order-management"
  }
];

export const homepageBenefitCards: HomepageCard[] = [
  {
    icon: "wallet",
    title: "Venue Fluency",
    text: "The planning path starts with the building, so labor posture, utilities, room flow, and access shape the scope early.",
    href: "/services/trade-show-strategy-and-pre-show-planning"
  },
  {
    icon: "eye",
    title: "Show-Site Control",
    text: "Graphics, AV, logistics, install, and punch-list decisions stay tied to one field-led execution calendar.",
    href: "/services/show-site-supervision"
  },
  {
    icon: "tag",
    title: "Regional Coverage",
    text: "Downtown, West Des Moines, Ankeny, Altoona, and fairgrounds work are treated as distinct planning environments, not one metro template.",
    href: "/locations"
  }
];

export const homepageInsightCards: HomepageInsightCard[] = [
  {
    tag: "Downtown Convention Core",
    title: "Community Choice Convention Center planning paths",
    text: "Use the downtown venue stack when the project depends on skywalk-connected hotels, convention infrastructure, and exhibit-hall sequencing.",
    href: "/venues/community-choice-convention-center",
    accent: "gold"
  },
  {
    tag: "West Corridor Corporate Work",
    title: "Ron Pearson Center and West Des Moines delivery",
    text: "Westown Parkway programs behave differently from downtown. Parking, hotel behavior, and room flow change the operating model.",
    href: "/venues/ron-pearson-center",
    accent: "blue"
  },
  {
    tag: "Fairgrounds and East-Side Scale",
    title: "Fairgrounds buildings and public-show logistics",
    text: "The fairgrounds and Altoona cluster matter because east-side halls create a second real event environment beyond the downtown core.",
    href: "/venues/william-c-knapp-varied-industries-building",
    accent: "slate"
  }
];

export const homepageSplitCallout = {
  eyebrow: "Looking for a clearer planning path?",
  title: "Build your next Des Moines event plan around the right venue guide.",
  text:
    "Downtown convention work, west-corridor hotel meetings, fairgrounds events, Ankeny conference programs, and Altoona hospitality all need different timing, utilities, labor language, and freight assumptions. Start with the venue, service mix, and show date and we can map the cleanest path.",
  href: "/contact",
  buttonLabel: "Start a Project Brief"
} as const;

export const resourceCards = [
  {
    label: "Venues",
    title: "Downtown, west-corridor, and fairgrounds venue playbooks",
    description:
      "Move from broad market view into venue-specific planning, exhibitor-kit review, and service-order timing.",
    href: "/venues",
    tone: "blue"
  },
  {
    label: "Locations",
    title: "Des Moines metro and Central Iowa coverage",
    description:
      "Use the location stack to understand how downtown, the west corridor, the north metro, and the east-side event cluster change execution.",
    href: "/locations",
    tone: "slate"
  },
  {
    label: "Services",
    title: "Project-led service stacks",
    description:
      "Compare labor, AV, fabrication, GC coordination, logistics, and show-site supervision without flattening them into generic bundles.",
    href: "/services",
    tone: "gold"
  },
  {
    label: "Industries",
    title: "Buyer-specific planning paths",
    description:
      "Industry pages connect the same Des Moines venue logic to healthcare, manufacturing, agriculture, and association demand.",
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
    href: "/venues/community-choice-convention-center",
    label: "Venue"
  },
  {
    title: "West Des Moines hotel and conference routing",
    href: "/locations/west-des-moines",
    label: "West"
  },
  {
    title: "Fairgrounds and Altoona event coverage",
    href: "/locations/altoona",
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
  "Downtown Des Moines",
  "West Des Moines",
  "Ankeny",
  "Altoona",
  "Iowa State Fairgrounds"
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
