/**
 * Tuncer Mobilya — küratörlü görsel kütüphanesi.
 * Yerel /public/images — harici CDN bağımlılığı yok, 404 riski sıfır.
 */

const img = (path: string) => `/images/${path.replace(/\.jpe?g$/i, ".webp")}`;

/** Kategori ve sahne görselleri */
export const scenes = {
  showroomHero: img("scenes/showroom-hero.jpg"),
  showroomWarm: img("scenes/showroom-warm.jpg"),
  livingLuxury: img("scenes/living-luxury.jpg"),
  livingModern: img("scenes/living-modern.jpg"),
  diningLuxury: img("scenes/dining-luxury.jpg"),
  diningDetail: img("scenes/dining-detail.jpg"),
  bedroomSuite: img("scenes/bedroom-suite.jpg"),
  bedroomBed: img("scenes/bedroom-bed.jpg"),
  bedroomDetail: img("scenes/bedroom-detail.jpg"),
  officeSpace: img("scenes/office-space.jpg"),
  officeDesk: img("scenes/office-desk.jpg"),
  craftsmanship: img("scenes/craftsmanship.jpg"),
} as const;

/** Ürün tipi görselleri */
export const products = {
  sofa: img("products/sofa.jpg"),
  sectional: img("products/sectional.jpg"),
  armchair: img("products/armchair.jpg"),
  diningTable: img("products/dining-table.jpg"),
  diningChair: img("products/dining-chair.jpg"),
  sideboard: img("products/sideboard.jpg"),
  bed: img("products/bed.jpg"),
  wardrobe: img("products/wardrobe.jpg"),
  nightstand: img("products/nightstand.jpg"),
  bookshelf: img("products/bookshelf.jpg"),
  desk: img("products/desk.jpg"),
  officeChair: img("products/office-chair.jpg"),
} as const;

/** Ürün slug → galeri eşlemesi */
export const productGalleries: Record<string, string[]> = {
  "milano-kanepe": [products.sofa, scenes.livingLuxury, scenes.showroomHero],
  "venezia-yemek-masasi": [
    products.diningTable,
    scenes.diningLuxury,
    scenes.diningDetail,
  ],
  "toscana-yatak": [products.bed, scenes.bedroomSuite, products.nightstand],
  "firenze-kitaplik": [products.bookshelf, scenes.officeSpace],
  "roma-berjer": [products.armchair, scenes.livingModern],
  "modena-yemek-sandalyesi": [products.diningChair, products.diningTable],
  "siena-gardrop": [products.wardrobe, scenes.bedroomSuite],
  "verona-calisma-masasi": [products.desk, scenes.officeSpace],
  "capri-kose-takim": [products.sectional, products.sofa],
  "palermo-konsol": [products.sideboard, scenes.diningLuxury],
  "como-komodin": [products.nightstand, scenes.bedroomDetail],
  "torino-ofis-koltugu": [products.officeChair, scenes.officeDesk],
};

export const categoryImages = {
  living: scenes.livingLuxury,
  dining: scenes.diningLuxury,
  bedroom: scenes.bedroomSuite,
  office: scenes.officeSpace,
} as const;

export const instagramGrid = [
  products.sofa,
  products.wardrobe,
  products.sectional,
  products.sideboard,
  products.desk,
  products.officeChair,
];

export const ogImage = img("og-image.jpg");
