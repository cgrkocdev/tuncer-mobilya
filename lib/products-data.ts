import { productGalleries } from "@/lib/visual-assets";
import type { Product, ProductCategory, ProductFAQ } from "@/types/product";

function gallery(slug: string): string[] {
  return productGalleries[slug] ?? [];
}

export const productCategories: ProductCategory[] = [
  { id: "oturma-odasi", name: "Makam Takımları", slug: "oturma-odasi" },
  { id: "yemek-odasi", name: "Makam Masaları", slug: "yemek-odasi" },
  { id: "yatak-odasi", name: "Dolap & Üniteler", slug: "yatak-odasi" },
  { id: "ofis", name: "Koltuk & Berjer", slug: "ofis" },
];

export const availableColors = [
  { name: "Krem", hex: "#F5F0E8" },
  { name: "Antrasit", hex: "#3D3D3D" },
  { name: "Ceviz", hex: "#6B4423" },
  { name: "Bej", hex: "#D4C4B0" },
  { name: "Siyah", hex: "#1A1A1A" },
  { name: "Beyaz", hex: "#FAFAFA" },
];

export const priceRange = { min: 0, max: 200000 };

const baseSpecs = [
  { label: "Garanti", value: "5 Yıl" },
  { label: "Üretim", value: "Türkiye" },
  { label: "Montaj", value: "Ücretsiz" },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "milano-kanepe",
    name: "Chesterline Makam Takımı",
    categoryId: "oturma-odasi",
    category: "Makam Takımları",
    price: 64900,
    compareAtPrice: 95000,
    description:
      "Chesterline Makam Takımı; çalışma masası, üniteli dolap, sehpa, etajer, misafir koltukları ve makam koltuğundan oluşan komple ofis çözümüdür. Tüm renk seçenekleriyle üretilir.",
    seoDescription:
      "Chesterline Makam Takımı — 7 parça makam ofis takımı. Kampanyalı fiyat. Tuncer Mobilya.",
    images: gallery("milano-kanepe"),
    colors: ["Krem", "Antrasit", "Bej"],
    fabrics: ["Kadife", "Keten", "Deri"],
    variants: [
      { id: "c1", type: "color", name: "Krem", value: "Krem", hex: "#F5F0E8" },
      { id: "c2", type: "color", name: "Antrasit", value: "Antrasit", hex: "#3D3D3D" },
      { id: "c3", type: "color", name: "Bej", value: "Bej", hex: "#D4C4B0" },
      { id: "f1", type: "fabric", name: "Kadife", value: "Kadife" },
      { id: "f2", type: "fabric", name: "Keten", value: "Keten" },
      { id: "f3", type: "fabric", name: "Deri", value: "Deri" },
    ],
    dimensions: { width: "240 cm", height: "85 cm", depth: "95 cm", weight: "68 kg" },
    specs: [...baseSpecs, { label: "Malzeme", value: "Masif ahşap + sünger" }],
    stockStatus: "in_stock",
    stockCount: 12,
    featured: true,
  },
  {
    id: "2",
    slug: "venezia-yemek-masasi",
    name: "Chesterline Makam Masası",
    categoryId: "yemek-odasi",
    category: "Makam Masaları",
    price: 64900,
    compareAtPrice: 95000,
    description:
      "Chesterline serisi yönetici masası; 210×85 cm geniş çalışma yüzeyi, üniteli dolap uyumu ve premium işçilik ile makam ofislerine güçlü bir duruş katar.",
    seoDescription:
      "Chesterline Makam Masası — yönetici çalışma masası. Tuncer Mobilya Ankara.",
    images: gallery("venezia-yemek-masasi"),
    colors: ["Ceviz", "Beyaz"],
    fabrics: [],
    variants: [
      { id: "c1", type: "color", name: "Ceviz", value: "Ceviz", hex: "#6B4423" },
      { id: "c2", type: "color", name: "Beyaz", value: "Beyaz", hex: "#FAFAFA" },
    ],
    dimensions: { width: "220 cm", height: "76 cm", depth: "100 cm", weight: "85 kg" },
    specs: [...baseSpecs, { label: "Malzeme", value: "Masif ceviz" }],
    stockStatus: "in_stock",
    stockCount: 5,
    featured: true,
  },
  {
    id: "3",
    slug: "toscana-yatak",
    name: "Prestij Makam Takımı",
    categoryId: "oturma-odasi",
    category: "Makam Takımları",
    price: 109900,
    compareAtPrice: 235000,
    description:
      "Prestij Makam Takımı; 270×92 cm yönetici masası, entegre aydınlatmalı dolap, sehpa, etajer ve koltuk grubu ile üst düzey makam ofisleri için tasarlandı.",
    seoDescription:
      "Prestij Makam Takımı — premium makam ofis takımı. Tuncer Mobilya.",
    images: gallery("toscana-yatak"),
    colors: ["Krem", "Antrasit", "Bej"],
    fabrics: ["Keten", "Kadife"],
    variants: [
      { id: "c1", type: "color", name: "Krem", value: "Krem", hex: "#F5F0E8" },
      { id: "c2", type: "color", name: "Antrasit", value: "Antrasit", hex: "#3D3D3D" },
      { id: "f1", type: "fabric", name: "Keten", value: "Keten" },
      { id: "f2", type: "fabric", name: "Kadife", value: "Kadife" },
    ],
    dimensions: { width: "180 cm", height: "120 cm", depth: "210 cm", weight: "95 kg" },
    specs: [...baseSpecs, { label: "Yatak Boyutu", value: "160x200 cm" }],
    stockStatus: "low_stock",
    stockCount: 3,
    featured: true,
  },
  {
    id: "4",
    slug: "firenze-kitaplik",
    name: "Prestij Duvar Ünitesi",
    categoryId: "yatak-odasi",
    category: "Dolap & Üniteler",
    price: 109900,
    compareAtPrice: 235000,
    description:
      "Prestij serisi duvar ünitesi; entegre aydınlatma, geniş depolama alanı ve modern çizgileriyle makam ofislerinde prestijli bir görünüm sunar.",
    seoDescription:
      "Prestij Duvar Ünitesi — makam ofis dolap ünitesi. Tuncer Mobilya.",
    images: gallery("firenze-kitaplik"),
    colors: ["Ceviz", "Beyaz", "Siyah"],
    fabrics: [],
    variants: [
      { id: "c1", type: "color", name: "Ceviz", value: "Ceviz", hex: "#6B4423" },
      { id: "c2", type: "color", name: "Beyaz", value: "Beyaz", hex: "#FAFAFA" },
      { id: "c3", type: "color", name: "Siyah", value: "Siyah", hex: "#1A1A1A" },
    ],
    dimensions: { width: "120 cm", height: "200 cm", depth: "35 cm", weight: "42 kg" },
    specs: [...baseSpecs, { label: "Raf Sayısı", value: "5" }],
    stockStatus: "in_stock",
    stockCount: 18,
    featured: true,
  },
  {
    id: "5",
    slug: "roma-berjer",
    name: "Chesterline Misafir Berjeri",
    categoryId: "ofis",
    category: "Koltuk & Berjer",
    price: 34500,
    description:
      "Chesterline serisi misafir berjeri; deri kaplama, ergonomik oturum ve makam takımlarıyla uyumlu zarif tasarım.",
    seoDescription:
      "Chesterline Misafir Berjeri — makam ofis berjeri. Tuncer Mobilya.",
    images: gallery("roma-berjer"),
    colors: ["Krem", "Antrasit", "Bej", "Siyah"],
    fabrics: ["Kadife", "Deri"],
    variants: [
      { id: "c1", type: "color", name: "Krem", value: "Krem", hex: "#F5F0E8" },
      { id: "c2", type: "color", name: "Antrasit", value: "Antrasit", hex: "#3D3D3D" },
      { id: "f1", type: "fabric", name: "Kadife", value: "Kadife" },
      { id: "f2", type: "fabric", name: "Deri", value: "Deri" },
    ],
    dimensions: { width: "75 cm", height: "80 cm", depth: "78 cm", weight: "18 kg" },
    specs: baseSpecs,
    stockStatus: "in_stock",
    stockCount: 24,
  },
  {
    id: "6",
    slug: "modena-yemek-sandalyesi",
    name: "Prestij Misafir Koltuğu",
    categoryId: "ofis",
    category: "Koltuk & Berjer",
    price: 28900,
    description:
      "Prestij serisi misafir koltuğu; makam ofislerinde ziyaretçi alanları için konforlu ve şık oturum çözümü.",
    seoDescription:
      "Prestij Misafir Koltuğu — makam ofis misafir koltuğu. Tuncer Mobilya.",
    images: gallery("modena-yemek-sandalyesi"),
    colors: ["Krem", "Antrasit", "Ceviz"],
    fabrics: ["Keten", "Kadife"],
    variants: [
      { id: "c1", type: "color", name: "Krem", value: "Krem", hex: "#F5F0E8" },
      { id: "f1", type: "fabric", name: "Keten", value: "Keten" },
    ],
    dimensions: { width: "48 cm", height: "88 cm", depth: "52 cm", weight: "6 kg" },
    specs: baseSpecs,
    stockStatus: "in_stock",
    stockCount: 40,
  },
  {
    id: "7",
    slug: "siena-gardrop",
    name: "Karizma Makam Takımı",
    categoryId: "oturma-odasi",
    category: "Makam Takımları",
    price: 119900,
    compareAtPrice: 220000,
    description:
      "Karizma Siyah Makam Takımı; 270×90 cm makam masası, üniteli dolap, orta sehpa, etajer ve 9 parçalık koltuk grubu ile güçlü bir yönetici ofisi sunar.",
    seoDescription:
      "Karizma Makam Takımı — 9 parça siyah makam takımı. Tuncer Mobilya.",
    images: gallery("siena-gardrop"),
    colors: ["Beyaz", "Ceviz", "Antrasit"],
    fabrics: [],
    variants: [
      { id: "c1", type: "color", name: "Beyaz", value: "Beyaz", hex: "#FAFAFA" },
      { id: "c2", type: "color", name: "Ceviz", value: "Ceviz", hex: "#6B4423" },
    ],
    dimensions: { width: "240 cm", height: "220 cm", depth: "60 cm", weight: "120 kg" },
    specs: [...baseSpecs, { label: "Kapak", value: "Soft-close" }],
    stockStatus: "in_stock",
    stockCount: 7,
  },
  {
    id: "8",
    slug: "verona-calisma-masasi",
    name: "Viktor Makam Masası",
    categoryId: "yemek-odasi",
    category: "Makam Masaları",
    price: 45900,
    compareAtPrice: 65000,
    description:
      "Viktor serisi makam masası; 220×85 cm geniş tabla, modern üniteli dolap uyumu ve dayanıklı işçilik.",
    seoDescription:
      "Viktor Makam Masası — yönetici çalışma masası. Tuncer Mobilya.",
    images: gallery("verona-calisma-masasi"),
    colors: ["Ceviz", "Beyaz"],
    fabrics: [],
    variants: [
      { id: "c1", type: "color", name: "Ceviz", value: "Ceviz", hex: "#6B4423" },
      { id: "c2", type: "color", name: "Beyaz", value: "Beyaz", hex: "#FAFAFA" },
    ],
    dimensions: { width: "160 cm", height: "75 cm", depth: "70 cm", weight: "38 kg" },
    specs: baseSpecs,
    stockStatus: "in_stock",
    stockCount: 15,
  },
  {
    id: "9",
    slug: "capri-kose-takim",
    name: "Viktor Makam Takımı",
    categoryId: "oturma-odasi",
    category: "Makam Takımları",
    price: 45900,
    compareAtPrice: 65000,
    description:
      "Viktor Makam Takımı; 220×85 cm yönetici masası, 200×200 cm üniteli dolap, sehpa, etajer ve misafir koltuklarından oluşan 7 parçalık set.",
    seoDescription:
      "Viktor Makam Takımı — kampanyalı makam ofis takımı. Tuncer Mobilya.",
    images: gallery("capri-kose-takim"),
    colors: ["Krem", "Antrasit", "Bej"],
    fabrics: ["Kadife", "Keten", "Deri"],
    variants: [
      { id: "c1", type: "color", name: "Krem", value: "Krem", hex: "#F5F0E8" },
      { id: "f1", type: "fabric", name: "Kadife", value: "Kadife" },
    ],
    dimensions: { width: "320 cm", height: "85 cm", depth: "180 cm", weight: "110 kg" },
    specs: baseSpecs,
    stockStatus: "low_stock",
    stockCount: 2,
  },
  {
    id: "10",
    slug: "palermo-konsol",
    name: "Eko İmaj Makam Takımı",
    categoryId: "oturma-odasi",
    category: "Makam Takımları",
    price: 32900,
    compareAtPrice: 48000,
    description:
      "Eko İmaj Makam Takımı; 180×80 cm çalışma masası, dolap, sehpa, etajer ve makam koltuğundan oluşan ekonomik ve şık ofis çözümü.",
    seoDescription:
      "Eko İmaj Makam Takımı — uygun fiyatlı makam takımı. Tuncer Mobilya.",
    images: gallery("palermo-konsol"),
    colors: ["Ceviz", "Siyah"],
    fabrics: [],
    variants: [
      { id: "c1", type: "color", name: "Ceviz", value: "Ceviz", hex: "#6B4423" },
      { id: "c2", type: "color", name: "Siyah", value: "Siyah", hex: "#1A1A1A" },
    ],
    dimensions: { width: "140 cm", height: "85 cm", depth: "40 cm", weight: "32 kg" },
    specs: baseSpecs,
    stockStatus: "in_stock",
    stockCount: 8,
  },
  {
    id: "11",
    slug: "como-komodin",
    name: "Eko İmaj Orta Sehpa",
    categoryId: "yatak-odasi",
    category: "Dolap & Üniteler",
    price: 18900,
    description:
      "Eko İmaj serisi orta sehpa; makam takımlarıyla uyumlu, kompakt ve fonksiyonel ofis tamamlayıcısı.",
    seoDescription:
      "Eko İmaj Orta Sehpa — makam ofis sehpası. Tuncer Mobilya.",
    images: gallery("como-komodin"),
    colors: ["Beyaz", "Ceviz", "Antrasit"],
    fabrics: [],
    variants: [
      { id: "c1", type: "color", name: "Beyaz", value: "Beyaz", hex: "#FAFAFA" },
    ],
    dimensions: { width: "50 cm", height: "48 cm", depth: "40 cm", weight: "12 kg" },
    specs: baseSpecs,
    stockStatus: "in_stock",
    stockCount: 30,
  },
  {
    id: "12",
    slug: "torino-ofis-koltugu",
    name: "Chesterline Makam Koltuğu",
    categoryId: "ofis",
    category: "Koltuk & Berjer",
    price: 28500,
    description:
      "Chesterline makam koltuğu; deri kaplama, ergonomik destek ve uzun çalışma saatlerinde üst düzey konfor.",
    seoDescription:
      "Chesterline Makam Koltuğu — yönetici ofis koltuğu. Tuncer Mobilya.",
    images: gallery("torino-ofis-koltugu"),
    colors: ["Siyah", "Antrasit"],
    fabrics: ["Deri", "Mesh"],
    variants: [
      { id: "c1", type: "color", name: "Siyah", value: "Siyah", hex: "#1A1A1A" },
      { id: "f1", type: "fabric", name: "Deri", value: "Deri" },
    ],
    dimensions: { width: "65 cm", height: "120 cm", depth: "65 cm", weight: "15 kg" },
    specs: [...baseSpecs, { label: "Ayar", value: "Yükseklik + eğim" }],
    stockStatus: "in_stock",
    stockCount: 22,
  },
];

