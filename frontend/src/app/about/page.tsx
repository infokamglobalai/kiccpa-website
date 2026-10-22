import type { Metadata } from "next";
import { AboutPage } from "@/kam/Pages";

export const metadata: Metadata = {
  title: "About Us",
  description: "KICCPA is Kuwait International Company for Computer Programming Activities. Software, learning platforms, and business solutions described across the existing services.",
};

export default function Page() {
  return <AboutPage />;
}
