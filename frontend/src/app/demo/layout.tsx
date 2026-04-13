import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Live Demo | KICCPA",
  description: "Schedule a live, personalised walkthrough of the KICCPA LMS — no commitment.",
};

export default function DemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
