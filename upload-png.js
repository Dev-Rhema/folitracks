import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dwzojroob',
  api_key: '247996481866464',
  api_secret: 'zBur-wIBjtM68Mk7q6-rBPwWt-c'
});

const files = [
  { local: 'src/assets/images/how-img/how4.png', remote: 'folitracks/how-img/how4' },
  { local: 'src/assets/images/ServicesPage/section/serviceCard1.png', remote: 'folitracks/ServicesPage/section/serviceCard1' }
];

async function uploadAll() {
  console.log('\n📤 Uploading PNG files to Cloudinary...\n');
  
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
      console.log(`✅ UPLOADED: ${file.local}`);
      success++;
    } catch (error) {
      console.log(`❌ FAILED: ${file.local} - ${error.message}`);
    }
  }
  
  console.log(`\n✅ Uploaded: ${success}/${files.length}\n`);
}

uploadAll().catch(console.error);
