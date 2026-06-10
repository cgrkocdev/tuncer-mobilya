import { productGalleries } from "@/lib/visual-assets";
import type { Product, ProductCategory, ProductFAQ } from "@/types/product";

function gallery(slug: string): string[] {
  return productGalleries[slug] ?? [];
}

export const productCategories: ProductCategory[] = [
  { id: "oturma-odasi", name: "Oturma Odası", slug: "oturma-odasi" },
  { id: "yemek-odasi", name: "Yemek Odası", slug: "yemek-odasi" },
  { id: "yatak-odasi", name: "Yatak Odası", slug: "yatak-odasi" },
  { id: "ofis", name: "Ofis & Çalışma", slug: "ofis" },
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
    name: "Milano Kanepe",
    categoryId: "oturma-odasi",
    category: "Oturma Odası",
    price: 89900,
    compareAtPrice: 105000,
    description:
      "Milano Kanepe, İtalyan tasarım anlayışıyla üretilmiş premium bir oturma grubudur. Yüksek yoğunluklu sünger ve birinci sınıf kumaş kaplama ile uzun ömürlü konfor sunar. Minimal çizgileri ve zarif profiliyle modern yaşam alanlarına sofistike bir dokunuş katar.",
    seoDescription:
      "Milano Kanepe — premium oturma odası kanepe. El işçiliği, 5 yıl garanti. Tuncer Mobilya'da keşfedin.",
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
    name: "Venezia Yemek Masası",
    categoryId: "yemek-odasi",
    category: "Yemek Odası",
    price: 124500,
    description:
      "Venezia Yemek Masası, masif ceviz ağacından üretilmiş, 8 kişilik kapasiteli premium bir yemek masasıdır. Doğal ahşap damarları ve el cilalama işçiliği ile her parça benzersizdir.",
    seoDescription:
      "Venezia Yemek Masası — masif ceviz, 8 kişilik. Premium yemek odası mobilyası. Tuncer Mobilya.",
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
    name: "Toscana Yatak",
    categoryId: "yatak-odasi",
    category: "Yatak Odası",
    price: 156000,
    description:
      "Toscana Yatak, yatak odanıza otel konforu getiren özel üretim bir yatak sistemidir. Ortopedik yay sistemi ve premium yatak başlığı ile tasarlanmıştır.",
    seoDescription:
      "Toscana Yatak — ortopedik yay sistemi, premium yatak odası. Tuncer Mobilya özel üretim.",
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
    name: "Firenze Kitaplık",
    categoryId: "ofis",
    category: "Ofis & Çalışma",
    price: 67800,
    description:
      "Firenze Kitaplık, minimalist çizgileri ve modüler yapısıyla ev ofislerine ve çalışma alanlarına zarafet katar. Ayarlanabilir raflar ve gizli kablo kanalı içerir.",
    seoDescription:
      "Firenze Kitaplık — modüler ofis kitaplığı. Premium çalışma alanı mobilyası. Tuncer Mobilya.",
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
    name: "Roma Berjer",
    categoryId: "oturma-odasi",
    category: "Oturma Odası",
    price: 34500,
    description:
      "Roma Berjer, tekli oturma için tasarlanmış ergonomik ve şık bir berjer koltuktur. Döner metal ayak detayı ile modern bir görünüm sunar.",
    seoDescription:
      "Roma Berjer — premium tekli koltuk. Oturma odası berjer. Tuncer Mobilya koleksiyonu.",
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
    name: "Modena Yemek Sandalyesi",
    categoryId: "yemek-odasi",
    category: "Yemek Odası",
    price: 12800,
    description:
      "Modena Yemek Sandalyesi, ergonomik sırt desteği ve premium döşeme ile uzun sofralar için konfor sağlar. Set halinde tercih edilebilir.",
    seoDescription:
      "Modena Yemek Sandalyesi — ergonomik tasarım, premium döşeme. Tuncer Mobilya.",
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
    name: "Siena Gardırop",
    categoryId: "yatak-odasi",
    category: "Yatak Odası",
    price: 98500,
    description:
      "Siena Gardırop, geniş depolama alanı ve soft-close menteşe sistemi ile yatak odanızı düzenli tutar. Ayna kapaklı modül seçeneği mevcuttur.",
    seoDescription:
      "Siena Gardırop — premium yatak odası gardırop. Geniş depolama. Tuncer Mobilya.",
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
    name: "Verona Çalışma Masası",
    categoryId: "ofis",
    category: "Ofis & Çalışma",
    price: 45600,
    description:
      "Verona Çalışma Masası, geniş çalışma yüzeyi ve entegre kablo yönetimi ile verimli bir çalışma deneyimi sunar. Masif meşe tablalıdır.",
    seoDescription:
      "Verona Çalışma Masası — masif meşe, kablo yönetimi. Premium ofis mobilyası. Tuncer Mobilya.",
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
    name: "Capri Köşe Takım",
    categoryId: "oturma-odasi",
    category: "Oturma Odası",
    price: 142000,
    description:
      "Capri Köşe Takım, geniş aileler ve misafir ağırlamayı sevenler için tasarlanmış lüks bir köşe kanepe setidir. Modüler yapısı ile alana göre uyarlanabilir.",
    seoDescription:
      "Capri Köşe Takım — modüler lüks köşe kanepe. Premium oturma odası. Tuncer Mobilya.",
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
    name: "Palermo Konsol",
    categoryId: "yemek-odasi",
    category: "Yemek Odası",
    price: 38900,
    description:
      "Palermo Konsol, yemek odanızın girişine zarafet katan ince profilli bir konsol ünitesidir. Çekmece ve raf bölümleri ile pratik depolama sunar.",
    seoDescription:
      "Palermo Konsol — yemek odası konsol ünitesi. Premium tasarım. Tuncer Mobilya.",
    images: gallery("palermo-konsol"),
    colors: ["Ceviz", "Siyah"],
    fabrics: [],
    variants: [
      { id: "c1", type: "color", name: "Ceviz", value: "Ceviz", hex: "#6B4423" },
      { id: "c2", type: "color", name: "Siyah", value: "Siyah", hex: "#1A1A1A" },
    ],
    dimensions: { width: "140 cm", height: "85 cm", depth: "40 cm", weight: "32 kg" },
    specs: baseSpecs,
    stockStatus: "out_of_stock",
    stockCount: 0,
  },
  {
    id: "11",
    slug: "como-komodin",
    name: "Como Komodin",
    categoryId: "yatak-odasi",
    category: "Yatak Odası",
    price: 18900,
    description:
      "Como Komodin, yatak başınızın yanında şık bir tamamlayıcıdır. USB şarj portu ve gizli çekmece bölümü ile fonksiyonel tasarım.",
    seoDescription:
      "Como Komodin — USB portlu yatak odası komodin. Tuncer Mobilya.",
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
    name: "Torino Ofis Koltuğu",
    categoryId: "ofis",
    category: "Ofis & Çalışma",
    price: 28500,
    description:
      "Torino Ofis Koltuğu, ergonomik lumbar desteği ve nefes alabilir mesh sırtlık ile uzun çalışma saatlerinde konfor sağlar.",
    seoDescription:
      "Torino Ofis Koltuğu — ergonomik mesh ofis sandalyesi. Tuncer Mobilya.",
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
