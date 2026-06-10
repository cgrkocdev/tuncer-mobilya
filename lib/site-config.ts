import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Tuncer Mobilya",
  description:
    "Zamansız tasarım ve üstün işçilikle yaşam alanlarınıza değer katıyoruz.",
  url: "https://tuncermobilya.com",
  logo: "/images/logo.webp",
  whatsapp: "+905323597505",
  instagram: "https://www.instagram.com/ofisburo6/",
  email: "info@tuncermobilya.com",
  phone: "0532 359 75 05",
  phoneAlt: "0507 754 34 04",
  address: "Doğantepe Mah. Hacı Bayram Veli Cad. No:261/A Altındağ, Ankara 06140",
  latitude: 39.97291,
  longitude: 32.90801,
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
