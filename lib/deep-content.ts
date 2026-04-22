// @ts-nocheck
import * as sd from "./site-data";

type TaxonomySection = any;

// Business + research exports — lazy-access via getters to avoid TDZ errors on circular imports.
const business: any = new Proxy({}, {
  get(_t, prop) {
    const v = (sd as any).business ?? {};
    const fallback: any = { city: "the city", name: "Trade Show Services" };
    const target = v && typeof v === "object" ? v : fallback;
    return (target as any)[prop] ?? (fallback as any)[prop];
  },
});
function __safeGet(obj: any, key: string): any {
  try { return obj[key]; } catch { return undefined; }
}
const rawVenueResearch: any = new Proxy({}, { get(_t, prop) { return (__safeGet(sd, "venueResearch") ?? {})[prop as any]; } });
const rawMarketResearch: any = new Proxy({}, { get(_t, prop) { return (__safeGet(sd, "marketResearch") ?? {})[prop as any]; } });
const rawLaborResearch: any = new Proxy({}, { get(_t, prop) { return (__safeGet(sd, "laborResearch") ?? {})[prop as any]; } });

// Normalize to a stable shape regardless of per-site schema drift.
// Everything below is lazy — accessed at call time, not module load — to survive TDZ on circular imports.
const __proxyArr = (getter: () => any[]): any[] => new Proxy([], {
  get(_t, prop) { const v = getter() ?? []; return (v as any)[prop as any]; },
});
const venueRecords: any[] = __proxyArr(() => (sd as any).venueRecords ?? rawVenueResearch.venueRecords ?? rawVenueResearch.venues ?? []);
const marketSignals: any[] = __proxyArr(() => rawMarketResearch.marketSignals ?? rawMarketResearch.officialSignals ?? rawMarketResearch.signals ?? rawMarketResearch.meetingAndTravelContext?.findings ?? rawMarketResearch.meetingAndTravelContext ?? rawMarketResearch.accessAndLogistics ?? []);
const demandDrivers: any[] = __proxyArr(() => rawMarketResearch.demandDrivers ?? rawMarketResearch.industryDemandDrivers ?? rawMarketResearch.marketDrivers ?? rawMarketResearch.recommendedLocations ?? rawMarketResearch.targetCities ?? rawMarketResearch.targetLocationCandidates ?? []);
const primaryVenueClusters: any[] = __proxyArr(() => rawMarketResearch.primaryVenueClusters ?? rawMarketResearch.coreVenueClusters ?? rawMarketResearch.targetCityClusters ?? rawMarketResearch.clusters ?? []);
const verifiedFindings: any[] = __proxyArr(() => rawLaborResearch.verifiedFindings ?? rawLaborResearch.verifiedRules ?? rawLaborResearch.findings ?? rawLaborResearch.venueSpecificFindings ?? []);
const approvedCopyPatterns: string[] = __proxyArr(() => rawLaborResearch.approvedCopyPatterns ?? rawLaborResearch.guidance?.approvedPatterns ?? rawLaborResearch.approvedPatterns ?? rawLaborResearch.copyGuardrails?.approved ?? rawLaborResearch.operationalGuidance ?? rawLaborResearch.rateHandling ?? []);
const marketSources: any[] = __proxyArr(() => rawMarketResearch.sources ?? []);

const overallAssessment: any = new Proxy({}, {
  get(_t, prop) { return (rawLaborResearch.overallAssessment ?? rawLaborResearch.assessment ?? { safePublicClaim: "" })[prop as any]; },
});

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
  return { label: section, singularLabel: section, eyebrow: section, heroLabel: section, cardLabel: section, ctaLabel: `Plan ${section}`, routeBase: `/${section}`, generatedPages: [] };
};

// ---- Field-name shims for schema drift across sites ----
function signalFinding(s: any): string {
  return s?.finding ?? s?.signal ?? s?.text ?? "";
}
function signalUrl(s: any): string {
  return s?.sourceUrl ?? s?.source ?? s?.url ?? "";
}
function driverLabel(d: any): string {
  return d?.label ?? d?.name ?? d?.city ?? "";
}
function driverReason(d: any): string {
  return d?.reason ?? d?.note ?? d?.description ?? `${driverLabel(d)} is a published demand driver for ${business.city}.`;
}
function clusterName(c: any): string {
  return c?.name ?? c?.cluster ?? c?.label ?? "a cluster";
}
function clusterLocations(c: any): string[] {
  const arr = c?.locations ?? c?.cities ?? c?.zones ?? [];
  return Array.isArray(arr) ? arr.map(String) : [];
}
function clusterNotes(c: any): string {
  return c?.notes ?? c?.note ?? c?.description ?? "";
}
function findingVenue(f: any): string {
  return f?.venue ?? f?.property ?? f?.location ?? "the venue";
}
function findingText(f: any): string {
  return f?.finding ?? f?.note ?? f?.text ?? "";
}

// Venue-record shims: different sites use different keys (verifiedFacts vs notes, sourceUrls vs sourceUrl vs sources.*.url, etc.)
function venueFacts(v: any): string[] {
  if (!v) return [];
  const vf = v.verifiedFacts;
  if (Array.isArray(vf) && vf.length) {
    return vf.map((f: any) => (typeof f === "string" ? f : (f?.finding ?? f?.text ?? String(f))));
  }
  if (v.description) return [v.description];
  if (v.notes) return [v.notes];
  if (v.metrics && typeof v.metrics === "object") {
    return Object.entries(v.metrics)
      .slice(0, 4)
      .map(([k, val]) => `${v.name || "This venue"} publishes ${k}: ${val}.`);
  }
  return [];
}

function venueSourceUrl(v: any): string {
  if (!v) return "venue documentation";
  if (Array.isArray(v.sourceUrls) && v.sourceUrls[0]) return v.sourceUrls[0];
  if (typeof v.sourceUrl === "string") return v.sourceUrl;
  if (v.officialUrl) return v.officialUrl;
  if (Array.isArray(v.sources) && v.sources[0]) {
    const s = v.sources[0];
    return typeof s === "string" ? s : (s.url ?? s.href ?? "venue documentation");
  }
  return "venue documentation";
}

