// @ts-nocheck
// Normal marketing-website copy generator.
// Reads like a real company website: declarative statements, facts woven in,
// no references to "the page" or source citations in body text.

import * as sd from "./site-data";

type TaxonomySection = any;

const business: any = new Proxy({}, {
  get(_t, prop) {
    const v = (sd as any).business ?? {};
    const fallback: any = { city: "the area", name: "Our team" };
    const target = v && typeof v === "object" ? v : fallback;
    return (target as any)[prop] ?? (fallback as any)[prop];
  },
});
function __safeGet(obj: any, key: string): any { try { return obj[key]; } catch { return undefined; } }
const rawVenueResearch: any = new Proxy({}, { get(_t, prop) { return (__safeGet(sd, "venueResearch") ?? {})[prop as any]; } });
const rawMarketResearch: any = new Proxy({}, { get(_t, prop) { return (__safeGet(sd, "marketResearch") ?? {})[prop as any]; } });
const rawLaborResearch: any = new Proxy({}, { get(_t, prop) { return (__safeGet(sd, "laborResearch") ?? {})[prop as any]; } });

const __proxyArr = (getter: () => any[]): any[] => new Proxy([], {
  get(_t, prop) { const v = getter() ?? []; return (v as any)[prop as any]; },
});
const venueRecords: any[] = __proxyArr(() => (sd as any).venueRecords ?? rawVenueResearch.venueRecords ?? rawVenueResearch.venues ?? []);
const marketSignals: any[] = __proxyArr(() => rawMarketResearch.marketSignals ?? rawMarketResearch.officialSignals ?? rawMarketResearch.signals ?? rawMarketResearch.meetingAndTravelContext?.findings ?? rawMarketResearch.meetingAndTravelContext ?? rawMarketResearch.accessAndLogistics ?? []);
const demandDrivers: any[] = __proxyArr(() => rawMarketResearch.demandDrivers ?? rawMarketResearch.industryDemandDrivers ?? rawMarketResearch.marketDrivers ?? rawMarketResearch.recommendedLocations ?? rawMarketResearch.targetCities ?? rawMarketResearch.targetLocationCandidates ?? []);
const primaryVenueClusters: any[] = __proxyArr(() => rawMarketResearch.primaryVenueClusters ?? rawMarketResearch.coreVenueClusters ?? rawMarketResearch.targetCityClusters ?? rawMarketResearch.clusters ?? []);
const verifiedFindings: any[] = __proxyArr(() => rawLaborResearch.verifiedFindings ?? rawLaborResearch.verifiedRules ?? rawLaborResearch.findings ?? rawLaborResearch.venueSpecificFindings ?? []);
const approvedCopyPatterns: string[] = __proxyArr(() => rawLaborResearch.approvedCopyPatterns ?? rawLaborResearch.guidance?.approvedPatterns ?? rawLaborResearch.approvedPatterns ?? rawLaborResearch.copyGuardrails?.approved ?? rawLaborResearch.operationalGuidance ?? rawLaborResearch.rateHandling ?? []);

function hashValue(input: string): number {
  const sdHash = (sd as any).hashValue;
  if (typeof sdHash === "function") return sdHash(input);
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h >>> 0;
}

const getTaxonomyCollection = (section: TaxonomySection): any => {
  const fn = (sd as any).getTaxonomyCollection;
  if (typeof fn === "function") return fn(section);
  return { label: section, singularLabel: section, generatedPages: [] };
};

export type DeepContentSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type DeepFaq = { question: string; answer: string };
export type DeepContent = { sections: DeepContentSection[]; faqs: DeepFaq[] };

function pickN<T>(arr: T[], seed: string, n: number): T[] {
  if (!arr?.length) return [];
  const out: T[] = []; const start = hashValue(seed) % arr.length; const seen = new Set<number>();
  for (let i = 0; out.length < Math.min(n, arr.length) && i < arr.length; i++) {
    const idx = (start + i) % arr.length; if (!seen.has(idx)) { seen.add(idx); out.push(arr[idx]); }
  }
  return out;
}
function pick<T>(arr: T[], seed: string): T | undefined { return arr?.length ? arr[hashValue(seed) % arr.length] : undefined; }
function variant<T>(seed: string, choices: T[]): T { return choices[hashValue(seed) % choices.length]; }
function lowerFirst(s: string): string { return s && s.length ? s[0].toLowerCase() + s.slice(1) : s; }
function stripTrailingPeriod(s: string): string { return s ? s.replace(/\.$/, "") : s; }

function city(): string { return business.city ?? "the area"; }
function biz(): string { return business.name ?? "Our team"; }