export const productFAQs: ProductFAQ[] = [
  {
    id: "1",
    question: "Teslimat süresi ne kadar?",
    answer:
      "Stokta bulunan ürünler 5-10 iş günü içinde teslim edilir. Özel üretim ürünlerde teslimat süresi 4-6 hafta arasındadır. Sipariş onayı sonrası size özel teslimat tarihi bildirilir.",
  },
  {
    id: "2",
    question: "Montaj hizmeti dahil mi?",
    answer:
      "Evet, tüm mobilyalarımızda ücretsiz montaj hizmeti sunuyoruz. Uzman ekibimiz ürünü adresinize teslim eder ve kurulumunu gerçekleştirir.",
  },
  {
    id: "3",
    question: "Renk ve kumaş değişikliği yapılabilir mi?",
    answer:
      "Çoğu ürünümüzde renk ve kumaş seçenekleri mevcuttur. Detay sayfasındaki varyant seçeneklerinden tercihinizi belirleyebilir veya showroom'umuzu ziyaret ederek kumaş kartelamızı inceleyebilirsiniz.",
  },
  {
    id: "4",
    question: "Garanti kapsamı nedir?",
    answer:
      "Tüm ürünlerimiz 5 yıl üretici garantisi ile sunulmaktadır. Garanti kapsamı üretim hatalarını ve malzeme kusurlarını içerir.",
  },
  {
    id: "5",
    question: "İade ve değişim politikanız nedir?",
    answer:
      "Özel üretim ürünlerde iade kabul edilmemektedir. Stok ürünlerde 14 gün içinde, kullanılmamış ve orijinal ambalajında iade kabul edilir.",
  },
  {
    id: "6",
    question: "WhatsApp ile sipariş nasıl verilir?",
    answer:
      "Ürün detay sayfasındaki 'WhatsApp ile Sipariş' butonuna tıklayarak seçtiğiniz ürün bilgileriyle birlikte doğrudan satış ekibimize ulaşabilirsiniz.",
  },
];
