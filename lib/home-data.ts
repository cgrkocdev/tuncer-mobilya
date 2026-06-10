import { siteConfig } from "@/lib/site-config";
import { categoryImages, instagramGrid } from "@/lib/visual-assets";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export interface InstagramPost {
  id: string;
  image: string;
  href: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Oturma Odası",
    description: "Konfor ve zarafetin buluştuğu koleksiyon",
    image: categoryImages.living,
    href: "/urunler",
  },
  {
    id: "2",
    name: "Yemek Odası",
    description: "Aile sofralarına değer katan tasarımlar",
    image: categoryImages.dining,
    href: "/urunler",
  },
  {
    id: "3",
    name: "Yatak Odası",
    description: "Huzurlu uykular için özel üretim",
    image: categoryImages.bedroom,
    href: "/urunler",
  },
  {
    id: "4",
    name: "Ofis & Çalışma",
    description: "Verimli ve estetik çalışma alanları",
    image: categoryImages.office,
    href: "/urunler",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ayşe & Mehmet Yılmaz",
    location: "İstanbul",
    quote:
      "Salon takımımız tam istediğimiz gibi oldu. İşçilik kalitesi ve detaylara gösterilen özen gerçekten fark yaratıyor.",
    rating: 5,
  },
  {
    id: "2",
    name: "Dr. Can Demir",
    location: "Ankara",
    quote:
      "Ofis mobilyalarımızı Tuncer Mobilya'dan yaptırdık. Hem estetik hem de fonksiyonel bir çözüm elde ettik.",
    rating: 5,
  },
  {
    id: "3",
    name: "Selin Kaya",
    location: "İzmir",
    quote:
      "Özel tasarım yatak odamız hayal ettiğimizden bile güzel çıktı. Profesyonel ekip, kusursuz sonuç.",
    rating: 5,
  },
];

export const instagramPosts: InstagramPost[] = instagramGrid.map(
  (image, index) => ({
    id: String(index + 1),
    image,
    href: siteConfig.instagram,
  })
);
