import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: 'dwzojroob',
  api_key: '247996481866464',
  api_secret: 'zBur-wIBjtM68Mk7q6-rBPwWt-c'
});

async function uploadFile(localPath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      resource_type: 'auto',
      overwrite: true
    });
    return { success: true, file: localPath };
  } catch (e) {
    return { success: false, file: localPath, error: e.message };
  }
}

async function main() {
  const files = [
    ['src/assets/images/ServicesPage/section/serviceCard1.svg', 'folitracks/ServicesPage/section/serviceCard1'],
    ['src/assets/images/ServicesPage/section/serviceCard2.svg', 'folitracks/ServicesPage/section/serviceCard2'],
    ['src/assets/images/ServicesPage/section/serviceCard3.svg', 'folitracks/ServicesPage/section/serviceCard3'],
    ['src/assets/images/ServicesPage/section/serviceCard4.svg', 'folitracks/ServicesPage/section/serviceCard4'],
    ['src/assets/images/ServicesPage/serviceIcons/icon1.svg', 'folitracks/ServicesPage/serviceIcons/icon1'],
    ['src/assets/images/ServicesPage/serviceIcons/icon2.svg', 'folitracks/ServicesPage/serviceIcons/icon2'],
    ['src/assets/images/ServicesPage/serviceIcons/icon3.svg', 'folitracks/ServicesPage/serviceIcons/icon3'],
    ['src/assets/images/ServicesPage/serviceIcons/icon4.svg', 'folitracks/ServicesPage/serviceIcons/icon4'],
    ['src/assets/images/ServicesPage/serviceIcons/icon5.svg', 'folitracks/ServicesPage/serviceIcons/icon5'],
    ['src/assets/images/ServicesPage/serviceIcons/icon6.svg', 'folitracks/ServicesPage/serviceIcons/icon6'],
    ['src/assets/images/ServicesPage/serviceIcons/icon7.svg', 'folitracks/ServicesPage/serviceIcons/icon7'],
    ['src/assets/images/ServicesPage/serviceIcons/icon8.svg', 'folitracks/ServicesPage/serviceIcons/icon8'],
    ['src/assets/images/ServicesPage/serviceIcons/icon9.svg', 'folitracks/ServicesPage/serviceIcons/icon9'],
    ['src/assets/images/ServicesPage/serviceIcons/icon10.svg', 'folitracks/ServicesPage/serviceIcons/icon10'],
    ['src/assets/images/ServicesPage/serviceIcons/check.svg', 'folitracks/ServicesPage/serviceIcons/check'],
    ['src/assets/images/logo.svg', 'folitracks/logo'],
    ['src/assets/images/hero-img.svg', 'folitracks/hero-img'],
    ['src/assets/images/RatingStars.svg', 'folitracks/RatingStars'],
    ['src/assets/images/arrow-circle.svg', 'folitracks/arrow-circle'],
    ['src/assets/images/Avatar.svg', 'folitracks/Avatar'],
    ['src/assets/images/how-img/how1.svg', 'folitracks/how-img/how1'],
    ['src/assets/images/how-img/how2.svg', 'folitracks/how-img/how2'],
    ['src/assets/images/how-img/how3.svg', 'folitracks/how-img/how3'],
    ['src/assets/images/how-img/how4.svg', 'folitracks/how-img/how4'],
  ];

  console.log('Starting uploads...\n');
  
  let success = 0;
  for (const [local, remote] of files) {
    if (fs.existsSync(local)) {
      const result = await uploadFile(local, remote);
      if (result.success) {
        console.log(`✅ ${local}`);
        success++;
      } else {
        console.log(`❌ ${local}: ${result.error}`);
      }
    } else {
      console.log(`⚠️  ${local} (not found)`);
    }
  }
  
  console.log(`\nCompleted: ${success}/${files.length}`);
}

main().catch(console.error);
