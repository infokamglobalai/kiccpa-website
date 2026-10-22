import type { Metadata } from "next";
import ServiceDetail from "@/kam/ServiceDetail";

export const metadata: Metadata = {
  title: "HR & Recruitment",
  description: "Recruitment enquiries by sector. Not a list of open jobs, and no placement is promised.",
};

export default function Page() {
  return <ServiceDetail slug="hr-recruitment" />;
}
