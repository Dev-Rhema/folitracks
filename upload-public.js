import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dwzojroob',
  api_key: '247996481866464',
  api_secret: 'zBur-wIBjtM68Mk7q6-rBPwWt-c'
});

const files = [
  { local: 'public/hero-bg.svg', remote: 'folitracks/hero-bg' },
  { local: 'public/aboutHero.svg', remote: 'folitracks/aboutHero' },
  { local: 'public/servicesHero.svg', remote: 'folitracks/servicesHero' },
  { local: 'public/cta-img.svg', remote: 'folitracks/cta-img' }
];

async function uploadAll() {
  console.log('\n📤 Uploading background images...\n');
  
  let success = 0;
  for (const file of files) {
    if (!fs.existsSync(file.local)) {
      console.log(`⚠️  NOT FOUND: ${file.local}`);
      continue;
    }

    try {
      await cloudinary.uploader.upload(file.local, {
        public_id: file.remote,
        resource_type: 'auto',
        overwrite: true
      });
      console.log(`✅ ${file.local}`);
      success++;
    } catch (error) {
      console.log(`❌ ${file.local}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Uploaded: ${success}/${files.length}\n`);
}

uploadAll().catch(console.error);