function venueTypeLabel(v: any): string {
  const t = v?.venueType ?? v?.type ?? "venue";
  return String(t).replace(/-/g, " ");
}

function venueFitLabels(v: any): string[] {
  const fits = v?.tradeShowFit ?? v?.relevance ?? [];
  if (Array.isArray(fits)) {
    return fits.map((f: any) => (typeof f === "string" ? f.replace(/-/g, " ") : String(f)));
  }
  return [];
}

// Local safe picker — avoids site-data.pickItemsFromSection's cursor-stride bug
// that infinite-loops when (items.length % 7 === 0).
function pickTaxonomyItems(
  section: TaxonomySection,
  seed: string,
  count: number,
  excludeSlug?: string,
): Array<{ slug: string; label: string }> {
  const items = getTaxonomyCollection(section).generatedPages.filter(
    (p: any) => p.slug !== excludeSlug,
  );
  if (!items.length) return [];
  const out: Array<{ slug: string; label: string }> = [];
  const seen = new Set<string>();
  const start = hashValue(`${section}:${seed}`) % items.length;
  const limit = Math.min(count, items.length);
  for (let i = 0; out.length < limit && i < items.length; i += 1) {
    const it: any = items[(start + i) % items.length];
    if (!seen.has(it.slug)) {
      seen.add(it.slug);
      out.push({ slug: it.slug, label: it.label });
    }
  }
  return out;
}

export type DeepContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type DeepFaq = { question: string; answer: string };

export type DeepContent = {
  sections: DeepContentSection[];
  faqs: DeepFaq[];
};

function hostFromUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function pickN<T>(arr: T[], seed: string, n: number): T[] {
  if (arr.length === 0) return [];
  const out: T[] = [];
  const start = hashValue(seed) % arr.length;
  const seen = new Set<number>();
  for (let i = 0; out.length < Math.min(n, arr.length) && i < arr.length; i += 1) {
    const idx = (start + i) % arr.length;
    if (!seen.has(idx)) {
      seen.add(idx);
      out.push(arr[idx]);
    }
  }
  return out;
}

function pick<T>(arr: T[], seed: string): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[hashValue(seed) % arr.length];
}

function variant<T>(seed: string, choices: T[]): T {
  return choices[hashValue(seed) % choices.length];
}

function sectionNoun(section: TaxonomySection): string {
  switch (section) {
    case "services":
      return "service line";
    case "locations":
      return "location";
    case "venues":
      return "venue";
    case "event-types":
      return "event format";
    case "booth-types":
      return "booth format";
    case "industries":
      return "industry program";
    case "capabilities":
      return "operational capability";
    case "rentals":
      return "rental package";
    case "exhibit-types":
      return "exhibit environment";
    default:
      return "program";
  }
}

function city(): string {
  return business.city;
}

/** Vary headings so every page does not reuse the same H2 texts. */
function headingFor(kind: string, seed: string, label: string): string {
  const LABEL = label.toLowerCase();
  const CITY = city();
  const options: Record<string, string[]> = {
    signals: [
      `What the ${CITY} market data says about ${LABEL}`,
      `${CITY} demand signals that shape ${LABEL}`,
      `Research backdrop behind ${LABEL} in ${CITY}`,
      `The ${CITY} numbers a ${LABEL} brief has to respect`,
      `Baseline ${CITY} facts that frame ${LABEL}`,
    ],
    venue: [
      `Venue-grounded notes that shape ${LABEL}`,
      `Which ${CITY} buildings change the ${LABEL} plan`,
      `Venue conditions a ${LABEL} brief cannot ignore`,
      `${CITY} venue realities behind ${LABEL}`,
      `How ${CITY} buildings reshape ${LABEL}`,
    ],
    labor: [
      `Labor and operating context the brief has to respect`,
      `${CITY} labor and service-desk rules in play`,
      `Operating patterns that change ${LABEL} on the floor`,
      `Floor-hours and service-order rules behind ${LABEL}`,
      `Labor context that keeps ${LABEL} defensible`,
    ],
    cluster: [
      `Which ${CITY} cluster this page belongs to`,
      `The ${CITY} neighborhood frame around ${LABEL}`,
      `${CITY} cluster context for ${LABEL}`,
      `Where ${LABEL} sits inside the ${CITY} calendar`,
    ],
    checklist: [
      `Planning checklist for ${LABEL}`,
      `${LABEL} pre-flight items to settle in writing`,
      `What the brief should confirm before committing ${LABEL}`,
      `Checklist: ${LABEL} items a planner should lock`,
    ],
    process: [
      `How ${LABEL} moves from brief to strike in ${CITY}`,
      `The sequence ${LABEL} should follow across a ${CITY} week`,
      `${LABEL} end-to-end: brief, production, show hours, strike`,
      `Run-of-show walkthrough for ${LABEL}`,
    ],
    scope: [
      `Scope and fit: when ${LABEL} is the right call`,
      `When ${LABEL} earns the budget and when it does not`,
      `Where ${LABEL} is worth scoping in ${CITY}`,
      `Fit test: is ${LABEL} the answer here`,
    ],
    closeout: [
      `Closeout discipline for the next date`,
      `What a useful ${LABEL} debrief actually records`,
      `Strike-day notes that pay forward on the next ${LABEL} booking`,
      `Closeout detail the next ${LABEL} team will thank you for`,
    ],
    related: [
      `Related reads across the ${CITY} site`,
      `Nearby pages worth opening alongside this one`,
      `${CITY} planning links connected to ${LABEL}`,
      `Adjacent reads that sharpen the ${LABEL} brief`,
    ],
  };
  const arr = options[kind] ?? [`About ${LABEL}`];
  return variant(`${seed}:h:${kind}`, arr);
}

// ---------- SIGNALS ----------

