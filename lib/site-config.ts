import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Tuncer Mobilya",
  description:
    "Zamansız tasarım ve üstün işçilikle yaşam alanlarınıza değer katıyoruz.",
  url: "https://tuncermobilya.com",
  whatsapp: "+905321234567",
  instagram: "https://www.instagram.com/ofisburo6/",
  email: "info@tuncermobilya.com",
  phone: "+90 (532) 123 45 67",
  address: "Maslak, Sarıyer — İstanbul",
  navLinks: [
    { label: "Koleksiyonlar", href: "/urunler" },
    { label: "Blog", href: "/blog" },
    { label: "Özel Tasarım", href: "/ozel-tasarim" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
  ],
  footerLinks: [
    {
      title: "Keşfet",
      links: [
        { label: "Koleksiyonlar", href: "/urunler" },
        { label: "Yeni Gelenler", href: "/urunler" },
        { label: "Blog", href: "/blog" },
        { label: "Özel Tasarım", href: "/ozel-tasarim" },
      ],
    },
    {
      title: "Kurumsal",
      links: [
        { label: "Hakkımızda", href: "/hakkimizda" },
        { label: "Mağazalar", href: "/iletisim" },
        { label: "Kariyer", href: "/iletisim" },
      ],
    },
    {
      title: "Destek",
      links: [
        { label: "İletişim", href: "/iletisim" },
        { label: "SSS", href: "#" },
        { label: "Gizlilik", href: "#" },
      ],
    },
  ],
};
