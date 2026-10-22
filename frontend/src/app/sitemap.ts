import type { MetadataRoute } from "next";

const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kiccpa.com";

const routes = [
  "",
  "/about",
  "/services",
  "/services/it-digital-solutions",
  "/services/cloud-devops",
  "/services/bot-offshore-delivery",
  "/services/business-process-outsourcing",
  "/services/hr-recruitment",
  "/solutions",
  "/industries",
  "/global-delivery",
  "/contact",
  "/careers",
  "/insights",
  "/privacy-policy",
  "/terms-of-use",
  "/cookie-policy",
  "/products",
  "/demo",
  "/resources",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: new URL(path || "/", origin).toString(),
    lastModified: new Date(),
  }));
}
