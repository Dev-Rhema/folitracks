import { optimize } from 'svgo';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToOptimize = [
  'src/assets/images/ServicesPage/section/serviceCard1.svg',
  'src/assets/images/how-img/how4.svg'
];

async function optimizeFile(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    const data = fs.readFileSync(fullPath, 'utf8');
    const originalSize = Buffer.byteLength(data, 'utf8');
    
    const result = optimize(data, {
      path: filePath,
      plugins: [
        'convertStyleToAttrs',
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeTitle',
        'removeDesc',
        'removeUselessDefs',
        'removeEditorsNSData',
        'removeEmptyAttrs',
        'removeHiddenElems',
        'removeEmptyText',
        'removeEmptyContainers',
        {
          name: 'convertPathData',
          params: { precision: 1 },
        },
        {
          name: 'convertTransform',
          params: { floatPrecision: 1 },
        },
      ],
    });
    
    const optimizedData = result.data;
    const optimizedSize = Buffer.byteLength(optimizedData, 'utf8');
    const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
    
    fs.writeFileSync(fullPath, optimizedData, 'utf8');
    
    console.log(`✅ ${path.basename(filePath)}`);
    console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB → Optimized: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`);
    
    return true;
  } catch (error) {
    console.log(`❌ ${filePath}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('\n📦 Compressing SVG files...\n');
  
  let success = 0;
  for (const file of filesToOptimize) {
    if (await optimizeFile(file)) {
      success++;
    }
  }
  
  console.log(`\nCompleted: ${success}/${filesToOptimize.length}\n`);
}

main();