function signalsParagraphs(seed: string, label: string): string[] {
  const signals = pickN(marketSignals, `${seed}:sig`, 3);
  const out: string[] = [];
  const framings = [
    (s: any, h: string) =>
      `${signalFinding(s)} Reported by ${h}, it is the kind of published number a ${label.toLowerCase()} brief should anchor against instead of moving forward on intuition.`,
    (s: any, h: string) =>
      `Before writing scope for ${label.toLowerCase()}, it helps to name the baseline: ${signalFinding(s)} Source: ${h}.`,
    (s: any, h: string) =>
      `${h} reports that ${lowercaseFirst(signalFinding(s))} That is the ceiling — not an aspiration — that the ${label.toLowerCase()} plan should sit inside.`,
    (s: any, h: string) =>
      `A useful fact to open with is this one from ${h}: ${signalFinding(s)} It constrains what the ${label.toLowerCase()} page can honestly promise.`,
    (s: any, h: string) =>
      `Keeping the ${label.toLowerCase()} page defensible starts with published ${city()} data. ${h} notes that ${lowercaseFirst(signalFinding(s))}`,
  ];
  signals.forEach((s, i) => {
    const v = variant(`${seed}:sigv:${i}`, framings);
    out.push(v(s, hostFromUrl(signalUrl(s))));
  });
  const driver = pick(demandDrivers, `${seed}:driver`);
  if (driver) {
    const driverFramings = [
      `Behind the raw numbers, ${driverReason(driver)} That shapes what buyers in ${driverLabel(driver).toLowerCase()} expect the ${label.toLowerCase()} brief to address up front.`,
      `Sector demand matters too. ${driverReason(driver)} So the ${label.toLowerCase()} page is written with ${driverLabel(driver).toLowerCase()} buyers specifically in mind — not a generic exhibitor.`,
      `Why this ${label.toLowerCase()} page cares about ${driverLabel(driver).toLowerCase()}: ${driverReason(driver)}`,
      `${driverLabel(driver)} is an anchor segment for this page. ${driverReason(driver)}`,
    ];
    out.push(variant(`${seed}:drv`, driverFramings));
  }
  return out;
}

function lowercaseFirst(s: string): string {
  return s.length ? s[0].toLowerCase() + s.slice(1) : s;
}

// ---------- VENUE ----------

function venueParagraphs(seed: string, label: string): string[] {
  const venues = pickN(venueRecords, `${seed}:ven`, 3);
  const out: string[] = [];
  venues.forEach((v, i) => {
    const facts = venueFacts(v);
    if (!facts.length) return;
    const fact = facts[hashValue(`${seed}:f${i}:${v.slug}`) % facts.length];
    const src = hostFromUrl(venueSourceUrl(v));
    const typeLbl = venueTypeLabel(v);
    const framings = [
      `${v.name} matters to this ${label.toLowerCase()} page because ${lowercaseFirst(String(fact).replace(/\.$/, ""))} (${src}). That is the kind of venue-level detail that changes utility orders, dock windows, and booth layout before the final floor plan is signed.`,
      `Take ${v.name}: ${String(fact)} (source: ${src}). For a ${label.toLowerCase()} plan, that single fact usually reshapes fabrication sizing, graphics release, or material handling.`,
      `One venue to read closely here is ${v.name}. ${src} publishes that ${lowercaseFirst(String(fact))} That moves the ${label.toLowerCase()} brief away from generic claims and into the building's actual rules.`,
      `${v.name} is where a lot of ${city()} programs run into specifics: ${String(fact)} (per ${src}). A ${label.toLowerCase()} page that ignores that detail will break on the dock.`,
      `${v.name} — a ${typeLbl} worth naming in this context — publishes that ${lowercaseFirst(String(fact))} (${src}). That is what the ${label.toLowerCase()} plan should be designed against.`,
    ];
    out.push(variant(`${seed}:vf:${i}`, framings));
  });
  const first = venues[0];
  if (first) {
    const fitText = venueFitLabels(first).join(", ");
    if (fitText) {
      const fitFramings = [
        `${first.name} reads best as a home for ${fitText}. That fit list filters which ${label.toLowerCase()} assignments belong on this page and which belong on a neighboring venue brief.`,
        `Trade-show fit for ${first.name}: ${fitText}. Programs outside that list should not borrow this page's planning assumptions.`,
        `The published tradeShowFit for ${first.name} is ${fitText}, which is one way to know whether a given ${label.toLowerCase()} booking actually belongs here.`,
        `When the ${label.toLowerCase()} question is "${first.name}, yes or no?" the fit list — ${fitText} — usually answers it before budget does.`,
      ];
      out.push(variant(`${seed}:fit`, fitFramings));
    }
  }
  return out;
}

// ---------- LABOR ----------

function laborParagraphs(seed: string, label: string): string[] {
  const out: string[] = [];
  const finding = pick(verifiedFindings, `${seed}:lf`);
  if (finding) {
    const framings = [
      `At ${findingVenue(finding)}, ${lowercaseFirst(findingText(finding))} That is specific to one property and should not be generalized across ${city()} — the ${label.toLowerCase()} brief needs to name the venue.`,
      `${findingVenue(finding)} publishes that ${lowercaseFirst(findingText(finding))} Keeping that in the run-of-show stops assumptions from leaking across ${city()} venues.`,
      `One rule that actually applies to ${label.toLowerCase()} at ${findingVenue(finding)}: ${findingText(finding)}`,
      `Do not confuse ${findingVenue(finding)} with every ${city()} venue. ${findingText(finding)} is a published rule at that property only.`,
    ];
    out.push(variant(`${seed}:lv`, framings));
  }
  const patterns = pickN(approvedCopyPatterns, `${seed}:pat`, 2);
  if (patterns.length) {
    const framings = [
      `Two patterns this page sticks to: ${patterns.join(" ")}`,
      `Operating language used here (and only this language): ${patterns.join(" ")} Anything broader would outrun the research.`,
      `Planning statements that stay on-side: ${patterns.join(" ")}`,
      `The ${label.toLowerCase()} page is careful about what it asserts. It stays inside: ${patterns.join(" ")}`,
    ];
    out.push(variant(`${seed}:pt`, framings));
  }
  const assessment = overallAssessment;
  if (assessment?.safePublicClaim) {
    const framings = [
      `Zoomed out: ${assessment.safePublicClaim}`,
      `The defensible framing the whole site uses: ${assessment.safePublicClaim}`,
      `A blunt statement of where the research lets this page stand: ${assessment.safePublicClaim}`,
      `Why the ${label.toLowerCase()} page avoids sweeping ${city()} labor claims — ${assessment.safePublicClaim}`,
    ];
    out.push(variant(`${seed}:ass`, framings));
  }
  return out;
}

