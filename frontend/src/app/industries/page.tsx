import type { Metadata } from "next";
import { IndustriesPage } from "@/kam/Pages";

export const metadata: Metadata = {
  title: "Industries",
  description: "Education and enterprise contexts already on this site, plus industries open for discussion.",
};

export default function Page() {
  return <IndustriesPage />;
}
