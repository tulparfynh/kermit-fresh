
import fs from 'fs/promises';
import path from 'path';
import type { Panel } from './panel-data';

const PANELS_DIR = path.join(process.cwd(), 'public/images/full-natural-collection');

async function getPanelFromDirectory(dirName: string): Promise<Panel | null> {
    const panelDirPath = path.join(PANELS_DIR, dirName);
    const productImagePath = path.join(panelDirPath, 'product.jpg');
    const applicationImagePath = path.join(panelDirPath, 'application.jpg');

    try {
        await fs.access(productImagePath);
        await fs.access(applicationImagePath);

        const baseImagePath = `/images/full-natural-collection/${dirName}`;
        
        return {
            id: dirName,
            nameKey: dirName,
            thumbnailUrl: `${baseImagePath}/product.jpg`,
            productImageUrl: `${baseImagePath}/product.jpg`,
            applicationImageUrl: `${baseImagePath}/application.jpg`,
            productImageHint: `product view for full natural floor ${dirName}`,
            applicationImageHint: `application view for full natural floor ${dirName}`,
        };
    } catch (error) {
        console.warn(`Could not process full natural floor in '${dirName}'. Ensure 'product.jpg' and 'application.jpg' exist.`, error);
        return null;
    }
}

export async function getFloorFullNatural(): Promise<Panel[]> {
  const manifestPath = path.join(PANELS_DIR, 'products.json');

  try {
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const productKeys: string[] = JSON.parse(manifestContent);
    
    if (!Array.isArray(productKeys)) {
        throw new Error('products.json in full-natural-collection is not a valid JSON array.');
    }

    const panelPromises = productKeys.map(key => getPanelFromDirectory(key));
    
    const panels = (await Promise.all(panelPromises)).filter((p): p is Panel => p !== null);
    
    return panels;
  } catch (error) {
    if (error instanceof SyntaxError) {
        console.error("Error: Malformed JSON in 'full-natural-collection/products.json'.", error);
    } else if (error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error("Error: 'public/images/full-natural-collection/products.json' manifest file not found.", error);
    } else {
        console.error("Could not read or process full natural floor data from 'products.json'.", error);
    }
    return [];
  }
}