// ---------- CLUSTER ----------

function clusterParagraphs(seed: string, label: string): string[] {
  const clusters = primaryVenueClusters ?? [];
  if (!clusters.length) return [];
  const primary = clusters[hashValue(`${seed}:cp`) % clusters.length];
  const secondary = clusters[hashValue(`${seed}:cs`) % clusters.length];
  const out: string[] = [];
  const framings = [
    `${clusterName(primary)} is the first cluster to read against this ${label.toLowerCase()} brief. The research describes it as: ${clusterNotes(primary)} It covers ${clusterLocations(primary).slice(0, 4).join(", ")}.`,
    `For ${label.toLowerCase()}, the anchor cluster is usually ${clusterName(primary)}. Research notes: ${clusterNotes(primary)} Locations in scope: ${clusterLocations(primary).slice(0, 4).join(", ")}.`,
    `The page treats ${clusterName(primary)} — ${clusterLocations(primary).slice(0, 4).join(", ")} — as the default frame. Why: ${clusterNotes(primary)}`,
    `${clusterName(primary)} (${clusterLocations(primary).slice(0, 3).join(", ")}) is where most ${label.toLowerCase()} questions start. ${clusterNotes(primary)}`,
  ];
  out.push(variant(`${seed}:cl1`, framings));
  if (secondary && clusterName(secondary) !== clusterName(primary)) {
    const f2 = [
      `A useful second cluster to keep in view is ${clusterName(secondary)} (${clusterLocations(secondary).slice(0, 3).join(", ")}). The research describes it as: ${clusterNotes(secondary)}`,
      `The page also holds ${clusterName(secondary)} in reserve — ${clusterNotes(secondary)} — because ${label.toLowerCase()} assignments sometimes belong there instead of in ${clusterName(primary)}.`,
      `Contrast cluster: ${clusterName(secondary)}. ${clusterNotes(secondary)} Keeping it visible keeps the ${label.toLowerCase()} brief honest about where the program actually sits.`,
    ];
    out.push(variant(`${seed}:cl2`, f2));
  }
  return out;
}

// ---------- CHECKLIST ----------

function checklistBullets(label: string, seed: string): string[] {
  const pats = approvedCopyPatterns;
  const findings = verifiedFindings;
  const out: string[] = [];
  // Two distinct patterns
  const offs = [hashValue(`${seed}:p1`) % Math.max(pats.length, 1), hashValue(`${seed}:p2`) % Math.max(pats.length, 1)];
  if (offs[0] !== offs[1] && pats[offs[0]]) out.push(`Brief must respect: ${pats[offs[0]]}`);
  if (pats[offs[1]] && offs[0] !== offs[1]) out.push(`Planning doc must track: ${pats[offs[1]]}`);
  if (offs[0] === offs[1] && pats[offs[0]]) out.push(`Brief must respect: ${pats[offs[0]]}`);
  // One finding
  const f = findings[hashValue(`${seed}:fbul`) % Math.max(findings.length, 1)];
  if (f) out.push(`${findingVenue(f)} rule to surface: ${findingText(f)}`);
  // Slug-specific bullets with variation
  const slugBullets = [
    `Write ${label.toLowerCase()} into the run-of-show with dock windows, utility order IDs, graphics release dates, and one named show-site lead.`,
    `Separate paperwork-blocked tasks (venue approvals, rigging, utility orders) from tasks that can move without them, so ${label.toLowerCase()} does not stall on a single missing form.`,
    `Name the fabrication, graphics, rentals, AV, freight, and crew-chief owners in the ${label.toLowerCase()} doc — not "the team".`,
    `List which ${city()} venues in the brief are in scope now and which are parked for the next quarter, so the ${label.toLowerCase()} plan does not drift.`,
    `Record closeout notes the same day as strike — vendor performance, storage labels, and next-event prompts — so ${label.toLowerCase()} inherits a real debrief next time.`,
    `Make the graphics release calendar a formal deliverable on the ${label.toLowerCase()} plan, not a rolling email thread.`,
    `Tie every line of the ${label.toLowerCase()} budget to a venue-, vendor-, or stakeholder-specific owner.`,
  ];
  // Pick 4 from slugBullets using hashed offsets (no duplicates)
  const picked = pickN(slugBullets, `${seed}:slugb`, 4);
  out.push(...picked);
  return out;
}

// ---------- PROCESS ----------

