import type { Metadata } from "next";
import { SEO } from "./learnxContent";

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: [...SEO.keywords],
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    type: "website",
  },
};

export default function LearnXLayout({ children }: { children: React.ReactNode }) {
  return children;
}
