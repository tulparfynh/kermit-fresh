
import fs from 'fs/promises';
import path from 'path';
import type { Panel } from './panel-data';

const PANELS_DIR = path.join(process.cwd(), 'public/images/skirting-boards/berlin-100-mm-skirting-board');

async function getPanelFromDirectory(dirName: string): Promise<Panel | null> {
    const panelDirPath = path.join(PANELS_DIR, dirName);
    const productImagePath = path.join(panelDirPath, 'product.jpg');
    const applicationImagePath = path.join(panelDirPath, 'application.jpg');

    try {
        await fs.access(productImagePath);
        await fs.access(applicationImagePath);

        const baseImagePath = `/images/skirting-boards/berlin-100-mm-skirting-board/${dirName}`;
        
        return {
            id: dirName,
            nameKey: dirName,
            thumbnailUrl: `${baseImagePath}/product.jpg`,
            productImageUrl: `${baseImagePath}/product.jpg`,
            applicationImageUrl: `${baseImagePath}/application.jpg`,
            productImageHint: `product view for berlin 100mm skirting ${dirName}`,
            applicationImageHint: `application view for berlin 100mm skirting ${dirName}`,
        };
    } catch (error) {
        console.warn(`Could not process berlin 100mm skirting in '${dirName}'. Ensure 'product.jpg' and 'application.jpg' exist.`, error);
        return null;
    }
}

export async function getSkirtingBerlin100mm(): Promise<Panel[]> {
  const manifestPath = path.join(PANELS_DIR, 'products.json');

  try {
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const productKeys: string[] = JSON.parse(manifestContent);
    
    if (!Array.isArray(productKeys)) {
        throw new Error('products.json in berlin-100-mm-skirting-board is not a valid JSON array.');
    }

    const panelPromises = productKeys.map(key => getPanelFromDirectory(key));
    
    const panels = (await Promise.all(panelPromises)).filter((p): p is Panel => p !== null);
    
    return panels;
  } catch (error) {
    if (error instanceof SyntaxError) {
        console.error("Error: Malformed JSON in 'berlin-100-mm-skirting-board/products.json'.", error);
    } else if (error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error("Error: 'public/images/skirting-boards/berlin-100-mm-skirting-board/products.json' manifest file not found.", error);
    } else {
        console.error("Could not read or process berlin 100mm skirting data from 'products.json'.", error);
    }
    return [];
  }
}
