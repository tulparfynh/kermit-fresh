
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import type { Panel } from '@/lib/panel-data';
import { Card } from '@/components/ui/card';
import { InquiryForm } from './InquiryForm';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from './ColorPicker';
import { ProductDetails } from './ProductDetails';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { ZoomIn, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/lib/utils';


function CollectionNav() {
  const t = useTranslations('HomePage');
  const pathname = usePathname();
  const collections = [
    { name: t('spcWallPanelsTitle'), href: '/spc-wall-panels' },
    { name: t('spc3dWallPanelsModelATitle'), href: '#' },
    { name: t('spc3dWallPanelsModelBTitle'), href: '#' },
  ];

  return (
    <div className="bg-muted py-3 border-b">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 md:gap-6">
                {collections.map((collection, index) => (
                    <React.Fragment key={collection.name}>
                        <Link 
                            href={collection.href} 
                            className={cn(
                                "text-sm md:text-base font-semibold text-foreground/80 hover:text-primary transition-colors text-center",
                                pathname === collection.href && "text-primary"
                            )}
                        >
                            {collection.name}
                        </Link>
                        {index < collections.length - 1 && (
                            <Separator orientation="vertical" className="h-5" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </div>
  );
}


export function Showcase({ initialPanels }: ShowcaseProps) {
  const [panels, setPanels] = useState<Panel[]>(initialPanels);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(initialPanels.length > 0 ? initialPanels[0] : null);
  const tPanelNames = useTranslations('PanelNames');

  useEffect(() => {
    setPanels(initialPanels);
    if (!selectedPanel && initialPanels.length > 0) {
      setSelectedPanel(initialPanels[0]);
    }
  }, [initialPanels, selectedPanel]);

  if (!selectedPanel) {
    return (
      <div className="container mx-auto px-4 mt-6 lg:mt-8 space-y-6">
        <Skeleton className="h-[50vh] w-full" />
        <Skeleton className="h-[20vh] w-full" />
        <p className="text-center text-lg text-muted-foreground">Loading panel data... If this persists, please check the 'public/panels' directory for product folders.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <CollectionNav />
      <div className="container mx-auto px-4 mt-6 lg:mt-8">
        <ProductDetails 
          panel={selectedPanel} 
          panels={panels} 
          onPanelSelect={setSelectedPanel} 
        />
      </div>
      
      <ColorPicker
        panels={panels}
        selectedPanel={selectedPanel}
        onPanelSelect={setSelectedPanel}
      />

      <div className="container mx-auto px-4">
         <section id="application-photo" className="scroll-mt-20">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group overflow-hidden shadow-lg border-none bg-background/50 relative aspect-[16/9] cursor-pointer">
                    <Image
                      src={selectedPanel.applicationImageUrl}
                      alt={`Application of SPC Wall Panel ${tPanelNames(selectedPanel.nameKey)}`}
                      fill
                      className="object-cover"
                      data-ai-hint={selectedPanel.applicationImageHint}
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-16 w-16 text-white drop-shadow-lg" />
                    </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                <DialogTitle className="sr-only">{`Enlarged application view of SPC Wall Panel ${tPanelNames(selectedPanel.nameKey)}`}</DialogTitle>
                <div className="relative aspect-[16/9]">
                   <Image
                    src={selectedPanel.applicationImageUrl}
                    alt={`Enlarged application view of SPC Wall Panel ${tPanelNames(selectedPanel.nameKey)}`}
                    fill
                    className="object-contain rounded-lg"
                    data-ai-hint={selectedPanel.applicationImageHint}
                  />
                </div>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="absolute top-[-1rem] right-[-1rem] bg-black/50 hover:bg-black/70 rounded-full h-9 w-9 text-white">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
        </section>
      </div>
      
      <div className="container mx-auto px-4">
        <section id="application-video" className="scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary tracking-wide text-center mb-4">Exemplary Application Video</h2>
            <Card className="overflow-hidden shadow-lg border-none bg-background/50 relative aspect-video">
                <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/LLy_k_s2Yso" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
            </Card>
        </section>
      </div>

      <div className="container mx-auto px-4 pb-6 lg:pb-8">
        <Separator className="my-6 lg:my-8" />

        <section id="inquiry" className="scroll-mt-20">
          <InquiryForm panel={selectedPanel} />
        </section>
      </div>
    </div>
  );
}
