/** Canonical site URL for metadata, sitemap, and JSON-LD */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://anthrachitte.in";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export const SITE_NAME = "Anthra Chitte";

export const defaultDescription =
  "Elegant, warm, traditional yet clean fashion. Shop handcrafted sarees, linen digital prints, Ganga Pattu, Flexifit dresses, and maternity wear. Heartcrafted in India.";
