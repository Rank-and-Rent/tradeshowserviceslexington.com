import {
  business,
  formatVenueFit,
  getLocationBySlug,
  getTaxonomyCollection,
  getTaxonomyItem,
  getVenueBySlug,
  getVenuePattern,
  laborResearch,
  marketHighlights,
  marketResearch,
  pickDemandDriver,
  pickItemsFromSection,
  pickLaborFinding,
  pickRelatedRoutes,
  type RouteLink,
  type TaxonomySection
} from "./site-data";

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type IndexCard = {
  href: string;
  label: string;
  description: string;
  eyebrow: string;
};

export type IndexPageContent = {
  eyebrow: string;
  title: string;
  lead: string;
  intro: string[];
  cards: IndexCard[];
  facts: typeof marketHighlights;
  ctaTitle: string;
  ctaText: string;
};

export type DetailPageContent = {
  eyebrow: string;
  title: string;
  heroLead: string;
  intro: string[];
  focusList: string[];
  sections: ContentSection[];
  faqs: FaqItem[];
  relatedLinks: RouteLink[];
  wordCount: number;
  seoTitle: string;
  seoDescription: string;
  ctaTitle: string;
  ctaText: string;
};

type DetailContext = {
  section: TaxonomySection;
  slug: string;
  label: string;
  collectionLabel: string;
  relatedVenueName: string;
  relatedVenueFit: string;
  relatedVenueFact: string;
  relatedLocationName: string;
  relatedLocationReason: string;
  relatedLocationRegion: string;
  relatedServiceName: string;
  demandDriverLabel: string;
  demandDriverReason: string;
  laborPosition: string;
  laborFinding: string;
  venuePattern: string;
  sectionAngle: string;
  sectionPressure: string;
  sectionOutcome: string;
};

function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function clusterSummary(limit = 3) {
  return marketResearch.primaryVenueClusters
    .slice(0, limit)
    .map((cluster) => cluster.name)
    .join(", ");
}

function getSectionAngle(section: TaxonomySection, label: string) {
  switch (section) {
    case "services":
      return `${label} is treated here as one operating layer inside the broader exhibit, labor, AV, logistics, and show-site calendar.`;
    case "locations":
      return `${label} is framed as a real ${business.city} submarket with its own routing, venue mix, hotel behavior, and planning pressure rather than a radius-page placeholder.`;
    case "venues":
      return `${label} is approached as a venue-specific environment where official planning guides, service-order timing, dock logic, and exhibitor instructions matter more than generic industry shorthand.`;
    case "event-types":
      return `${label} is written as a distinct program format, because audience flow, sponsor expectations, staging, and venue fit all change when the event format changes.`;
    case "booth-types":
      return `${label} is handled as a real exhibit format with its own footprint, sightline, fabrication, install, and dismantle consequences.`;
    case "industries":
      return `${label} is mapped to buyer pressure, audience expectations, and regional demand signals instead of being treated like a national template page.`;
    case "capabilities":
      return `${label} is positioned as cross-functional execution depth that affects pre-show planning, field leadership, and repeatability across venues.`;
    case "rentals":
      return `${label} is presented as a flexible delivery path that changes budget control, lead times, storage strategy, and show-to-show adaptability.`;
    case "exhibit-types":
      return `${label} is framed as an environment category with its own staging logic, attendee flow, and venue-use pattern.`;
  }
}

