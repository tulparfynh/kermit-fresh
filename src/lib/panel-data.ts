
import fs from 'fs/promises';
import path from 'path';

export type Panel = {
  id: string;
  nameKey: string;
  thumbnailUrl: string;
  productImageUrl: string;
  productImageHint: string;
  applicationImageUrl: string;
  applicationImageHint:string;
};

const PANELS_DIR = path.join(process.cwd(), 'public/images/spc-wall-panels');

async function getPanelFromDirectory(dirName: string): Promise<Panel | null> {
    const panelDirPath = path.join(PANELS_DIR, dirName);
    const productImagePath = path.join(panelDirPath, 'product.jpg');
    const applicationImagePath = path.join(panelDirPath, 'application.jpg');

    try {
        // Check if essential image files exist before creating the panel object.
        await fs.access(productImagePath);
        await fs.access(applicationImagePath);

        const baseImagePath = `/images/spc-wall-panels/${dirName}`;
        
        return {
            id: dirName,
            nameKey: dirName, // Use the folder name as the language-agnostic key.
            thumbnailUrl: `${baseImagePath}/product.jpg`,
            productImageUrl: `${baseImagePath}/product.jpg`,
            applicationImageUrl: `${baseImagePath}/application.jpg`,
            productImageHint: `product view for ${dirName}`,
            applicationImageHint: `application view for ${dirName}`,
        };
    } catch (error) {
        console.warn(`Could not process panel in '${dirName}'. Ensure 'product.jpg' and 'application.jpg' exist.`, error);
        return null;
    }
}

export async function getPanels(): Promise<Panel[]> {
  try {
    await fs.access(PANELS_DIR);

    const panelDirs = await fs.readdir(PANELS_DIR);
    const panelPromises = panelDirs.map(dirName => {
        // Ignore hidden files like .DS_Store
        if (!dirName.startsWith('.')) {
            return getPanelFromDirectory(dirName);
        }
        return Promise.resolve(null);
    });
    
    const panels = (await Promise.all(panelPromises)).filter((p): p is Panel => p !== null);
    
    // Sort panels to ensure a consistent order
    panels.sort((a, b) => a.nameKey.localeCompare(b.nameKey));
    
    return panels;
  } catch (error) {
    console.warn("Could not read panel data from 'public/images/spc-wall-panels'. Does the directory exist?", error);
    return [];
  }
}