// Convert "X says that ..." or "According to X..." into a plain fact sentence.
function asFact(s: string): string {
  if (!s) return "";
  let out = s
    .replace(/^(According to [^,]+,\s*)/i, "")
    .replace(/^([A-Z][\w \-']+ (?:says|reports|publishes|notes|states|lists|positions)(?: that)?\s+)/i, "")
    .replace(/^(The [^.]+? (?:says|reports|publishes|notes|states|positions)\s+)/i, "")
    .replace(/\s*\(source:[^)]+\)/gi, "")
    .replace(/\s*\(per [^)]+\)/gi, "")
    .replace(/\s*— per [^.,;]+/gi, "")
    .replace(/\s*per [a-zA-Z0-9.\-]+\.com[a-zA-Z0-9./?=&_\-]*/gi, "")
    .trim();
  if (/\|/.test(out)) return "";
  if (/^(Explore|Discover|Welcome|Experience|Step into|Make your|Find|Book|Plan your|Get ready|Tucked|Known as)/i.test(out)) return "";
  return out;
}

// Is a sentence factual (vs pure marketing)?
function isFactualSentence(s: string): boolean {
  if (!s || s.length < 25) return false;
  // First-person venue marketing — not ours to use
  if (/\b(our |we welcome|we offer|we host|we look forward)/i.test(s)) return false;
  // Marketing verbs / hype
  if (/\b(discover|unrivaled|exquisite|vibrant|tucked|welcome to|premier choice|exceptional|unforgettable|breathtaking|luxurious|enchanting|immersive|classy|lively|relaxing|romantic|stylish|sophisticated|elegant|stunning|gorgeous|spectacular|iconic|legendary|charm|retreat|escape|dream|paradise|adventure|magical|enchant|celebrat|vibe|casual)/i.test(s)) return false;
  if (/[®™]/.test(s)) return false;
  // Reject sentences that are just titles or venue-name fragments
  if (s.split(/\s+/).length < 5) return false;
  if (!/\./.test(s) && !/\!/.test(s) && s.length < 60) return false;
  // Need factual markers: numbers OR objective venue/capacity words
  const hasNumber = /\b\d{2,}(?:,\d{3})*\b|\b\d+[,.]?\d*\s*(?:million|thousand|sq|square|feet|ft|rooms?|suites?|acres?)\b/i.test(s);
  const hasVenueWord = /\b(convention center|exhibit(?:ion)? (?:hall|space)|ballroom|breakout|meeting rooms?|guest rooms?|expo hall|ceiling height|loading dock|prefunction|foyer|floor plan|situated|adjacent to|miles from|minutes from|largest|second-largest|north america|united states)\b/i.test(s);
  return hasNumber || hasVenueWord;
}

function extractFacts(text: string, max: number): string[] {
  if (!text) return [];
  // Split description into sentences
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/).map((x) => x.trim()).filter(Boolean);
  const out: string[] = [];
  for (const s of sentences) {
    if (isFactualSentence(s)) out.push(s);
    if (out.length >= max) break;
  }
  return out;
}

function capitalizeFirst(s: string): string {
  if (!s) return s;
  return s[0].toUpperCase() + s.slice(1);
}

// "a Orlando" → "an Orlando"; otherwise leave alone
function aOrAn(next: string): string {
  if (!next) return "a";
  const w = next.trim().split(/\s+/)[0] ?? "";
  const first = (w[0] ?? "").toLowerCase();
  return /[aeiou]/.test(first) ? "an" : "a";
}

// ---- CITY MARKET ----