function getSectionPressure(section: TaxonomySection, label: string) {
  switch (section) {
    case "services":
      return `${label} breaks down when it is purchased as an isolated line item after the venue, graphics, freight, and labor decisions have already moved in different directions.`;
    case "locations":
      return `${label} becomes difficult when planners talk about the market in broad metro terms and ignore how downtown, the west corridor, the east-side fairgrounds and Altoona cluster, or the north corridor actually behave.`;
    case "venues":
      return `${label} becomes risky when teams assume the building behaves like the last hall they used instead of following current venue documents and show instructions.`;
    case "event-types":
      return `${label} gets expensive when the production plan copies a different event format instead of matching the actual registration flow, content cadence, and sponsor footprint.`;
    case "booth-types":
      return `${label} slips when the footprint, traffic pattern, rigging needs, and setup sequence are decided too late to influence fabrication and show-services ordering.`;
    case "industries":
      return `${label} loses relevance when it sounds like generic trade show copy instead of connecting the work back to the buyer's sector, compliance pressures, and product story.`;
    case "capabilities":
      return `${label} only creates value when it changes how the project is run, not when it appears as empty agency language detached from venue and show-week decisions.`;
    case "rentals":
      return `${label} becomes weak when it is sold as the cheapest option instead of as the right mix of flexibility, pace, visual control, and reuse.`;
    case "exhibit-types":
      return `${label} underperforms when the environment concept ignores venue flow, audience dwell time, and the real staffing and logistics path behind it.`;
  }
}

function getSectionOutcome(section: TaxonomySection, label: string) {
  switch (section) {
    case "services":
      return `The right ${label.toLowerCase()} plan gives buyers one readable path from kickoff through strike instead of forcing them to reconcile multiple vendors under pressure.`;
    case "locations":
      return `A useful ${label.toLowerCase()} page helps teams understand who the submarket serves, what nearby venues matter, and how routing and staffing should change.`;
    case "venues":
      return `A useful ${label.toLowerCase()} page helps teams think through venue timing, ordering, supervision, and exhibitor coordination before move-in starts.`;
    case "event-types":
      return `A strong ${label.toLowerCase()} plan clarifies how registration, content, sponsors, booth presence, and guest movement should work together.`;
    case "booth-types":
      return `A strong ${label.toLowerCase()} plan helps buyers translate exhibit geometry into better production, safer install sequencing, and cleaner attendee experience.`;
    case "industries":
      return `A strong ${label.toLowerCase()} page gives buyers a more credible planning path because it sounds like their market instead of a category page from somewhere else.`;
    case "capabilities":
      return `A strong ${label.toLowerCase()} page demonstrates operational maturity and explains how the team keeps multi-vendor, multi-venue work under control.`;
    case "rentals":
      return `A strong ${label.toLowerCase()} path balances budget, timeline, storage, and design goals without forcing the exhibitor into an all-or-nothing decision.`;
    case "exhibit-types":
      return `A strong ${label.toLowerCase()} plan explains how the environment should behave in the room, on the floor, and during live guest use.`;
  }
}

function buildContext(section: TaxonomySection, slug: string): DetailContext {
  const item = getTaxonomyItem(section, slug);

  if (!item) {
    throw new Error(`No ${section} item found for "${slug}"`);
  }

  const relatedVenueItem =
    section === "venues"
      ? item
      : pickItemsFromSection("venues", `${slug}:venue`, 1)[0];
  const relatedLocationItem =
    section === "locations"
      ? item
      : pickItemsFromSection("locations", `${slug}:location`, 1)[0];
  const relatedServiceItem =
    section === "services"
      ? item
      : pickItemsFromSection("services", `${slug}:service`, 1)[0];
  const relatedVenue = relatedVenueItem
    ? getVenueBySlug(relatedVenueItem.slug)
    : undefined;
  const relatedLocation = relatedLocationItem
    ? getLocationBySlug(relatedLocationItem.slug)
    : undefined;
  const demandDriver = pickDemandDriver(slug);
  const laborFinding = pickLaborFinding(slug);
  const venuePattern = relatedVenue
    ? getVenuePattern(relatedVenue.slug)?.copyUse ?? laborFinding.finding
    : laborFinding.finding;

  return {
    section,
    slug,
    label: item.label,
    collectionLabel: getTaxonomyCollection(section).label,
    relatedVenueName:
      relatedVenue?.name ?? relatedVenueItem?.label ?? `${business.city} venues`,
    relatedVenueFit:
      relatedVenue?.tradeShowFit.join(" ") ??
      "trade shows, conferences, sponsor activations, and venue-driven event programs",
    relatedVenueFact:
      relatedVenue?.verifiedFacts[0] ??
      "Venue execution should always follow the current guide, exhibitor materials, and service-order path.",
    relatedLocationName: relatedLocationItem?.label ?? business.city,
    relatedLocationReason:
      relatedLocation?.reason ??
      "It sits inside the wider Central Iowa event market.",
    relatedLocationRegion: relatedLocation?.region ?? "Central Iowa event market",
    relatedServiceName: relatedServiceItem?.label ?? "Turnkey Trade Show Services",
    demandDriverLabel: demandDriver.label,
    demandDriverReason: demandDriver.reason,
    laborPosition: laborResearch.overallAssessment.safePublicClaim,
    laborFinding: laborFinding.finding,
    venuePattern,
    sectionAngle: getSectionAngle(section, item.label),
    sectionPressure: getSectionPressure(section, item.label),
    sectionOutcome: getSectionOutcome(section, item.label)
  };
}

