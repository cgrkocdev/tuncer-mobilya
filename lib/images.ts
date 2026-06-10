export { imageUrl, BLUR_PLACEHOLDER } from "@/lib/image-utils";
export {
  categoryImages,
  instagramGrid,
  ogImage,
  productGalleries,
  products as productVisuals,
  scenes,
} from "@/lib/visual-assets";

import { categoryImages, scenes } from "@/lib/visual-assets";

export const showroomImages = {
  hero: scenes.showroomHero,
  workshop: scenes.craftsmanship,
  living: categoryImages.living,
  dining: categoryImages.dining,
  bedroom: categoryImages.bedroom,
  office: categoryImages.office,
} as const;
