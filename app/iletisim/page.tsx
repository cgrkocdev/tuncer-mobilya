import Link from "next/link";
import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";
import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "İletişim",
  description:
    "Tuncer Mobilya ile iletişime geçin. Showroom ziyareti, özel tasarım teklifi ve müşteri desteği.",
  path: "/iletisim",
});

const primaryTel = siteConfig.whatsapp.replace(/\D/g, "");

const contactItems = [
  {
    icon: MapPin,
    label: "Adres",
    value: siteConfig.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: siteConfig.phoneAlt
      ? `${siteConfig.phone} · ${siteConfig.phoneAlt}`
      : siteConfig.phone,
    href: `tel:+${primaryTel}`,
  },
  {
    icon: Mail,
    label: "E-posta",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Pzt–Cmt: 09:00 – 19:00",
    href: undefined,
  },
];

export default function IletisimPage() {
  const whatsappPhone = siteConfig.whatsapp.replace(/\D/g, "");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: siteConfig.url },
          { name: "İletişim", url: `${siteConfig.url}/iletisim` },
        ])}
      />
      <SiteLayout>
        <div className="section-premium container-premium">
          <ScrollReveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/65 sm:text-xs sm:tracking-[0.35em]">
              İletişim
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-3xl font-light leading-tight sm:mt-6 sm:text-4xl lg:text-6xl">
              Sizinle Tanışmak İsteriz
            </h1>
            <p className="mt-5 max-w-2xl text-base text-foreground/75 sm:mt-8 sm:text-lg lg:text-xl">
              Özel tasarım, koleksiyon veya showroom ziyareti için formu doldurun;
              ekibimiz en kısa sürede size dönüş yapsın.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-10 sm:mt-20 lg:grid-cols-5 lg:gap-16">
            <ScrollReveal className="lg:col-span-3">
              <div className="premium-card rounded-2xl p-6 sm:p-8 lg:p-10">
                <h2 className="font-serif text-2xl">Mesaj Gönderin</h2>
                <p className="mt-2 text-sm text-foreground/70">
                  Formu gönderdiğinizde WhatsApp üzerinden devam edebilirsiniz.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="lg:col-span-2">
              <div className="space-y-4 sm:space-y-6">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="premium-card flex gap-4 rounded-2xl p-5 sm:p-6"
                  >
                    <item.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/65">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.label === "Adres" ? "_blank" : undefined}
                          rel={
                            item.label === "Adres"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="mt-1 block text-foreground transition-colors hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="premium-card rounded-2xl p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground/65">
                    Sosyal Medya
                  </p>
                  <Link
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                  >
                    <Instagram className="size-4" />
                    @ofisburo6
                  </Link>
                </div>

                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  WhatsApp ile Yazın
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-12 sm:mt-20">
            <ContactMap />
          </ScrollReveal>
        </div>
      </SiteLayout>
    </>
  );
}
