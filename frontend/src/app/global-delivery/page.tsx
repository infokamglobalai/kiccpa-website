import type { Metadata } from "next";
import { GlobalPage } from "@/kam/Pages";

export const metadata: Metadata = {
  title: "Global Delivery",
  description: "Technology sourcing in India, operations in the Philippines, and named enquiry contacts elsewhere.",
};

export default function Page() {
  return <GlobalPage />;
}
