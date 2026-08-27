import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

const routes: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/personal", priority: 0.8 },
  { path: "/personal/enquiry", priority: 0.6 },
  { path: "/business", priority: 0.8 },
  { path: "/community", priority: 0.7 },
  { path: "/contact-us", priority: 0.7 },
  { path: "/support", priority: 0.8 },
  { path: "/locate", priority: 0.6 },
  { path: "/switch", priority: 0.7 },
  { path: "/accessibility", priority: 0.6 },
  { path: "/financial-abuse", priority: 0.5 },
  { path: "/financial-difficulty", priority: 0.5 },
  { path: "/terms", priority: 0.4 },
  { path: "/important-info", priority: 0.4 },
  { path: "/privacy", priority: 0.4 },
  { path: "/security", priority: 0.5 },
  { path: "/target-market", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
