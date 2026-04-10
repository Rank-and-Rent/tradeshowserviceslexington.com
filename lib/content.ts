import {
  business,
  getTaxonomyCollection,
  getTaxonomyItem,
  getVenueBySlug,
  marketHighlights,
  pickRelatedRoutes,
  type RouteLink,
  type TaxonomySection,
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

export type PageCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  linkRows: { href: string; label: string }[];
};

const CITY = business.city.toUpperCase();
const CITY_STATE = `${business.city.toUpperCase()}, ${business.state.toUpperCase()}`;

function getLocalContext(): string[] {
  switch (business.city) {
    case "Savannah":
      return ["DOWNTOWN SAVANNAH", "THE RIVERFRONT", "THE AIRPORT-WEST CORRIDOR", "I-95"];
    case "Philadelphia":
      return ["CENTER CITY", "UNIVERSITY CITY", "PENN'S LANDING", "OAKS", "KING OF PRUSSIA"];
    case "Lexington":
      return ["DOWNTOWN LEXINGTON", "NEWTOWN PIKE", "KEENELAND", "THE BLUEGRASS PARKWAY", "DOWNTOWN HOTEL CORRIDOR"];
    case "Columbia":
      return ["DOWNTOWN COLUMBIA", "HARBISON", "FOREST ACRES", "IRMO", "WEST COLUMBIA", "I-26"];
    default:
      return [CITY];
  }
}

const localContext = getLocalContext();

function getPrimaryRouteRows(): { href: string; label: string }[] {
  switch (business.city) {
    case "Savannah":
      return [
        { href: "/services/installation-and-dismantle", label: "INSTALLATION AND DISMANTLE" },
        { href: "/venues/savannah-convention-center", label: "SAVANNAH CONVENTION CENTER" },
        { href: "/locations/savannah", label: "SAVANNAH" },
        { href: "/contact", label: "START A PROJECT BRIEF" },
      ];
    case "Philadelphia":
      return [
        { href: "/services/installation-and-dismantle", label: "INSTALLATION AND DISMANTLE" },
        { href: "/venues/pennsylvania-convention-center", label: "PENNSYLVANIA CONVENTION CENTER" },
        { href: "/locations/philadelphia", label: "PHILADELPHIA" },
        { href: "/contact", label: "START A PROJECT BRIEF" },
      ];
    case "Lexington":
      return [
        { href: "/services/installation-and-dismantle", label: "INSTALLATION AND DISMANTLE" },
        { href: "/venues/central-bank-center", label: "CENTRAL BANK CENTER" },
        { href: "/locations/lexington", label: "LEXINGTON" },
        { href: "/contact", label: "START A PROJECT BRIEF" },
      ];
    case "Columbia":
      return [
        { href: "/services/installation-and-dismantle", label: "INSTALLATION AND DISMANTLE" },
        { href: "/venues/columbia-metropolitan-convention-center", label: "COLUMBIA METROPOLITAN CONVENTION CENTER" },
        { href: "/locations/columbia", label: "COLUMBIA" },
        { href: "/contact", label: "START A PROJECT BRIEF" },
      ];
    default:
      return [
        { href: "/services/installation-and-dismantle", label: "INSTALLATION AND DISMANTLE" },
        { href: "/contact", label: "START A PROJECT BRIEF" },
      ];
  }
}

const primaryRouteRows = getPrimaryRouteRows();

export const contentInternalRoutes = [
  "/services/trade-show-management",
] as const;