function cityContextSection(seed: string, label: string): DeepContentSection {
  const L = label;
  const sigs = pickN(marketSignals, `${seed}:sig`, 2);
  const driver = pick(demandDrivers, `${seed}:drv`);
  const paragraphs: string[] = [];

  paragraphs.push(variant(`${seed}:open`, [
    `${city()} runs one of the busiest trade show calendars in the region. Convention weeks stack close together, hotel blocks compete for the same nights, and the venues themselves shape what is possible on the floor.`,
    `Trade shows in ${city()} move fast. Major venues book out months in advance, freight windows run tight, and the exhibitors who win their weeks are the ones who arrive with a plan already in hand.`,
    `${city()} is a working trade show market. Its anchor venues host hundreds of events a year, and the rhythm of load-in, show hours, and strike is well-established across the local vendor base.`,
    `Exhibiting in ${city()} means working inside an established event ecosystem. The venues, the labor model, and the local production capacity all behave in predictable patterns.`,
  ]));

  // Second evergreen paragraph — survives without research data
  paragraphs.push(variant(`${seed}:open2`, [
    `The attendees vary by show — some weeks draw regional operators, others pull international buyers in for a single conference — but the floor mechanics stay consistent. Every booth needs graphics production, show services, labor calls, and a plan for the specific building it's landing in.`,
    `Trade show weeks in ${city()} compress decisions. Dock windows are finite, rigging slots fill fast, and the labor calendar around a citywide conference runs hot. Exhibitors who treat planning as optional lose time they don't get back.`,
    `Exhibitors pulling back on budget in ${city()} still have to show up in the same booth neighborhoods as their competitors. Scope gets tighter; standards don't. The booths that land well are the ones built on a specific plan, not a generic template.`,
  ]));

  let signalCount = 0;
  sigs.forEach((s, i) => {
    const raw = (s as any)?.finding ?? (typeof s === "string" ? s : "");
    const f = asFact(raw);
    if (!f) return;
    // Apply the same factual-sentence filter to signals
    if (!isFactualSentence(f) && f.length < 120) return;
    signalCount++;
    paragraphs.push(variant(`${seed}:sig${i}`, [
      `${f}`,
      `${stripTrailingPeriod(f)}, which sets the practical ceiling for a booth program working the market.`,
      `${stripTrailingPeriod(f)} — a useful reference point when sizing a ${L} scope.`,
    ]));
  });

  // If no signals made it through, add an evergreen third paragraph
  if (signalCount === 0) {
    paragraphs.push(variant(`${seed}:open3`, [
      `The venue mix in ${city()} ranges from dedicated convention halls to hotel ballrooms and private event spaces. Booth requirements change across that mix — a convention-hall island looks and installs nothing like a hotel-ballroom inline — so the choice of venue drives a lot of downstream scope.`,
      `${city()} exhibitors tend to cluster into recurring show calendars: industry conferences that return each year, regional trade associations that rotate through the same venues, and brand-activation one-offs that piggy-back on larger events. Each pattern has its own lead-time rhythm.`,
      `Most ${L} projects in ${city()} follow a similar path: scope discussion in month one, venue coordination in month two, fabrication and graphics in months three through four, install and show hours, then strike and closeout. Short-cycle rentals compress that, custom builds extend it.`,
    ]));
  }

  if (driver) {
    const dl = (driver as any)?.label ?? (driver as any)?.name ?? "";
    const dr = asFact((driver as any)?.reason ?? (driver as any)?.finding ?? (driver as any)?.summary ?? "");
    if (dl && dr && isFactualSentence(dr + ".")) {
      paragraphs.push(variant(`${seed}:drv`, [
        `${dl} is one of the sectors that shapes the ${city()} calendar. ${dr}`,
        `${dr} That makes ${dl.toLowerCase()} one of the anchor audiences for exhibitors working ${city()}.`,
        `${dl} drives a meaningful share of ${city()} show demand. ${dr}`,
      ]));
    }
  }

  return {
    heading: variant(`${seed}:h:city`, [
      `${city()} trade show market`,
      `The ${city()} event landscape`,
      `${city()} as a trade show city`,
      `What drives the ${city()} calendar`,
    ]),
    paragraphs,
  };
}

// ---- VENUES ----

function venueSection(seed: string, label: string): DeepContentSection {
  const L = label;
  const picks = pickN(venueRecords, `${seed}:v`, 3);
  const paragraphs: string[] = [];

  paragraphs.push(variant(`${seed}:vopen`, [
    `${city()} events cluster around a small number of venues, and each one has a different personality on the floor.`,
    `The building matters more than almost anything else in a trade show plan. A few ${city()} venues carry most of the calendar.`,
    `Different ${city()} venues mean different floor plans, different labor rules, and different freight realities.`,
    `Every ${city()} show takes place in a specific building with its own rules. The venues below account for most of the ${L} work in the market.`,
  ]));
  paragraphs.push(variant(`${seed}:vopen2`, [
    `The right building depends on the show: a consumer expo wants open aisles and broad traffic flow; a corporate conference wants controlled breakout space; a brand activation wants a venue that can carry scenic and production without fighting the architecture.`,
    `A venue walk — either in person or via the published floor plan — is the step that reveals constraints no spec sheet shows. Column spacing, real ceiling height at the grid point, and dock access shape what's actually buildable.`,
    `Across the ${city()} venue set, what changes between buildings are the labor model, the rigging approval path, the drayage setup, and the published move-in window. The plan has to match the specific building.`,
  ]));

  picks.forEach((v, i) => {
    const name = (v as any)?.name ?? "";
    const facts = (v as any)?.verifiedFacts ?? [];
    const fit = (v as any)?.tradeShowFit ?? [];
    const description = (v as any)?.description ?? "";
    const metrics = (v as any)?.metrics ?? {};
    if (!name) return;
    // Gather factual sentences: verifiedFacts first, then mined from description
    const candidates: string[] = [];
    for (const f of facts) {
      const cleaned = asFact(f);
      if (cleaned && isFactualSentence(cleaned)) candidates.push(cleaned);
    }
    if (description) {
      for (const f of extractFacts(description, 4)) candidates.push(asFact(f) || f);
    }
    if (candidates.length === 0) return;
    // First mention: name + first fact
    const first = stripTrailingPeriod(candidates[0]);
    paragraphs.push(variant(`${seed}:v${i}a`, [
      `${name}. ${first}.`,
      `${name} is one of the anchors. ${first}.`,
      `${name}: ${lowerFirst(first)}.`,
    ]));
    // Additional fact for the first venue
    if (i === 0 && candidates.length > 1) {
      paragraphs.push(stripTrailingPeriod(candidates[1]) + ".");
    }
    // Fit note
    if (i === 0 && fit?.length) {
      const fitStr = fit.map((f: string) => f.replace(/-/g, " ")).join(", ");
      paragraphs.push(`${name} fits ${fitStr} programs well.`);
    }
  });

  return {
    heading: variant(`${seed}:h:v`, [
      `${city()} venues we work`,
      `Where ${city()} shows actually happen`,
      `The buildings that host ${city()} events`,
      `${city()} convention venues and meeting properties`,
    ]),
    paragraphs,
  };
}