function buildFocusList(context: DetailContext) {
  const {
    label,
    relatedVenueName,
    relatedLocationName,
    relatedServiceName,
    section
  } = context;

  const shared = [
    `Start ${label.toLowerCase()} planning with the actual venue, show date, and service mix instead of a generic wishlist.`,
    `Keep ${relatedServiceName.toLowerCase()}, labor timing, AV, graphics, and logistics on one readable operating calendar.`,
    `Review current venue rules, organizer deadlines, utilities, dock timing, and exhibitor paperwork early enough to influence decisions.`,
    `Assign show-site leadership before move-in so venue questions and punch-list items do not drift between vendors.`,
    `Plan dismantle, returns, warehousing, and the next stop before the program opens.`
  ];

  if (section === "locations") {
    return [
      `Treat ${label} as a real submarket inside the ${business.city} event system, not just as another city page.`,
      `Use ${relatedVenueName} and nearby hotel/event inventory to define the right staffing, freight, and arrival path.`,
      `Account for how ${relatedLocationName} connects back to downtown, the west corridor, the fairgrounds and Altoona cluster, or the airport corridor.`,
      shared[3],
      shared[4]
    ];
  }

  if (section === "venues") {
    return [
      `Approach ${label} as a venue-specific operating environment with its own planning documents and order paths.`,
      `Separate venue-controlled services from exhibitor-managed scope before the production plan is locked.`,
      `Use the current guide to confirm access, utilities, IT, rigging, AV, and decorator timing.`,
      shared[3],
      shared[4]
    ];
  }

  return shared;
}

function buildIntro(context: DetailContext) {
  const {
    label,
    section,
    relatedVenueName,
    relatedVenueFact,
    relatedLocationName,
    relatedServiceName,
    demandDriverLabel,
    sectionAngle,
    sectionPressure
  } = context;

  if (section === "locations") {
    return [
      `${label} matters because the ${business.city} market is not one undifferentiated downtown radius. Buyers move between the downtown convention core, the west corridor, the east-side fairgrounds and Altoona cluster, the north metro, and the airport corridor depending on the show, the audience, and the room block. ${sectionAngle} This is why the location stack on this site talks about routing, nearby venues, hotel behavior, and staff movement instead of recycling generic city-copy language.`,
      `${sectionPressure} A real ${label.toLowerCase()} plan should also connect back to the venues and service paths that buyers are most likely to use. That is why this page cross-references locations such as ${relatedLocationName}, venue anchors such as ${relatedVenueName}, and delivery layers such as ${relatedServiceName.toLowerCase()} when those links help a buyer make a cleaner decision.`
    ];
  }

  if (section === "venues") {
    return [
      `${label} should be read as a venue-specific planning environment, not a blank room with interchangeable rules. ${relatedVenueFact} That affects advance work, service ordering, dock sequencing, AV integration, staffing, and the exhibitor-appointed-contractor conversation long before the team reaches show week.`,
      `${sectionPressure} In ${business.city}, venue choice also changes how the whole delivery path is framed. A project that touches ${relatedVenueName} and nearby hotel inventory will not be staffed, routed, and supervised the same way as a suburban conference program, a fairgrounds event, or an airport-corridor meeting. This page is written to make that distinction visible.`
    ];
  }

  return [
    `${label} is strongest when it is connected to the real ${business.city} operating path: venue communication, labor timing, graphics, fabrication, AV, logistics, and show-site supervision moving on the same schedule. ${sectionAngle} That matters in a market where the same buyer can touch downtown convention inventory, west-corridor meetings, east-side fairgrounds work, and airport-adjacent hotels in the same quarter.`,
    `${sectionPressure} The better approach is to treat this page as a planning filter, not a keyword silo. If the buyer is tied to ${demandDriverLabel.toLowerCase()}, venue constraints at ${relatedVenueName}, or routing questions around ${relatedLocationName}, the page should help them understand how ${label.toLowerCase()} fits into a complete project path rather than presenting it like a standalone commodity.`
  ];
}