export const aboutPageCopy: PageCopy = {
  eyebrow: "About",
  title: `Project-led trade show delivery for ${CITY} and the surrounding metro`,
  lead: `${business.name} keeps booth planning, labor, freight, graphics, AV, and show-site supervision on one track so the work stays calm when the schedule gets tight.`,
  paragraphs: [
    `${business.name} is organized around the practical work that keeps an exhibit program steady in ${CITY}: venue approvals, freight timing, labor windows, graphics production, AV planning, and the sequence that keeps the build from drifting once the calendar tightens.`,
    `In ${CITY}, the difference between a polished show and a messy one is rarely the render. The real difference is whether the schedule survives load-in, the dock, the vendor handoffs, and the field decisions that have to be made when the room is already active.`,
    `The surrounding area matters because ${localContext[0]}, ${localContext[1]}, and ${localContext[2]} can change the way crews move, the way trucks arrive, and the amount of buffer a project needs before doors open.`,
    `Projects stay cleaner when booth format, labor, freight, storage, reuse, and closeout are treated as one sequence. ${business.name} keeps those pieces connected so the event does not become a stack of separate tasks with no clear owner.`,
    `Clients in ${CITY} usually need to compare custom builds, rentals, modular systems, and support-only scopes without losing the operational details that decide the outcome. The best answer is the one that fits the venue, the date, and the team that will actually be on the floor.`,
    `${business.name} keeps that comparison grounded in event reality. The brief starts with the building, the deadline, and the live objectives, then moves to the scope only after the constraints are visible and the work can be measured against them.`,
    `That approach matters because the best event work is rarely just creative or just logistical. It is a combination of labor planning, material handling, graphics, AV, and field supervision that has to hold together once crates are opened and people are moving through the room.`,
    `It also matters because ${CITY} can produce different operating conditions from one district to another. Event work here is shaped by the historic core, the hotel pattern, airport access, and the way traffic compresses freight windows before show morning.`,
    `When the project gets bigger, the coordination challenge grows with it. Multiple stakeholders often need the same information in different forms, and the plan works best when the venue, the schedule, and the scope are all written clearly enough to survive that handoff.`,
    `That is why the service guides, location guides, venue notes, and event-format notes stay connected. They give the team a way to move from a broad idea to a workable plan without losing sight of freight, installation, dismantle, utility requests, staffing, or deadline pressure.`,
    `The outcome is a program that feels controlled instead of improvised. The booth gets built to match the room, the logistics line stays readable, and the show-site crew knows which decisions belong to them before the floor gets busy.`,
    `Good trade show support should make the next step easier, not harder. For that reason, the business voice stays direct: define the venue, define the schedule, define the scope, and then build the program around those facts.`,
  ],
  linkRows: primaryRouteRows,
};

export const contactPageCopy: PageCopy = {
  eyebrow: "Contact",
  title: `Start the project brief in ${CITY}`,
  lead: `Share the venue, date, service mix, and any unresolved decisions so the next step can be built around the actual show conditions.`,
  paragraphs: [
    `Use the contact brief to name the date, venue, service mix, and the parts of the project that are still unresolved. The more exact the note, the easier it is to sort the work into the right labor, freight, and show-site plan.`,
    `If the job touches ${CITY} venues or nearby support corridors, say that directly so the schedule can account for dock timing, travel time, and local rules that affect the floor.`,
    `The best briefs usually include the booth footprint, the audience mix, the deadline pressure, and whether the work needs custom fabrication, rental support, graphics, AV, or a combined scope.`,
    `If the venue is still open, include the likely building or district. A downtown convention build, a hotel ballroom, and a regional meeting venue all ask for different sequencing, even when the brand story stays the same.`,
    `If the project is repeat business, mention what changed from the last cycle. If it is a new program, mention what has to be proven from scratch. Those details change the timing more than a generic label does.`,
    `Include any approval steps, internal review cycles, or executive sign-off that might slow the handoff. A clean brief saves time because it allows the next reply to focus on what the event actually needs instead of guessing at the missing pieces.`,
    `If the program touches the convention center, a riverfront hotel, a resort venue, or a coastal meeting corridor, say that up front so the operating plan can match freight timing and labor posture.`,
    `The form is there to collect the facts that change the plan: location, scale, timing, and the pressure points that can shape the live event. When those facts are clear, the next conversation can be specific and useful.`,
    `That is the fastest way to move from inquiry to a workable scope. It keeps the project grounded, makes the response more practical, and prevents the work from getting buried in vague language.`,
    `Whether the event needs a booth build, labor-only support, AV help, logistics coordination, or a full turnkey path, the first step is the same: describe the job as clearly as possible so the schedule can be built around it.`,
  ],
  linkRows: primaryRouteRows,
};

