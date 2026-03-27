import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFrame } from "@/components/SiteFrame";
import { TaxonomyDetailPage } from "@/components/TaxonomyDetailPage";
import { buildDetailPageContent } from "@/lib/content";
import {
  activeCollections,
  getTaxonomyItem,
  isTaxonomySection
} from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return activeCollections.flatMap((collection) =>
    collection.generatedPages.map((page) => ({
      section: collection.section,
      slug: page.slug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;

  if (!isTaxonomySection(section) || !getTaxonomyItem(section, slug)) {
    return {};
  }

  const content = buildDetailPageContent(section, slug);

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: {
      canonical: `/${section}/${slug}`
    }
  };
}

export default async function TaxonomyDetailRoute({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;

  if (!isTaxonomySection(section) || !getTaxonomyItem(section, slug)) {
    notFound();
  }

  return (
    <SiteFrame>
      <TaxonomyDetailPage section={section} slug={slug} />
    </SiteFrame>
  );
}
