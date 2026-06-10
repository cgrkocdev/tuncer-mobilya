import Image, { type ImageProps } from "next/image";

import { BLUR_PLACEHOLDER } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

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
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      quality={quality}
      priority={priority}
      loading={loading ?? (priority ? undefined : "lazy")}
      fetchPriority={priority ? "high" : "auto"}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={cn(
        cinematic && "brightness-[0.92] contrast-[1.05] saturate-[0.9]",
        className
      )}
    />
  );
}
