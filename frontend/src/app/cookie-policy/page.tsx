import type { Metadata } from "next";
import { LegalPage } from "@/kam/Pages";

export const metadata: Metadata = { title: "Cookie policy", description: "What KICCPA stores in the browser and how to change or clear it." };

export default function Page() {
  return <LegalPage kind="cookies" />;
}
