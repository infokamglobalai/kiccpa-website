import type { Metadata } from "next";
import SubscribeAction from "@/kam/SubscribeAction";

export const metadata: Metadata = { title: "Confirm updates", robots: { index: false, follow: false } };

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <SubscribeAction mode="confirm" token={token || ""} />;
}
