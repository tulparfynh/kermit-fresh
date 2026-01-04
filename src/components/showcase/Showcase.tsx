'use client';

import Image from 'next/image';
import { useState } from 'react';
import { panels, type Panel } from '@/lib/panel-data';
import { Card } from '@/components/ui/card';
import { InquiryForm } from './InquiryForm';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from './ColorPicker';
import { ProductDetails } from './ProductDetails';

export function Showcase() {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(panels[0]);

  return (
    <div className="space-y-12 lg:space-y-16">
      <ColorPicker
        panels={panels}
        selectedPanel={selectedPanel}
        onPanelSelect={setSelectedPanel}
      />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl lg:text-4xl font-bold">Wall Panel Collection</h2>
        </div>
        <ProductDetails panel={selectedPanel} />
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
