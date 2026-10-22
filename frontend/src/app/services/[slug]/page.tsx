import type { Metadata } from "next";
import ServiceDetail from "@/kam/ServiceDetail";
import { allServiceSlugs, serviceBySlug } from "@/kam/home-content";

export function generateStaticParams() {
  return allServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = serviceBySlug(slug);
  const title = found?.item?.title || found?.division.title || "Service";
  return { title, description: found?.item?.summary || found?.division.intro || "KICCPA service enquiry." };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetail slug={slug} />;
}
