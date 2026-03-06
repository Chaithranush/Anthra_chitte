import { MetadataRoute } from "next";
import { getProducts } from "@/lib/data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anthrachitte.com";

const categorySlugs = [
  "best-sellers",
  "new-launches",
  "occasions",
  "sarees-by-fabric",
  "sarees-by-colour",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...categoryEntries,
    ...productEntries,
  ];
}