function buildSections(context: DetailContext): ContentSection[] {
  const {
    label,
    section,
    relatedVenueName,
    relatedVenueFit,
    relatedVenueFact,
    relatedLocationName,
    relatedLocationReason,
    relatedLocationRegion,
    relatedServiceName,
    demandDriverLabel,
    demandDriverReason,
    laborPosition,
    laborFinding,
    venuePattern,
    sectionOutcome
  } = context;

  return [
    {
      heading: `How ${label} fits the ${business.city} market`,
      paragraphs: [
        `${label} should be read inside the full Central Iowa event map, not as a disconnected tactic. ${marketResearch.market.serviceRadiusStrategy} That regional shape matters because downtown convention work, west-corridor corporate meetings, fairgrounds and Altoona event programs, and north-metro conference calendars do not all create the same operational pressure.`,
        `${demandDriverLabel} is one of the clearest active demand drivers in this market. ${demandDriverReason} That means ${label.toLowerCase()} is a real planning question for buyers, not filler created to pad the sitemap. The page exists because the market can support a distinct conversation around timing, venue fit, attendee behavior, sponsor pressure, or service coordination.`,
        `${sectionOutcome} A buyer reading this page should come away with a better sense of how ${label.toLowerCase()} connects to venue choice, delivery sequencing, and the broader resource stack across ${clusterSummary()}.`
      ],
      bullets: [
        `Connected to ${relatedVenueName}`,
        `Written for ${relatedLocationName} and the wider ${relatedLocationRegion}`,
        `Grounded in current market research and venue research artifacts`,
        `Built around project-led trade show execution`
      ]
    },
    {
      heading: "Venue rules, labor posture, and routing realities",
      paragraphs: [
        `${laborPosition} That public positioning matters because the ${business.city} market is mixed and venue-directed. ${laborFinding} When the copy on this site references labor, utilities, IT, rigging, AV, or decorator flow, the goal is to help buyers think more clearly about venue behavior without promising conditions that the current show manual may not support.`,
        `${relatedVenueName} is especially relevant here because it is tied to ${relatedVenueFit}. ${relatedVenueFact} Details like that change how teams schedule advance work, decide on pre-build versus on-site assembly, choose the right freight path, and protect enough time for final checks before the event opens.`,
        `${relatedLocationName} matters for routing as well. ${relatedLocationReason} That practical location logic affects staff movement, hotel blocks, truck access, rehearsal schedules, and the buffer needed between meeting rooms, exhibit floors, hospitality programs, and strike. A page about ${label.toLowerCase()} is only useful if it acknowledges those local realities.`
      ]
    },
    {
      heading: "How the scope is structured before move-in",
      paragraphs: [
        `The safest path is to translate ${label.toLowerCase()} into a schedule early. That means confirming the brief, reviewing current venue information, mapping graphics and fabrication milestones, ordering show services, lining up labor and technical needs, and deciding who is responsible for field leadership once the room starts changing. ${relatedServiceName} often becomes the connective layer because it forces those decisions into one operating plan instead of leaving them across multiple inboxes.`,
        `That sequencing is especially important when the project connects to ${demandDriverLabel.toLowerCase()} or other buyer groups that expect strong brand control and predictable execution. Buyers do not experience the project as separate departments. They experience one booth, one registration environment, one event floor, or one sponsor activation. The plan behind the scenes should feel just as coordinated as the environment they see live.`,
        `This is also where venue-specific planning pays off. ${venuePattern} When those details are surfaced before move-in, the team can make better decisions about booth format, staffing level, furniture, utilities, staging, rehearsals, loading windows, and the sequence for install and dismantle.`
      ]
    },
    {
      heading: "Show-week control and field leadership",
      paragraphs: [
        `No matter how strong the pre-show brief is, ${label.toLowerCase()} still needs a clean decision path once the team is onsite. That means naming who answers venue questions, who owns the production calendar, who manages labor and AV handoffs, and who closes punch-list items without letting them bounce across vendors. In practical terms, field leadership is what keeps a straightforward build from becoming reactive once the dock opens or the ballroom flips.`,
        `In ${business.city}, that show-week control also has to account for how venues are distributed across the market. A downtown convention-center project can overlap with west-corridor hotel meetings, fairgrounds work on the east side, or north-metro conference activity. That is one reason this site does not treat location, venue, and service pages as separate silos. The pages are meant to help the buyer think through the same system from different angles.`,
        `The output should feel calmer, not louder. Strong field control is not about making a bigger promise. It is about reducing confusion, protecting timing, and making sure that every last-minute choice still respects the venue guide, the labor posture, and the broader project path established before move-in.`
      ]
    },
    {
      heading: "Budget, logistics, and repeatability",
      paragraphs: [
        `${label} is also a budget and repeatability question. Buyers usually want to know whether the plan is helping them control cost, shorten lead time, improve reuse, protect visual quality, or make the next show easier to absorb. Those are valid questions, but they should be answered in a way that still respects venue behavior and the actual route between fabrication, storage, freight, install, live days, and returns.`,
        `That is where ${business.city}'s market shape matters again. Downtown programs, west-corridor conferences, fairgrounds events, and north-metro meetings create different financial pressures even when the brand objective sounds similar. Freight windows, labor posture, hotel density, and venue-managed services all change the path. Pages on this site are written to reflect those differences instead of pretending the same template solves every brief.`,
        `Repeatability matters because a strong project often starts with one show and expands into multiple cities, repeat annual events, or a broader regional program. When ${label.toLowerCase()} is planned correctly the first time, it becomes easier to scale, easier to brief internally, and easier to adapt when the venue, footprint, or supporting services change.`
      ]
    },
    {
      heading: `Why this ${context.collectionLabel.toLowerCase()} page is distinct`,
      paragraphs: [
        `This page is not meant to duplicate the other ${context.collectionLabel.toLowerCase()} routes on the site. It exists because ${label.toLowerCase()} creates a distinct decision point for the buyer. The nearby pages may talk about adjacent venues, services, locations, or formats, but this route focuses on the specific planning question created by ${label.toLowerCase()} inside the ${business.city} market.`,
        `That distinction is also why the page links outward. A buyer who arrives here may actually need ${relatedServiceName.toLowerCase()}, may need the venue guide for ${relatedVenueName}, or may need to understand how ${relatedLocationName} fits inside the wider ${relatedLocationRegion} region. Internal linking is used here to help the buyer navigate those real next steps, not just to create artificial SEO pathways.`,
        `The broader goal is clarity. If this page helps the reader understand how ${label.toLowerCase()} fits the market, what still needs confirmation, and which adjacent pages will move the planning conversation forward, then it is doing the work it was written to do.`
      ]
    }
  ];
}

