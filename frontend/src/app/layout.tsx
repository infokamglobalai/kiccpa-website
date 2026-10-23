import type { Metadata } from "next";
import { DM_Sans, Inter, Manrope, Playfair_Display } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "KICCPA",
    template: "%s · KICCPA",
  },
  description:
    "KICCPA builds software, learning platforms, and business systems. Where it meets AI.",
  icons: {
    icon: "/favicon.png",
  },
};

import Chrome from "@/kam/Chrome";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Marks that JS is alive before first paint. Scroll-reveal hidden
            states are gated on this, so content is never stuck invisible. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js='1'" }}
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable} ${playfairDisplay.variable} ${dmSans.variable}`}>
        <Providers>
          <Chrome>{children}</Chrome>
        </Providers>
      </body>
    </html>
  );
}