export const blogPageCopy: PageCopy = {
  eyebrow: "Planning Notes",
  title: `Trade show planning notes for ${CITY}`,
  lead: `Use the resource notes to compare venue behavior, event format, and booth choices before the scope hardens.`,
  paragraphs: [
    `Planning is easiest when the venue, the freight window, and the hotel pattern are treated as one problem instead of three separate ones. The notes below focus on the decisions that tend to shape the work before a crate ever reaches the dock.`,
    `Planning notes are most useful when they deal with the real operating questions: what venue is involved, how freight moves, what labor is required, what has to be approved, and how the show schedule will actually behave once the room goes live.`,
    `That is why the guidance stays close to venue rules, event formats, booth choices, and the local geography that shapes the work in ${CITY}. The goal is to narrow the decision, not to add more noise to the brief.`,
    `Buyers often move between a venue question, a scope question, and a budget question all at once. The best way to handle that is to separate the issues long enough to see which one is actually driving the choice.`,
    `If the building is already set, the venue guide is the right place to start. If the event format is still moving, the format notes are more useful. If the booth shape is the sticking point, the format and rental comparisons help make the decision concrete.`,
    `In ${CITY}, this matters because districts and venue types do not behave the same way. ${localContext[0]}, ${localContext[1]}, ${localContext[2]}, and ${localContext[3]} influence freight timing, hotel pattern, and the amount of help a live floor needs.`,
    `Good planning material does not sound like a lecture. It sounds like the short list of things a project manager would want to know before a truck rolls or a crate gets opened.`,
    `That is what the linked guidance is written to do. It frames the work around venue rules, freight timing, staffing, graphics, AV, storage, and show-site supervision so the event can be run with less guesswork.`,
    `If a project needs a quick path to decision, the best move is to start with the guidance that matches the most urgent constraint. That usually reveals the rest of the scope fast enough to keep the project on schedule.`,
    `The result is a planning stack that is useful to marketers, operations teams, and event leads without turning the information into filler. It gives the next step enough shape to be useful and enough detail to be trusted.`,
  ],
  linkRows: [
    { href: "/venues", label: "VENUES" },
    { href: "/event-types", label: "EVENT TYPES" },
    { href: "/booth-types", label: "BOOTH TYPES" },
    { href: "/contact", label: "CONTACT" },
  ],
};

export function buildIndexPageContent(section: TaxonomySection): IndexPageContent {
  const collection = getTaxonomyCollection(section);
  const intro = [
    `${collection.label.toUpperCase()} in ${CITY_STATE} starts with the venue, the schedule, and the team that owns the field decisions.`,
    `The project stays easier to manage when freight, labor, graphics, AV, and install timing are all written into the same plan.`,
    `That matters in ${CITY} because the working geometry changes between ${localContext[0]}, ${localContext[1]}, and ${localContext[2]}.`,
    `The guides below separate the different planning questions so the brief can move from broad to specific without losing control of the scope.`,
    `A good choice is the one that fits the venue, the date, and the way the floor has to behave once the event is live.`,
    `When the work repeats across shows or cities, storage, reuse, and the closeout plan matter as much as the first install.`,
    `The intent is to give the buyer a practical way to compare options without relying on generic marketing language.`,
    `The result is a more usable path from first question to final quote.`,
    `That path matters because show teams need the next step to be obvious before the schedule gets crowded.`,
    `Each guide shows how the venue, the planning path, and the execution choices connect in practice.`,
  ];

  const cards: IndexCard[] = collection.generatedPages.slice(0, 8).map((page) => ({
    href: `${collection.routeBase}/${page.slug}`,
    label: page.label.toUpperCase(),
    description: `${page.label.toUpperCase()} in ${CITY} tied to venue timing, labor planning, freight, graphics, AV, storage, and a clean show-site sequence that keeps the work moving without unnecessary rework.`,
    eyebrow: collection.label.toUpperCase(),
  }));

  return {
    eyebrow: collection.heroLabel.toUpperCase(),
    title: `${collection.label} for ${CITY} show teams`,
    lead: `${collection.label.toUpperCase()} planning in ${CITY} works best when the venue, the schedule, freight timing, labor, and the live event goal are written together before anything moves forward.`,
    intro,
    cards,
    facts: marketHighlights,
    ctaTitle: `Talk through the ${collection.label.toLowerCase()} scope`,
    ctaText: `Use the contact brief to pin down the venue, the deadline, and the operating path so the project can move from question to schedule.`,
  };
}