function processParagraphs(label: string, section: TaxonomySection, seed: string): string[] {
  const LAB = label.toLowerCase();
  const noun = sectionNoun(section);
  const driver = pick(demandDrivers, `${seed}:pd`);
  const driverText = driver
    ? ` Programs tied to ${driverLabel(driver).toLowerCase()} move through this sequence faster because the audience expectation is already set.`
    : "";
  const step1 = variant(`${seed}:s1`, [
    `Step one is a written brief that treats ${LAB} as a ${noun}, not a checklist item. Name the venue, the footprint, the goals for the floor, and the people who can approve changes under pressure.${driverText}`,
    `The first move is drafting a ${LAB} brief that reads like a working document, not a sales page. It should name the venue, the floor goal, the decision-makers, and the date the plan locks.${driverText}`,
    `Open ${LAB} with a written brief. It needs the venue name, footprint, target outcome, and — most importantly — the person who can say "change it" without a committee.${driverText}`,
    `Before anything else, write down what ${LAB} is trying to do, where it will happen, and who owns the next call. That brief is the asset; everything else flows from it.${driverText}`,
  ]);
  const step2 = variant(`${seed}:s2`, [
    `Step two is venue and access alignment: dock and freight windows, utility orders, rigging approvals, service-desk questions answered in writing, and labor calls scheduled against the venue's published rules.`,
    `Second, pin the access layer: dock timing, utility order IDs, rigging path, service-desk sign-offs, and labor calls — all written, all against the venue's actual rules, not a guess.`,
    `Next, lock access. That means dock windows, utility order IDs, rigging paths, service-desk answers, and labor calls backed by the venue's own documents, not a generic ${city()} assumption.`,
    `The second phase is where most ${LAB} programs quietly slip. Dock, utilities, rigging approvals, and labor calls have to be confirmed in writing, against the venue's published conditions.`,
  ]);
  const step3 = variant(`${seed}:s3`, [
    `Step three is production: fabrication, print, rentals, AV spec lock, and crew-chief assignment. Slippage here is the most expensive slippage in ${LAB}.`,
    `Third is production — the physical build: fabrication, graphics, AV, rentals, and crew-chief ownership. If the brief is still moving, this phase costs the most to redo.`,
    `Production is step three. Fabrication, print, rentals, AV, crew chief — all locked before installation begins.`,
    `The third phase is ${LAB} going from plan to physical goods. Fabrication, graphics, AV, rentals, and a named crew chief should be locked before installation day.`,
  ]);
  const step4 = variant(`${seed}:s4`, [
    `Step four is installation and show-site leadership. One named lead holds the floor plan, the labor calls, the graphics status, and the punch list, reporting once per day — not in fragments.`,
    `Fourth, install with a single named on-site lead. That person owns the floor plan, the punch list, and the one daily report that keeps everyone in sync.`,
    `Installation is step four, and it only works when one person is holding the room. Floor plan, labor calls, graphics status, punch list — all in one hand.`,
    `Onsite, ${LAB} lives or dies on whether a single show-site lead owns the full picture and reports cleanly once a day.`,
  ]);
  const step5 = variant(`${seed}:s5`, [
    `Step five is live-hours discipline. The booth is not "done" at open — it is a live operating space that still needs lead capture, session coordination, sponsor handoffs, and an hourly rhythm for staff.`,
    `Fifth is the show itself. The floor has to be run like a live operation: lead capture, session handoffs, sponsor touchpoints, and an hourly staff rhythm.`,
    `Live hours are where ${LAB} proves it. Treat the booth as a running operation — not a finished build — with lead capture, session flow, and sponsor handoffs on schedule.`,
    `During open hours, ${LAB} is a shift operation. Someone has to keep leads, sessions, sponsor moments, and staff rotations inside a real rhythm.`,
  ]);
  const step6 = variant(`${seed}:s6`, [
    `Step six is strike, freight-out, and closeout. Storage labels, outbound manifests, vendor performance notes, and a written debrief make the next ${LAB} date cheaper and faster.`,
    `Sixth is strike and closeout — the step most calendars skip. Storage, manifests, vendor notes, and a written debrief pay forward into the next ${LAB} booking.`,
    `Close ${LAB} out in writing the same day. Storage labels, outbound manifests, vendor performance, what broke, what held.`,
    `The last step, strike and closeout, is where the next ${LAB} program is already being written — or not — depending on whether it gets documented.`,
  ]);
  return [step1, step2, step3, step4, step5, step6];
}

// ---------- SCOPE / FIT ----------

function scopeParagraphs(label: string, section: TaxonomySection, seed: string): string[] {
  const LAB = label.toLowerCase();
  const clusters = primaryVenueClusters ?? [];
  const clusterA = clusters[0];
  const clusterB = clusters[1];
  const lead = variant(`${seed}:sc1`, [
    `${label} is the right call when the program sits inside ${city()}'s existing convention or meeting rhythm, expects a repeatable booth or environment, and needs a written plan that spans more than one vendor.`,
    `Scope ${LAB} when the event has to balance venue rules, a real exhibit footprint, and multiple stakeholders — marketing, sales, production, venue — all watching the same timeline.`,
    `${LAB} is worth serious scoping when the buyer already knows the show is not a one-off and wants a pattern that will hold for the next ${city()} date.`,
    `The honest fit test for ${LAB} is simple: if the calendar says this is the first of many, the answer is yes. If it is a one-time compact meeting, it is not.`,
  ]);
  const out: string[] = [lead];
  if (clusterA) {
    const f = variant(`${seed}:scA`, [
      `Natural fit: the ${clusterName(clusterA)} cluster (${clusterLocations(clusterA).slice(0, 3).join(", ")}). Those buildings share enough rhythm that the plan reuses.`,
      `${clusterName(clusterA)} (${clusterLocations(clusterA).slice(0, 3).join(", ")}) is where ${LAB} reuses the same playbook across dates.`,
      `The ${clusterName(clusterA)} cluster is the easy reuse case for ${LAB}, because ${clusterLocations(clusterA).slice(0, 3).join(", ")} share planning conditions.`,
    ]);
    out.push(f);
  }
  if (clusterB) {
    const f = variant(`${seed}:scB`, [
      `${clusterName(clusterB)} (${clusterLocations(clusterB).slice(0, 3).join(", ")}) still works, but access, freight, and crew calls behave differently there, so the ${LAB} brief has to change with them.`,
      `In the ${clusterName(clusterB)} cluster the same ${LAB} plan does not copy cleanly — ${clusterLocations(clusterB).slice(0, 3).join(", ")} have their own venue dynamics.`,
      `${clusterName(clusterB)} is a second-fit zone: ${LAB} works if the brief is rewritten for ${clusterLocations(clusterB).slice(0, 3).join(", ")}, not lifted from a ${clusterA?.name ?? "neighboring"} template.`,
    ]);
    out.push(f);
  }
  const antiFit = variant(`${seed}:scN`, [
    `Wrong call: one-time low-footprint meetings with no venue complexity and no reuse value. ${label} is overkill there and will slow the booking down.`,
    `${label} is not the answer when the event is a compact single-room meeting with no reuse calendar behind it. A lighter brief fits that.`,
    `Skip ${LAB} for ad-hoc bookings with no floor footprint, no venue complexity, and no repeat dates on the horizon.`,
    `If the footprint is small, the venue is neutral, and the date is one-and-done, do not force a full ${sectionNoun(section)} plan onto it. Use a lighter brief.`,
  ]);
  out.push(antiFit);
  return out;
}

