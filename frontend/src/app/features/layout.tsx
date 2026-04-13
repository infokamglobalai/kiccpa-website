import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features | KICCPA",
  description: "KICCPA LMS platform capabilities — adaptive learning, analytics, and bilingual engagement.",
};

export default function FeaturesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
