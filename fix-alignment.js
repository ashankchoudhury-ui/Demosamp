import fs from 'fs';
import path from 'path';
import google from 'googlethis';
import { Jimp } from 'jimp';

async function fixAlignmentImage() {
  const publicDir = path.join(process.cwd(), 'public', 'gallery');
  // Using a query that specifically excludes logos, text, and brand names
  const query = 'orthodontic teeth straightening before and after clinical photo -invisalign -logo -watermark -text -brand';
  
  console.log(`Searching with query: "${query}"...`);
  try {
    const images = await google.image(query, { safe: false });
    if (images && images.length > 0) {
      for (let i = 0; i < Math.min(15, images.length); i++) {
        try {
          const url = images[i].url;
          // Skip URLs that likely contain branding or are from known branded sites
          if (url.toLowerCase().includes('invisalign') || url.toLowerCase().includes('logo') || url.toLowerCase().includes('watermark')) {
              console.log(`Skipping likely branded URL: ${url}`);
              continue;
          }
          
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
              
              const beforePath = path.join(publicDir, `alignment_before.jpg`);
              const afterPath = path.join(publicDir, `alignment_after.jpg`);
              
              await beforeImg.write(beforePath);
              await afterImg.write(afterPath);
              
              console.log(`Successfully processed and saved new alignment images.`);
              return; // Exit after successful download
            }
          }
        } catch (e) {
          console.log(`Failed to process result ${i}: ${e.message}, trying next...`);
        }
      }
      console.log(`Could not process any clean results for alignment`);
    }
  } catch (error) {
    console.error(`Error searching:`, error.message);
  }
}

fixAlignmentImage().catch(console.error);
