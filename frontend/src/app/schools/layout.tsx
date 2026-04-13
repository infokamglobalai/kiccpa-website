import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Schools | KICCPA LMS",
  description: "Measurable outcomes and operational efficiency for school owners and leaders.",
};

export default function SchoolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
