import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const RAW = path.join(ROOT, "instagram-raw");

const PRODUCT_FILES = [
  "sofa.jpg",
  "dining-table.jpg",
  "bed.jpg",
  "bookshelf.jpg",
  "armchair.jpg",
  "dining-chair.jpg",
  "wardrobe.jpg",
  "desk.jpg",
  "sectional.jpg",
  "sideboard.jpg",
  "nightstand.jpg",
  "office-chair.jpg",
];

const PRODUCT_SOURCES = [
  "DY6dXrrDXSD-2.jpg",
  "DY6dXrrDXSD-4.jpg",
  "DYwKKvrDCom-2.jpg",
  "DYwKKvrDCom-4.jpg",
  "DY6dXrrDXSD-3.jpg",
  "DYwKKvrDCom-3.jpg",
  "DY1TvM0jN4a-1.jpg",
  "DYkKfceFrJb-2.jpg",
  "DYkKfceFrJb-3.jpg",
  "DYg5li2ljgO-2.jpg",
  "DYg5li2ljgO-4.jpg",
  "DY6dXrrDXSD-5.jpg",
];

const SCENE_FILES = [
  "showroom-hero.jpg",
  "living-luxury.jpg",
  "dining-luxury.jpg",
  "bedroom-suite.jpg",
  "office-space.jpg",
  "showroom-warm.jpg",
];

const SCENE_SOURCES = [
  "DY6dXrrDXSD-3.jpg",
  "DYwKKvrDCom-3.jpg",
  "DYkKfceFrJb-2.jpg",
  "DY1TvM0jN4a-1.jpg",
  "DYg5li2ljgO-2.jpg",
  "DY6dXrrDXSD-5.jpg",
];

/** Blog, marka hikayesi ve ürün galerilerinde kullanılan ek sahneler */
const EXTRA_SCENE_FILES = [
  "living-modern.jpg",
  "dining-detail.jpg",
  "bedroom-bed.jpg",
  "bedroom-detail.jpg",
  "office-desk.jpg",
  "craftsmanship.jpg",
];

const EXTRA_SCENE_SOURCES = [
  "DYwKKvrDCom-4.jpg",
  "DYkKfceFrJb-3.jpg",
  "DYwKKvrDCom-2.jpg",
  "DYg5li2ljgO-4.jpg",
  "DYkKfceFrJb-2.jpg",
  "DY6dXrrDXSD-2.jpg",
];

const EXTRA_SCENE_WIDE = [true, false, true, false, true, true];

function curl(url, out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execSync(
    `curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" -H "Referer: https://www.instagram.com/" "${url}" -o "${out}"`,
    { stdio: "pipe" }
  );
}

async function fetchInstagramImages() {
  const api = execSync(
    `curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" -H "X-IG-App-ID: 936619743392459" "https://www.instagram.com/api/v1/users/web_profile_info/?username=ofisburo6"`,
    { encoding: "utf8" }
  );
  const profile = JSON.parse(api).data.user;

  const images = [];
  for (const edge of profile.edge_owner_to_timeline_media?.edges ?? []) {
    const node = edge.node;
    const code = node.shortcode;
    if (node.__typename === "GraphImage") {
      images.push([code, 0, node.display_url]);
    } else if (node.__typename === "GraphSidecar") {
      for (const [j, child] of (
        node.edge_sidecar_to_children?.edges ?? []
      ).entries()) {
        const cn = child.node;
        if (cn.__typename === "GraphImage") {
          images.push([code, j, cn.display_url]);
        }
      }
    }
  }

  const seen = new Set();
  fs.mkdirSync(RAW, { recursive: true });
  for (const [code, idx, url] of images) {
    const key = url.split("?")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    curl(url, path.join(RAW, `${code}-${idx}.jpg`));
  }

  curl(
    profile.profile_pic_url_hd,
    path.join(process.cwd(), "public", "logo-source.jpg")
  );
  console.log(`İndirildi: ${seen.size} gönderi görseli + logo`);
}

/** Yazısız showroom alanı — yüksek çözünürlüklü kırpım */
async function extractShowroom(input, output, { wide = false } = {}) {
  const meta = await sharp(input).metadata();
  const w = meta.width;
  const h = meta.height;

  const rowTop = Math.round(h * 0.67);
  const rowH = h - rowTop;
  const panelW = Math.round(w / 3);

  const panelRegion = {
    left: panelW,
    top: rowTop,
    width: panelW,
    height: Math.round(rowH * 0.78),
  };

  const wideRegion = {
    left: Math.round(w * 0.02),
    top: Math.round(h * 0.03),
    width: Math.round(w * 0.78),
    height: Math.round(h * 0.6),
  };

  const region = wide ? wideRegion : panelRegion;

  await sharp(input)
    .extract(region)
    .sharpen({ sigma: 0.6, m1: 0.45, m2: 0.2 })
    .resize(wide ? 1920 : 1600, wide ? 1200 : 1600, {
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(output);
}

async function syncLogo() {
  const logoSource = path.join(process.cwd(), "public", "logo-source.jpg");
  if (!fs.existsSync(logoSource)) return;

  await sharp(logoSource)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 1 },
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9 })
    .toFile(path.join(process.cwd(), "public", "logo.png"));

  await sharp(logoSource)
    .resize(320, 320, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 1 },
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 95 })
    .toFile(path.join(ROOT, "logo.webp"));
}

async function run() {
  await fetchInstagramImages();
  await syncLogo();

  for (let i = 0; i < PRODUCT_FILES.length; i++) {
    const src = path.join(RAW, PRODUCT_SOURCES[i]);
    if (!fs.existsSync(src)) {
      console.warn("Eksik:", PRODUCT_SOURCES[i]);
      continue;
    }
    await extractShowroom(src, path.join(ROOT, "products", PRODUCT_FILES[i]));
    console.log("ürün", PRODUCT_FILES[i]);
  }

  for (let i = 0; i < SCENE_FILES.length; i++) {
    const src = path.join(RAW, SCENE_SOURCES[i]);
    if (!fs.existsSync(src)) {
      console.warn("Eksik sahne kaynağı:", SCENE_SOURCES[i]);
      continue;
    }
    await extractShowroom(src, path.join(ROOT, "scenes", SCENE_FILES[i]), {
      wide: i < 2,
    });
    console.log("sahne", SCENE_FILES[i]);
  }

  for (let i = 0; i < EXTRA_SCENE_FILES.length; i++) {
    const src = path.join(RAW, EXTRA_SCENE_SOURCES[i]);
    if (!fs.existsSync(src)) {
      console.warn("Eksik ek sahne kaynağı:", EXTRA_SCENE_SOURCES[i]);
      continue;
    }
    await extractShowroom(
      src,
      path.join(ROOT, "scenes", EXTRA_SCENE_FILES[i]),
      { wide: EXTRA_SCENE_WIDE[i] }
    );
    console.log("ek sahne", EXTRA_SCENE_FILES[i]);
  }

  fs.rmSync(RAW, { recursive: true, force: true });
  fs.unlinkSync(path.join(process.cwd(), "public", "logo-source.jpg"));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
