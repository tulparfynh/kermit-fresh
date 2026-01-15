
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getFloorStone } from '@/lib/floor-stone-data';

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export const revalidate = 60; 

export default async function SpcParquetStoneCollectionPage() {
  const panels = await getFloorStone();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="spc-parquet-stone-collection" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="spc-parquet-stone-collection" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
