import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Parents | KICCPA LMS",
  description: "Daily visibility into your child's learning — engagement, progress, and Arabic support.",
};

export default function ParentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