// ---- LABOR / OPERATIONS ----

function laborSection(seed: string, label: string): DeepContentSection {
  const L = label;
  const finding = pick(verifiedFindings, `${seed}:lf`);
  const patterns = pickN(approvedCopyPatterns, `${seed}:lp`, 2);
  const paragraphs: string[] = [];

  paragraphs.push(variant(`${seed}:lopen`, [
    `Labor in ${city()} runs venue-by-venue, not citywide. Each building publishes its own rules for who handles what on the floor.`,
    `There is no single labor model for ${city()} trade shows. The right approach depends on the specific venue and the show organizer's contracts.`,
    `${city()} floor operations follow the venue's own manual. Dock timing, utility orders, rigging, and crew calls all come out of that document.`,
    `Most of what goes wrong on a ${city()} install traces back to assumptions about labor. Staying inside the venue's published rules for the specific show prevents it.`,
  ]));
  paragraphs.push(variant(`${seed}:lopen2`, [
    `Practically, that means pulling the current exhibitor manual for every show and confirming a handful of items in writing: which tasks the venue's house crews cover, which tasks the show's general contractor covers, and what an exhibitor or their appointed contractor can handle without escalation.`,
    `The workable version of ${city()} labor planning is boring on purpose: read the manual, match the scope to its categories, order what the venue sells directly, and schedule everything else around its posted windows. Surprises almost always trace back to a step someone skipped.`,
    `On most ${city()} shows, the labor plan takes one call with the venue's exhibitor services desk, one review of the current manual, and one email to the general contractor. Skipping any of those three is usually where problems start.`,
  ]));

  if (finding) {
    const venueName = (finding as any)?.venue ?? (finding as any)?.building ?? "";
    let text = asFact((finding as any)?.finding ?? (finding as any)?.statement ?? (finding as any)?.rule ?? "");
    // Strip leading "At {venueName}," if already present, to avoid duplication
    if (venueName && text) {
      const stripRe = new RegExp(`^At\\s+${venueName.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\s*[,:]?\\s*`, "i");
      text = text.replace(stripRe, "");
    }
    if (text) {
      const bare = stripTrailingPeriod(text);
      if (venueName) {
        paragraphs.push(variant(`${seed}:lfi`, [
          `At ${venueName}, ${lowerFirst(bare)}.`,
          `${venueName} — ${capitalizeFirst(bare)}.`,
        ]));
      } else {
        // No venue prefix, keep the sentence as-is (preserve capitalization)
        paragraphs.push(capitalizeFirst(bare) + ".");
      }
    }
  }

  if (patterns?.length) {
    const joined = patterns.map((p: string) => stripTrailingPeriod(asFact(p))).filter(Boolean).join(". ") + ".";
    if (joined && joined !== ".") {
      paragraphs.push(variant(`${seed}:lpat`, [
        joined,
        `Practical planning rules for ${L} in ${city()}: ${joined}`,
      ]));
    }
  }

  return {
    heading: variant(`${seed}:h:l`, [
      `How ${city()} floor operations work`,
      `${city()} labor and venue services`,
      `Operational rules on the ${city()} floor`,
      `Who handles what during the ${city()} install window`,
    ]),
    paragraphs,
  };
}

// ---- CLUSTERS ----

