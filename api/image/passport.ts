import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GlobalFonts, createCanvas } from '@napi-rs/canvas';
import GIFEncoder from 'gif-encoder';
import path from 'path';
import crypto from 'crypto';

function createPseudoRandom(seed: string) {
  const hash = crypto.createHash('sha256').update(seed).digest('hex');
  let index = 0;
  return () => {
    const value = parseInt(hash.substr(index, 8), 16) / 0xffffffff;
    index = (index + 8) % (hash.length - 8);
    return value;
  };
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { address = '0xa', data = '0' } = req.query;
  const achievementLevel = Math.min(30, Math.max(0, parseInt(data.toString(), 10)));

  const width = 512;
  const height = 512;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const fontPath = path.join(process.cwd(), 'public/assets/fonts', 'Roboto-Bold.ttf');
  GlobalFonts.registerFromPath(fontPath, 'CustomFont');

  const random = createPseudoRandom(address.toString());

  const encoder = new GIFEncoder(width, height);

  res.setHeader('Content-Type', 'image/gif');

  encoder.on('data', (buffer) => {
    res.write(buffer);
  });

  encoder.on('end', () => {
    res.end();
  });

  encoder.setRepeat(0);
  encoder.setDelay(100);
  encoder.setQuality(10);
  encoder.writeHeader();

  const frameCount = Math.floor(random() * 5) + 5; // 5 to 10 frames

  for (let i = 0; i < frameCount; i++) {
    // Passport-like background
    ctx.fillStyle = '#000080'; // Navy blue
    ctx.fillRect(0, 0, width, height);

    // Gold border
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Title
    ctx.fillStyle = '#FFD700';
    ctx.font = '40px CustomFont';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('PHI PASSPORT', width / 2, 40);

    // Address
    ctx.fillStyle = 'white';
    ctx.font = '20px CustomFont';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Address: ${address}`, 40, height / 2 - 50);

    // Achievement Level
    ctx.fillStyle = '#FFD700';
    ctx.font = '30px CustomFont';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Achievement Level: ${achievementLevel}/30`, width / 2, height / 2 + 50);

    // Dynamic element (simulating a hologram effect)
    ctx.strokeStyle = `hsl(${random() * 360}, 100%, 50%)`;
    ctx.lineWidth = 2;
    const centerX = width / 2;
    const centerY = height / 2 + 120;
    const radius = 50 + Math.sin((i * Math.PI) / 10) * 10; // Pulsating effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Uniswap logo (simplified)
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(width / 2, height - 80, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF007A'; // Uniswap pink
    ctx.beginPath();
    ctx.arc(width / 2, height - 80, 20, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, width, height);
    encoder.addFrame(imageData.data);
  }

  encoder.finish();
}