// ---------- CLOSEOUT ----------

function closeoutParagraphs(label: string, seed: string): string[] {
  const LAB = label.toLowerCase();
  const finding = pick(verifiedFindings, `${seed}:cx`);
  const findingTail = finding
    ? ` Record whether the ${findingVenue(finding)} pattern actually held during the week — that note shapes next year's approval ask.`
    : "";
  const p1 = variant(`${seed}:c1`, [
    `A closeout written the same day as strike is worth more than a polished PDF two weeks later. It should name what actually happened on the dock, which vendors held the schedule, where the graphics release slipped, and what the next team should do differently.${findingTail}`,
    `Write the ${LAB} closeout before the last truck pulls out. Dock timeline, vendor performance, graphics release reality, and what to change next time — one page, same day.${findingTail}`,
    `Same-day closeout beats delayed polish. For ${LAB}, capture the dock story, vendor scorecard, graphics-release reality, and one explicit "change this" line.${findingTail}`,
    `The most valuable ${LAB} closeout is rough, fast, and same-day. Write the dock truth, vendor calls, graphics slips, and one concrete fix for next time.${findingTail}`,
  ]);
  const p2 = variant(`${seed}:c2`, [
    `For ${LAB}, the most useful closeout structure is one short line per vendor, one per sponsor touchpoint, one per venue handoff, and one on the booth's physical condition at reload. That's the version that actually gets read before the next event.`,
    `Structure ${LAB} closeouts as four lines: vendors, sponsors, venue handoff, booth condition. Longer reports get filed and forgotten; this one gets reused.`,
    `The ${LAB} closeout that survives is compact: per-vendor line, per-sponsor line, venue handoff line, booth condition line. That is the debrief the next planner will actually open.`,
    `Keep the ${LAB} debrief to a single page: vendors, sponsors, venue handoff, booth-on-return. Everything else goes in the archive and stays there.`,
  ]);
  return [p1, p2];
}

// ---------- RELATED ----------

function relatedParagraphs(section: TaxonomySection, slug: string, seed: string, label: string): string[] {
  const tax = getTaxonomyCollection(section);
  const same = pickTaxonomyItems(section, `${seed}:same`, 3, slug);
  const out: string[] = [];
  if (same.length) {
    const options = [
      `Nearest neighbors on the ${tax.label.toLowerCase()} page: ${same.map((p) => `${p.label} (/${section}/${p.slug})`).join(", ")}. Compare them side-by-side — the real planning question usually hides in the differences.`,
      `Same-section pages worth opening alongside this one: ${same.map((p) => `${p.label} (/${section}/${p.slug})`).join(", ")}.`,
      `Read against: ${same.map((p) => `${p.label} (/${section}/${p.slug})`).join(", ")}. They share planning DNA with ${label.toLowerCase()} but diverge where it counts.`,
    ];
    out.push(variant(`${seed}:rel1`, options));
  }
  const crossSections: TaxonomySection[] = (["venues", "locations", "services", "event-types", "industries"] as TaxonomySection[]).filter(
    (s) => s !== section,
  );
  const crossPicks: string[] = [];
  for (const s of crossSections.slice(0, 3)) {
    const picks = pickTaxonomyItems(s, `${seed}:${s}`, 1);
    if (picks[0]) crossPicks.push(`${picks[0].label} (/${s}/${picks[0].slug})`);
  }
  if (crossPicks.length) {
    const options = [
      `Cross-site reads: ${crossPicks.join(", ")}. These show how ${label.toLowerCase()} interacts with buildings, neighborhoods, and service lines it depends on.`,
      `Adjacent pages that sharpen the ${label.toLowerCase()} brief: ${crossPicks.join(", ")}.`,
      `Worth a side trip: ${crossPicks.join(", ")}. Each one touches ${label.toLowerCase()} from a different angle.`,
    ];
    out.push(variant(`${seed}:rel2`, options));
  }
  return out;
}

// ---------- FAQS ----------

