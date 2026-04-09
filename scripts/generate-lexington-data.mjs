import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const now = new Date().toISOString();

const services = [
  ["turnkey-trade-show-services", "Turnkey Trade Show Services"],
  ["trade-show-general-contracting", "Trade Show General Contracting"],
  ["trade-show-strategy-and-pre-show-planning", "Trade Show Strategy and Pre-Show Planning"],
  ["trade-show-booth-design", "Trade Show Booth Design"],
  ["custom-exhibit-fabrication", "Custom Exhibit Fabrication"],
  ["trade-show-installation-and-dismantle", "Trade Show Installation and Dismantle"],
  ["trade-show-av-production", "Trade Show AV Production"],
  ["expo-logistics-and-shipping", "Expo Logistics and Shipping"],
  ["show-services-order-management", "Show Services Order Management"],
  ["exhibitor-appointed-contractor-coordination", "Exhibitor-Appointed-Contractor Coordination"],
  ["show-site-supervision", "Show-Site Supervision"],
  ["multi-show-rollout-services", "Multi-Show Rollout Services"]
].map(([slug, label]) => ({ slug, label }));

const locations = [
  ["downtown-lexington", "Downtown Lexington"],
  ["newtown-pike-corridor", "Newtown Pike Corridor"],
  ["hamburg", "Hamburg"],
  ["beaumont", "Beaumont"],
  ["chevy-chase", "Chevy Chase"],
  ["south-lexington", "South Lexington"],
  ["nicholasville", "Nicholasville"],
  ["georgetown", "Georgetown"],
  ["richmond", "Richmond"],
  ["versailles", "Versailles"],
  ["frankfort", "Frankfort"],
  ["winchester", "Winchester"]
].map(([slug, label]) => ({ slug, label }));

const venues = [
  ["central-bank-center", "Central Bank Center"],
  ["hyatt-regency-lexington", "Hyatt Regency Lexington"],
  ["hilton-lexington-downtown", "Hilton Lexington/Downtown"],
  ["lexington-marriott-city-center", "Lexington Marriott City Center"],
  ["marriott-lexington-griffin-gate-golf-resort-and-spa", "Marriott Lexington Griffin Gate Golf Resort & Spa"],
  ["the-campbell-house-lexington", "The Campbell House Lexington"],
  ["embassy-suites-lexington-green", "Embassy Suites Lexington Green"]
].map(([slug, label]) => ({ slug, label }));

const eventTypes = [
  ["trade-show-services", "Trade Show Services"],
  ["conference-services", "Conference Services"],
  ["brand-activation-services", "Brand Activation Services"],
  ["user-conference-services", "User Conference Services"],
  ["association-event-services", "Association Event Services"],
  ["dealer-meeting-services", "Dealer Meeting Services"],
  ["recruiting-event-services", "Recruiting Event Services"],
  ["product-launch-services", "Product Launch Services"]
].map(([slug, label]) => ({ slug, label }));

const boothTypes = [
  ["custom-exhibit-booths", "Custom Exhibit Booths"],
  ["island-exhibit-booths", "Island Exhibit Booths"],
  ["inline-booth-displays", "Inline Booth Displays"],
  ["rental-exhibit-booths", "Rental Exhibit Booths"],
  ["modular-exhibit-booths", "Modular Exhibit Booths"],
  ["double-deck-exhibit-booths", "Double-Deck Exhibit Booths"]
].map(([slug, label]) => ({ slug, label }));

const industries = [
  ["healthcare-trade-show-services", "Healthcare Trade Show Services"],
  ["manufacturing-expo-services", "Manufacturing Expo Services"],
  ["agriculture-and-agtech-expo-services", "Agriculture and AgTech Expo Services"],
  ["education-and-association-event-services", "Education and Association Event Services"],
  ["equine-and-bourbon-industry-events", "Equine and Bourbon Industry Events"],
  ["financial-services-and-insurance-expo-services", "Financial Services and Insurance Expo Services"],
  ["logistics-and-distribution-expo-services", "Logistics and Distribution Expo Services"],
  ["technology-and-software-expo-services", "Technology and Software Expo Services"]
].map(([slug, label]) => ({ slug, label }));

