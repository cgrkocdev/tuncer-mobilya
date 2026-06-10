import type { Metadata } from "next";

import { ogImage } from "@/lib/visual-assets";
import { siteConfig } from "@/lib/site-config";

const defaultOgImage = ogImage;

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Premium Mobilya & İç Mimari`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "premium mobilya",
    "lüks mobilya",
    "özel tasarım mobilya",
    "Tuncer Mobilya",
    "oturma odası",
    "yemek odası",
    "yatak odası",
    "İstanbul mobilya",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = options.path
    ? `${siteConfig.url}${options.path}`
    : siteConfig.url;
  const image = options.image ?? defaultOgImage;

  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [image],
    },
    ...(options.noIndex && { robots: { index: false, follow: false } }),
  };
}
