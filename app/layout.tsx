import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";

import { Providers } from "@/components/providers";
import { rootMetadata } from "@/lib/seo/metadata";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = rootMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
