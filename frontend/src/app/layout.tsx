import type { Metadata } from "next";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"]
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-hero-display",
  weight: ["700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
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
      <body className={`${inter.variable} ${playfairDisplay.variable} ${dmSans.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
