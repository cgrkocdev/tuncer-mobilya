/** Yerel veya harici görsel URL'si — query param eklemez (yerel dosyalar için). */
export function imageUrl(
  src: string,
  options: { w?: number; q?: number } = {}
): string {
  if (src.startsWith("/")) return src;

  const w = options.w ?? 2560;
  const q = options.q ?? 82;

  if (src.includes("pexels.com")) {
    const base = src.split("?")[0];
    return `${base}?auto=compress&cs=tinysrgb&w=${w}&q=${q}`;
  }

  if (src.includes("unsplash.com")) {
    const base = src.split("?")[0];
    return `${base}?auto=format&fit=crop&w=${w}&q=${q}`;
  }

  return src;
}

export const BLUR_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect width='16' height='10' fill='%23e8e4df' filter='url(%23b)'/%3E%3C/svg%3E";