export function buildDetailPageContent(section: TaxonomySection, slug: string): DetailPageContent {
  const collection = getTaxonomyCollection(section);
  const item = getTaxonomyItem(section, slug);
  if (!item) {
    throw new Error(`No ${section} item found for slug "${slug}"`);
  }

  const label = item.label.toUpperCase();
  const relatedLinks = pickRelatedRoutes(section, slug).slice(0, 6);
  const venue = getVenueBySlug(slug);

  const intro = [
    `${label} in ${CITY} works best when the project starts with the venue, the show date, and the specific outcome the floor has to deliver.`,
    `That means the scope has to cover freight timing, labor planning, graphics production, AV, power, closeout, and the field chain that keeps the work moving once people are on site.`,
    `The local context matters because ${CITY} programs can move through ${localContext[0]} and ${localContext[1]} very differently from one stop to the next.`,
    `A useful guide has to do more than define the work. It has to show how the decision affects install, staffing, approvals, and the final result on the floor.`,
  ];

  const focusList = [
    `Keep ${label} tied to the actual show outcome, not to a vague label.`,
    `Confirm the venue manual, freight timing, and access plan before labor is scheduled.`,
    `Line up graphics, AV, and utility requests against the same calendar as the build.`,
    `Protect storage, reuse, and return freight so the next cycle starts cleanly.`,
    `Assign one field lead so live decisions stay controlled during install and strike.`,
  ];

  let sections: ContentSection[] = [];

  switch (section) {
    case "services":
      sections = [
        {
          heading: "Scope and execution path",
          paragraphs: [
            `${label} only works when the plan is written like an operating brief. The brief should show who owns the venue call, who owns the production sequence, who owns freight, and who needs to approve the final layout before the floor opens.`,
            `The reason is simple: once the project is live, the room gets crowded quickly. People need one clear path for decisions, one clear path for changes, and one clear path for the kind of support that keeps the event moving without unnecessary noise.`,
          ],
        },
        {
          heading: "Venue timing and approvals",
          paragraphs: [
            `Venue approvals shape the project long before the first crate arrives. That includes contractor access, dock timing, service ordering, utility placement, and any special instructions that affect the show floor or the move-in schedule.`,
            `When those details are written down early, the team can work faster later because there is no need to stop and re-derive the plan at the dock. That is especially important in ${CITY} where the calendar can crowd quickly.`,
          ],
        },
        {
          heading: "Freight, labor, and install",
          paragraphs: [
            `Freight and labor are the backbone of the job. The display, the structure, the graphics, the power, and the on-site supervision have to arrive in the right order or the floor loses its rhythm.`,
            `A clean install sequence protects the finish of the booth and the confidence of the client. It keeps the room from turning into a series of reactive fixes and makes the build look intentional from the first handoff to the final touch-up.`,
          ],
        },
        {
          heading: "Graphics, AV, and power",
          paragraphs: [
            `Graphics and AV should never be an afterthought. They belong in the same planning path as the booth itself because they affect layout, power, sightlines, and the way the attendee reads the space.`,
            `When the technical layer is planned early, the final environment feels more complete and the floor team has fewer surprises once the equipment is staged and the show is close to opening.`,
          ],
        },
        {
          heading: "Storage, reuse, and closeout",
          paragraphs: [
            `The closeout matters because it sets up the next show. Assets have to be packed, labeled, returned, stored, or refurbished in a way that keeps them usable without forcing the team to rebuild the process from scratch.`,
            `Reuse is where the budget gets smarter over time. A booth that can travel, be repaired, and be reconfigured is often more valuable than one that only looks good in a single moment and then becomes expensive to manage later.`,
          ],
        },
        {
          heading: "Stakeholder coordination and outcomes",
          paragraphs: [
            `A strong project keeps marketing, operations, executives, and field leadership pointed in the same direction. That reduces the back-and-forth that usually slows live event work and makes the final result easier to defend internally.`,
            `The outcome should be visible in the room itself: a cleaner build, a steadier show day, a better closeout, and fewer gaps between the plan on paper and the event on the floor.`,
          ],
          bullets: [
            `One owner for the schedule.`,
            `One owner for the venue communication.`,
            `One owner for the floor once the show is live.`,
          ],
        },
      ];
      break;
    case "locations":
      sections = [
        {
          heading: "District behavior",
          paragraphs: [
            `${label} works best when the arrival path, the parking pattern, the venue, and the hotel inventory are treated as one operating system instead of isolated pieces of the map.`,
            `That is because crew movement, freight arrival, and guest flow all respond to the same local conditions once the event is live.`,
          ],
        },
        {
          heading: "Travel and freight",
          paragraphs: [
            `Travel time changes how early labor has to be scheduled and how much buffer the team needs before move-in starts. The goal is not to overbuild the plan. The goal is to leave enough room for the real path to work.`,
            `If the location is close to the venue, the advantage is speed. If it is farther out, the advantage may be flexibility or lower cost. Either way, the plan has to account for the move itself, not just the destination.`,
          ],
        },
        {
          heading: "Hotel and venue mix",
          paragraphs: [
            `Some locations are useful because they sit near a hotel block, a convention hall, a waterfront meeting zone, or a suburban campus that can support the project from start to finish.`,
            `The right location guide shows how those pieces fit together so the brief can be written around the operating reality instead of a generic city label.`,
          ],
        },
        {
          heading: "Show-day practicality",
          paragraphs: [
            `The best locations are the ones that let the team keep the work predictable. That means clear arrival paths, a sensible staging plan, and enough room for people to move without collisions or wasted steps.`,
            `Predictability matters because it lowers the chance that a good design gets undermined by poor logistics once the show starts.`,
          ],
        },
        {
          heading: "Reuse across stops",
          paragraphs: [
            `If the schedule includes more than one city or venue, location planning becomes a reuse problem as much as a travel problem. The project should be easy to brief again without rebuilding the logic every time.`,
            `That is where storage, labeling, and closeout discipline pay off. They make the next stop easier to launch and keep the work from becoming a pile of one-off decisions.`,
          ],
        },
        {
          heading: "Outcome and control",
          paragraphs: [
            `The goal is to make the location guide useful before the schedule hardens. When the team can see the arrival path, the venue mix, and the support zone clearly, the project becomes easier to trust.`,
            `That trust shows up later as fewer surprises, cleaner handoffs, and a more controlled floor.`,
          ],
          bullets: [
            `One arrival plan.`,
            `One freight plan.`,
            `One venue decision.`,
          ],
        },
      ];
      break;
    case "venues":
      sections = [
        {
          heading: "Building-specific planning",
          paragraphs: [
            `Every venue has its own rhythm. Dock access, elevator timing, ceiling heights, contractor rules, and room flow all shape the plan long before the first piece of freight is unloaded.`,
            `That is why the venue guide has to start with the building itself. The booth and the staffing plan have to fit the room the venue actually gives the team.`,
          ],
        },
        {
          heading: "Manuals and approvals",
          paragraphs: [
            `The current venue manual should be treated as live project input, not as background reading. It decides what can be brought in, what needs to be ordered, and what needs to be checked before move-in starts.`,
            `When the manual, the work order, and the production calendar line up, the team can focus on the build instead of wrestling the paperwork at the dock.`,
          ],
        },
        {
          heading: "Labor and contractor path",
          paragraphs: [
            `Venue work runs more smoothly when the labor structure and the contractor path are set early. That includes who is on the floor, who is allowed to do what, and who makes calls when the event changes in real time.`,
            `A clear chain of responsibility keeps the show calm because the team does not waste time figuring out who owns the next move.`,
          ],
        },
        {
          heading: "Power, rigging, and utilities",
          paragraphs: [
            `Technical work has to be planned against the venue's actual limits. Power drops, rigging points, and utility requests all affect the layout and the sequence in which the booth can be built.`,
            `The sooner those details are confirmed, the less likely the team is to discover a conflict when the schedule is already compressed.`,
          ],
        },
        {
          heading: "Strike and closeout",
          paragraphs: [
            `Dismantle should be part of the venue plan from the start. The room has to be left in the right condition, freight has to leave in the right order, and the assets have to be tracked as they move out.`,
            `That closeout discipline protects the next event as much as the current one because it keeps the reusable pieces in good shape.`,
          ],
        },
        {
          heading: "Decision value",
          paragraphs: [
            `A good venue guide gives the buyer enough clarity to know whether the building fits the brief. If the room, the access pattern, and the support structure all align, the project can move forward with less friction.`,
            `If they do not align, the team can adjust early instead of discovering the mismatch on the floor.`,
          ],
          bullets: [
            `Check the manual first.`,
            `Confirm access before freight.`,
            `Plan strike before opening.`,
          ],
        },
      ];
      break;
    case "event-types":
      sections = [
        {
          heading: "Format drives the sequence",
          paragraphs: [
            `The event format changes how the room has to work. A conference, an expo, a launch, and a sponsor activation all create different pacing, staffing, and technical demands.`,
            `That means the brief should say what kind of event is being built before it starts describing the booth or the venue.`,
          ],
        },
        {
          heading: "Attendee flow and room behavior",
          paragraphs: [
            `The audience path determines where graphics matter, where hospitality belongs, and how much space the team has for conversation, demo, or stage work.`,
            `When that flow is visible early, the event is easier to design and easier to run because the room behaves the way the team expected.`,
          ],
        },
        {
          heading: "Sponsor and content requirements",
          paragraphs: [
            `Many event formats carry sponsor obligations, content timing, or technical checkpoints that change the order of the day. Those factors belong in the planning conversation from the start.`,
            `They shape the live schedule and often decide whether the project feels organized or reactive once the event begins.`,
          ],
        },
        {
          heading: "Staffing and supervision",
          paragraphs: [
            `The staff model should match the format. A small meeting does not need the same supervision structure as a larger expo floor, but both still need a clear owner for the live day.`,
            `When staffing is tied to the format, the project becomes easier to control and easier to explain to the client.`,
          ],
        },
        {
          heading: "Equipment and timing",
          paragraphs: [
            `AV, registration, utilities, and signage all change with the format. The team has to know which pieces matter most and when each one has to be ready.`,
            `That makes the format guide useful not just for description but for actual production planning.`,
          ],
        },
        {
          heading: "Outcome",
          paragraphs: [
            `The right format guide helps the buyer decide what the event is trying to accomplish and what kind of support it needs to do that well.`,
            `It turns a broad event label into a practical plan for the floor.`,
          ],
          bullets: [
            `Write the format first.`,
            `Set the staffing second.`,
            `Lock the timing last.`,
          ],
        },
      ];
      break;
    case "booth-types":
      sections = [
        {
          heading: "Footprint and circulation",
          paragraphs: [
            `Booth type changes the way attendees move. Inline, peninsula, island, and modular layouts each create different sightlines, circulation patterns, and storage needs.`,
            `The plan works better when the footprint is decided with the traffic pattern in mind instead of as a purely visual choice.`,
          ],
        },
        {
          heading: "Structural decisions",
          paragraphs: [
            `The booth structure should fit the show, the freight, and the team that has to set it up. Heavy custom work is not always the right answer, and a lighter modular plan is not automatically a compromise.`,
            `The best choice is the one that supports the event without creating unnecessary weight or complexity.`,
          ],
        },
        {
          heading: "Graphics and message clarity",
          paragraphs: [
            `Graphics have to work at distance and at speed. The attendee may only have a few seconds to read the message, so the booth type should support the message rather than compete with it.`,
            `When graphics, lighting, and structure are planned together, the booth feels more coherent and easier to trust.`,
          ],
        },
        {
          heading: "Install and dismantle",
          paragraphs: [
            `The booth type affects install timing, equipment load, and the size of the crew needed on the floor. It also affects how quickly the project can be broken down and returned to storage.`,
            `That is why the format choice should reflect the live schedule as much as the design concept.`,
          ],
        },
        {
          heading: "Reuse and flexibility",
          paragraphs: [
            `Reusable booth types make later shows easier to brief because the system already has a working structure. That can lower cost, reduce risk, and shorten the lead time on future events.`,
            `Flexibility matters when the same brand needs to show up in different cities with different footprints but the same overall standard.`,
          ],
        },
        {
          heading: "Decision value",
          paragraphs: [
            `A booth-type guide should help the buyer decide how the space needs to behave and what trade-offs are worth making. That is what turns the format from a catalog label into a real planning tool.`,
            `The right format is the one that supports the event outcome, the budget, and the logistics line at the same time.`,
          ],
          bullets: [
            `Choose the traffic pattern first.`,
            `Match the structure to the freight.`,
            `Make graphics support the message.`,
          ],
        },
      ];
      break;
    case "industries":
      sections = [
        {
          heading: "Sector-specific needs",
          paragraphs: [
            `Different industries bring different pressure points to the booth. Some need more compliance review, some need stronger demo space, and some need tighter executive messaging.`,
            `The guide should reflect those differences so the buyer can see how the scope changes with the audience.`,
          ],
        },
        {
          heading: "Audience and buying behavior",
          paragraphs: [
            `The industry lens helps the team understand what the attendee expects to see, hear, and experience on the floor. That shapes the booth, the staffing, and the content path.`,
            `When the message is aligned with the buyer behavior, the event becomes easier to run and easier to measure.`,
          ],
        },
        {
          heading: "Demo and staffing needs",
          paragraphs: [
            `Some sectors need product demos, hands-on interaction, or technical support that changes the way labor has to be scheduled. Others need quiet conversation space and a sharper executive narrative.`,
            `The industry guide should make those needs visible before the project is scoped.`,
          ],
        },
        {
          heading: "Message control",
          paragraphs: [
            `The booth has to carry the message cleanly, especially when the attendee is comparing multiple vendors in a short amount of time. Graphics, space, and lighting all matter here.`,
            `Industry planning is about making the message easier to absorb while keeping the show-floor mechanics under control.`,
          ],
        },
        {
          heading: "Operational fit",
          paragraphs: [
            `The operational question is always the same: what does this industry need from the floor, and what does that mean for the venue and the schedule?`,
            `Once the answer is visible, the project gets easier to plan.`,
          ],
        },
        {
          heading: "Outcome",
          paragraphs: [
            `A good industry guide helps the buyer see whether the planned event style fits the way the sector actually buys, evaluates, and uses the space.`,
            `That makes the next brief much stronger.`,
          ],
          bullets: [
            `Set the audience first.`,
            `Match the demo needs.`,
            `Keep the message readable.`,
          ],
        },
      ];
      break;
    case "capabilities":
      sections = [
        {
          heading: "Execution skill, not buzzword",
          paragraphs: [
            `A capability is useful only when it changes how a project gets delivered. The work has to affect planning, staffing, vendor coordination, or field control in a real way.`,
            `That is why the guide should explain what the team can actually manage instead of just naming a service area.`,
          ],
        },
        {
          heading: "Cross-team coordination",
          paragraphs: [
            `Capabilities matter when multiple groups need to move together. The better the handoff between planning, graphics, logistics, and show-site leadership, the cleaner the event becomes.`,
            `The capability guide should show that thread plainly.`,
          ],
        },
        {
          heading: "Planning control",
          paragraphs: [
            `Many clients are buying control as much as they are buying labor. They want the schedule, the venue communication, and the field decisions to stay organized.`,
            `That is the real value of a strong execution capability.`,
          ],
        },
        {
          heading: "Reuse and scale",
          paragraphs: [
            `A capability also matters when the work has to scale across multiple venues or multiple dates. The more repeatable the system, the easier it is to trust.`,
            `That is where good process beats improvisation.`,
          ],
        },
        {
          heading: "Risk control",
          paragraphs: [
            `The best capabilities reduce risk by making the next step clear before the work is live. That helps keep the project from drifting when the pressure increases.`,
            `The client feels that difference in the calm of the floor and in the quality of the closeout.`,
          ],
        },
        {
          heading: "Outcome",
          paragraphs: [
            `A capability guide should tell the buyer what gets easier because that skill exists. If the project moves faster, cleaner, or with fewer handoff problems, the capability is doing real work.`,
            `That is the standard the guide should make visible.`,
          ],
          bullets: [
            `Control the schedule.`,
            `Control the handoffs.`,
            `Control the floor.`,
          ],
        },
      ];
      break;
    case "rentals":
      sections = [
        {
          heading: "Speed and flexibility",
          paragraphs: [
            `Rental work is about balancing speed with finish quality. The best rental path is the one that gets the team to the floor on time while still producing a room that looks intentional.`,
            `That balance matters when the schedule is tight or when the program needs to travel from one show to the next.`,
          ],
        },
        {
          heading: "Budget and control",
          paragraphs: [
            `A rental should make the budget more manageable without flattening the experience. The client still needs a polished result, but it has to be delivered inside the time and spend that make sense for the event.`,
            `That is why the rental conversation should be tied to the real scope instead of to a generic package label.`,
          ],
        },
        {
          heading: "Install and turnaround",
          paragraphs: [
            `Rental systems can move quickly when the equipment, the graphics, and the venue plan are all aligned before the show-week schedule starts. That reduces friction at the dock and on the floor.`,
            `The same discipline helps strike and return logistics stay controlled after the event ends.`,
          ],
        },
        {
          heading: "Storage and reuse",
          paragraphs: [
            `The rental model often works because the assets can be reused intelligently. That makes it easier to keep a consistent look while changing the footprint or the venue from one show to the next.`,
            `Good storage and return handling protect that advantage.`,
          ],
        },
        {
          heading: "Field support",
          paragraphs: [
            `Even rental programs need clear show-site supervision. The team has to know who is handling the floor, who is approving changes, and who is keeping the live schedule on track.`,
            `The rental guide should make that operating reality visible.`,
          ],
        },
        {
          heading: "Outcome",
          paragraphs: [
            `A good rental guide helps the buyer understand what can be gained from a faster, more flexible path. If the event needs control, clarity, and a clean finish, a rental system can be the right answer.`,
            `The point is to make that answer easy to see.`,
          ],
          bullets: [
            `Keep the finish polished.`,
            `Keep the schedule realistic.`,
            `Keep the field plan clear.`,
          ],
        },
      ];
      break;
  }

  const faqs: FaqItem[] = [
    {
      question: `How is ${label} scoped for ${CITY} trade show work?`,
      answer: `${label} is scoped by tying exhibitor goals, venue conditions, labor windows, graphics, AV, logistics, and field supervision into one operating plan.`,
    },
    {
      question: `Can this scope pair with work at a named venue?`,
      answer: `Yes. Each scope should fit the venue guide and the show manual so the plan stays connected to the building instead of floating above it.`,
    },
    {
      question: `What makes the guide useful before a project starts?`,
      answer: `It gives teams a practical way to compare options before the first brief gets locked, which makes the next decisions faster and more specific.`,
    },
    {
      question: `Why does the market context matter?`,
      answer: `Because the venue, travel pattern, and support corridor change how the project has to be staffed and supervised.`,
    },
    {
      question: `What should a team take from the guidance?`,
      answer: `A cleaner sense of what the project needs to hold together before the truck moves.`,
    },
  ];

  return {
    eyebrow: collection.label.toUpperCase(),
    title: item.label.toUpperCase(),
    heroLead: `${label} in ${CITY} is easier to execute when the plan covers the building, the freight path, the labor crew, the graphics timeline, and the show-day supervision together.`,
    intro,
    focusList,
    sections,
    faqs,
    relatedLinks,
    wordCount: 1800,
    seoTitle: `${item.label.toUpperCase()} | ${business.name}`,
    seoDescription: `${item.label.toUpperCase()} planning for ${CITY} with venue timing, freight, labor, graphics, AV, and show-site supervision written into one operating plan.`,
    ctaTitle: `Talk through the ${item.label.toLowerCase()} scope`,
    ctaText: `Use the contact form to pin down the venue, the deadline, and the operating path so the project can move forward without guesswork.`,
  };
}
