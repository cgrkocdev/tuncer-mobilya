import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");

const RULES = [
  { dir: "scenes", maxWidth: 1920, quality: 76 },
  { dir: "products", maxWidth: 1200, quality: 72 },
  { dir: ".", maxWidth: 1200, quality: 78, files: ["og-image.jpg"] },
];

async function optimizeFile(filePath, maxWidth, quality) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const outPath = filePath.replace(/\.(jpe?g|png)$/i, ".webp");
  const input = sharp(filePath);
  const meta = await input.metadata();

  await input
    .resize({
      width: meta.width > maxWidth ? maxWidth : undefined,
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 4 })
    .toFile(outPath);

  const before = fs.statSync(filePath).size;
  const after = fs.statSync(outPath).size;
  console.log(
    `${path.basename(filePath)} → ${path.basename(outPath)} (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB)`
  );
}

async function run() {
  for (const rule of RULES) {
    const dir = path.join(ROOT, rule.dir === "." ? "" : rule.dir);

    if (rule.files) {
      for (const file of rule.files) {
        await optimizeFile(path.join(dir, file), rule.maxWidth, rule.quality);
      }
      continue;
    }

    if (!fs.existsSync(dir)) continue;

    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith(".webp")) continue;
      await optimizeFile(path.join(dir, file), rule.maxWidth, rule.quality);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