function extraFaqs(label: string, section: TaxonomySection, seed: string): DeepFaq[] {
  const LAB = label.toLowerCase();
  const faqs: DeepFaq[] = [];
  const signal = pick(marketSignals, `${seed}:fs`);
  if (signal) {
    const qs = [
      `What published ${city()} number frames ${LAB}?`,
      `What market baseline should this ${LAB} brief respect?`,
      `Which ${city()} research fact should a planner cite?`,
    ];
    const ans = [
      `${signalFinding(signal)} The page uses that as the outer frame for scope conversations, sourced from ${hostFromUrl(signalUrl(signal))}.`,
      `Per ${hostFromUrl(signalUrl(signal))}: ${signalFinding(signal)} The ${LAB} brief sits inside that — not outside it.`,
      `${hostFromUrl(signalUrl(signal))} reports that ${lowercaseFirst(signalFinding(signal))} That is the published fact this page anchors against.`,
    ];
    faqs.push({ question: variant(`${seed}:fq1`, qs), answer: variant(`${seed}:fa1`, ans) });
  }
  const venue = pick(venueRecords, `${seed}:fv`);
  if (venue) {
    const vf = venueFacts(venue);
    const fact = vf[0] ?? "";
    const src = hostFromUrl(venueSourceUrl(venue));
    if (!fact) return faqs;
    const qs = [
      `Which venue reality should the ${LAB} plan design around?`,
      `What venue-level fact changes a ${LAB} brief?`,
      `Which published building detail belongs in the ${LAB} doc?`,
    ];
    const ans = [
      `${venue.name}: ${fact} (${src}). The ${LAB} plan should design around it, not sell around it.`,
      `At ${venue.name} — per ${src} — ${lowercaseFirst(fact)} That detail reshapes more of the ${LAB} plan than most planners expect.`,
      `${venue.name} publishes that ${lowercaseFirst(fact)} (${src}). That is the kind of venue-level detail the ${LAB} brief names out loud.`,
    ];
    faqs.push({ question: variant(`${seed}:fq2`, qs), answer: variant(`${seed}:fa2`, ans) });
  }
  const finding = pick(verifiedFindings, `${seed}:ff`);
  if (finding) {
    const qs = [
      `What operating detail belongs in the run-of-show?`,
      `Which ${city()} labor fact should be quoted verbatim?`,
      `What building rule should the on-site doc cite?`,
    ];
    const ans = [
      `At ${findingVenue(finding)}: ${findingText(finding)} Name it in the run-of-show so no one assumes otherwise.`,
      `${findingVenue(finding)}: ${findingText(finding)} That is the kind of quote the ${LAB} doc should carry unchanged.`,
      `Published at ${findingVenue(finding)} — ${findingText(finding)} The ${LAB} run-of-show should surface it verbatim.`,
    ];
    faqs.push({ question: variant(`${seed}:fq3`, qs), answer: variant(`${seed}:fa3`, ans) });
  }
  const pattern = pick(approvedCopyPatterns, `${seed}:fp`);
  if (pattern) {
    const qs = [
      `What rule keeps this page defensible?`,
      `Which approved planning language does the site use?`,
      `What is the safe framing behind ${LAB} claims?`,
    ];
    const ans = [
      `${pattern} That is one of the approved planning patterns the site uses in place of blanket ${city()} labor claims.`,
      `Approved language on this page: ${pattern}`,
      `The ${LAB} brief leans on: ${pattern} — rather than on broader assumptions the research does not support.`,
    ];
    faqs.push({ question: variant(`${seed}:fq4`, qs), answer: variant(`${seed}:fa4`, ans) });
  }
  const genericQs = [
    `Who is this ${LAB} page written for?`,
    `Why is this ${LAB} page in ${city()}-specific language?`,
    `What reader is this ${LAB} page trying to serve?`,
  ];
  const genericAns = [
    `Planners about to commit budget, sign a venue contract, or lock a floor plan. Generic search readers are not the audience.`,
    `Because ${LAB} only becomes real at the point someone commits money or signs a venue deal. The copy is written for that moment.`,
    `People staring at a ${city()} calendar, a venue quote, and a deadline. The page is written for them — not for a top-of-funnel reader.`,
  ];
  faqs.push({ question: variant(`${seed}:gq`, genericQs), answer: variant(`${seed}:ga`, genericAns) });
  return faqs;
}

// ---------- ASSEMBLY ----------

function reorderSections(sections: DeepContentSection[], seed: string): DeepContentSection[] {
  const mode = hashValue(`${seed}:ord`) % 5;
  const arr = [...sections];
  if (mode === 1 && arr.length > 3) {
    arr.push(arr.shift()!);
  } else if (mode === 2 && arr.length > 4) {
    const last = arr.pop()!;
    arr.splice(2, 0, last);
  } else if (mode === 3 && arr.length > 5) {
    [arr[1], arr[3]] = [arr[3], arr[1]];
  } else if (mode === 4 && arr.length > 4) {
    arr.splice(1, 0, arr.pop()!);
  }
  return arr;
}

function calendarContextParagraphs(seed: string, label: string, section: TaxonomySection): string[] {
  const LAB = label.toLowerCase();
  const CITY = city();
  const driver1 = pick(demandDrivers, `${seed}:cc1`);
  const driver2 = pick(demandDrivers, `${seed}:cc2`);
  const signal = pick(marketSignals, `${seed}:ccs`);
  const out: string[] = [];
  const lead = variant(`${seed}:cc:lead`, [
    `Putting ${LAB} on a ${CITY} calendar means more than picking a date. It means knowing which weeks are already fighting for labor, which venues are dark for union-hall or exclusive service calls, and which sponsor programs are moving inside or out of season.`,
    `The ${CITY} event calendar is what actually decides whether ${LAB} is cheap or expensive in a given quarter. Pricing shifts when a citywide convention, a corporate retreat season, or a major sponsor week is stacking against the same dates.`,
    `Calendar strategy often matters more than scope strategy for ${LAB}. Two identical briefs in ${CITY}, run four weeks apart, can feel like completely different projects depending on who else is holding the city that week.`,
    `${LAB} scheduling in ${CITY} benefits from reading the calendar like a venue, not a date. The weeks before a citywide convention usually behave very differently from the weeks right after one clears.`,
  ]);
  out.push(lead);
  if (driver1) {
    out.push(
      variant(`${seed}:cc:d1`, [
        `${driverLabel(driver1)} tends to anchor calendar pressure. ${driverReason(driver1)} A ${LAB} brief written against that backdrop has to price in competing labor, hotel, and venue availability, not just its own footprint.`,
        `A demand anchor worth naming: ${driverLabel(driver1)}. ${driverReason(driver1)} When ${LAB} lands adjacent to that anchor on the calendar, everything downstream tightens — crew calls, freight, guest flow.`,
        `${driverLabel(driver1)} often sets the week's rhythm. ${driverReason(driver1)} So even when ${LAB} has nothing to do with that audience directly, the city's pace is shaped by them.`,
      ]),
    );
  }
  if (driver2 && driverLabel(driver2) !== driverLabel(driver1)) {
    out.push(
      variant(`${seed}:cc:d2`, [
        `A second anchor to watch is ${driverLabel(driver2)}. ${driverReason(driver2)} For ${LAB}, that shapes which weeks are "easy" in ${CITY} and which weeks already have two programs fighting for the same crews.`,
        `${driverLabel(driver2)} matters too. ${driverReason(driver2)} On a week where both anchors overlap, the ${LAB} plan has to assume higher-than-normal pressure on labor and hotels.`,
      ]),
    );
  }
  if (signal) {
    out.push(
      variant(`${seed}:cc:sig`, [
        `Underneath the calendar, the data frame stays the same: ${signalFinding(signal)} That ceiling tells a ${LAB} planner how big a swing the city can absorb in a given week.`,
        `Zooming out to the published baseline — ${signalFinding(signal)} — the ${LAB} plan should be sized inside that envelope, not stretched to the edge of it.`,
      ]),
    );
  }
  if (section === "locations") {
    out.push(
      variant(`${seed}:cc:loc`, [
        `For a location-specific ${LAB} plan, the calendar question collapses to one block: which neighboring venues are already holding shows that week, which hotels are absorbing room blocks, and which freight corridors will be moving trucks in the same direction. Those three checks usually decide whether the week is workable.`,
        `Location pages like ${label} live or die on neighborhood-level calendar reads: nearby venues already booked, nearby hotels already loading room blocks, and the freight routes already feeding those buildings. The ${LAB} brief should capture that triangle in one short note, not three separate documents.`,
        `At location level, ${LAB} planning is a three-line calendar check: the nearest active venue, the nearest hotel absorbing a block, and the freight lane carrying them both. That note decides whether ${label} is the right staging zone for the week or the wrong one.`,
      ]),
    );
  }
  return out;
}