const capabilities = [
  ["experience-strategy-and-show-planning", "Experience Strategy and Show Planning"],
  ["creative-and-booth-development", "Creative and Booth Development"],
  ["fabrication-coordination", "Fabrication Coordination"],
  ["show-site-leadership", "Show-Site Leadership"]
].map(([slug, label]) => ({ slug, label }));

const rentals = [
  ["modular-exhibit-rentals", "Modular Exhibit Rentals"],
  ["portable-display-rentals", "Portable Display Rentals"],
  ["rental-booth-packages", "Rental Booth Packages"],
  ["event-furnishing-rentals", "Event Furnishing Rentals"]
].map(([slug, label]) => ({ slug, label }));

const exhibitTypes = [
  ["corporate-exhibit-environments", "Corporate Exhibit Environments"],
  ["island-exhibit-environments", "Island Exhibit Environments"],
  ["inline-exhibit-environments", "Inline Exhibit Environments"],
  ["portable-exhibit-environments", "Portable Exhibit Environments"],
  ["roadshow-exhibit-environments", "Roadshow Exhibit Environments"]
].map(([slug, label]) => ({ slug, label }));

function pageList(items) {
  return items.map((item) => ({ slug: item.slug, label: item.label }));
}

function node(label, routeBase, required, requiredCorePages, generatedPages, targetCount, rationale) {
  return {
    label,
    routeBase,
    required,
    requiredCorePages,
    generatedPages,
    targetCount,
    actualGeneratedCount: generatedPages.length,
    representativeSampleSlugs: generatedPages.slice(0, 4).map((item) => item.slug),
    rationale
  };
}

const taxonomyPlan = {
  generatedAt: now,
  market: {
    city: "Lexington",
    state: "KY",
    domain: "tradeshowserviceslexington.com",
    businessName: "Trade Show Services of Lexington"
  },
  services: node(
    "Services",
    "/services",
    true,
    ["turnkey-trade-show-services", "trade-show-general-contracting", "trade-show-av-production"],
    pageList(services),
    12,
    "The Lexington service stack needs to cover real trade-show, exhibit, labor, AV, logistics, and project-led buyer intent without sounding like a keyword list."
  ),
  locations: node(
    "Locations",
    "/locations",
    true,
    ["downtown-lexington", "newtown-pike-corridor", "hamburg", "beaumont"],
    pageList(locations),
    12,
    "Lexington sells as a convention core plus a practical ring of Bluegrass submarkets, hotel corridors, and short-drive regional markets."
  ),
  venues: node(
    "Venues",
    "/venues",
    true,
    ["central-bank-center", "hyatt-regency-lexington", "hilton-lexington-downtown", "lexington-marriott-city-center"],
    pageList(venues),
    7,
    "The venue stack focuses on the downtown convention core, connected hotel inventory, and the strongest regional event properties that actually shape trade-show execution in Lexington."
  ),
  eventTypes: node(
    "Event Types",
    "/event-types",
    true,
    ["trade-show-services", "conference-services", "brand-activation-services", "user-conference-services"],
    pageList(eventTypes),
    8,
    "The event-type stack preserves classic trade-show intent while adding formats that matter in a Bluegrass market with conferences, university programs, and sponsor-led events."
  ),
  boothTypes: node(
    "Booth Types",
    "/booth-types",
    true,
    ["custom-exhibit-booths", "island-exhibit-booths", "inline-booth-displays", "rental-exhibit-booths"],
    pageList(boothTypes),
    6,
    "Booth-format pages help the site speak to footprint, sightlines, and install complexity instead of flattening every exhibit into one generic booth concept."
  ),
  industries: node(
    "Industries",
    "/industries",
    true,
    ["healthcare-trade-show-services", "manufacturing-expo-services", "agriculture-and-agtech-expo-services", "education-and-association-event-services"],
    pageList(industries),
    8,
    "The industry stack keeps Lexington grounded in the sectors that actually create recurring event demand in the Bluegrass region: healthcare, manufacturing, agriculture, education, equine, finance, and technology."
  ),
  optionalTaxonomies: [
    node(
      "Capabilities",
      "/capabilities",
      false,
      ["experience-strategy-and-show-planning", "creative-and-booth-development"],
      pageList(capabilities),
      4,
      "Capabilities are useful as a support taxonomy because they explain how the team actually delivers work from planning through show-site leadership."
    ),
    node(
      "Rentals",
      "/rentals",
      false,
      ["modular-exhibit-rentals", "portable-display-rentals"],
      pageList(rentals),
      4,
      "Rental intent is strong enough to merit its own route set because many buyers want a fast, flexible, and budget-aware exhibit path."
    ),
    node(
      "Exhibit Types",
      "/exhibit-types",
      false,
      ["corporate-exhibit-environments", "island-exhibit-environments", "inline-exhibit-environments"],
      pageList(exhibitTypes),
      5,
      "Exhibit-type pages give the site a way to explain how the room should behave once the brand, the footprint, and the live traffic pattern are all real."
    )
  ],
  pageCountPlan: {
    services: services.length,
    locations: locations.length,
    venues: venues.length,
    eventTypes: eventTypes.length,
    boothTypes: boothTypes.length,
    industries: industries.length,
    capabilities: capabilities.length,
    rentals: rentals.length,
    exhibitTypes: exhibitTypes.length
  }
};

