import type { Metadata } from "next";
import HomePage from "@/kam/HomePage";

export const metadata: Metadata = {
  title: "KICCPA",
  description:
    "Technology, cloud, business operations, and workforce solutions from KICCPA. Explore services or send an enquiry.",
};

export default function Page() {
  return <HomePage />;
}
