"use client";

import Image, { type ImageProps } from "next/image";

import { BLUR_PLACEHOLDER, normalizeImageQuality } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE = "/images/scenes/showroom-hero.webp";

interface OptimizedImageProps extends ImageProps {
  cinematic?: boolean;
}

export function OptimizedImage({
  className,
  priority = false,
  cinematic = false,
  quality = 72,
  placeholder = "blur",
  blurDataURL = BLUR_PLACEHOLDER,
  loading,
  alt,
  fill,
  onError,
  src,
  ...props
}: OptimizedImageProps) {
  const normalizedQuality = normalizeImageQuality(
    typeof quality === "number" ? quality : Number(quality)
  );

  const image = (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill={fill}
      quality={normalizedQuality}
      priority={priority}
      loading={loading ?? (priority ? undefined : "lazy")}
      fetchPriority={priority ? "high" : "auto"}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={(event) => {
        onError?.(event);
        const target = event.currentTarget;
        if (target.src.includes(FALLBACK_IMAGE)) return;
        target.src = FALLBACK_IMAGE;
      }}
      className={cn(
        cinematic && "brightness-[1.02] contrast-[0.98] saturate-[0.96]",
        className
      )}
    />
  );

  if (fill) {
    return <div className="relative h-full w-full">{image}</div>;
  }

  return image;
}
