'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { panels, type Panel } from '@/lib/panel-data';
import { Card } from '@/components/ui/card';
import { InquiryForm } from './InquiryForm';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from './ColorPicker';
import { ProductDetails } from './ProductDetails';
import { generateScene } from '@/ai/flows/generate-application-image-flow';
import { Skeleton } from '../ui/skeleton';

async function urlToDataUri(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


export function Showcase() {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(panels[0]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generate = async () => {
      if (selectedPanel.generateScene) {
        setIsLoading(true);
        setGeneratedImageUrl(null);
        try {
          const dataUri = await urlToDataUri(selectedPanel.productImageUrl);
          const result = await generateScene({
            photoDataUri: dataUri,
          });
          setGeneratedImageUrl(result.imageUrl);
        } catch (error) {
          console.error("Failed to generate scene:", error);
          // Fallback to original image on error
          setGeneratedImageUrl(selectedPanel.applicationImageUrl);
        } finally {
          setIsLoading(false);
        }
      } else {
        setGeneratedImageUrl(null);
        setIsLoading(false);
      }
    };
    generate();
  }, [selectedPanel]);


  const applicationImage = generatedImageUrl || selectedPanel.applicationImageUrl;

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="container mx-auto px-4 mt-12 lg:mt-16">
        <ProductDetails panel={selectedPanel} />
      </div>
      
      <ColorPicker
        panels={panels}
        selectedPanel={selectedPanel}
        onPanelSelect={setSelectedPanel}
      />

      <div className="container mx-auto px-4">
         <section id="application-photo" className="scroll-mt-20">
            <Card className="overflow-hidden shadow-lg border-none">
              <div className="relative aspect-[16/9]">
                {isLoading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <Image
                      src={applicationImage}
                      alt={`Application photo for ${selectedPanel.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={selectedPanel.applicationImageHint}
                    />
                )}
              </div>
            </Card>
        </section>
      </div>
      
      <div className="container mx-auto px-4">
        <Separator className="my-12 lg:my-16" />

        <section id="inquiry" className="scroll-mt-20">
          <InquiryForm panel={selectedPanel} />
        </section>
      </div>
    </div>
  );
}
