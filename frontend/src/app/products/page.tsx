import type { Metadata } from "next";
import ProductsView from "@/kam/ProductsView";

export const metadata: Metadata = {
  title: "Products",
  description: "LearnX, EduAiTutors, and the EduAiTutors learning address. Each link opens the live product site.",
};

export default function ProductsPage() {
  return <ProductsView />;
}
