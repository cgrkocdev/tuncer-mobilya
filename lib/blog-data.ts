import { scenes } from "@/lib/visual-assets";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "2026-premium-oturma-odasi-trendleri",
    title: "2026 Premium Oturma Odası Trendleri",
    excerpt:
      "Minimal çizgiler, doğal malzemeler ve zamansız konfor — yeni sezon oturma odası tasarımında öne çıkan trendleri keşfedin.",
    content: `Premium oturma odası tasarımı, gösterişten uzaklaşıp kaliteye ve dokuya odaklanıyor. 2026 sezonunda nötr tonlar, el dokuması kumaşlar ve modüler kanepe sistemleri öne çıkıyor.

Tuncer Mobilya olarak her koleksiyonumuzda sürdürülebilir ahşap, birinci sınıf sünger ve uzun ömürlü döşeme malzemeleri kullanıyoruz. Salonunuz sadece güzel görünmemeli — yıllarca konfor sunmalı.

Showroom'umuzu ziyaret ederek kumaş kartelamızı inceleyebilir, özel ölçü seçeneklerini değerlendirebilirsiniz.`,
    image: scenes.livingModern,
    category: "Trendler",
    publishedAt: "2026-03-01",
    readTime: 5,
    author: "Tuncer Mobilya",
  },
  {
    slug: "masif-ahsap-bakim-rehberi",
    title: "Masif Ahşap Mobilya Bakım Rehberi",
    excerpt:
      "Masif ahşap mobilyalarınızın nesiller boyu dayanması için uzman bakım önerileri.",
    content: `Masif ahşap, doğru bakımla ömür boyu kullanılabilecek bir yatırımdır. Doğrudan güneş ışığından kaçının, nem dengesini koruyun ve özel ahşap bakım yağlarını düzenli uygulayın.

Tuncer Mobilya ürünlerinde kullanılan ceviz, meşe ve kayın ağaçları özel cilalama işleminden geçer. İlk yıl içinde hafif renk değişimleri doğaldır ve ahşabın karakterini yansıtır.

Profesyonel bakım hizmetimiz hakkında mağazalarımızdan bilgi alabilirsiniz.`,
    image: scenes.craftsmanship,
    category: "Rehber",
    publishedAt: "2026-02-15",
    readTime: 4,
    author: "Tuncer Mobilya",
  },
  {
    slug: "ozel-tasarim-sureci",
    title: "Özel Tasarım Mobilya Süreci Nasıl İşler?",
    excerpt:
      "Hayalinizdeki mobilyadan teslimata — Tuncer Mobilya özel tasarım sürecinin her adımı.",
    content: `Özel tasarım projelerimiz, ihtiyaç analizi ile başlar. İç mimarlarımız mekanınızı ölçer, stil tercihlerinizi dinler ve 3D görselleştirme sunar.

Üretim atölyemizde usta marangozlar, onayladığınız tasarımı el işçiliğiyle hayata geçirir. Ortalama teslimat süresi 4-6 haftadır; montaj ekibimiz kurulumu ücretsiz gerçekleştirir.

Özel teklif almak için showroom'umuzu ziyaret edin veya WhatsApp hattımızdan bize ulaşın.`,
    image: scenes.showroomHero,
    category: "Özel Tasarım",
    publishedAt: "2026-01-20",
    readTime: 6,
    author: "Tuncer Mobilya",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
