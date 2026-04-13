import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Investors | KICCPA LMS",
  description: "Academic ROI, payback periods, and governance-ready reporting for boards.",
};

export default function InvestorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
