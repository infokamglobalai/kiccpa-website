import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/kam/Blocks";
import { industries } from "@/kam/site";
import styles from "@/kam/kam.module.css";

const extra = {
  government: {
    slug: "government",
    title: "Government",
    image: "/assets/industries/enterprise.jpg",
    alt: "A formal meeting room.",
    text: "Public-sector digital work can be discussed. This page does not claim a delivered government programme, a certification, or a sovereign-cloud product.",
    verified: false,
  },
};

export function generateStaticParams() {
  return [...industries.map((item) => item.slug), "government"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = industries.find((entry) => entry.slug === slug) || (slug === "government" ? extra.government : null);
  return { title: item ? item.title : "Industry" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = industries.find((entry) => entry.slug === slug) || (slug === "government" ? extra.government : null);
  if (!item) notFound();

  return (
    <main>
      <PageHero eyebrow="Industry" title={item.title} lede={item.text} />
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div className={styles.frame}>
            <img src={item.image} alt={item.alt} />
          </div>
          <div>
            <p className={styles.muted}>
              {item.verified
                ? "This context is already represented by products or service descriptions on this website."
                : "No completed project in this industry is published here. Use the contact form if you want to discuss a requirement."}
            </p>
            <div className={styles.rowBtns}>
              <Link className={`${styles.btn} ${styles.btnDark}`} href="/contact">Discuss a requirement</Link>
              <Link className={`${styles.btn} ${styles.btnLine}`} href="/industries">All industries</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
