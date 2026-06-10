import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const USERNAME = "ofisburo6";
const SITE_CONFIG = path.join(process.cwd(), "lib", "site-config.ts");

function fetchProfile() {
  const raw = execSync(
    `curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" -H "X-IG-App-ID: 936619743392459" "https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}"`,
    { encoding: "utf8" }
  );
  return JSON.parse(raw).data.user;
}

function extractPhones(biography = "", externalUrl = "") {
  const phones = [];
  const bioMatches = biography.match(
    /(?:0|\+90)?\s*5\d{2}[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}/g
  );
  if (bioMatches) {
    for (const match of bioMatches) {
      const digits = match.replace(/\D/g, "");
      const normalized =
        digits.startsWith("90") && digits.length === 12
          ? `+${digits}`
          : digits.length === 10
            ? `+90${digits}`
            : digits.length === 11 && digits.startsWith("0")
              ? `+90${digits.slice(1)}`
              : `+${digits}`;
      if (!phones.includes(normalized)) phones.push(normalized);
    }
  }

  const waMatch = externalUrl?.match(/wa\.me\/(\d+)/);
  if (waMatch) {
    const wa = `+${waMatch[1]}`;
    if (!phones.includes(wa)) phones.unshift(wa);
  }

  return phones;
}

function formatPhoneDisplay(e164) {
  const digits = e164.replace(/\D/g, "");
  const local = digits.startsWith("90") ? `0${digits.slice(2)}` : digits;
  if (local.length === 11) {
    return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7, 9)} ${local.slice(9)}`;
  }
  return e164;
}

function parseAddress(user) {
  if (!user.business_address_json) return null;
  try {
    return JSON.parse(user.business_address_json);
  } catch {
    return null;
  }
}

function buildContact(user) {
  const phones = extractPhones(user.biography, user.external_url);
  const whatsapp =
    user.external_url?.match(/wa\.me\/(\d+)/)?.[1]
      ? `+${user.external_url.match(/wa\.me\/(\d+)/)[1]}`
      : phones[0] ?? "+905323597505";

  const addr = parseAddress(user);
  const street = addr?.street_address ?? "";
  const city = (addr?.city_name ?? "Ankara, Turkey").replace(", Turkey", "");
  const zip = addr?.zip_code ?? "";

  const address = [street, `${city}${zip ? ` ${zip}` : ""}`]
    .filter(Boolean)
    .join(", ")
    .replace(/, $/, "");

  return {
    whatsapp,
    phone: phones[0] ? formatPhoneDisplay(phones[0]) : formatPhoneDisplay(whatsapp),
    phoneAlt: phones[1] ? formatPhoneDisplay(phones[1]) : null,
    address: address || "Ankara Siteler",
    addressStreet: street,
    addressCity: city,
    addressZip: zip,
    latitude: addr?.latitude ?? null,
    longitude: addr?.longitude ?? null,
  };
}

function patchSiteConfig(contact) {
  let content = fs.readFileSync(SITE_CONFIG, "utf8");

  const replacements = [
    [/whatsapp: "[^"]*"/, `whatsapp: "${contact.whatsapp}"`],
    [/phone: "[^"]*"/, `phone: "${contact.phone}"`],
    [
      /address: "[^"]*"/,
      `address: "${contact.address.replace(/"/g, '\\"')}"`,
    ],
  ];

  for (const [pattern, value] of replacements) {
    if (!pattern.test(content)) {
      throw new Error(`site-config alanı bulunamadı: ${pattern}`);
    }
    content = content.replace(pattern, value);
  }

  if (contact.phoneAlt) {
    if (content.includes("phoneAlt:")) {
      content = content.replace(
        /phoneAlt: "[^"]*"/,
        `phoneAlt: "${contact.phoneAlt}"`
      );
    } else {
      content = content.replace(
        /phone: "[^"]*",/,
        `phone: "${contact.phone}",\n  phoneAlt: "${contact.phoneAlt}",`
      );
    }
  }

  if (contact.latitude != null && contact.longitude != null) {
    if (content.includes("latitude:")) {
      content = content.replace(/latitude: [^,\n]+/, `latitude: ${contact.latitude}`);
      content = content.replace(/longitude: [^,\n]+/, `longitude: ${contact.longitude}`);
    } else {
      content = content.replace(
        /address: "[^"]*",/,
        `address: "${contact.address.replace(/"/g, '\\"')}",\n  latitude: ${contact.latitude},\n  longitude: ${contact.longitude},`
      );
    }
  }

  fs.writeFileSync(SITE_CONFIG, content);
}

const user = fetchProfile();
const contact = buildContact(user);
patchSiteConfig(contact);

console.log("Instagram iletişim bilgileri güncellendi:");
console.log("  WhatsApp:", contact.whatsapp);
console.log("  Telefon:", contact.phone);
if (contact.phoneAlt) console.log("  Telefon 2:", contact.phoneAlt);
console.log("  Adres:", contact.address);
