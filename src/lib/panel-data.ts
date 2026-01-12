
import fs from 'fs/promises';
import path from 'path';

export type Panel = {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  thumbnailHint: string;
  productImageUrl: string;
  productImageHint: string;
  applicationImageUrl: string;
  applicationImageHint: string;
};

const PANELS_DIR = path.join(process.cwd(), 'public/panels');

async function getPanelFromDirectory(dirName: string): Promise<Panel> {
  const dirPath = path.join(PANELS_DIR, dirName);
  
  // Read metadata
  const detailsPath = path.join(dirPath, 'details.json');
  const detailsJson = await fs.readFile(detailsPath, 'utf-8');
  const details = JSON.parse(detailsJson);

  // Construct image URLs. Assume standard naming.
  // Note: These URLs are relative to the `public` directory.
  const thumbnailUrl = `/panels/${dirName}/thumbnail.png`;
  const productImageUrl = `/panels/${dirName}/product.png`;
  const applicationImageUrl = `/panels/${dirName}/application.png`;
  
  return {
    id: dirName,
    name: details.name,
    description: details.description,
    thumbnailUrl,
    productImageUrl,
    applicationImageUrl,
    // Hints can be added to details.json if needed, or standardized
    thumbnailHint: details.thumbnailHint || `${details.name} thumbnail`,
    productImageHint: details.productImageHint || `${details.name} product view`,
    applicationImageHint: details.applicationImageHint || `${details.name} in a room`,
  };
}

export async function getPanels(): Promise<Panel[]> {
  try {
    const panelDirs = await fs.readdir(PANELS_DIR);
    const panelPromises = panelDirs.map(dirName => getPanelFromDirectory(dirName));
    const panels = await Promise.all(panelPromises);
    return panels;
  } catch (error) {
    console.error("Failed to read panel data:", error);
    // If the directory doesn't exist or is empty, return an empty array
    // so the page can still build.
    return [];
  }
}