function buildFaqs(context: DetailContext): FaqItem[] {
  const {
    label,
    section,
    relatedVenueName,
    relatedLocationName,
    demandDriverLabel,
    laborPosition
  } = context;

  if (section === "locations") {
    return [
      {
        question: `Do you only work in ${label}?`,
        answer: `No. ${business.name} treats ${label} as one part of a wider Central Iowa operating radius that includes the downtown convention core, the west corridor, the north metro, the east-side fairgrounds and Altoona cluster, and the airport corridor. The point of this page is to explain how ${label} behaves inside that larger market, not to pretend it operates in isolation.`
      },
      {
        question: `Why does ${label} deserve its own planning page?`,
        answer: `${label} changes routing, nearby venue options, staffing assumptions, hotel behavior, and how buyers move between meetings, exhibit floors, and hospitality events. A useful location page should explain those differences instead of using the same metro-wide paragraph on every route.`
      },
      {
        question: "How should labor expectations be described publicly?",
        answer: laborPosition
      },
      {
        question: `Can a project start in ${label} and extend into nearby markets?`,
        answer: `Yes. That is common in the Central Iowa market. The important part is keeping one readable schedule for freight, venue communication, labor, AV, graphics, and dismantle so the move between ${label} and nearby venues does not create duplicated effort or missed handoffs.`
      },
      {
        question: `What should a buyer confirm first for ${label}?`,
        answer: `Start with the actual venue, event date, service mix, and how the location connects back to the wider market. That will usually clarify whether the next step is a venue guide, a service page, a booth-format decision, or a broader routing conversation.`
      }
    ];
  }

  if (section === "venues") {
    return [
      {
        question: `Can you work inside ${label}?`,
        answer: `Yes, but the right path starts with the current venue guide, organizer instructions, and service-order workflow tied to ${label}. This site does not present venue execution as if every building in ${business.city} works the same way, because that would create bad expectations before the project even begins.`
      },
      {
        question: "Do you handle exhibitor-appointed-contractor coordination?",
        answer: `Yes. The site positioning includes exhibitor-appointed-contractor coordination, general-contractor style planning, labor alignment, AV integration, graphics, logistics, and show-site leadership. The exact mix depends on the venue rules, the organizer workflow, and the buyer's scope.`
      },
      {
        question: `How does ${label} differ from other ${business.city} venues?`,
        answer: `${label} has its own room flow, access path, hotel relationship, service ordering logic, and event fit. That is why the venue stack on this site is written page by page. The useful question is not whether a building sounds impressive; it is how the building changes planning.`
      },
      {
        question: "Do you make blanket union or non-union claims?",
        answer: `${laborPosition} Final labor expectations should always be confirmed with the current event manual, venue operations team, exhibitor kit, and organizer instructions.`
      },
      {
        question: `What should a buyer send first for ${label}?`,
        answer: `The best starting point is the show date, exact venue name, the footprint or room type, the service mix, and any current exhibitor or planner documents already in hand. That makes it easier to map realistic next steps instead of guessing.`
      }
    ];
  }

  return [
    {
      question: `How is ${label} scoped for ${business.city} trade show work?`,
      answer: `${label} is scoped by tying venue conditions, buyer goals, labor timing, graphics, AV, logistics, and show-site leadership into one operating path. The page is meant to help the reader see where ${label} belongs inside the broader project, not to isolate it from the rest of the delivery model.`
    },
    {
      question: `Can this support work at ${relatedVenueName}?`,
      answer: `Yes. ${business.name} uses venue guides and current operating documents to frame the plan around buildings such as ${relatedVenueName}. That matters because the same ${label.toLowerCase()} decision can look very different once access, utilities, room flow, and order paths are taken into account.`
    },
    {
      question: `Why does ${relatedLocationName} matter for this page?`,
      answer: `${relatedLocationName} matters because it affects routing, venue choice, hotel behavior, and how teams move through the wider Central Iowa market. This site uses location references to keep the planning conversation tied to the real region instead of flattening every page into generic metro copy.`
    },
    {
      question: `What makes ${label} relevant for ${demandDriverLabel.toLowerCase()} programs?`,
      answer: `${demandDriverLabel} programs usually need message clarity, venue readiness, timing discipline, and buyer-facing polish at the same time. ${label} is relevant because it changes how those priorities are translated into a workable production path.`
    },
    {
      question: "What information helps move the conversation forward?",
      answer: `Share the venue, show date, service mix, footprint or room type if known, and the business goal behind the program. That is usually enough to identify which venue guides, service pages, and next-step planning decisions should come first.`
    }
  ];
}

