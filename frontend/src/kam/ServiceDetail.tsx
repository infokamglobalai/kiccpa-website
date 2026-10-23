import { notFound } from "next/navigation";
import DivisionView from "./DivisionView";
import SingleServiceView from "./SingleServiceView";
import SingleSectorView from "./SingleSectorView";
import { serviceBySlug } from "./home-content";

export default function ServiceDetail({ slug }: { slug: string }) {
  const found = serviceBySlug(slug);
  if (!found) notFound();
  const { division, item } = found;

  // 1. Division Pages (Technology & AI, Business Outsourcing, HR & Recruitment)
  if (!item) {
    return <DivisionView division={division} slug={slug} />;
  }

  // 2. Sector Pages (HR & Recruitment sectors)
  if (division.id === "hr") {
    return <SingleSectorView division={division} item={item} slug={slug} />;
  }

  // 3. Service Pages (AI & Automation, Software, Cloud & Data, IT Support, Customer Support, Sales, Back Office, Virtual Assistants)
  return <SingleServiceView division={division} item={item} slug={slug} />;
}
