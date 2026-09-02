import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioSite } from "../../components/portfolio-site";
import { CATEGORY_SEO, CATEGORY_SLUGS, isCategorySlug } from "../../lib/categories";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;

  if (!isCategorySlug(category)) {
    return {};
  }

  const seo = CATEGORY_SEO[category];
  const url = `https://inspiremedia.site/${category}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Inspire Media",
      title: `${seo.title} | Inspire Media Dubai`,
      description: seo.description,
      locale: "en_AE",
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;

  if (!isCategorySlug(category)) {
    notFound();
  }

  return <PortfolioSite page={category} />;
}
