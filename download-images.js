import fs from 'fs';
import path from 'path';
import google from 'googlethis';
import { Jimp } from 'jimp';

const queries = [
  { name: 'whitening', query: 'teeth whitening before and after clinical photo' },
  { name: 'veneers', query: 'dental veneers before and after clinical photo' },
  { name: 'implants', query: 'dental implant before and after clinical photo' },
  { name: 'alignment', query: 'invisalign clear aligners before and after clinical photo' }
];

async function downloadAndSplitImages() {
  const publicDir = path.join(process.cwd(), 'public', 'gallery');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const item of queries) {
    console.log(`Searching for ${item.name} with query: "${item.query}"...`);
    try {
      const images = await google.image(item.query, { safe: false });
      if (images && images.length > 0) {
        let processed = false;
        
        for (let i = 0; i < Math.min(10, images.length); i++) {
          try {
            const url = images[i].url;
            console.log(`Attempting to download and process ${url}`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            const response = await fetch(url, { 
              signal: controller.signal,
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            });
            clearTimeout(timeoutId);
            
            if (response.ok) {
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.startsWith('image/')) {
                const buffer = await response.arrayBuffer();
                
                // Load image with Jimp
                const image = await Jimp.read(Buffer.from(buffer));
                const width = image.bitmap.width;
                const height = image.bitmap.height;
                
                // Ensure image is large enough to be a real photo
                if (width < 300 || height < 150) {
                   console.log('Image too small, skipping...');
                   continue;
                }

                let beforeImg, afterImg;
                
                // Determine split direction based on aspect ratio
                if (width >= height * 1.2) {
                  // Wide image -> split vertically (left/right)
                  const halfWidth = Math.floor(width / 2);
                  beforeImg = image.clone().crop({ x: 0, y: 0, w: halfWidth, h: height });
                  afterImg = image.clone().crop({ x: halfWidth, y: 0, w: halfWidth, h: height });
                  console.log('Split vertically (left/right)');
                } else {
                  // Tall or square image -> split horizontally (top/bottom)
                  const halfHeight = Math.floor(height / 2);
                  beforeImg = image.clone().crop({ x: 0, y: 0, w: width, h: halfHeight });
                  afterImg = image.clone().crop({ x: 0, y: halfHeight, w: width, h: halfHeight });
                  console.log('Split horizontally (top/bottom)');
                }
                
                const beforePath = path.join(publicDir, `${item.name}_before.jpg`);
                const afterPath = path.join(publicDir, `${item.name}_after.jpg`);
                
                await beforeImg.write(beforePath);
                await afterImg.write(afterPath);
                
                console.log(`Successfully processed and saved ${item.name} images.`);
                processed = true;
                break;
              }
            }
          } catch (e) {
            console.log(`Failed to process result ${i}: ${e.message}, trying next...`);
          }
        }
        if (!processed) {
          console.log(`Could not process any results for ${item.name}`);
        }
      }
    } catch (error) {
      console.error(`Error searching ${item.name}:`, error.message);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('Finished processing all images.');
}

downloadAndSplitImages().catch(console.error);