const venueResearch = {
  generatedAt: now,
  market: {
    city: "Lexington",
    state: "KY",
    metro: "Lexington / Bluegrass region"
  },
  sourcePolicy:
    "Official venue, hotel, airport, and destination sources were prioritized. Venue language is only used where current public materials support the claim.",
  venueRecords: [
    {
      slug: "central-bank-center",
      name: "Central Bank Center",
      city: "Lexington",
      region: "Downtown Lexington Convention Core",
      venueType: "convention-center",
      address: "430 W Vine St, Lexington, KY 40507",
      parentVenue: null,
      confidence: "high",
      sourceUrls: [
        "https://www.centralbankcenter.com/",
        "https://www.centralbankcenter.com/assets/doc/LCC-Dimensions-9ee422bb14.pdf",
        "https://www.centralbankcenter.com/assets/doc/CBC-A-Z-Rules-and-Regs-3666de2351.pdf"
      ],
      verifiedFacts: [
        "Downtown Lexington's flagship convention campus anchors the city's largest event floor and sits next to the arena and hotel ring.",
        "The public venue documents make it clear that organizers and exhibitors should work from the current rules, dimensions, and service instructions rather than assuming a generic convention-center process.",
        "The complex is the best fit when a project needs a true exposition hall, ballroom support, and a centralized downtown guest pattern."
      ],
      tradeShowFit: [
        "trade shows",
        "conventions",
        "multi-day expositions",
        "sponsor activations",
        "downtown conference programs"
      ]
    },
    {
      slug: "hyatt-regency-lexington",
      name: "Hyatt Regency Lexington",
      city: "Lexington",
      region: "Downtown Lexington",
      venueType: "convention-hotel",
      address: "401 W High St, Lexington, KY 40507",
      parentVenue: null,
      confidence: "high",
      sourceUrls: [
        "https://www.hyatt.com/hyatt-regency/en-US/lexrl-hyatt-regency-lexington"
      ],
      verifiedFacts: [
        "The downtown Hyatt is part of the convention-hotel ring tied directly to the Central Bank Center campus.",
        "It gives planners an attached-room and breakout strategy for meetings, host-hotel programs, and sponsor hospitality.",
        "Its downtown location makes it useful for projects that need a strong walkable core instead of a suburban drive-up model."
      ],
      tradeShowFit: [
        "overflow room blocks",
        "breakout meetings",
        "speaker hospitality",
        "conference staging",
        "adjacent-hotel support"
      ]
    },
    {
      slug: "hilton-lexington-downtown",
      name: "Hilton Lexington/Downtown",
      city: "Lexington",
      region: "Downtown Lexington",
      venueType: "convention-hotel",
      address: "369 W Vine St, Lexington, KY 40507",
      parentVenue: null,
      confidence: "high",
      sourceUrls: [
        "https://www.hilton.com/en/hotels/lexdthf-hilton-lexington-downtown/"
      ],
      verifiedFacts: [
        "Hilton Lexington/Downtown sits steps from Rupp Arena and Lexington Center in the downtown core.",
        "The hotel page shows a meaningful group-travel and events operation tied to the center of the city.",
        "The property works well when a program needs downtown walkability, hospitality polish, and direct access to the convention district."
      ],
      tradeShowFit: [
        "headquarter hotel use",
        "speaker and sponsor rooms",
        "downtown conferences",
        "executive meetings",
        "hospitality programs"
      ]
    },
    {
      slug: "lexington-marriott-city-center",
      name: "Lexington Marriott City Center",
      city: "Lexington",
      region: "Downtown Lexington",
      venueType: "downtown-hotel",
      address: "121 W Vine St, Lexington, KY 40507",
      parentVenue: null,
      confidence: "high",
      sourceUrls: [
        "https://www.marriott.com/en-us/hotels/lexdt-lexington-marriott-city-center/overview/",
        "https://www.marriott.com/en-us/hotels/lexdt-lexington-marriott-city-center/events/"
      ],
      verifiedFacts: [
        "Marriott positions the hotel at the heart of downtown Lexington.",
        "The events page gives the property a genuine meetings-and-weddings angle that supports corporate programs and planner-facing events.",
        "Its downtown placement makes it a clean fit for meetings that need modern hospitality without leaving the city center."
      ],
      tradeShowFit: [
        "executive meetings",
        "client hospitality",
        "breakout rooms",
        "business conferences",
        "downtown overflow"
      ]
    },
    {
      slug: "marriott-lexington-griffin-gate-golf-resort-and-spa",
      name: "Marriott Lexington Griffin Gate Golf Resort & Spa",
      city: "Lexington",
      region: "North Lexington / Newtown Pike",
      venueType: "resort-hotel",
      address: "1800 Newtown Pike, Lexington, KY 40511",
      parentVenue: null,
      confidence: "high",
      sourceUrls: [
        "https://www.marriott.com/en-us/hotels/lexky-marriott-lexington-griffin-gate-golf-resort-and-spa/overview/",
        "https://www.griffingateevents.com/"
      ],
      verifiedFacts: [
        "The resort sits on Newtown Pike and gives planners a north-Lexington hotel and event option outside the downtown core.",
        "Marriott presents the property as a golf resort with meeting and event venues, which makes it stronger for retreats, retreats-with-objectives, and hospitality-heavy programs.",
        "The Bluegrass-country setting helps when a program wants a more resort-forward feel without losing access to Lexington."
      ],
      tradeShowFit: [
        "retreats",
        "advisory councils",
        "hospitality programs",
        "executive offsites",
        "regional conferences"
      ]
    },
    {
      slug: "the-campbell-house-lexington",
      name: "The Campbell House Lexington",
      city: "Lexington",
      region: "South Lexington / Broadway",
      venueType: "historic-hotel",
      address: "1375 S Broadway, Lexington, KY 40504",
      parentVenue: null,
      confidence: "high",
      sourceUrls: [
        "https://www.thecampbellhouse.com/about/",
        "https://www.thecampbellhouse.com/"
      ],
      verifiedFacts: [
        "The Campbell House is a Lexington landmark just outside downtown with more than 25,000 square feet of meeting and event space.",
        "The hotel is positioned as a historic, equestrian property, which gives it a strong Kentucky identity for hospitality-led programs.",
        "Its location near downtown and Keeneland makes it a practical support venue for meetings and side events."
      ],
      tradeShowFit: [
        "leadership meetings",
        "client dinners",
        "smaller conference tracks",
        "hospitality suites",
        "brand dinners"
      ]
    },
    {
      slug: "embassy-suites-lexington-green",
      name: "Embassy Suites Lexington Green",
      city: "Lexington",
      region: "South Lexington / Lexington Green",
      venueType: "suite-hotel",
      address: "245 Lexington Green Cir, Lexington, KY 40503",
      parentVenue: null,
      confidence: "medium",
      sourceUrls: [
        "https://www.hilton.com/en/hotels/lexgbes-embassy-suites-lexington-green/"
      ],
      verifiedFacts: [
        "Lexington Green provides a south-lexington hotel and meeting option for groups that prefer a suburban access pattern.",
        "The Embassy Suites brand is useful when a program wants suite inventory and a controlled hospitality environment outside the downtown core.",
        "It works as a support property for meetings, training programs, and overflow room blocks."
      ],
      tradeShowFit: [
        "overflow rooms",
        "training sessions",
        "regional meetings",
        "hospitality suites",
        "mid-size programs"
      ]
    }
  ],
  excludedVenues: [
    {
      name: "Small restaurant private rooms without durable public event specs",
      reason:
        "They can work for dinners, but they do not support a strong trade-show or conference venue page."
    },
    {
      name: "Wedding-first estates and rural properties outside the practical Lexington sales radius",
      reason:
        "They are real event spaces, but they do not materially support the planning routes this site needs."
    }
  ],
  notes: [
    "Lexington's strongest trade-show story is downtown first, then the Newtown Pike and South Lexington hotel ring, and finally the surrounding Bluegrass corridor for regional spillover.",
    "The venue stack favors current convention, hotel, and resort properties that can support real planning decisions."
  ]
};

