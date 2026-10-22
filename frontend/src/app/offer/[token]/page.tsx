import type { Metadata } from "next";
import OfferPack from "./OfferPack";

export const metadata: Metadata = {
  title: "Joining steps",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <OfferPack token={token} />;
}
