import type { Metadata } from "next";
import { Sora, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const sora = Sora({ 
  subsets: ["latin"], 
  variable: "--font-b",
  weight: ["300", "400", "500", "600", "700", "800"]
});

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"], 
  variable: "--font-h",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "KICCPA | Where It Meets AI",
  description: "Advanced AI solutions and software development by KICCPA.",
  icons: {
    icon: "/favicon.png",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${bricolage.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