const marketResearch = {
  generatedAt: now,
  market: {
    city: "Lexington",
    state: "KY",
    businessName: "Trade Show Services of Lexington",
    address: "300 W Vine St, Suite 200, Lexington, KY 40507",
    serviceRadiusStrategy:
      "Lead with downtown Lexington and the Central Bank Center hotel ring, then extend into Newtown Pike, Hamburg, Beaumont, South Lexington, Nicholasville, Georgetown, Richmond, Versailles, Winchester, and Frankfort as the realistic Bluegrass markets that feed event traffic."
  },
  marketSignals: [
    {
      label: "Downtown convention core",
      finding:
        "Central Bank Center gives Lexington a true downtown convention anchor with current public rules and dimension docs that make venue-driven planning necessary from the start.",
      sourceUrl: "https://www.centralbankcenter.com/"
    },
    {
      label: "Hotel-led event spine",
      finding:
        "Hyatt Regency Lexington, Hilton Lexington/Downtown, and Lexington Marriott City Center create a connected downtown hospitality cluster that supports conferences, sponsor rooms, and overflow planning.",
      sourceUrl: "https://www.marriott.com/en-us/hotels/lexdt-lexington-marriott-city-center/overview/"
    },
    {
      label: "Bluegrass identity",
      finding:
        "Lexington's equine, bourbon, and university identity gives the city more than one buyer story, which helps support recurring event demand across industries.",
      sourceUrl: "https://www.visitlex.com/"
    },
    {
      label: "Regional access",
      finding:
        "The city's position in central Kentucky makes it practical for drive-in attendees from the surrounding Bluegrass communities and nearby regional markets.",
      sourceUrl: "https://www.lexingtonky.gov/"
    },
    {
      label: "Resort and meeting spillover",
      finding:
        "Griffin Gate and The Campbell House widen the meeting map beyond downtown and give planners real options for hospitality-heavy programs.",
      sourceUrl: "https://www.thecampbellhouse.com/"
    }
  ],
  regionalFramework: {
    meetingInfrastructureNotes: [
      "Downtown Lexington is the convention engine, centered on Central Bank Center and the hotel ring around Vine, High, Main, and Broadway.",
      "North Lexington and Newtown Pike matter because they offer resort and hotel options that can support overflow and executive programs.",
      "South Lexington and Lexington Green add suburban hotel inventory for projects that need parking simplicity and room-block flexibility.",
      "The Bluegrass corridor beyond the city gives Lexington a wider regional radius than a downtown-only event market."
    ],
    accessibilityNotes: [
      "I-75, I-64, and the broader central-Kentucky road network make Lexington a real drive-market destination for regional exhibits and meetings.",
      "Blue Grass Airport helps the city support fly-in attendance for planners who need regional and national reach.",
      "Downtown walkability matters because a lot of Lexington's strongest event inventory sits close enough to support guest movement without long transit hops."
    ],
    destinationSupportNotes: [
      "Lexington can sell as a business market, a horse-country destination, and a bourbon-country destination depending on the audience.",
      "The strongest copy angle is practical: venue fluency, hospitality quality, and a region that knows how to host visitors without making the experience feel overbuilt.",
      "Because the city has more than one strong event node, the best planning copy should explain why the venue choice matters instead of flattening everything into one downtown story."
    ]
  },
  demandDrivers: [
    {
      slug: "central-bank-center-and-downtown-conventions",
      label: "Central Bank Center and Downtown Conventions",
      sourceUrl: "https://www.centralbankcenter.com/",
      reason:
        "The downtown convention campus creates a real exhibit and conference demand base that needs venue-aware show planning."
    },
    {
      slug: "university-healthcare-and-research-events",
      label: "University, Healthcare, and Research Events",
      sourceUrl: "https://www.uky.edu/",
      reason:
        "University of Kentucky and the regional healthcare economy support training, recruiting, education, and association programs."
    },
    {
      slug: "equine-and-bourbon-industry-events",
      label: "Equine and Bourbon Industry Events",
      sourceUrl: "https://www.visitlex.com/",
      reason:
        "Lexington's identity in horse country and bourbon country gives the city a distinct event and hospitality story that planners can actually use."
    },
    {
      slug: "manufacturing-and-supplier-events",
      label: "Manufacturing and Supplier Events",
      sourceUrl: "https://www.lexingtonky.gov/",
      reason:
        "Bluegrass-region manufacturers and suppliers create recurring demand for trade-show booths, dealer meetings, and customer programs."
    },
    {
      slug: "regional-roadshow-and-training-programs",
      label: "Regional Roadshow and Training Programs",
      sourceUrl: "https://www.lexingtonky.gov/",
      reason:
        "Lexington works well as a central Kentucky stop for roadshows, training programs, and multi-city event series."
    }
  ],
  primaryVenueClusters: [
    {
      name: "Downtown Lexington Convention Core",
      locations: ["downtown-lexington", "central-bank-center", "hyatt-regency-lexington", "hilton-lexington-downtown", "lexington-marriott-city-center"],
      notes:
        "This cluster covers the city's main convention campus, the connected downtown hotels, and the strongest walkable hospitality pattern."
    },
    {
      name: "Newtown Pike and North Lexington",
      locations: ["newtown-pike-corridor", "marriott-lexington-griffin-gate-golf-resort-and-spa"],
      notes:
        "This is the north-side hotel and resort corridor that works well for overflow, executive, and hospitality-heavy programs."
    },
    {
      name: "South Lexington and Lexington Green",
      locations: ["south-lexington", "beaumont", "chevy-chase", "embassy-suites-lexington-green", "the-campbell-house-lexington"],
      notes:
        "This cluster gives the site a useful suburban and boutique-hotel angle for meetings, dinners, and mid-size programs."
    },
    {
      name: "Bluegrass Regional Drive Market",
      locations: ["nicholasville", "georgetown", "richmond", "versailles", "frankfort", "winchester"],
      notes:
        "This is the realistic short-drive ring that turns Lexington into a regional event hub rather than a one-city island."
    }
  ],
  locationTargets: [
    { slug: "downtown-lexington", label: "Downtown Lexington", region: "Downtown Lexington", priority: "primary", reason: "This is the convention and hospitality core where the city's strongest event logic begins." },
    { slug: "newtown-pike-corridor", label: "Newtown Pike Corridor", region: "North Lexington", priority: "primary", reason: "The corridor carries resort, overflow, and hotel-based event demand just north of downtown." },
    { slug: "hamburg", label: "Hamburg", region: "East Lexington", priority: "primary", reason: "Hamburg is the east-side hotel and retail node that works well for drive-up meetings and corporate programs." },
    { slug: "beaumont", label: "Beaumont", region: "West Lexington", priority: "primary", reason: "Beaumont is a strong west-side business corridor with practical hotel and office access." },
    { slug: "chevy-chase", label: "Chevy Chase", region: "Inner Lexington", priority: "secondary", reason: "Chevy Chase supports local-business, medical, and boutique hospitality demand close to downtown." },
    { slug: "south-lexington", label: "South Lexington", region: "South Lexington", priority: "primary", reason: "South Lexington adds parking-friendly hotel and conference options without leaving the city." },
    { slug: "nicholasville", label: "Nicholasville", region: "Jessamine County", priority: "secondary", reason: "Nicholasville is an easy regional extension for central Kentucky meetings and exhibit traffic." },
    { slug: "georgetown", label: "Georgetown", region: "Scott County", priority: "secondary", reason: "Georgetown supports supplier, manufacturing, and customer-event demand within a short drive of Lexington." },
    { slug: "richmond", label: "Richmond", region: "Madison County", priority: "secondary", reason: "Richmond adds a university and healthcare-adjacent regional market south of Lexington." },
    { slug: "versailles", label: "Versailles", region: "Woodford County", priority: "secondary", reason: "Versailles is a natural Bluegrass extension for hospitality-heavy and equine-linked events." },
    { slug: "frankfort", label: "Frankfort", region: "State Capitol Region", priority: "secondary", reason: "Frankfort gives the site a government and association-adjacent regional option west of Lexington." },
    { slug: "winchester", label: "Winchester", region: "Clark County", priority: "secondary", reason: "Winchester rounds out the eastbound drive market and supports regional coverage language." }
  ],
  notes: [
    "Lexington works best when the site explains the downtown core and the regional drive market together.",
    "The city has enough meeting inventory to support more than one strong venue cluster without making the copy feel inflated."
  ],
  sources: [
    { label: "Central Bank Center", url: "https://www.centralbankcenter.com/" },
    { label: "Lexington Marriott City Center", url: "https://www.marriott.com/en-us/hotels/lexdt-lexington-marriott-city-center/overview/" },
    { label: "Hilton Lexington/Downtown", url: "https://www.hilton.com/en/hotels/lexdthf-hilton-lexington-downtown/" },
    { label: "The Campbell House Lexington", url: "https://www.thecampbellhouse.com/" },
    { label: "VisitLEX", url: "https://www.visitlex.com/" },
    { label: "City of Lexington", url: "https://www.lexingtonky.gov/" }
  ]
};

