import type { Metadata } from "next";
import ServicesView from "@/kam/ServicesView";

export const metadata: Metadata = {
  title: "Services",
  description: "Technology and AI, business outsourcing, and HR recruitment enquiries from KICCPA.",
};

export default function Page() {
  return <ServicesView />;
}
