import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.v2.config({
  cloud_name: "dwzojroob",
  api_key: "247996481866464",
  api_secret: "zBur-wIBjtM68Mk7q6-rBPwWt-c",
});

const assetsPath = path.join(__dirname, "src/assets/images");

const criticalFiles = [
  {
    local: "ServicesPage/section/serviceCard1.svg",
    remote: "folitracks/ServicesPage/section/serviceCard1",
  },
  {
    local: "ServicesPage/section/serviceCard2.svg",
    remote: "folitracks/ServicesPage/section/serviceCard2",
  },
  {
    local: "ServicesPage/section/serviceCard3.svg",
    remote: "folitracks/ServicesPage/section/serviceCard3",
  },
  {
    local: "ServicesPage/section/serviceCard4.svg",
    remote: "folitracks/ServicesPage/section/serviceCard4",
  },
  {
    local: "ServicesPage/serviceIcons/icon1.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon1",
  },
  {
    local: "ServicesPage/serviceIcons/icon2.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon2",
  },
  {
    local: "ServicesPage/serviceIcons/icon3.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon3",
  },
  {
    local: "ServicesPage/serviceIcons/icon4.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon4",
  },
  {
    local: "ServicesPage/serviceIcons/icon5.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon5",
  },
  {
    local: "ServicesPage/serviceIcons/icon6.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon6",
  },
  {
    local: "ServicesPage/serviceIcons/icon7.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon7",
  },
  {
    local: "ServicesPage/serviceIcons/icon8.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon8",
  },
  {
    local: "ServicesPage/serviceIcons/icon9.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon9",
  },
  {
    local: "ServicesPage/serviceIcons/icon10.svg",
    remote: "folitracks/ServicesPage/serviceIcons/icon10",
  },
  {
    local: "ServicesPage/serviceIcons/check.svg",
    remote: "folitracks/ServicesPage/serviceIcons/check",
  },
  { local: "logo.svg", remote: "folitracks/logo" },
  { local: "hero-img.svg", remote: "folitracks/hero-img" },
  { local: "RatingStars.svg", remote: "folitracks/RatingStars" },
  { local: "arrow-circle.svg", remote: "folitracks/arrow-circle" },
  { local: "Avatar.svg", remote: "folitracks/Avatar" },
  { local: "how-img/how1.svg", remote: "folitracks/how-img/how1" },
  { local: "how-img/how2.svg", remote: "folitracks/how-img/how2" },
  { local: "how-img/how3.svg", remote: "folitracks/how-img/how3" },
  { local: "how-img/how4.svg", remote: "folitracks/how-img/how4" },
];

async function uploadWithRetry(item, maxRetries = 2) {
  const localPath = path.join(assetsPath, item.local);

  if (!fs.existsSync(localPath)) {
    console.log(`⚠️  SKIPPED: ${item.local}`);
    return false;
  }

  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await cloudinary.v2.uploader.upload(localPath, {
        public_id: item.remote,
        resource_type: "auto",
        overwrite: true,
        timeout: 30000,
      });

      console.log(`✅ ${item.local}`);
      return true;
    } catch (error) {
      if (i < maxRetries - 1) {
        console.log(`↻ Retrying: ${item.local}...`);
        await new Promise((r) => setTimeout(r, 1000));
      } else {
        console.log(`❌ ${item.local}`);
        return false;
      }
    }
  }
}

async function uploadAll() {
  console.log("\n📤 Uploading missing images...\n");

  let successCount = 0;
  const total = criticalFiles.length;

  for (let i = 0; i < criticalFiles.length; i++) {
    process.stdout.write(`[${i + 1}/${total}] `);
    const success = await uploadWithRetry(criticalFiles[i]);
    if (success) successCount++;
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Uploaded: ${successCount}/${total}`);
  console.log(`${"=".repeat(50)}\n`);
}

uploadAll().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