const laborResearch = {
  generatedAt: now,
  market: {
    city: "Lexington",
    state: "KY",
    metro: "Lexington / Bluegrass region"
  },
  overallAssessment: {
    laborModel: "mixed, venue-directed",
    confidence: "high",
    safePublicClaim:
      "Lexington event labor is venue- and organizer-directed rather than governed by one citywide rule set. Utilities, AV support, staffing requirements, sign installation, and exhibitor access should be confirmed against the current venue documents and show instructions for each event."
  },
  verifiedFindings: [
    {
      slug: "central-bank-center-rules-and-rates",
      venue: "Central Bank Center",
      finding:
        "The venue's public rules and regulations materials show that planners should work from the current event documents and contracts, including service ordering and venue coordination, rather than assuming a generic convention-center process."
    },
    {
      slug: "central-bank-center-dimensions-and-access",
      venue: "Central Bank Center",
      finding:
        "The dimensions and specification sheet makes the convention campus a real exhibit and conference environment with current floor and access considerations that should shape the brief early."
    },
    {
      slug: "hilton-downtown-group-events",
      venue: "Hilton Lexington/Downtown",
      finding:
        "The Hilton downtown page makes clear that the hotel supports group travel and events across its downtown location steps from Rupp Arena and Lexington Center."
    },
    {
      slug: "campbell-house-event-space",
      venue: "The Campbell House Lexington",
      finding:
        "The Campbell House says it offers more than 25,000 square feet of meeting and event space, which makes it a serious hospitality option for smaller conference and client-event programs."
    },
    {
      slug: "griffin-gate-resort-meetings",
      venue: "Marriott Lexington Griffin Gate Golf Resort & Spa",
      finding:
        "The Griffin Gate resort positions itself as a meeting and event hotel on Newtown Pike, which makes it relevant for retreat, hospitality, and overflow planning."
    }
  ],
  venueSpecificOperatingPatterns: [
    {
      slug: "central-bank-center",
      pattern:
        "Convention-campus work at Central Bank Center should start from the current rules, dimensions, and service order path instead of copying a hotel-ballroom workflow.",
      copyUse:
        "At Central Bank Center, the right copy language is order-driven and venue-specific: confirm utilities, service instructions, and any required event coordination early."
    },
    {
      slug: "hyatt-regency-lexington",
      pattern:
        "Attached downtown hotel work should be framed as overflow and breakout support tied to the convention campus, not as a separate venue universe.",
      copyUse:
        "For Hyatt Regency Lexington, explain the hotel as part of the downtown convention ecosystem and keep the room-block and breakout language tight."
    },
    {
      slug: "hilton-lexington-downtown",
      pattern:
        "Downtown hotel work around Hilton Lexington/Downtown should reference the arena-adjacent location, parking, and group-travel support.",
      copyUse:
        "For Hilton Lexington/Downtown, the copy should emphasize downtown access, group events, and the steps-from-Rupp-Arena location."
    },
    {
      slug: "the-campbell-house-lexington",
      pattern:
        "Historic hotel work at The Campbell House should reflect the property's event space, hospitality character, and south-lexington position near downtown and Keeneland.",
      copyUse:
        "At The Campbell House, keep the tone hospitality-forward and use the property's event-space scale as the planning cue."
    },
    {
      slug: "marriott-lexington-griffin-gate-golf-resort-and-spa",
      pattern:
        "Resort-hotel work at Griffin Gate should be framed around meetings, retreats, and guest experience on Newtown Pike.",
      copyUse:
        "For Griffin Gate, use resort, retreat, and hospitality language instead of trying to make the property sound like a downtown convention hall."
    }
  ],
  approvedCopyPatterns: [
    "Venue rules, organizer documents, and current service-order paths should shape the plan.",
    "Downtown Lexington and the surrounding Bluegrass region have distinct event patterns.",
    "The hotel ring around Central Bank Center is part of the planning story, not a separate afterthought.",
    "Regional Bluegrass work should be described as a realistic drive market with its own venue choices."
  ],
  avoidClaims: [
    "Do not claim that Lexington labor is universally union or universally non-union across all venues.",
    "Do not promise the same service path for every property in the city.",
    "Do not describe venue access, utilities, or sign installation as unrestricted when the current venue docs control those categories.",
    "Do not flatten downtown Lexington, South Lexington, and the regional Bluegrass markets into one generic city story."
  ]
};

function writeJson(filename, data) {
  fs.writeFileSync(path.join(root, filename), `${JSON.stringify(data, null, 2)}\n`);
}

writeJson("taxonomy-plan.json", taxonomyPlan);
writeJson("venue-research.json", venueResearch);
writeJson("market-research.json", marketResearch);
writeJson("labor-research.json", laborResearch);

console.log("Lexington data files written.");
