import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: "dwzojroob",
  api_key: "247996481866464",
  api_secret: "zBur-wIBjtM68Mk7q6-rBPwWt-c",
});

const assetsPath = path.join(__dirname, "src/assets/images");

// Function to recursively get all files and generate upload map
function generateUploadMap() {
  const uploadMap = [];

  function walkDir(dir, cloudinaryBase) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath, path.join(cloudinaryBase, file).replace(/\\/g, "/"));
      } else if (
        stat.isFile() &&
        [".svg", ".png", ".jpg", ".jpeg"].includes(
          path.extname(file).toLowerCase(),
        )
      ) {
        const fileName = path.basename(file, path.extname(file));
        const cloudinaryPath = `${cloudinaryBase}/${fileName}`.replace(
          /\\/g,
          "/",
        );
        uploadMap.push({
          local: path.relative(assetsPath, fullPath).replace(/\\/g, "/"),
          fullPath: fullPath,
          remote: cloudinaryPath,
        });
      }
    }
  }

  walkDir(assetsPath, "folitracks");
  return uploadMap;
}

async function uploadImages() {
  console.log("Starting Cloudinary upload...\n");

  const uploadMap = generateUploadMap();

  let successCount = 0;
  let failCount = 0;
  const failedUploads = [];

  console.log(`Found ${uploadMap.length} images to upload.\n`);

  for (const item of uploadMap) {
    try {
      const result = await cloudinary.v2.uploader.upload(item.fullPath, {
        public_id: item.remote,
        resource_type: "auto",
        overwrite: true,
      });

      console.log(`✅ UPLOADED: ${item.local}`);
      successCount++;
    } catch (error) {
      console.log(`❌ FAILED: ${item.local} - ${error.message}`);
      failCount++;
      failedUploads.push(item.local);
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Upload Complete!`);
  console.log(`✅ Successfully uploaded: ${successCount} files`);
  console.log(`❌ Failed uploads: ${failCount} files`);

  if (failedUploads.length > 0) {
    console.log(`\nFailed files:`);
    failedUploads.forEach((file, i) => console.log(`  ${i + 1}. ${file}`));
  }
  console.log(`${"=".repeat(60)}\n`);

  if (failCount === 0) {
    console.log("🎉 All images successfully uploaded to Cloudinary!");
    console.log("Your website is now using Cloudinary for all images.\n");
  }
}

uploadImages().catch((error) => {
  console.error("Upload script error:", error);
  process.exit(1);
});
