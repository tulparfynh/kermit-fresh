
import type { Panel } from './panel-data';

const placeholder3DPanels: Panel[] = [
    {
        id: '3d-wave',
        name: '3D Wave',
        thumbnailUrl: 'https://picsum.photos/seed/3dwave/200/200',
        productImageUrl: 'https://picsum.photos/seed/3dwave/600/400',
        productImageHint: '3D wave panel',
        applicationImageUrl: 'https://picsum.photos/seed/3dwaveapp/1920/1080',
        applicationImageHint: 'accent wall living room',
    },
    {
        id: '3d-geo',
        name: '3D Geometric',
        thumbnailUrl: 'https://picsum.photos/seed/3dgeo/200/200',
        productImageUrl: 'https://picsum.photos/seed/3dgeo/600/400',
        productImageHint: '3D geometric pattern',
        applicationImageUrl: 'https://picsum.photos/seed/3dgeoapp/1920/1080',
        applicationImageHint: 'modern office reception',
    },
    {
        id: '3d-fluted',
        name: '3D Fluted',
        thumbnailUrl: 'https://picsum.photos/seed/3dfluted/200/200',
        productImageUrl: 'https://picsum.photos/seed/3dfluted/600/400',
        productImageHint: '3D fluted wood panel',
        applicationImageUrl: 'https://picsum.photos/seed/3dflutedapp/1920/1080',
        applicationImageHint: 'bedroom feature wall',
    },
    {
        id: '3d-diamond',
        name: '3D Diamond',
        thumbnailUrl: 'https://picsum.photos/seed/3ddiamond/200/200',
        productImageUrl: 'https://picsum.photos/seed/3ddiamond/600/400',
        productImageHint: '3D diamond tile',
        applicationImageUrl: 'https://picsum.photos/seed/3ddiamondapp/1920/1080',
        applicationImageHint: 'luxury bathroom wall',
    }
];


export async function get3DPanels(): Promise<Panel[]> {
  // In the future, this could fetch data from a CMS or a local directory
  // similar to getPanels(). For now, we'll return static placeholder data.
  return new Promise(resolve => {
    setTimeout(() => {
        resolve(placeholder3DPanels);
    }, 50); // Simulate async operation
  });
}
