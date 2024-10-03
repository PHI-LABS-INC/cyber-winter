import fs from 'fs/promises';
import path from 'path';

export async function readCSVFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading CSV file: ${error}`);
    throw error;
  }
}

export async function readFileAsBase64(filePath: string): Promise<string> {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const fileExtension = path.extname(filePath).toLowerCase();
    let mimeType: string;

    switch (fileExtension) {
      case '.png':
        mimeType = 'image/png';
        break;
      case '.jpg':
        mimeType = 'image/jpg';
        break;
      case '.webp':
        mimeType = 'image/webp';
        break;
      case '.gif':
        mimeType = 'image/gif';
        break;
      case '.svg':
        mimeType = 'image/svg+xml';
        break;
      default:
        throw new Error(`Unsupported file type: ${fileExtension}`);
    }

    if (fileExtension === '.svg') {
      const svgContent = fileBuffer.toString('utf8');
      const base64 = Buffer.from(svgContent).toString('base64');
      return `data:${mimeType};base64,${base64}`;
    } else {
      return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    }
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    throw error;
  }
}

export async function readImageAsBase64(configId: number): Promise<string> {
  try {
    const imagePath = path.join(process.cwd(), 'public/assets/images/logo', `${configId}.png`);
    const imageBuffer = await fs.readFile(imagePath);
    return `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error reading image file: ${error}`);
    throw error;
  }
}

export async function readSvgAsBase64(filePath: string): Promise<string> {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const base64 = Buffer.from(data).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } catch (error) {
    console.error(`Error reading SVG file: ${error}`);
    throw error;
  }
}
