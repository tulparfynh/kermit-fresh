
import fs from 'fs/promises';
import path from 'path';
import type { Panel } from './panel-data';

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-parquet-natural-collection');

async function getPanelFromDirectory(dirName: string): Promise<Panel | null> {
    const panelDirPath = path.join(PANELS_DIR, dirName);
    const productImagePath = path.join(panelDirPath, 'product.jpg');
    const applicationImagePath = path.join(panelDirPath, 'application.jpg');

    try {
        await fs.access(productImagePath);
        await fs.access(applicationImagePath);

        const baseImagePath = `/images/spc-parquet-natural-collection/${dirName}`;
        
        return {
            id: dirName,
            nameKey: dirName,
            thumbnailUrl: `${baseImagePath}/product.jpg`,
            productImageUrl: `${baseImagePath}/product.jpg`,
            applicationImageUrl: `${baseImagePath}/application.jpg`,
            productImageHint: `product view for natural parquet ${dirName}`,
            applicationImageHint: `application view for natural parquet ${dirName}`,
        };
    } catch (error) {
        console.warn(`Could not process natural parquet in '${dirName}'. Ensure 'product.jpg' and 'application.jpg' exist.`, error);
        return null;
    }
}

export async function getFloorNatural(): Promise<Panel[]> {
  const manifestPath = path.join(PANELS_DIR, 'products.json');

  try {
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const productKeys: string[] = JSON.parse(manifestContent);
    
    if (!Array.isArray(productKeys)) {
        throw new Error('products.json in spc-parquet-natural-collection is not a valid JSON array.');
    }

    const panelPromises = productKeys.map(key => getPanelFromDirectory(key));
    
    const panels = (await Promise.all(panelPromises)).filter((p): p is Panel => p !== null);
    
    return panels;
  } catch (error) {
    if (error instanceof SyntaxError) {
        console.error("Error: Malformed JSON in 'spc-parquet-natural-collection/products.json'.", error);
    } else if (error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error("Error: 'public/images/spc-parquet-natural-collection/products.json' manifest file not found.", error);
    } else {
        console.error("Could not read or process natural parquet data from 'products.json'.", error);
    }
    return [];
  }
}
