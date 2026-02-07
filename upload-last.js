import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dwzojroob',
  api_key: '247996481866464',
  api_secret: 'zBur-wIBjtM68Mk7q6-rBPwWt-c'
});

async function upload(file, id) {
  try {
    await cloudinary.uploader.upload(file, {
      public_id: id,
      resource_type: 'auto',
      overwrite: true
    });
    console.log(`✅ ${id} uploaded`);
    return true;
  } catch (e) {
    console.log(`❌ ${id}: ${e.message}`);
    return false;
  }
}

let s = (await upload('src/assets/images/how-img/how4.svg', 'folitracks/how-img/how4')) ? 1 : 0;
console.log(`\nResult: ${s} uploaded`);
