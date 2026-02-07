import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.v2.config({
  cloud_name: 'dwzojroob',
  api_key: '247996481866464',
  api_secret: 'zBur-wIBjtM68Mk7q6-rBPwWt-c'
});

const assetsPath = path.join(__dirname, 'src/assets/images');

// Critical files that must be uploaded
const criticalFiles = [
  { local: 'ServicesPage/servicesMan.svg', remote: 'folitracks/ServicesPage/servicesMan' },
  { local: 'ServicesPage/section/serviceCard1.svg', remote: 'folitracks/ServicesPage/section/serviceCard1' },
  { local: 'ServicesPage/section/serviceCard2.svg', remote: 'folitracks/ServicesPage/section/serviceCard2' },
  { local: 'ServicesPage/section/serviceCard3.svg', remote: 'folitracks/ServicesPage/section/serviceCard3' },
  { local: 'ServicesPage/section/serviceCard4.svg', remote: 'folitracks/ServicesPage/section/serviceCard4' },
  { local: 'ServicesPage/serviceIcons/icon1.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon1' },
  { local: 'ServicesPage/serviceIcons/icon2.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon2' },
  { local: 'ServicesPage/serviceIcons/icon3.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon3' },
  { local: 'ServicesPage/serviceIcons/icon4.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon4' },
  { local: 'ServicesPage/serviceIcons/icon5.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon5' },
  { local: 'ServicesPage/serviceIcons/icon6.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon6' },
  { local: 'ServicesPage/serviceIcons/icon7.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon7' },
  { local: 'ServicesPage/serviceIcons/icon8.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon8' },
  { local: 'ServicesPage/serviceIcons/icon9.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon9' },
  { local: 'ServicesPage/serviceIcons/icon10.svg', remote: 'folitracks/ServicesPage/serviceIcons/icon10' },
  { local: 'ServicesPage/serviceIcons/check.svg', remote: 'folitracks/ServicesPage/serviceIcons/check' },
  { local: 'logo.svg', remote: 'folitracks/logo' },
  { local: 'hero-img.svg', remote: 'folitracks/hero-img' },
  { local: 'RatingStars.svg', remote: 'folitracks/RatingStars' },
  { local: 'arrow-circle.svg', remote: 'folitracks/arrow-circle' },
  { local: 'Avatar.svg', remote: 'folitracks/Avatar' },
  { local: 'how-img/how1.svg', remote: 'folitracks/how-img/how1' },
  { local: 'how-img/how2.svg', remote: 'folitracks/how-img/how2' },
  { local: 'how-img/how3.svg', remote: 'folitracks/how-img/how3' },
  { local: 'how-img/how4.svg', remote: 'folitracks/how-img/how4' },
];

async function uploadCritical() {
  console.log('\n⏳ Uploading critical missing images...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const item of criticalFiles) {
    const localPath = path.join(assetsPath, item.local);
    
    if (!fs.existsSync(localPath)) {
      console.log(`⚠️  SKIPPED: ${item.local} (not found)`);
      failCount++;
      continue;
    }

    try {
      const result = await cloudinary.v2.uploader.upload(localPath, {
        public_id: item.remote,
        resource_type: 'auto',
        overwrite: true
      });
      
      console.log(`✅ UPLOADED: ${item.local}`);
      successCount++;
      
      // Small delay between uploads
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.log(`❌ FAILED: ${item.local} - ${error.message}`);
      failCount++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Successfully uploaded: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`${'='.repeat(60)}\n`);
  
  process.exit(failCount === 0 ? 0 : 1);
}

uploadCritical().catch(console.error);
