"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      "Merhaba, iletişim formundan yazıyorum.",
      "",
      `Ad Soyad: ${form.name}`,
      `E-posta: ${form.email}`,
      `Telefon: ${form.phone}`,
      "",
      form.message,
    ].join("\n");

    const phone = siteConfig.whatsapp.replace(/\D/g, "");
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Ad Soyad</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Adınız Soyadınız"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="05XX XXX XX XX"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="ornek@email.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Mesajınız</Label>
        <Textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Projeniz veya sorunuz hakkında kısa bilgi verin..."
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        WhatsApp ile Gönder
      </Button>
    </form>
  );
}
