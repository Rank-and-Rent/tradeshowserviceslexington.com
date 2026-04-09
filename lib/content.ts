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
      return `${label} sits inside a larger operating chain that includes planning, fabrication, freight, labor, AV, venue coordination, and the final handoff at the floor.`;
    case "locations":
      return `${label} belongs to a real Des Moines routing story with distinct hotel patterns, parking behavior, venue access, and traveler flow rather than a radius-page shortcut.`;
    case "venues":
      return `${label} works as a building-specific environment, where access paths, service orders, loading rules, and room flow shape the job long before the team arrives on site.`;
    case "event-types":
      return `${label} describes a format with its own audience rhythm, sponsor expectations, registration behavior, staging needs, and technical pressure.`;
    case "booth-types":
      return `${label} is a footprint and fabrication decision as much as a design decision, because the room, the aisle, and the install sequence all change the result.`;
    case "industries":
      return `${label} needs copy that reflects the buyer's sector, compliance concerns, and message priorities instead of generic trade-show language.`;
    case "capabilities":
      return `${label} is an execution capability that changes how projects are run, coordinated, and repeated across different venues and dates.`;
    case "rentals":
      return `${label} gives buyers a different balance of cost control, speed, storage, and visual flexibility than a permanent build.`;
    case "exhibit-types":
      return `${label} describes the overall environment the guest experiences, which means the room layout, staffing plan, and live-use pattern all matter.`;
  }
}

function getSectionPressure(section: TaxonomySection, label: string) {
  switch (section) {
    case "services":
      return `${label} loses clarity when it is sold as an isolated line item after the venue, graphics, freight, and labor decisions have already drifted apart.`;
    case "locations":
      return `${label} gets muddy when planners flatten downtown, the west corridor, the east-side fairgrounds cluster, and the north metro into one generic market story.`;
    case "venues":
      return `${label} becomes risky when teams assume the building behaves like the last hall they used instead of following current venue documents and local operating rules.`;
    case "event-types":
      return `${label} starts costing more when the production plan copies a different format instead of matching the actual registration flow, sponsor footprint, and content cadence.`;
    case "booth-types":
      return `${label} slips when the footprint, traffic pattern, rigging needs, and setup sequence are decided too late to influence fabrication and show-services ordering.`;
    case "industries":
      return `${label} loses relevance when it sounds like generic trade show copy rather than a page that understands the buyer's sector and product story.`;
    case "capabilities":
      return `${label} only matters when it changes how the project is actually run, not when it reads like empty agency language.`;
    case "rentals":
      return `${label} gets oversimplified when it is framed as the cheapest option instead of the right balance of speed, flexibility, and reuse.`;
    case "exhibit-types":
      return `${label} underperforms when the environment concept ignores attendee flow, staffing, and the real logistics path behind the room.`;
  }
}