export function buildIndexPageContent(section: TaxonomySection): IndexPageContent {
  const collection = getTaxonomyCollection(section);

  return {
    eyebrow: collection.eyebrow,
    title: `${collection.label} for ${business.city} trade show teams`,
    lead: `${business.name} uses a venue-aware, project-led model for ${collection.label.toLowerCase()} across ${clusterSummary()}, and the wider Central Iowa market.`,
    intro: [
      `${collection.label} pages on this site are built from the completed market research, venue research, labor research, and taxonomy planning files in the project root. That means the section follows real Des Moines venue inventory, real nearby markets, and an actual Central Iowa event footprint instead of filler national copy.`,
      `Use this section when the planning conversation has moved beyond generic awareness and into decision making. The goal is to help buyers compare the right ${collection.singularLabel} pages for their venue, event format, booth requirements, logistics path, and show-week priorities.`
    ],
    cards: collection.generatedPages.map((item) => ({
      href: `${collection.routeBase}/${item.slug}`,
      label: item.label,
      description:
        section === "venues"
          ? `${item.label} framed with verified venue facts, current service-path language, and practical setup guidance for Des Moines event teams.`
          : `${item.label} written as a Des Moines-specific planning route tied to venue coordination, logistics, labor posture, and show-site execution.`,
      eyebrow: collection.cardLabel
    })),
    facts: marketHighlights,
    ctaTitle: `Need help narrowing the right ${collection.singularLabel} path?`,
    ctaText:
      "Start with the venue, show date, service mix, and project goals. We can map the cleanest Des Moines delivery path from there."
  };
}

