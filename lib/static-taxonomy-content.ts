import rawStaticTaxonomyContent from "../content/static-taxonomy-content.json";

type StaticSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type StaticFaq = {
  question: string;
  answer: string;
};

type StaticIndexContent = {
  title: string;
  lead: string;
  intro: string[];
  ctaTitle: string;
  ctaText: string;
  deepSections?: StaticSection[];
  deepFaqs?: StaticFaq[];
  sourceUrls?: string[];
  complianceFlags?: string[];
};

type StaticDetailContent = {
  title: string;
  heroLead: string;
  intro: string[];
  focusHeading: string;
  focusList: string[];
  sections: StaticSection[];
  faqTitle: string;
  faqs: StaticFaq[];
  seoTitle: string;
  seoDescription: string;
  ctaTitle: string;
  ctaText: string;
  sourceUrls?: string[];
  complianceFlags?: string[];
};

type StaticTaxonomyContent = {
  version?: number;
  generatedAt?: string | null;
  site?: {
    name?: string;
    domain?: string;
    mode?: "static-only" | "mixed";
  } | null;
  index?: Record<string, StaticIndexContent>;
  details?: Record<string, Record<string, StaticDetailContent>>;
};

const content = (rawStaticTaxonomyContent ?? {}) as unknown as StaticTaxonomyContent;

export function getStaticTaxonomyIndexContent(section: string): StaticIndexContent | null {
  return content.index?.[section] ?? null;
}

export function getStaticTaxonomyDetailContent(section: string, slug: string): StaticDetailContent | null {
  return content.details?.[section]?.[slug] ?? null;
}

export function isStaticTaxonomyOnly(): boolean {
  return content.site?.mode === "static-only";
}
