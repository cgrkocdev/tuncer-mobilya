import { siteConfig } from "@/lib/site-config";

export function getMapsDirectionsUrl() {
  if (siteConfig.latitude != null && siteConfig.longitude != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.latitude},${siteConfig.longitude}`;
  }
  return `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`;
}

export function getMapsEmbedUrl() {
  if (siteConfig.latitude != null && siteConfig.longitude != null) {
    return `https://www.google.com/maps?q=${siteConfig.latitude},${siteConfig.longitude}&hl=tr&z=16&output=embed`;
  }
  return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&hl=tr&z=16&output=embed`;
}
