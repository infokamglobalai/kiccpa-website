import type { Metadata } from "next";
import { LegalPage } from "@/kam/Pages";

export const metadata: Metadata = { title: "Privacy policy", description: "How KICCPA handles information sent through this website." };

export default function Page() {
  return <LegalPage kind="privacy" />;
}
