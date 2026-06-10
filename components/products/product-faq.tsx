import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { ProductFAQ } from "@/types/product";

interface ProductFAQSectionProps {
  faqs: ProductFAQ[];
}

export function ProductFAQSection({ faqs }: ProductFAQSectionProps) {
  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            SSS
          </p>
          <h2 className="mt-4 text-center font-serif text-3xl font-light text-foreground lg:text-4xl">
            Sık Sorulan Sorular
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="font-serif text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
