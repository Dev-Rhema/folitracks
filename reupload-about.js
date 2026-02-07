import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dwzojroob',
  api_key: '247996481866464',
  api_secret: 'zBur-wIBjtM68Mk7q6-rBPwWt-c'
});

const files = [
  { local: 'src/assets/images/About/section/aboutCard1.svg', remote: 'folitracks/About/section/aboutCard1' },
  { local: 'src/assets/images/About/section/aboutCard2.svg', remote: 'folitracks/About/section/aboutCard2' },
  { local: 'src/assets/images/About/section/aboutCard3.svg', remote: 'folitracks/About/section/aboutCard3' },
  { local: 'src/assets/images/About/section/aboutCard4.svg', remote: 'folitracks/About/section/aboutCard4' },
  { local: 'src/assets/images/About/aboutMan.svg', remote: 'folitracks/About/aboutMan' },
];

async function uploadAll() {
  console.log('\n📤 Re-uploading About images...\n');
  
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