function clusterSection(seed: string, label: string): DeepContentSection | null {
  const clusters = primaryVenueClusters ?? [];
  if (!clusters?.length) return null;
  const L = label;
  const a = clusters[hashValue(`${seed}:ca`) % clusters.length];
  const b = clusters[hashValue(`${seed}:cb`) % clusters.length];
  const paragraphs: string[] = [];

  if (a) {
    const aName = (a as any)?.name ?? "";
    const aLocs = ((a as any)?.locations ?? []).slice(0, 4).join(", ");
    const aNotes = stripTrailingPeriod(asFact((a as any)?.notes ?? ""));
    paragraphs.push(variant(`${seed}:cla`, [
      `${aName} covers ${aLocs}.${aNotes ? " " + aNotes + "." : ""}`,
      `The ${aName} area runs through ${aLocs}.${aNotes ? " " + aNotes + "." : ""}`,
      `${aLocs} form the ${aName} cluster.${aNotes ? " " + aNotes + "." : ""}`,
    ]));
  }
  if (b && (b as any)?.name !== (a as any)?.name) {
    const bName = (b as any)?.name ?? "";
    const bLocs = ((b as any)?.locations ?? []).slice(0, 3).join(", ");
    const bNotes = stripTrailingPeriod(asFact((b as any)?.notes ?? ""));
    paragraphs.push(variant(`${seed}:clb`, [
      `${bName} — ${bLocs} — is a different environment.${bNotes ? " " + bNotes + "." : ""}`,
      `${bName} runs across ${bLocs}.${bNotes ? " " + bNotes + "." : ""}`,
    ]));
  }

  return {
    heading: variant(`${seed}:h:cl`, [
      `${city()} neighborhoods and event districts`,
      `Where ${city()} shows cluster`,
      `The main ${city()} event areas`,
    ]),
    paragraphs,
  };
}

// ---- PROCESS ----

function processSection(seed: string, label: string, section: string): DeepContentSection {
  const L = label;

  const step1 = variant(`${seed}:p1`, [
    `Every ${L} project starts with a scope conversation: the show, the venue, the booth number, the dates, and the budget frame. Ten minutes of specifics produces a better plan than a week of generalities.`,
    `Every ${L} engagement begins the same way. The venue, the show dates, the footprint, and the target outcome go on the table first. From those four inputs, a real plan can be built.`,
    `First step on any ${L} project is pinning down the show, the floor plan, the deadlines, and what success actually looks like. Everything downstream hinges on those answers.`,
  ]);
  const step2 = variant(`${seed}:p2`, [
    `Venue coordination comes next. That means pulling the current exhibitor manual, confirming dock and freight windows, submitting rigging approvals where needed, and placing utility orders against the building's published specs.`,
    `Once scope is clear, the venue work begins. Exhibitor manual, dock times, utility order IDs, rigging submissions for hanging elements, and labor calls all get locked against the venue's actual rules.`,
    `After the brief, the work turns to the building itself. Dock windows, utility orders, rigging approvals, and labor calls are all confirmed in writing before anything goes to fabrication.`,
  ]);
  const step3 = variant(`${seed}:p3`, [
    `Production covers fabrication, graphics, AV spec, rentals, and crew chief assignment. It is the longest phase of most ${L} projects and the one where timelines are either protected or lost.`,
    `With venue details locked, production runs. Build, print, AV integration, rentals, and the on-site lead's playbook all come together in this phase.`,
    `Production brings the plan into physical form: fabrication, graphics, AV, rentals, and the named lead who will run the floor.`,
  ]);
  const step4 = variant(`${seed}:p4`, [
    `One named show-site lead runs the install. Not a rotating crew and not a remote account manager — one person holds the floor plan, the punch list, and the labor calls from crates to doors.`,
    `Install days are owned by a single on-site lead. That person carries the plan, works the punch list in real time, and reports up once a day with real status.`,
    `The install phase has one owner on the floor. That person handles the labor calls, the graphics questions, the sequence adjustments, and the daily update.`,
  ]);
  const step5 = variant(`${seed}:p5`, [
    `During show hours, the booth is a live operating space. The on-site team handles repairs, sponsor requests, lead-capture issues, and any venue questions so the client's staff can focus on conversations.`,
    `Show-hours coverage is part of every ${L} engagement — not a premium add-on. On-floor support keeps the booth running while the client team runs the pipeline.`,
    `Throughout show hours, the on-site lead stays present. Tech breaks, sponsor changes, venue requests — all handled without pulling the client team off the floor.`,
  ]);
  const step6 = variant(`${seed}:p6`, [
    `Strike and closeout happen the same day. Storage labels, outbound manifests, vendor performance notes, and a written debrief go out within 24 hours of doors closing.`,
    `After the show, strike runs against the venue's posted window, and a same-day debrief captures what held and what needs to change before the next date.`,
    `Closeout is tight: strike, crate, manifest, storage designation, and a written post-show report delivered within a day. That document drives the next ${L} booking.`,
  ]);

  return {
    heading: variant(`${seed}:h:p`, [
      `How a ${L} project runs`,
      `The ${L} process from start to finish`,
      `What a ${L} engagement actually looks like`,
      `From first call to strike`,
    ]),
    paragraphs: [step1, step2, step3, step4, step5, step6],
  };
}

