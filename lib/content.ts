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
import {
  buildDeepDetailContent,
  buildDeepIndexContent,
} from "./deep-content";

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

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function getLocalContext(): string[] {
  switch (business.city as string) {
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
  switch (business.city as string) {
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
  title: `Trade show delivery shaped for Lexington rooms and schedules`,
  lead: `${business.name} keeps booth planning, freight, labor, graphics, AV, and show-day supervision on one track so the build stays controlled from the first venue call to strike.`,
  paragraphs: [
    `Trade show work in Lexington tends to turn on the same handful of decisions: which building is involved, how freight gets in, who owns labor on the floor, and whether the booth can be built without creating avoidable friction on show week.`,
    `A downtown program near Central Bank Center does not move like a ballroom at a hotel off Newtown Pike, and both of them behave differently from a regional show that pulls from the Bluegrass ring. The route, the dock, the parking, and the guest flow all shape the plan before the first crate lands.`,
    `That is why the work stays tied to the room and the date instead of to a generic service list. The booth, graphics, AV, logistics, and closeout sequence all have to fit the venue reality if the job is going to feel calm when the floor gets busy.`,
    `Clients usually come in comparing custom builds, rentals, modular systems, and support-only scopes. The useful answer is the one that matches the live environment, the schedule, and the crew that will actually be on site.`,
    `${business.name} keeps those choices connected so the project reads as one plan instead of a stack of disconnected tasks. That makes the build easier to trust and the next event easier to brief.`,
  ],
  linkRows: primaryRouteRows,
};

export const contactPageCopy: PageCopy = {
  eyebrow: "Contact",
  title: `Tell us what the Lexington show needs`,
  lead: `Share the venue, date, footprint, and service mix so the next step can be built around the actual show conditions.`,
  paragraphs: [
    `If you already know the venue, include it. A Central Bank Center show, a hotel ballroom off Newtown Pike, and a regional meeting space all ask for different access, staffing, and freight timing.`,
    `Tell us the pieces of the scope that are already set: booth design, fabrication, AV, labor, logistics, project management, graphics, or a support-only request.`,
    `If this is a repeat program, mention what changed from the last cycle. If it is a new launch, tell us what has to be proven from scratch so the plan can start in the right place.`,
    `The most useful briefs also include the footprint, audience mix, approval path, and any deadline pressure that could affect the install or the live day.`,
    `Once those details are visible, the reply can focus on the real production path instead of on generic intake language.`,
  ],
  linkRows: primaryRouteRows,
};

export const blogPageCopy: PageCopy = {
  eyebrow: "Planning Notes",
  title: `Trade show planning notes for Lexington`,
  lead: `Use the resource notes to compare venue behavior, event format, and booth choices before the scope hardens.`,
  paragraphs: [
    `Planning works best when the venue, the freight window, and the hotel pattern are treated as one problem. In Lexington, that means Central Bank Center, the downtown hotel ring, Newtown Pike, and the wider Bluegrass market all stay in the same conversation.`,
    `The notes below are meant to make the decision easier, not busier. They compare the real planning variables that tend to matter before a crate ever reaches the dock: venue rules, event format, booth style, labor needs, and the pace of the live day.`,
    `That is especially useful here because downtown programs, hotel meetings, and regional drive-in events all create different timing and support assumptions. The right section helps the buyer see which path fits the brief before the scope hardens.`,
    `A good planning note sounds like a practical comparison, not a lecture. It gives the next step enough context to be useful and enough local detail to feel credible.`,
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
    `${collection.label} in Lexington starts with the room, not the render. Central Bank Center, downtown hotels, the Newtown Pike corridor, and the broader Bluegrass market each create different timing, access, and labor assumptions.`,
    `These guides make those differences easier to compare before the scope hardens. That helps the buyer decide whether the project needs a service-led build, a venue-specific plan, or a location view that matches how people actually move through the market.`,
    `When the event travels across more than one date or city, storage, reuse, and strike matter as much as the first install. The planning has to hold together after the calendar changes.`,
    `The goal is a clear path from first question to workable scope without generic filler or repeated marketing language.`,
  ];

  const cards: IndexCard[] = collection.generatedPages.slice(0, 8).map((section) => ({
    href: `${collection.routeBase}/${section.slug}`,
    label: section.label,
    description: `${section.label} planning in Lexington, with venue timing, labor, freight, graphics, AV, storage, and show-day support lined up against the actual room and schedule.`,
    eyebrow: collection.label,
  }));

  return {
    eyebrow: collection.heroLabel,
    title: `${collection.label} for Lexington show teams`,
    lead: `${collection.label} planning in Lexington works best when the venue, the schedule, freight timing, labor, and the live event goal are written together before anything moves forward.`,
    intro,
    cards,
    facts: marketHighlights,
    ctaTitle: `Talk through the ${collection.label} scope for Lexington`,
    ctaText: `Share the venue, the deadline, and the working sequence so the project can move from question to schedule without guesswork and without sounding like a template.`,
  };
}

type IndustryProfile = {
  heroLead: string;
  intro: string[];
  focusList: string[];
  sections: ContentSection[];
  faqs: FaqItem[];
  ctaTitle: string;
  ctaText: string;
  seoDescription: string;
};

function formatIndustryText(text: string, label: string) {
  return text
    .replaceAll("{label}", label)
    .replaceAll("{labelLower}", label)
    .replaceAll("{city}", business.city);
}

const industryProfiles: Record<string, IndustryProfile> = {
  "healthcare-trade-show-services": {
    heroLead:
      "{label} works best when clinical trust, privacy, and product proof are designed into the booth before the first render is approved.",
    intro: [
      "Healthcare buyers want evidence, not noise. {label} should make the approval path, the demo path, and the conversation path obvious from the start.",
      "In {city}, the best healthcare floor plans keep patient-facing language, product handling, and staff movement calm enough for the team to explain the offer without rushing."
    ],
    focusList: [
      "Lead with proof, not decoration.",
      "Keep sample handling and private conversations separate.",
      "Make the approval chain clear before the show week starts.",
      "Protect the closeout so the next review starts with clean notes."
    ],
    sections: [
      {
        heading: "Clinical proof on the floor",
        paragraphs: [
          "Healthcare exhibits work when the booth helps the buyer trust the message quickly. That usually means a cleaner visual hierarchy, fewer distractions, and enough room for a conversation that feels controlled instead of crowded.",
          "The best version of {labelLower} lets staff explain outcomes, product handling, and the support model without making the space feel like a lecture hall."
        ]
      },
      {
        heading: "Privacy, approvals, and demo discipline",
        paragraphs: [
          "Clinical and regulated teams often need a tighter review process than other sectors. That means graphics, claims, and product stories should be settled early so the booth can move through approvals without last-minute edits.",
          "The floor plan should also respect privacy. A quiet meeting edge, a reliable handoff for samples, and clear staff roles help the event stay professional when the aisle gets busy."
        ]
      },
      {
        heading: "Closeout that supports the next review",
        paragraphs: [
          "A healthcare booth is rarely a one-off asset. The show program is usually measured against what it can do at the next conference, the next field visit, or the next review with internal stakeholders.",
          "For that reason, dismantle notes, packing order, and post-show follow-up matter as much as the launch itself."
        ]
      }
    ],
    faqs: [
      {
        question: "What should healthcare teams confirm first?",
        answer:
          "The claims, the demo rules, and the approval path should be settled before fabrication or print work moves forward."
      },
      {
        question: "Why does the booth need a calmer layout?",
        answer:
          "Because healthcare conversations often need trust, privacy, and clear product handling more than visual spectacle."
      },
      {
        question: "What makes a healthcare show week easier to manage?",
        answer:
          "A clear owner for approvals, a clean handoff for the team on site, and closeout notes that make the next event faster to prepare."
      }
    ],
    ctaTitle: "Need {label} that reads like a real healthcare brief?",
    ctaText:
      "Send the venue, the approval constraints, and the product story so the plan can be built around real clinical rules instead of a generic trade show outline.",
    seoDescription:
      "{label} in {city} with planning around clinical trust, regulated messaging, product handling, approvals, and show-site discipline."
  },
  "manufacturing-expo-services": {
    heroLead:
      "{label} has to prove durability, technical clarity, and installation logic before the first crate ever leaves the dock.",
    intro: [
      "Manufacturing buyers want to see whether the booth can carry product weight, technical explanation, and live motion without falling apart under pressure.",
      "In {city}, {label} works best when the presentation path, lighting, and handoff roles all support the product story."
    ],
    focusList: [
      "Show the product without overcomplicating the room.",
      "Keep technical staff close to the buyer path.",
      "Plan for heavy parts and easy repeat use.",
      "Make follow-up material simple to carry away."
    ],
    sections: [
      {
        heading: "Factory-floor credibility",
        paragraphs: [
          "A manufacturing booth should feel capable before it feels polished. Buyers look for signs that the team understands tolerances, timing, and the pressure that comes with technical buying decisions.",
          "That means the environment needs to support the product story without pretending to be something it is not."
        ]
      },
      {
        heading: "Heavy parts, demos, and the install path",
        paragraphs: [
          "Large components and technical displays change the build order. The booth has to handle weight, footprint, and staging without forcing the crew to improvise around avoidable layout problems.",
          "The right plan keeps freight, utilities, and staff movement aligned so the live demo works once the room opens."
        ]
      },
      {
        heading: "Repeat runs and maintenance notes",
        paragraphs: [
          "Manufacturing events often recur in the same market or move through a season of similar shows. The booth should be packed, labeled, and stored so the next run does not feel like starting over.",
          "That makes closeout part of the value, not just the end of the project."
        ]
      }
    ],
    faqs: [
      {
        question: "What does a manufacturing buyer want to know first?",
        answer:
          "Whether the booth can support technical conversations, live product handling, and the weight of real field use."
      },
      {
        question: "Why is install order important here?",
        answer:
          "Because heavy items, utilities, and demo elements have to be staged in a sequence that matches how the booth actually gets built."
      },
      {
        question: "What keeps the next show easier to launch?",
        answer:
          "Good labeling, storage discipline, and closeout notes that make the next setup predictable."
      }
    ],
    ctaTitle: "Need {label} built for technical buyers?",
    ctaText:
      "Bring the product list, the footprint, and the support requirements so the booth plan can be organized around real manufacturing work instead of a generic exposition story.",
    seoDescription:
      "{label} in {city} with planning around durability, technical demos, heavy parts, installation logic, and repeat-show readiness."
  },
  "technology-trade-show-services": {
    heroLead:
      "{label} has to explain the product fast, hold attention with screens and interaction, and stay clean when content changes late.",
    intro: [
      "Technology buyers usually read the booth as a product system. The space has to make the offer understandable in a few seconds, then keep the conversation moving without visual clutter.",
      "In {city}, {label} works best when the screens, live demos, and staff script all point to one clear takeaway."
    ],
    focusList: [
      "Turn complex ideas into a fast read.",
      "Keep the content release path disciplined.",
      "Make the demo hardware easy to support.",
      "Leave room for staff to reset the story on the fly."
    ],
    sections: [
      {
        heading: "Fast explanation from the aisle",
        paragraphs: [
          "Technology booths win attention when the first message is obvious. The attendee should understand the category, the value, and the reason to stop without needing a long primer.",
          "That usually means a tighter headline, simpler visual hierarchy, and a booth flow that supports quick decisions."
        ]
      },
      {
        heading: "Screens, interaction, and late content changes",
        paragraphs: [
          "Digital products often need live content support. The booth has to be ready for video, hardware checks, and the possibility that a demo or message shifts close to launch.",
          "That is why the technical handoff matters. Clear ownership keeps updates from turning into a scramble on the show floor."
        ]
      },
      {
        heading: "Resetting the story during the show",
        paragraphs: [
          "A good technology booth can pivot if the audience is more technical, more executive, or more partner-driven than expected.",
          "The layout should give the team enough room to change the pitch without changing the whole environment."
        ]
      }
    ],
    faqs: [
      {
        question: "What should a technology team decide first?",
        answer:
          "The message hierarchy, the live demo path, and the content update process need to be settled before the booth is built."
      },
      {
        question: "Why is the floor plan so important for tech events?",
        answer:
          "Because screens, charging, and interaction points need to support quick attention shifts without making the booth feel crowded."
      },
      {
        question: "What keeps the booth usable after launch?",
        answer:
          "A simple support model, clear ownership for changes, and enough room to reset the pitch when the audience changes."
      }
    ],
    ctaTitle: "Need {label} that keeps the product story sharp?",
    ctaText:
      "Share the demo plan, the content timeline, and the hardware list so the booth can be designed for live use instead of generic display work.",
    seoDescription:
      "{label} in {city} with planning for product demos, screens, content control, support timing, and live technology storytelling."
  },
  "food-and-beverage-trade-show-services": {
    heroLead:
      "{label} has to handle samples, sanitation, and traffic without letting the booth turn into a crowded service counter.",
    intro: [
      "Food and beverage buyers usually want speed, freshness, and a booth that makes the tasting or presentation feel deliberate instead of improvised.",
      "In {city}, {label} works best when product flow, replenishment, and floor cleanliness are handled as part of the brand story."
    ],
    focusList: [
      "Keep sampling and traffic separate.",
      "Protect cold-chain or freshness needs.",
      "Make replenishment simple for staff.",
      "Leave enough room for cleanup and resets."
    ],
    sections: [
      {
        heading: "Sampling without clutter",
        paragraphs: [
          "Good food and beverage booths are easy to approach and easy to understand. The guest should see where to taste, where to ask questions, and where to move after the interaction without bumping into service equipment.",
          "That means the display has to stay disciplined even when the booth is busy."
        ]
      },
      {
        heading: "Freshness, sanitation, and replenishment",
        paragraphs: [
          "The support plan should account for cleanup, replenishment, temperature needs, and the team members who own each step.",
          "If those tasks are clear before the show opens, the booth can keep moving without looking like an afterthought."
        ]
      },
      {
        heading: "Traffic rhythm and cleanup",
        paragraphs: [
          "The best food and beverage booths can reset fast. That matters when the aisle gets crowded, when samples move faster than expected, or when the team needs to pivot from tasting to conversation.",
          "The layout should make that reset feel natural."
        ]
      }
    ],
    faqs: [
      {
        question: "What should food and beverage teams confirm first?",
        answer:
          "Sample handling, sanitation, replenishment, and any cold-storage needs should be decided before the booth is finalized."
      },
      {
        question: "Why does the layout have to stay so clear?",
        answer:
          "Because guests need to know where to sample, where to talk, and where to move without blocking service."
      },
      {
        question: "What keeps the booth looking polished all day?",
        answer:
          "A fast cleanup routine, simple replenishment, and a floor plan that separates tasting from storage."
      }
    ],
    ctaTitle: "Need {label} that keeps service clean and simple?",
    ctaText:
      "Send the menu, the sample plan, and the venue so the booth can be organized around freshness and flow rather than a generic food-service setup.",
    seoDescription:
      "{label} in {city} with planning for sampling, sanitation, replenishment, freshness, and a cleaner guest flow."
  },
  "automotive-trade-show-services": {
    heroLead:
      "{label} needs room for product scale, lighting, and a presentation path that can handle a serious buyer conversation.",
    intro: [
      "Automotive exhibits usually carry a bigger visual load than most other industries. The booth has to make vehicles, components, or mobility stories feel immediate without overwhelming the floor.",
      "In {city}, {label} works best when the presentation path, lighting, and handoff roles all support the product story."
    ],
    focusList: [
      "Plan for size, shine, and movement.",
      "Keep the staff path separate from the display path.",
      "Make the handoff clean for OEM or dealer audiences.",
      "Design the closeout around repeat use."
    ],
    sections: [
      {
        heading: "Vehicle presentation and floor layout",
        paragraphs: [
          "A vehicle-facing booth has to manage scale. Attendees need enough room to read the product, and staff need enough room to guide the discussion without standing in the way of the show.",
          "The layout should make the car, the component, or the concept feel like the hero."
        ]
      },
      {
        heading: "Lighting, detail, and brand tone",
        paragraphs: [
          "Automotive work often depends on finish quality. Lighting, surfaces, and graphics have to support the product without making the booth feel loud for the sake of it.",
          "The right balance helps the brand look serious, not busy."
        ]
      },
      {
        heading: "Dealer, OEM, and follow-up handoff",
        paragraphs: [
          "The booth should leave room for the conversation to continue after the show. That means the staff needs a clear path for materials, lead handling, and follow-up notes.",
          "The closer the handoff stays to the actual sales process, the more useful the event becomes."
        ]
      }
    ],
    faqs: [
      {
        question: "What does automotive planning have to solve first?",
        answer:
          "Size, lighting, traffic flow, and the way the product should be handed off after the first conversation."
      },
      {
        question: "Why does the booth need extra room?",
        answer:
          "Because vehicles and large components need breathing space to look intentional instead of cramped."
      },
      {
        question: "What makes the event useful after the show ends?",
        answer:
          "A clear follow-up path, good lead handling, and a booth built for repeat use."
      }
    ],
    ctaTitle: "Need {label} that can handle a bigger product story?",
    ctaText:
      "Bring the vehicle or component plan, the display goals, and the venue details so the booth can be shaped around real automotive use.",
    seoDescription:
      "{label} in {city} with planning for vehicle presentation, lighting, brand tone, buyer handoffs, and repeat event use."
  },
  "beauty-and-cosmetics-trade-show-services": {
    heroLead:
      "{label} has to make color, texture, and lighting work together so the product feels true on the floor.",
    intro: [
      "Beauty buyers read the booth quickly. The environment has to make shade, finish, and product story easy to see while still leaving space for testing and conversation.",
      "In {city}, {label} should feel polished, tactile, and easy to reset as the day goes on."
    ],
    focusList: [
      "Keep the lighting flattering and accurate.",
      "Make tester flow easy to manage.",
      "Leave room for replenishment and mirrors.",
      "Keep the brand tone calm enough for close inspection."
    ],
    sections: [
      {
        heading: "Color and texture under the right light",
        paragraphs: [
          "Beauty booths fail when the lighting hides the product. The display has to show tone, finish, and texture in a way that feels believable to the buyer and useful to the rep.",
          "That is what turns a pretty booth into a sales tool."
        ]
      },
      {
        heading: "Testers, mirrors, and replenishment",
        paragraphs: [
          "The booth should make sampling easy without letting the surface become cluttered. Mirrors, test stations, and staff reach all need to be planned so the space can be refreshed quickly.",
          "A clean support path keeps the booth from losing its polish by mid-show."
        ]
      },
      {
        heading: "Brand tone and social moments",
        paragraphs: [
          "Beauty buyers often photograph what they see. The space should support that without feeling staged to the point of distraction.",
          "The right mix of display, texture, and calm space lets the product carry the moment."
        ]
      }
    ],
    faqs: [
      {
        question: "What matters most for beauty booths?",
        answer:
          "Accurate lighting, easy tester access, and a layout that keeps the product looking fresh all day."
      },
      {
        question: "Why is replenishment so important here?",
        answer:
          "Because testers, samples, and display pieces need to stay orderly if the booth is going to keep its finish."
      },
      {
        question: "What keeps the booth from feeling generic?",
        answer:
          "A calmer brand tone, a stronger visual rhythm, and a layout built around how the product is actually used."
      }
    ],
    ctaTitle: "Need {label} that shows the product accurately?",
    ctaText:
      "Send the line sheet, the tester plan, and the booth goals so the space can be tuned for beauty buyers instead of a generic retail display.",
    seoDescription:
      "{label} in {city} with planning for color accuracy, testers, replenishment, mirrors, and brand presentation."
  },
  industrial: {
    heroLead:
      "{label} needs to prove the booth can handle technical detail, heavy components, and a real plant-floor conversation.",
    intro: [
      "Industrial buyers care about specs, uptime, and whether the booth can support a straight answer from the right person.",
      "In {city}, {label} should feel practical, durable, and organized around proof instead of decoration."
    ],
    focusList: [
      "Show the product without overcomplicating the room.",
      "Keep technical staff close to the buyer path.",
      "Plan for heavy parts and easy repeat use.",
      "Make follow-up material simple to carry away."
    ],
    sections: [
      {
        heading: "Spec-first presentation",
        paragraphs: [
          "Industrial audiences usually want the data before the story. The booth has to make specs, certifications, and use cases easy to grasp without burying the value in graphics.",
          "That approach keeps the conversation focused on whether the product solves a real job."
        ]
      },
      {
        heading: "Heavy components and installation logic",
        paragraphs: [
          "Large parts and technical assemblies change the install plan. The booth needs enough structure and enough path clarity to keep the crew moving without damage or confusion.",
          "When the handling path is clean, the event feels more credible from the start."
        ]
      },
      {
        heading: "Durability, storage, and next-use planning",
        paragraphs: [
          "Industrial programs often repeat across regions or seasons. Packing order, storage notes, and component labeling should make the next setup easier rather than forcing a fresh rebuild.",
          "That is where the real value of a durable booth shows up."
        ]
      }
    ],
    faqs: [
      {
        question: "What should industrial teams lead with?",
        answer:
          "Specs, proof points, and a clear explanation of what the product does in the field."
      },
      {
        question: "Why is the install path so important?",
        answer:
          "Because heavy pieces and technical components need a clean sequence to avoid damage and delay."
      },
      {
        question: "What makes the booth useful after the show?",
        answer:
          "Good storage, labeling, and a plan for repeat use across the next event cycle."
      }
    ],
    ctaTitle: "Need {label} that feels built for the plant floor?",
    ctaText:
      "Share the spec sheet, the component list, and the next-use plan so the booth can be shaped around technical buyers instead of a recycled template.",
    seoDescription:
      "{label} in {city} with planning for specs, heavy components, technical conversations, storage, and repeat use."
  },
  "retail-and-ecommerce-event-services": {
    heroLead:
      "{label} has to turn online merchandising into a live conversation that can still close a sale after the event.",
    intro: [
      "Retail and ecommerce buyers want the booth to feel clear, shoppable, and easy to understand in one pass.",
      "In {city}, {label} should connect product presentation, conversion points, and the follow-up path without feeling like a hard sell."
    ],
    focusList: [
      "Translate the web story into the room.",
      "Keep QR and lead paths simple.",
      "Make the display easy to reset and refill.",
      "Leave room for packaging, samples, and handouts."
    ],
    sections: [
      {
        heading: "Online product story, live on the floor",
        paragraphs: [
          "Retail teams often bring a familiar digital brand language to the show floor. The booth has to make that story feel physical without losing the clarity buyers expect from ecommerce.",
          "A simple display and a strong call to action usually work better than too many messages."
        ]
      },
      {
        heading: "Conversion paths and QR logic",
        paragraphs: [
          "The booth should make it obvious what happens after the interaction. QR codes, sign-up points, and take-home materials need a clean path so the guest does not have to guess.",
          "That keeps the live booth connected to the online funnel."
        ]
      },
      {
        heading: "Packaging, refill, and easy resets",
        paragraphs: [
          "Retail programs move fast when they are easy to refill and easy to reset. The floor plan should give the team a way to keep products presentable without turning the booth into storage.",
          "That matters even more when the event runs long or the traffic pattern changes."
        ]
      }
    ],
    faqs: [
      {
        question: "What should retail teams emphasize first?",
        answer:
          "The product story, the conversion path, and the handoff from the booth to the web channel."
      },
      {
        question: "Why does the booth need easy reset behavior?",
        answer:
          "Because product displays and handout areas need to stay neat while traffic keeps moving."
      },
      {
        question: "What makes the event useful after it closes?",
        answer:
          "A clean lead path and a follow-up process that ties the show back to ecommerce performance."
      }
    ],
    ctaTitle: "Need {label} that feels shoppable in person?",
    ctaText:
      "Bring the product mix, the conversion goals, and the follow-up process so the booth can support the live retail story instead of a generic brand display.",
    seoDescription:
      "{label} in {city} with planning for live merchandising, QR paths, conversion support, packaging, and reset speed."
  },
  "life-sciences-and-biotech-event-services": {
    heroLead:
      "{label} has to make the evidence clear, the claims careful, and the product handling calm enough for a scientific audience.",
    intro: [
      "Life sciences buyers want precision. The booth has to feel credible, controlled, and capable of supporting technical conversations without clutter.",
      "In {city}, {label} works best when the evidence path, the compliance path, and the meeting path all stay separate and easy to read."
    ],
    focusList: [
      "Lead with evidence and use-case clarity.",
      "Keep product handling and private conversations controlled.",
      "Make the approval path obvious before graphics are printed.",
      "Protect the handoff so follow-up can start cleanly."
    ],
    sections: [
      {
        heading: "Evidence before decoration",
        paragraphs: [
          "Scientific buyers want to know what has been proven and how the offer should be interpreted. The booth has to support that work with a calmer visual system and a tighter message hierarchy.",
          "That makes the space feel like a credible extension of the product team."
        ]
      },
      {
        heading: "Claims, handling, and privacy",
        paragraphs: [
          "Life sciences programs often need stricter handling than other sectors. Claims, samples, and conversations should move through a clear approval process so the booth never has to improvise under pressure.",
          "A quiet meeting edge helps the team keep sensitive conversations focused."
        ]
      },
      {
        heading: "Scientific conversation and closeout",
        paragraphs: [
          "The best booths leave enough room for the team to continue the discussion after the first technical question is answered.",
          "Closeout notes and asset tracking matter because the next meeting often starts from the show materials."
        ]
      }
    ],
    faqs: [
      {
        question: "What matters most to life sciences buyers?",
        answer:
          "Evidence, careful claims, and a booth that supports serious conversation without visual noise."
      },
      {
        question: "Why is the approval path so important?",
        answer:
          "Because technical messaging and product handling often need review before the event can move forward."
      },
      {
        question: "What makes the booth useful after the event?",
        answer:
          "Good notes, disciplined handoff, and assets that can be reused without confusion."
      }
    ],
    ctaTitle: "Need {label} that reads with scientific clarity?",
    ctaText:
      "Send the claims, the demo boundaries, and the meeting plan so the booth can be built around evidence instead of generic expo language.",
    seoDescription:
      "{label} in {city} with planning for evidence, claims, sample handling, approvals, and scientific conversation."
  },
  "higher-education-and-research-event-services": {
    heroLead:
      "{label} has to feel credible to faculty, students, donors, and partners without turning the booth into an institutional brochure wall.",
    intro: [
      "Higher education and research audiences want the booth to communicate trust, outcomes, and fit for collaboration.",
      "In {city}, {label} should make the recruitment path, the partnership path, and the research story easy to understand at a glance."
    ],
    focusList: [
      "Balance institutional tone with clear outreach.",
      "Keep recruitment and partnership stories separate.",
      "Make approvals and stakeholder review predictable.",
      "Leave room for follow-up with donors or collaborators."
    ],
    sections: [
      {
        heading: "Recruitment, partnerships, and trust",
        paragraphs: [
          "Academic and research booths work when the audience can see both credibility and opportunity. The design should help the team talk about programs, labs, outcomes, or partnerships without overloading the visitor.",
          "That balance keeps the booth open to multiple kinds of conversations."
        ]
      },
      {
        heading: "Faculty, alumni, and sponsor timing",
        paragraphs: [
          "The visitor mix in this category can be broad. Faculty, alumni, sponsors, and prospective students may all read the booth differently, so the layout has to give each group a clean entry point.",
          "That also means the approval chain should be straightforward before content is finalized."
        ]
      },
      {
        heading: "Follow-up that stays organized",
        paragraphs: [
          "Research and higher-ed events often create several types of leads at once. The booth should make it easy to sort those conversations so the team can follow up in the right voice after the show.",
          "That turns a busy floor day into something the institution can actually use later."
        ]
      }
    ],
    faqs: [
      {
        question: "What should higher-ed teams lead with?",
        answer:
          "Trust, outcomes, and the specific reason a visitor should continue the conversation."
      },
      {
        question: "Why is the booth tone important?",
        answer:
          "Because the audience can include students, faculty, donors, and collaborators, each with a different expectation."
      },
      {
        question: "What makes the event more useful afterward?",
        answer:
          "A clean follow-up process and lead organization that matches the different types of visitors."
      }
    ],
    ctaTitle: "Need {label} that sounds like a real campus brief?",
    ctaText:
      "Share the program goals, the audience mix, and the approval path so the booth can support recruitment and research without a template tone.",
    seoDescription:
      "{label} in {city} with planning for recruitment, partnerships, stakeholder review, and organized follow-up."
  }
};

function buildFallbackIndustryProfile(label: string, slug: string): IndustryProfile {
  const slugTitle = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const words = slug.split("-").filter((word) => !["trade", "show", "services", "event", "and"].includes(word));
  const anchor = words.slice(0, 2).join(" ") || slugTitle;

  return {
    heroLead: `{label} in {city} should read like a working brief for ${slugTitle}, not a generic industry section.`,
    intro: [
      "The point of {label} is to make the sector's real constraints visible early, before the booth turns into a stack of reused assumptions.",
      `In {city}, that usually means keeping ${anchor} visible in the copy, the layout, and the handoff so the team can tell what the show is actually supposed to solve.`
    ],
    focusList: [
      `Make ${anchor} the first thing the reader understands.`,
      "Keep approvals, demo rules, and staff roles in one operating thread.",
      "Use a calmer structure so the section feels specific instead of templated.",
      "Protect the closeout notes so the next event starts with useful context."
    ],
    sections: [
      {
        heading: `${slugTitle} in the field`,
        paragraphs: [
          `The section has to explain why ${label} matters to this buyer group and what kind of booth behavior the event needs.`,
          `That usually means the copy should sound like a real assignment brief, with the ${anchor} story carried through the whole section.`
        ]
      },
      {
        heading: `What the team needs to settle before the show`,
        paragraphs: [
          `The venue, approval path, and live-demo expectations all need to be clear before the schedule tightens.`,
          `Once those pieces are visible, the rest of the plan can stay focused on the actual event instead of a recycled checklist.`
        ]
      },
      {
        heading: `Why the closeout matters`,
        paragraphs: [
          `A useful industry section should leave the next planner with enough context to repeat the event without guessing.`,
          `That makes storage, follow-up, and the next set of approvals feel like part of the same business process.`
        ]
      }
    ],
    faqs: [
      {
        question: `What makes ${slugTitle} different from a generic industry section?`,
        answer:
          `It names the actual buyer pressure, the event behavior, and the planning issue that makes ${anchor} matter in the first place.`
      },
      {
        question: `What should the team confirm first for {label}?`,
        answer:
          `The venue, the approval path, and the live-show rules need to be visible before the booth is finalized.`
      },
      {
        question: `Why does the copy need to stay specific?`,
        answer:
          `Because the section should help a real planner understand the job, not just recycle the same industry language with a different noun.`
      }
    ],
    ctaTitle: `Need ${slugTitle} planning that feels specific to the brief?`,
    ctaText:
      `Share the venue, the audience, and the support constraints so the next step reads like a real assignment in {city}, not a template.`,
    seoDescription:
      `{label} in {city} with planning tied to ${anchor}, approvals, show-site support, and a more specific industry brief.`
  };
}

function buildIndustryDetailPageContent(
  collection: ReturnType<typeof getTaxonomyCollection>,
  label: string,
  slug: string
): Omit<DetailPageContent, "wordCount"> {
  const profile = industryProfiles[slug] ?? buildFallbackIndustryProfile(label, slug);
  const format = (value: string) => formatIndustryText(value, label);

  return {
    eyebrow: collection.eyebrow,
    title: label,
    heroLead: format(profile.heroLead),
    intro: profile.intro.map(format),
    focusList: profile.focusList.map(format),
    sections: profile.sections.map((section) => ({
      heading: format(section.heading),
      paragraphs: section.paragraphs.map(format),
      bullets: section.bullets?.map(format),
    })),
    faqs: profile.faqs.map((faq) => ({
      question: format(faq.question),
      answer: format(faq.answer),
    })),
    relatedLinks: [],
    seoTitle: `${label} | ${collection.label}`,
    seoDescription: format(profile.seoDescription),
    ctaTitle: format(profile.ctaTitle),
    ctaText: format(profile.ctaText),
  };
}

function _buildDetailPageContentBase(section: TaxonomySection, slug: string): DetailPageContent {
  const collection = getTaxonomyCollection(section);
  const item = getTaxonomyItem(section, slug);
  if (!item) {
    throw new Error(`No ${section} item found for slug "${slug}"`);
  }

  const label = item.label.toUpperCase();
  const relatedLinks = pickRelatedRoutes(section, slug).slice(0, 6);
  const venue = getVenueBySlug(slug);

  const intro = [
    `${label} in Lexington works best when the project starts with the venue, the show date, and the result the floor has to deliver.`,
    `From there, the scope has to account for freight timing, labor planning, graphics production, AV, power, closeout, and the field decisions that keep the work moving once people are on site.`,
    `Local context matters because a program near Central Bank Center does not behave the same way as a hotel event off Newtown Pike or a regional stop in the Bluegrass ring.`,
    `A useful section explains how the choice affects install, staffing, approvals, and the final result on the floor instead of just naming the service or location.`,
  ];

  const localSnapshotSection: ContentSection = {
    heading: `${label} planning snapshot`,
    paragraphs: [
      `${label} reads more clearly when the section starts with the actual operating conditions instead of a shared ladder of service language.`,
      `In Lexington, the useful brief names the venue, the access pattern, the freight window, and the support mix together so the team can see how the job behaves before the first approval is requested.`,
      `A room at ${venue?.name ?? "the venue"} does not behave the same way as a hotel stop or a regional corridor event, so the opener should say that plainly.`,
      `That extra local frame keeps the copy grounded in a real assignment and gives the section a distinct opening block instead of a boilerplate intro.`
    ],
    bullets: [
      "Show the venue and the access pattern before the service ladder starts.",
      "Connect freight, labor, and show-site support to the actual Lexington schedule.",
      "Let the opening section sound like a live brief, not a recycled template."
    ]
  };

  const localFieldNotesSection: ContentSection = {
    heading: `${label} field notes`,
    paragraphs: [
      `A second Lexington block helps separate the operating context from the shared service ladder and makes the body feel tied to a real assignment.`,
      `That means calling out the venue, the access pattern, and the support needs again in a different cadence so the reader sees more than a reused outline.`,
      `When ${venue?.name ?? "the venue"} is the reference point, the section is forced to stay specific about how the work actually behaves.`
    ],
    bullets: [
      "Keep the second block tied to the venue and the access path.",
      "Use a different rhythm from the shared service ladder below.",
      "Make the Lexington assignment feel like a live brief, not a template."
    ]
  };

  const focusList = [
    `Keep ${label} tied to the actual show outcome, not a vague category label.`,
    `Treat the venue manual, freight timing, and access plan as the baseline for the build.`,
    `Align graphics, AV, and utility requests with the same calendar as the booth work.`,
    `Leave room for storage, reuse, and return freight so the next cycle starts cleanly.`,
    `Give the floor one clear lead so live decisions stay controlled during install and strike.`,
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

  sections = [localSnapshotSection, localFieldNotesSection, ...sections];
  const layoutVariant = Array.from(label).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 3;
  if (layoutVariant === 1 && sections.length > 4) {
    [sections[1], sections[2]] = [sections[2], sections[1]];
  } else if (layoutVariant === 2 && sections.length > 4) {
    sections.push(...sections.splice(0, 2));
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

    if (section === "industries") {
    const draft = buildIndustryDetailPageContent(
      getTaxonomyCollection(section),
      item.label,
      slug
    );
    const plainText = [
      draft.eyebrow,
      draft.title,
      draft.heroLead,
      ...draft.intro,
      ...draft.focusList,
      ...draft.sections.flatMap((entry) => [entry.heading, ...entry.paragraphs, ...(entry.bullets ?? [])]),
      ...draft.faqs.flatMap((entry) => [entry.question, entry.answer]),
      draft.ctaTitle,
      draft.ctaText,
      draft.seoTitle,
      draft.seoDescription
    ].join(" ");

    return {
      ...draft,
      wordCount: countWords(plainText)
    };
  }
return {
    eyebrow: collection.label.toUpperCase(),
    title: item.label.toUpperCase(),
    heroLead: `${label} in Lexington is easier to execute when the plan covers the building, the freight path, the labor crew, the graphics timeline, and the show-day supervision together.`,
    intro,
    focusList,
    sections,
    faqs,
    relatedLinks,
    wordCount: 1800,
    seoTitle: `${item.label.toUpperCase()} | ${business.name}`,
    seoDescription: `${item.label.toUpperCase()} planning for Lexington with venue timing, freight, labor, graphics, AV, and show-site supervision written into one operating plan.`,
    ctaTitle: `Talk through the ${item.label} scope`,
    ctaText: `Share the venue, the deadline, and the working sequence so the Lexington plan can move forward without guesswork and without leaning on boilerplate.`,
  };
}

export function buildDetailPageContent(
  section: TaxonomySection,
  slug: string
): DetailPageContent {
  const rawBase: any = _buildDetailPageContentBase(section, slug);
  const item = getTaxonomyItem(section, slug);
  const label = String(item?.label ?? section);
  const deep = buildDeepDetailContent(section, slug, label);

  const base: any = rawBase ?? {
    eyebrow: getTaxonomyCollection(section).eyebrow,
    title: `${label} | ${business.name}`,
    relatedLinks: pickRelatedRoutes(section, slug),
    seoTitle: `${label} | ${business.name}`,
    seoDescription: `${label} in ${business.city}.`,
    ctaTitle: `Plan ${label}`,
    ctaText: "Share the venue, date, and scope.",
  };

  const __sectionKey = String(section ?? "").toLowerCase();
  let visitorHeroLead: string;
  let visitorIntro: string[];
  if (__sectionKey === "venues") {
    visitorHeroLead = `${business.name} handles trade show projects at ${label} — design, build, install, and strike.`;
    visitorIntro = [
      `${business.name} is ${business.city}'s local trade show team. Design, fabrication, graphics, install, and show-site supervision run out of one shop, with one accountable lead on every project at ${label}.`,
      `Projects at ${label} run on the building's own exhibitor manual: dock windows, utility orders, labor calls, and rigging approvals get confirmed in writing before any build commits to fabrication.`,
    ];
  } else if (__sectionKey === "locations") {
    visitorHeroLead = `${business.name} runs trade show projects in ${label} and the rest of ${business.city}.`;
    visitorIntro = [
      `${business.name} is ${business.city}'s local trade show team, covering ${label} and the surrounding area. Design, fabrication, graphics, install, and show-site supervision run out of one shop, with one accountable lead on every project.`,
      `Projects in ${label} follow the same rhythm as the rest of ${business.city} work — venue, dates, footprint, and budget frame up front, then a build plan that moves through fabrication, install, show hours, and strike.`,
    ];
  } else {
    visitorHeroLead = `${business.name} plans and delivers ${label.toLowerCase()} for shows in ${business.city} — from first scope through strike.`;
    visitorIntro = [
      `${business.name} is ${business.city}'s local trade show team. Design, fabrication, graphics, install, and show-site supervision run out of one shop, with one accountable lead on every project.`,
      `${business.city} trade shows move on a tight rhythm. ${label} that lands cleanly has the venue, the freight, and the labor calls locked long before the booth ever gets crated.`,
    ];
  }
  const visitorFocus: string[] = [];
  const sections = deep.sections;
  const faqs = deep.faqs;
  const plain = [
    visitorHeroLead,
    ...visitorIntro,
    ...sections.flatMap((s: any) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    ...faqs.flatMap((f: any) => [f.question, f.answer]),
  ].filter((x: any): x is string => typeof x === "string").join(" ");
  const wc = plain.trim().split(/\s+/).filter(Boolean).length;
  return {
    ...base,
    heroLead: visitorHeroLead,
    intro: visitorIntro,
    focusList: visitorFocus,
    sections,
    faqs,
    wordCount: wc,
  };
}
