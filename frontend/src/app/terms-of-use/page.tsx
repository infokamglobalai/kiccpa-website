import type { Metadata } from "next";
import { LegalPage } from "@/kam/Pages";

export const metadata: Metadata = { title: "Terms of use", description: "Rules for using the KICCPA website." };

export default function Page() {
  return <LegalPage kind="terms" />;
}
