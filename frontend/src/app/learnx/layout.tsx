import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LearnX — Vision & Mission | KICCPA",
  description:
    "LearnX: AI-powered education and digital transformation for Kuwait and the GCC. Vision, mission, and alignment with Kuwait Vision 2035.",
};

export default function LearnXLayout({ children }: { children: React.ReactNode }) {
  return children;
}