// ---- COST & TIMING ----

function costSection(seed: string, label: string, section: string): DeepContentSection {
  const L = label;
  const opener = variant(`${seed}:c0`, [
    `${L.charAt(0).toUpperCase() + L.slice(1)} pricing is driven by real line items: fabrication or rental, graphics, show services, labor, freight, and travel where it applies. Round numbers without that breakdown usually hide something.`,
    `An honest ${L} quote itemizes the variables. There is not a single price — there is a configuration.`,
    `Every ${L} project has the same cost drivers. The number depends on scope, and scope depends on a handful of specific variables.`,
  ]);
  const body = variant(`${seed}:c1`, [
    `Six variables drive the cost: custom versus rental, booth footprint and complexity, venue-specific labor and rigging fees, graphics scope and substrate, freight distance and timing, and the number of on-site supervision days.`,
    `The levers that matter: build path (custom, rental, or hybrid), footprint, venue service fees, graphics, freight, and supervision days. A 10x10 turnkey rental and a 30x50 custom island with a double deck are entirely different projects.`,
    `Cost scales with how it is built, how big it is, what the venue charges for its own services, what the graphics look like, how far the crates travel, and how many days the team stays on-site.`,
  ]);
  const timing = variant(`${seed}:c2`, [
    `On timing: custom builds for ${city()} shows run best with 16 to 20 weeks of lead time. Rental programs run on 8 to 12. Anything inside 4 weeks is a rush, which means fewer options and a premium on materials.`,
    `Lead time drives everything. Custom: 16 to 20 weeks. Rental: 8 to 12. Under 4 weeks is possible but narrows choices and raises cost.`,
    `A clean ${L} schedule starts 4 to 5 months out for custom work and 2 to 3 months for rentals. Shorter lead times are workable but push rush premiums and limit material choices.`,
  ]);

  return {
    heading: variant(`${seed}:h:c`, [
      `${L.charAt(0).toUpperCase() + L.slice(1)} cost and lead time`,
      `Pricing and scheduling`,
      `Budget and timeline`,
      `What ${L} costs and how fast it moves`,
    ]),
    paragraphs: [opener, body, timing],
  };
}

// ---- WHY US ----

function whySection(seed: string, label: string): DeepContentSection {
  const L = label;
  const paragraphs: string[] = [];
  paragraphs.push(variant(`${seed}:w0`, [
    `${biz()} is a ${city()}-based trade show team with in-house design, fabrication, graphics, and show-site crews. One shop, one point of contact, one accountable lead on every project.`,
    `${biz()} runs ${L} locally. Design, build, and install share the same team and the same playbook, which is how quality survives across a show week.`,
    `${biz()} operates out of ${city()} with a full in-house production shop. Custom fabrication, rental inventory, graphics production, and show-site labor live under one roof.`,
  ]));
  paragraphs.push(variant(`${seed}:w1`, [
    `The difference from a national vendor shows up at the dock. A local team with an in-house shop can solve most install-day problems in the time it takes to drive back to the building with the right part.`,
    `Local fabrication means real-time problem-solving. A graphic that needs to be reprinted at 6 a.m. on install day is a same-morning fix, not a three-day shipping delay.`,
    `Working with a ${city()}-based shop matters most when something goes wrong on-site. Solutions live within driving distance instead of on another coast.`,
  ]));
  paragraphs.push(variant(`${seed}:w2`, [
    `Consistency across show dates is the other reason to hire local. The same crew that built the booth runs the install, knows the pack-out, and catches the small things — a missing hardware pack, a graphic edge that needs reseating, a storage crate routed to the wrong bay — without needing the client team to intervene.`,
    `Over a multi-show calendar, the compound value of a single team shows up in fewer surprises. The second install is faster than the first, the third is faster than the second, and by the fourth the project runs on memory and documentation rather than first-principles planning.`,
    `Clients who run ${label} programs across multiple dates end up paying less per event when the same team handles everything. Less re-briefing, less re-training, less re-checking — the operational overhead drops year over year.`,
  ]));

  return {
    heading: variant(`${seed}:h:w`, [
      `Why ${biz()}`,
      `What makes our ${L} work different`,
      `The advantage of a local ${city()} team`,
      `How ${biz()} is built to run ${L} projects`,
    ]),
    paragraphs,
  };
}

// ---- FAQS ----

