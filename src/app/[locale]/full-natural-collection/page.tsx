
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getFloorFullNatural } from '@/lib/floor-full-natural-data';

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export const revalidate = 60; 

export default async function FullNaturalCollectionPage() {
  const panels = await getFloorFullNatural();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="full-natural-collection" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="full-natural-collection" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