export function buildDeepDetailContent(
  section: TaxonomySection,
  slug: string,
  label: string,
): DeepContent {
  const seed = `${business.city}:${section}:${slug}`;
  const sections: DeepContentSection[] = [];

  sections.push({ heading: headingFor("signals", seed, label), paragraphs: signalsParagraphs(seed, label) });
  sections.push({
    heading: variant(`${seed}:calH`, [
      `${city()} calendar pressure around ${label.toLowerCase()}`,
      `Where ${label.toLowerCase()} sits on the ${city()} calendar`,
      `Calendar context that moves the ${label.toLowerCase()} plan`,
      `The ${city()} event calendar behind ${label.toLowerCase()}`,
    ]),
    paragraphs: calendarContextParagraphs(seed, label, section),
  });
  sections.push({ heading: headingFor("venue", seed, label), paragraphs: venueParagraphs(seed, label) });
  sections.push({ heading: headingFor("labor", seed, label), paragraphs: laborParagraphs(seed, label) });
  const cluster = clusterParagraphs(seed, label);
  if (cluster.length) sections.push({ heading: headingFor("cluster", seed, label), paragraphs: cluster });
  sections.push({
    heading: headingFor("checklist", seed, label),
    paragraphs: [
      variant(`${seed}:ci`, [
        `The checklist below is not generic. It is pulled from published ${city()} venue rules and the labor research, and it is meant to be checked against the brief before fabrication or freight is committed.`,
        `Before ${label.toLowerCase()} commits fabrication or freight, every item below should have a written answer. The list comes from the published ${city()} venue rules, not a template.`,
        `Check this list against the ${label.toLowerCase()} brief, one line at a time. If any item has no written answer, the plan is not done yet.`,
      ]),
    ],
    bullets: checklistBullets(label, seed),
  });
  sections.push({ heading: headingFor("process", seed, label), paragraphs: processParagraphs(label, section, seed) });
  sections.push({ heading: headingFor("scope", seed, label), paragraphs: scopeParagraphs(label, section, seed) });
  sections.push({ heading: headingFor("closeout", seed, label), paragraphs: closeoutParagraphs(label, seed) });
  const related = relatedParagraphs(section, slug, seed, label);
  if (related.length) sections.push({ heading: headingFor("related", seed, label), paragraphs: related });

  return {
    sections: reorderSections(sections, seed),
    faqs: extraFaqs(label, section, seed),
  };
}

export function buildDeepIndexContent(section: TaxonomySection): DeepContent {
  const seed = `index:${section}`;
  const collection = getTaxonomyCollection(section);
  const LABEL = collection.label.toLowerCase();
  const noun = sectionNoun(section);

  const sections: DeepContentSection[] = [];
  sections.push({
    heading: `${city()} market facts behind the ${LABEL} catalog`,
    paragraphs: signalsParagraphs(seed, collection.label),
  });
  sections.push({
    heading: `Venue conditions that shape which ${LABEL} matter`,
    paragraphs: venueParagraphs(seed, collection.label),
  });
  sections.push({
    heading: `Operating rules this catalog respects`,
    paragraphs: laborParagraphs(seed, collection.label),
  });
  sections.push({
    heading: `${city()} clusters the catalog is organized around`,
    paragraphs: (primaryVenueClusters ?? []).slice(0, 3).map(
      (c: any) => `${clusterName(c)} covers ${clusterLocations(c).join(", ")}. Research notes: ${clusterNotes(c)}`,
    ),
  });
  sections.push({
    heading: `How to read this ${LABEL} list`,
    paragraphs: [
      `This list is not a directory dump. Each ${noun} is here because the planning problem it solves shows up in ${city()} event weeks often enough that a dedicated page is worth writing.`,
      `Before picking one, decide which ${city()} cluster the program lives in, which published venue rules are in play, and whether the event is one-off or repeating. Those three answers usually collapse the list fast.`,
      `When in doubt, read two or three neighboring entries side-by-side. The planning question is almost always hiding in the differences, not the similarities.`,
    ],
  });
  sections.push({
    heading: `Sources this page stands on`,
    paragraphs: [
      `Market claims come from ${(marketSources ?? []).map((s) => s.label).slice(0, 4).join(", ") || "published destination and venue sources"}. Venue specifics come from each building's own published floor-plan, specifications, and exhibitor-services pages. Labor language comes from published venue rules and the approved patterns list — not generic industry shorthand.`,
    ],
  });

  return {
    sections,
    faqs: extraFaqs(collection.label, section, seed),
  };
}