export function buildDetailPageContent(
  section: TaxonomySection,
  slug: string
): DetailPageContent {
  const item = getTaxonomyItem(section, slug);

  if (!item) {
    throw new Error(`No item found for ${section}/${slug}`);
  }

  const context = buildContext(section, slug);
  const intro = buildIntro(context);
  const focusList = buildFocusList(context);
  const sections = buildSections(context);
  const faqs = buildFaqs(context);
  const relatedLinks = pickRelatedRoutes(section, slug);

  const wordCount = countWords(
    [
      intro.join(" "),
      focusList.join(" "),
      sections.flatMap((entry) => [...entry.paragraphs, ...(entry.bullets ?? [])]).join(" "),
      faqs.map((faq) => `${faq.question} ${faq.answer}`).join(" ")
    ].join(" ")
  );

  return {
    eyebrow: getTaxonomyCollection(section).eyebrow,
    title: item.label,
    heroLead:
      section === "venues"
        ? `${item.label} framed for Des Moines venue conditions, current operating guidance, and project-led show-site execution.`
        : `${item.label} is framed here as a Des Moines-specific planning path tied to venue coordination, labor timing, logistics, and show-site control.`,
    intro,
    focusList,
    sections,
    faqs,
    relatedLinks,
    wordCount,
    seoTitle: `${item.label} | ${business.name}`,
    seoDescription: `${business.name} provides Des Moines ${item.label.toLowerCase()} with venue-aware planning, logistics coordination, labor alignment, AV integration, and show-site execution.`,
    ctaTitle: `Need a Des Moines plan for ${item.label.toLowerCase()}?`,
    ctaText:
      "Share the venue, show date, service scope, and project details. We use that brief to map the most workable Des Moines delivery path before show week gets compressed."
  };
}
