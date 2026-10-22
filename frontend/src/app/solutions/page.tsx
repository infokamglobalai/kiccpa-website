import type { Metadata } from "next";
import { SolutionsPage } from "@/kam/Pages";

export const metadata: Metadata = {
  title: "Products & Digital Platforms",
  description: "LearnX, EduAiTutors, and the KICCPA LMS packages already described on this website.",
};

export default function Page() {
  return <SolutionsPage />;
}