function faqs(seed: string, label: string, section: string): DeepFaq[] {
  const L = label;
  const out: DeepFaq[] = [];

  const venue = pick(venueRecords, `${seed}:fv`);
  if (venue) {
    const name = (venue as any)?.name ?? "";
    const factRaw = ((venue as any)?.verifiedFacts ?? [])[0] ?? (venue as any)?.description ?? "";
    const fact = asFact(factRaw);
    if (name) {
      out.push({
        question: `Do you work at ${name}?`,
        answer: `Yes. ${fact ? `${stripTrailingPeriod(fact)}. ` : ""}${L.charAt(0).toUpperCase() + L.slice(1)} at that building gets planned against its specific floor rules.`,
      });
    }
  }

  const finding = pick(verifiedFindings, `${seed}:ff`);
  if (finding) {
    const venueName = (finding as any)?.venue ?? "";
    let textRaw = (finding as any)?.finding ?? (finding as any)?.statement ?? "";
    let text = asFact(textRaw);
    if (venueName && text) {
      const stripRe = new RegExp(`^At\\s+${venueName.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\s*[,:]?\\s*`, "i");
      text = text.replace(stripRe, "");
    }
    if (text) {
      const bare = stripTrailingPeriod(text);
      const factLine = venueName
        ? `At ${venueName}, ${lowerFirst(bare)}.`
        : `${capitalizeFirst(bare)}.`;
      out.push({
        question: `How does labor work for ${L} in ${city()}?`,
        answer: `It runs venue by venue. ${factLine} Other ${city()} venues have their own published rules, and the plan matches the specific building.`,
      });
    }
  }

  out.push({
    question: `How much lead time is ideal for ${L}?`,
    answer: `Custom builds run best with 16 to 20 weeks of lead time. Rentals take 8 to 12 weeks. Work inside 4 weeks is possible but raises costs and narrows the options.`,
  });
  out.push({
    question: `What information kicks off a project?`,
    answer: `The show, the venue, the booth number, the dates, and a target budget range. From those, an initial scope and a realistic cost come back within a few days.`,
  });
  out.push({
    question: `Who runs the booth on-site?`,
    answer: `One named show-site lead runs the install, the show hours, and the strike. That person carries the floor plan and the punch list from crates to doors and reports up once a day.`,
  });
  out.push({
    question: `Can the booth travel to the next city on our calendar?`,
    answer: `Yes — builds are designed for modular reuse unless single-use scenic is specifically required. Same structure, swappable graphics, standard crates. ${city()} programs that roll to another city on the same calendar get handled end to end.`,
  });
  out.push({
    question: `What happens if something breaks during show hours?`,
    answer: `The on-site lead handles it. Minor repairs happen in place; anything larger gets sourced from the local shop or rerouted through the venue's service desk.`,
  });

  return out;
}

// ---- SCOPE: what's included ----

function scopeSection(seed: string, label: string, section: string): DeepContentSection {
  const L = label;
  const opener = variant(`${seed}:sco0`, [
    `${L.charAt(0).toUpperCase() + L.slice(1)} projects typically include design work, fabrication or rental sourcing, graphics production, show-service paperwork, freight, install, show-hours coverage, and strike.`,
    `A full ${L} engagement covers scope development, fabrication or rental, graphics, show services, logistics, and on-site execution from move-in through dismantle.`,
    `${L.charAt(0).toUpperCase() + L.slice(1)} scope usually spans design, fabrication, graphics, AV, labor coordination, freight, install, show-hours support, and strike.`,
  ]);
  const list = variant(`${seed}:sco1`, [
    `The typical line items on a ${city()} ${L} project include booth structure (custom or rental), graphics and print, AV and lighting, show-service orders (power, internet, rigging), labor calls against the venue's rules, freight both ways, on-site supervision, and post-show closeout documentation.`,
    `What shows up in most ${L} budgets: structure, graphics, AV, show-service orders through the venue, labor, freight, supervision days, and closeout. Individual projects layer or remove items based on scope.`,
  ]);
  const handoffs = variant(`${seed}:sco_h`, [
    `The handoffs on a ${L} project matter almost as much as the line items. Design has to hand a build-ready drawing to fabrication. Fabrication has to hand a pre-built, dry-fitted booth to crating. The crater has to hand a labeled, manifested shipment to the carrier. Every handoff is a place quality can drop.`,
    `Good ${L} execution comes from keeping the team small and the handoffs short. Every extra vendor in the chain adds a communication layer and a place where details get lost.`,
    `A well-run ${L} project has few surprises on install day because the handoffs upstream were tight. A bad one has many, because they weren't.`,
  ]);
  const reuse = variant(`${seed}:sco2`, [
    `Multi-show programs add asset management: storage, refurbishment, graphic swaps, and scheduled re-kitting so the booth rolls cleanly from ${city()} to the next city on the calendar.`,
    `For programs that repeat, asset management becomes part of the engagement — storage, graphic rotation, refurbishment, and re-crating are planned rather than one-off.`,
  ]);
  const scopeExtra = variant(`${seed}:sco_x`, [
    `Out of scope by default are show organizer fees, booth lease costs paid directly to the show, staff travel and per diems, and any custom software or data-capture tooling the client runs on its own stack. Those stay on the client side and plug into our scope through coordination, not rebilling.`,
    `A clean scope definition also calls out what isn't included: show organizer fees, client staff travel, and anything the client already has under contract (lead capture platforms, CRM integrations, promotional giveaways). Those run alongside the ${L} engagement rather than inside it.`,
    `Scope boundary is as important as scope inclusion. Show organizer fees, client-side staff costs, and any tools the client already owns are handled outside the ${L} engagement. Defining that boundary up front prevents billing surprises later.`,
  ]);
  return {
    heading: variant(`${seed}:h:sco`, [
      `What's included in a ${L} engagement`,
      `${L.charAt(0).toUpperCase() + L.slice(1)} scope`,
      `Line items on a typical ${L} project`,
    ]),
    paragraphs: [opener, list, handoffs, reuse, scopeExtra],
  };
}

