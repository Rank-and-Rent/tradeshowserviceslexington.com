import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFrame } from "@/components/SiteFrame";
import { TaxonomyIndexPage } from "@/components/TaxonomyIndexPage";
import {
  activeTaxonomySections,
  business,
  getTaxonomyCollection,
  isTaxonomySection
} from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return activeTaxonomySections.map((section) => ({
    section
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;

  if (!isTaxonomySection(section)) {
    return {};
  }

  const collection = getTaxonomyCollection(section);

  return {
    title: `${collection.label} | ${business.name}`,
    description: `${business.name} provides ${business.city} ${collection.label.toLowerCase()} with venue-aware planning, project-led execution, logistics, labor coordination, AV integration, and show-site control.`,
    alternates: {
      canonical: collection.routeBase
    }
  };
}

export default async function TaxonomyIndexRoute({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!isTaxonomySection(section)) {
    notFound();
  }

  return (
    <SiteFrame>
      <TaxonomyIndexPage section={section} />
    </SiteFrame>
  );
}
