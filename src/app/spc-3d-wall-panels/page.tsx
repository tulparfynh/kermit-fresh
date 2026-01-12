
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { get3DPanels } from '@/lib/3d-panel-data';

export const revalidate = 60; 

export default async function Spc3DWallPanelsPage() {
  const panels = await get3DPanels();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-grow">
        <Showcase initialPanels={panels} />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
