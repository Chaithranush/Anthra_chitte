import type { Metadata } from "next";
import { getSiteUrl, SITE_NAME } from "@/lib/seo";

const title = "Blouses";
const description = `Designer blouses to pair with your sarees — coming soon at ${SITE_NAME}. Browse sarees and traditional wear meanwhile.`;
const path = "/category/blouses";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: `${getSiteUrl().replace(/\/$/, "")}${path}`,
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
  },
  twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description },
  robots: { index: true, follow: true },
};

export default function BlousesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
