import type { Metadata } from "next";
import { CareersPage } from "@/kam/Pages";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles published by the KICCPA hiring team, with a full application for each role.",
};

export default function Page() {
  return <CareersPage />;
}