function getSectionOutcome(section: TaxonomySection, label: string) {
  switch (section) {
    case "services":
      return `A strong ${label.toLowerCase()} plan gives the buyer one readable path from kickoff through strike instead of a stack of disconnected vendor notes.`;
    case "locations":
      return `A strong ${label.toLowerCase()} page helps teams understand which nearby venues matter, how routing changes, and what the submarket is actually good for.`;
    case "venues":
      return `A strong ${label.toLowerCase()} page helps teams think through timing, ordering, supervision, and exhibitor coordination before move-in starts.`;
    case "event-types":
      return `A strong ${label.toLowerCase()} plan makes it easier to line up registration, content, sponsor, and guest-flow decisions around one format.`;
    case "booth-types":
      return `A strong ${label.toLowerCase()} plan translates geometry into cleaner production, safer install sequencing, and a better attendee experience.`;
    case "industries":
      return `A strong ${label.toLowerCase()} page sounds like the buyer's market and gives the reader a more credible planning route.`;
    case "capabilities":
      return `A strong ${label.toLowerCase()} page shows how the team keeps multi-venue, multi-vendor work under control without losing pace.`;
    case "rentals":
      return `A strong ${label.toLowerCase()} path balances budget, timeline, storage, and design goals without forcing an all-or-nothing decision.`;
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
    relatedServiceName: relatedServiceItem?.label ?? "turnkey service path",
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
    `Start with the venue, show date, and service mix before the brief spreads into separate design, freight, and labor conversations.`,
    `Keep ${relatedServiceName.toLowerCase()}, labor timing, AV, graphics, and logistics on one calendar that the whole project team can see.`,
    `Check current venue rules, organizer deadlines, utilities, dock timing, and exhibitor paperwork early enough to shape the plan.`,
    `Name the person who owns show-site decisions before move-in so questions do not bounce between vendors once the room is active.`,
    `Think through dismantle, returns, warehousing, and the next stop before the first truck leaves the dock.`
  ];

  if (section === "locations") {
    return [
      `Treat ${label} as a real submarket inside the ${business.city} event system, not just another city page in the footer.`,
      `Use ${relatedVenueName} and nearby hotel inventory to define staffing, freight, arrival timing, and parking assumptions.`,
      `Account for how ${relatedLocationName} connects back to downtown, the west corridor, the east-side fairgrounds cluster, or the airport corridor.`,
      shared[3],
      shared[4]
    ];
  }

  if (section === "venues") {
    return [
      `Approach ${label} as a venue-specific operating environment with its own planning documents, order paths, and access rules.`,
      `Separate venue-controlled services from exhibitor-managed scope before the production plan is locked and materials start moving.`,
      `Use the current guide to confirm access, utilities, IT, rigging, AV, and decorator timing against the room layout.`,
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
      `${label} matters because the ${business.city} market is not one undifferentiated downtown radius. Buyers move between the downtown convention core, the west corridor, the east-side fairgrounds cluster, the north metro, and the airport-adjacent corridor depending on the show, the audience, and the room block. ${sectionAngle} That is why the location stack on this site talks about routing, nearby venues, hotel behavior, and staff movement instead of recycling generic city-copy language.`,
      `${sectionPressure} A useful ${label.toLowerCase()} page connects back to the venue guides and service paths buyers are most likely to use. That is why this page cross-references locations such as ${relatedLocationName}, venue anchors such as ${relatedVenueName}, and delivery layers such as ${relatedServiceName.toLowerCase()} when those links help the reader make a cleaner decision.`,
      `The practical value is simple: once planners understand what ${label.toLowerCase()} is good at, what it sits near, and how it behaves in relation to the rest of the market, they can choose the right route faster and spend less time untangling assumptions later.`
    ];
  }

  if (section === "venues") {
    return [
      `${label} is a venue-specific planning environment, not a blank room with interchangeable rules. ${relatedVenueFact} That affects advance work, service ordering, dock sequencing, AV integration, staffing, and the exhibitor-appointed-contractor conversation long before the team reaches show week.`,
      `${sectionPressure} In ${business.city}, venue choice also changes the entire delivery path. A project that touches ${relatedVenueName} and nearby hotel inventory will not be staffed, routed, and supervised the same way as a suburban conference program, a fairgrounds event, or an airport-corridor meeting.`,
      `This page exists to make that difference visible in plain language so planners can compare the venue with the rest of the market before the schedule gets too tight to absorb surprises.`
    ];
  }

  return [
      `${label} is strongest when it is connected to the real ${business.city} operating path: venue communication, labor timing, graphics, fabrication, AV, logistics, and field leadership moving on the same schedule. ${sectionAngle} That matters in a market where the same buyer can touch downtown convention inventory, west-corridor meetings, east-side fairgrounds work, and airport-adjacent hotels in the same quarter.`,
    `${sectionPressure} The better approach is to treat this page as a planning filter, not a keyword silo. If the buyer is tied to ${demandDriverLabel.toLowerCase()}, venue constraints at ${relatedVenueName}, or routing questions around ${relatedLocationName}, the page helps them understand how ${label.toLowerCase()} fits into a complete project path.`,
    `Readers should leave with a clearer view of the work itself, the local variables that affect it, and the next page or conversation that will move the project forward without wasting time.`
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
        `${label} belongs inside the full Central Iowa event map, not as a disconnected tactic. ${marketResearch.market.serviceRadiusStrategy} That regional shape matters because downtown convention work, west-corridor corporate meetings, east-side event programs, and north-metro conference calendars do not all create the same operational pressure.`,
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
        `${laborPosition} That public positioning matters because the ${business.city} market is mixed and venue-directed. ${laborFinding} When the copy on this site references labor, utilities, IT, rigging, AV, or decorator flow, the point is to help buyers think more clearly about venue behavior without promising conditions that the current show manual may not support.`,
        `${relatedVenueName} is especially relevant here because it is tied to ${relatedVenueFit}. ${relatedVenueFact} Details like that change how teams schedule advance work, decide on pre-build versus on-site assembly, choose the right freight path, and protect enough time for final checks before the event opens.`,
        `${relatedLocationName} matters for routing as well. ${relatedLocationReason} That practical location logic affects staff movement, hotel blocks, truck access, rehearsal schedules, and the buffer needed between meeting rooms, exhibit floors, hospitality programs, and strike.`
      ]
    },
    {
      heading: "How the scope is structured before move-in",
      paragraphs: [
        `The safest path is to translate ${label.toLowerCase()} into a schedule early. That means confirming the brief, reviewing current venue information, mapping graphics and fabrication milestones, ordering show services, lining up labor and technical needs, and deciding who is responsible for field leadership once the room starts changing. ${relatedServiceName} often becomes the connective layer because it forces those decisions into one operating plan instead of leaving them across separate inboxes.`,
        `That sequencing is especially important when the project connects to ${demandDriverLabel.toLowerCase()} or other buyer groups that expect strong brand control and predictable execution. Buyers do not experience the project as separate departments. They experience one booth, one registration environment, one event floor, or one sponsor activation.`,
        `The plan behind the scenes should feel just as coordinated as the environment they see live, and that only happens when the team treats the schedule as a single chain rather than a series of handoffs.`
      ]
    },
    {
      heading: "Show-week control and field leadership",
      paragraphs: [
        `No matter how strong the pre-show brief is, ${label.toLowerCase()} still needs a clean decision path once the team is onsite. That means naming who answers venue questions, who owns the production calendar, who manages labor and AV handoffs, and who closes punch-list items without letting them bounce across vendors.`,
        `In ${business.city}, that show-week control also has to account for how venues are distributed across the market. A downtown convention-center project can overlap with west-corridor hotel meetings, fairgrounds work on the east side, or north-metro conference activity. That is one reason this site does not treat location, venue, and service pages as separate silos.`,
        `The output should feel calmer, not louder. Strong field control is not about making a bigger promise. It is about reducing confusion, protecting timing, and making sure that every last-minute choice still respects the venue guide, the labor posture, and the broader project path established before move-in.`
      ]
    },
    {
      heading: "Budget, logistics, and repeatability",
      paragraphs: [
        `${label} is also a budget and repeatability question. Buyers usually want to know whether the plan is helping them control cost, shorten lead time, improve reuse, protect visual quality, or make the next show easier to absorb. Those are valid questions, but they should be answered in a way that still respects venue behavior and the actual route between fabrication, storage, freight, install, live days, and returns.`,
        `That is where ${business.city}'s market shape matters again. Downtown programs, west-corridor conferences, fairgrounds events, and north-metro meetings create different financial pressures even when the brand objective sounds similar. Freight windows, labor posture, hotel density, and venue-managed services all change the path.`,
        `Repeatability matters because a strong project often starts with one show and expands into multiple cities, repeat annual events, or a broader regional program. When ${label.toLowerCase()} is planned correctly the first time, it becomes easier to scale, easier to brief internally, and easier to adapt when the venue, footprint, or supporting services change.`
      ]
    },
    {
      heading: `Why this ${context.collectionLabel.toLowerCase()} page is distinct`,
      paragraphs: [
        `This page is not meant to duplicate the other ${context.collectionLabel.toLowerCase()} routes on the site. It exists because ${label.toLowerCase()} creates a distinct decision point for the buyer. The nearby pages may talk about adjacent venues, services, locations, or formats, but this route focuses on the specific planning question created by ${label.toLowerCase()} inside the ${business.city} market.`,
        `That distinction is also why the page links outward. A buyer who arrives here may actually need ${relatedServiceName.toLowerCase()}, may need the venue guide for ${relatedVenueName}, or may need to understand how ${relatedLocationName} fits inside the wider ${relatedLocationRegion} region. Internal linking is used here to help the buyer navigate those real next steps, not just to create artificial SEO pathways.`,
        `The broader goal is clarity. If this page helps the reader understand how ${label.toLowerCase()} fits the market, what still needs confirmation, and which adjacent pages will move the planning conversation forward, then it is doing the work it is meant to do.`
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
        answer: `No. ${business.name} treats ${label} as one part of a wider Central Iowa operating radius that includes the downtown convention core, the west corridor, the north metro, the east-side fairgrounds cluster, and the airport-adjacent corridor. The point of this page is to explain how ${label} behaves inside that larger market, not to pretend it operates in isolation.`
      },
      {
        question: `Why does ${label} deserve its own planning page?`,
        answer: `${label} changes routing, nearby venue options, staffing assumptions, hotel behavior, and how buyers move between meetings, exhibit floors, and hospitality events. A useful location page explains those differences instead of repeating the same metro-wide paragraph on every route.`
      },
      {
        question: "How should labor expectations be described publicly?",
        answer: laborPosition
      },
      {
        question: `Can a project start in ${label} and extend into nearby markets?`,
        answer: `Yes. That is common in the Bluegrass region market. The important part is keeping one readable schedule for freight, venue communication, labor, AV, graphics, and dismantle so the move between ${label} and nearby venues does not create duplicated effort or missed handoffs.`
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
      answer: `${relatedLocationName} matters because it affects routing, venue choice, hotel behavior, and how teams move through the wider Bluegrass region market. This site uses location references to keep the planning conversation tied to the real region instead of flattening every page into generic metro copy.`
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
  const sectionLead = (() => {
    switch (section) {
      case "services":
        return `Use this section to compare the service layers that keep a Des Moines exhibit program moving: design, fabrication, freight, labor, AV, and show-site leadership.`;
      case "locations":
        return `Use this section to compare the Des Moines submarkets that actually change planning decisions: downtown, the west corridor, the east-side fairgrounds cluster, the north metro, and the airport corridor.`;
      case "venues":
        return `Use this section to compare venue-specific planning paths across downtown halls, suburban conference centers, hotels, and fairgrounds buildings with different operating rules.`;
      case "event-types":
        return `Use this section to compare the event formats that change attendee flow, sponsor expectations, and technical requirements in different ways.`;
      case "booth-types":
        return `Use this section to compare booth formats by footprint, sightlines, fabrication pressure, and install complexity so the room and the booth work together.`;
      case "industries":
        return `Use this section to compare planning routes by buyer sector so the copy, the pacing, and the project assumptions fit the audience instead of sounding generic.`;
      case "capabilities":
        return `Use this section to compare the execution capabilities that make recurring exhibit and event work easier to run, repeat, and scale.`;
      case "rentals":
        return `Use this section to compare rental paths that balance budget control, speed, and visual quality without forcing every project into the same ownership model.`;
      case "exhibit-types":
        return `Use this section to compare exhibit environments by how they behave in the room, on the floor, and during live guest use.`;
    }
  })();

  return {
    eyebrow: collection.eyebrow,
    title: `${collection.label} for ${business.city} trade show teams`,
    lead: `${business.name} uses a venue-aware, project-led model for ${collection.label.toLowerCase()} across ${clusterSummary()} and the wider Central Iowa market.`,
    intro: [
      `${sectionLead} The copy on these pages is built from the market research, venue research, labor research, and taxonomy planning files in the project root, so the section follows real Des Moines venue inventory, real nearby markets, and an actual Central Iowa event footprint instead of filler national copy.`,
      `Use this section when the planning conversation has moved beyond broad awareness and into decision making. The goal is to help buyers compare the right ${collection.singularLabel} pages for their venue, event format, booth requirements, logistics path, and show-week priorities.`,
      `Each card points to a more specific route, but the section as a whole is meant to answer a bigger question: which part of the market matters most for this project, and what does that choice change once the room, the schedule, and the people involved are real?`,
      `That is what turns a directory page into a useful planning tool. The reader can move from the market overview into the route that matches the exact venue, format, service stack, or buyer profile they are working through.`
    ],
    cards: collection.generatedPages.map((item) => ({
      href: `${collection.routeBase}/${item.slug}`,
      label: item.label,
      description:
        section === "venues"
          ? `${item.label} pulls verified venue facts into one planning route so teams can think through access, services, and room behavior together.`
          : section === "locations"
            ? `${item.label} shows how that part of Des Moines changes routing, hotel behavior, nearby venues, and the delivery path on the ground.`
            : section === "services"
              ? `${item.label} describes the role this service plays in the larger production chain, from early planning through live execution.`
              : `${item.label} connects the format or audience to the practical planning details that shape production, timing, and show-week decisions.`,
      eyebrow: collection.cardLabel
    })),
    facts: marketHighlights,
    ctaTitle: `Need help narrowing the right ${collection.singularLabel} path?`,
    ctaText:
      "Start with the venue, show date, service mix, and project goals. From there, the route usually becomes clear quickly, and the planning team can work with a cleaner brief."
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
        ? `${item.label} is framed for Des Moines venue conditions, current operating guidance, and project-led show-site execution.`
        : `${item.label} is framed here as a Des Moines-specific planning path tied to venue coordination, labor timing, logistics, and show-site control.`,
    intro,
    focusList,
    sections,
    faqs,
    relatedLinks,
    wordCount,
    seoTitle: `${item.label} | ${business.name}`,
    seoDescription: `${business.name} provides Lexington ${item.label.toLowerCase()} with venue-aware planning, logistics coordination, labor alignment, AV integration, and show-site execution.`,
    ctaTitle: `Need a Lexington plan for ${item.label.toLowerCase()}?`,
    ctaText:
      "Share the venue, show date, service scope, and project details. We use that brief to map the most workable Lexington delivery path before show week gets compressed."
  };
}