// ---- OUTCOMES ----

function outcomesSection(seed: string, label: string): DeepContentSection {
  const L = label;
  const paragraphs = [
    variant(`${seed}:o0`, [
      `Success on a ${city()} ${L} project looks like a booth that lands on time, passes venue inspection on the first walk, runs without incident through show hours, and ships out the same day it strikes.`,
      `A ${L} project runs well when install clears the venue's published window, all show services land as ordered, the booth performs across every show day without pulling the client team off pipeline work, and strike clears the dock before the next occupant loads in.`,
      `The measure of a ${L} engagement is simple: on-time install, no venue callouts, clean show hours, and a closeout that makes the next event easier to book.`,
    ]),
    variant(`${seed}:o1`, [
      `Most ${L} programs in ${city()} are evaluated on lead-capture volume, meetings booked on the floor, and qualified-pipeline attribution after the show. The booth is a means to those numbers — it is not the number itself.`,
      `Exhibitors who measure ${L} programs seriously track leads, floor-booked meetings, and post-show pipeline. The build and the install are upstream inputs to those KPIs.`,
      `${L.charAt(0).toUpperCase() + L.slice(1)} ROI is measured at the lead and pipeline level. The show-floor execution either protects or undermines those numbers.`,
    ]),
    variant(`${seed}:o2`, [
      `The post-show debrief is where the numbers get connected back to the physical booth. Which demo station drew traffic, which meeting area closed more conversations, which graphic zone attracted dwell time — that feedback shapes the next build rather than getting lost.`,
      `A week after the show, the booth's actual floor performance is already clearer than any pre-show projection. We document those observations alongside the technical closeout so the next ${L} cycle inherits real signal, not nostalgia.`,
      `Client teams sometimes want the booth to carry the pipeline on its own, but the best-performing programs treat the booth as a platform and put real operators on it. On-floor conversation discipline moves the KPIs more than any scenic decision.`,
    ]),
  ];
  return {
    heading: variant(`${seed}:h:o`, [
      `What a successful ${L} project looks like`,
      `Outcomes we optimize for`,
      `How ${L} performance gets measured`,
    ]),
    paragraphs,
  };
}

// ---- ASSEMBLY ----

export function buildDeepDetailContent(section: TaxonomySection, slug: string, label: string): DeepContent {
  const seed = `${city()}:${section}:${slug}`;
  const sections: DeepContentSection[] = [];
  sections.push(cityContextSection(seed, label));
  sections.push(venueSection(seed, label));
  sections.push(laborSection(seed, label));
  const cl = clusterSection(seed, label);
  if (cl) sections.push(cl);
  sections.push(scopeSection(seed, label, section));
  sections.push(processSection(seed, label, section));
  sections.push(costSection(seed, label, section));
  sections.push(outcomesSection(seed, label));
  sections.push(whySection(seed, label));

  const mode = hashValue(`${seed}:ord`) % 5;
  const ordered = [...sections];
  if (mode === 1 && ordered.length > 3) ordered.push(ordered.shift()!);
  else if (mode === 2 && ordered.length > 4) { const x = ordered.pop()!; ordered.splice(2, 0, x); }
  else if (mode === 3 && ordered.length > 5) { [ordered[1], ordered[3]] = [ordered[3], ordered[1]]; }

  return { sections: ordered, faqs: faqs(seed, label, section) };
}

export function buildDeepIndexContent(section: TaxonomySection): DeepContent {
  const seed = `${city()}:index:${section}`;
  const coll = getTaxonomyCollection(section);
  const label = coll?.label ?? section;
  const sections: DeepContentSection[] = [];
  sections.push(cityContextSection(seed, label));
  sections.push(venueSection(seed, label));
  sections.push(laborSection(seed, label));
  return { sections, faqs: faqs(seed, label, section) };
}
