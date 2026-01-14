
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { get3dPanelsModelB } from '@/lib/3d-panel-data-model-b';

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export const revalidate = 60; 

export default async function Spc3dWallPanelsModelBPage() {
  const panels = await get3dPanelsModelB();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="spc-3d-wall-panels-model-b" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="spc-3d-wall-panels-model-b" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
