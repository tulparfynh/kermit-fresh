'use client';

import type { Resource, Locale } from '@/lib/resources-data';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Download, Package, FileText, X, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M16.75 13.96c-.25-.13-1.48-.73-1.71-.82-.23-.08-.39-.13-.56.13-.17.25-.65.81-.79.98-.14.17-.29.18-.54.06-.25-.11-1.04-.38-1.99-1.22-.74-.66-1.23-1.46-1.38-1.71-.15-.25-.01-.39.11-.5.11-.11.25-.29.38-.43.12-.14.16-.25.25-.42.09-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.42h-.5c-.17 0-.42.06-.64.33-.22.27-.85.83-.85 2.01 0 1.18.87 2.33 1 2.51.13.17 1.71 2.63 4.17 3.66.58.25 1.03.4 1.39.51.54.17 1.01.14 1.38.08.42-.06 1.28-.52 1.46-1.03.18-.51.18-.94.12-1.04-.06-.1-.22-.15-.47-.28zM12.04 2.02c-5.46 0-9.91 4.45-9.91 9.91 0 1.79.46 3.5 1.28 5l-1.36 4.95 5.07-1.33c1.44.8 3.06 1.24 4.75 1.24h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM19.12 17.3c-1.89 1.89-4.4 2.93-7.08 2.93h-.01c-1.57 0-3.11-.42-4.45-1.21l-.31-.18-3.32.87.89-3.23-.2-.33c-.88-1.45-1.35-3.12-1.35-4.85 0-4.91 3.99-8.91 8.91-8.91 2.41 0 4.67.94 6.3 2.58s2.58 3.89 2.58 6.3c0 4.91-3.99 8.91-8.91 8.91z" /></svg>
);

type StarterPackCardProps = {
  pack: Resource;
  libraryDocs: Resource[];
};

export default function StarterPackCard({ pack, libraryDocs }: StarterPackCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('ResourcesPage');
  const tDialog = useTranslations('StarterPackDialog');

  const title = locale === 'tr' ? pack.title_tr : pack.title;
  const summary = locale === 'tr' ? pack.summary_tr : pack.summary;
  const bullets = locale === 'tr' ? pack.bullets_tr : pack.bullets;
  
  const packAudience = pack.audience[0];
  const packContents = libraryDocs.filter(
    doc => doc.audience.includes(packAudience) || doc.audience.includes('all')
  );

  const email = "info@kermit.com.tr";
  const phone = locale === 'tr' ? "905532775896" : "905376156129";
  const whatsappMessage = tDialog('whatsappMessage', { packName: title });
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
                <Package className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        </div>
        <CardDescription className="pt-2">{summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {bullets?.map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full sm:flex-1 whitespace-normal h-auto">
                    <Download className="mr-2 h-4 w-4" />
                    {t('downloadZip')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-center font-bold">
                        {tDialog('title', { packName: title })}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    <a href={`mailto:${email}`} className="block">
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                                <Mail className="h-10 w-10 text-primary" />
                                <p className="font-semibold text-lg">{tDialog('emailAction')}</p>
                            </CardContent>
                        </Card>
                    </a>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                                <WhatsAppIcon className="h-10 w-10 text-primary" />
                                <p className="font-semibold text-lg">{tDialog('whatsappAction')}</p>
                            </CardContent>
                        </Card>
                    </a>
                </div>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute top-3 right-3 rounded-full">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:flex-1 whitespace-normal h-auto">
                {t('viewContents')}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-2xl">{t('viewContentsTitle', { packName: title })}</DialogTitle>
                    <DialogDescription>
                        {t('viewContentsDescription')}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] border-y">
                    <div className="space-y-3 p-6">
                        {packContents.length > 0 ? packContents.map(doc => {
                            const docTitle = locale === 'tr' ? doc.title_tr : doc.title;
                            return (
                                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <FileText className="h-5 w-5 text-secondary flex-shrink-0"/>
                                        <span className="font-medium text-sm truncate" title={docTitle}>{docTitle}</span>
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="text-muted-foreground text-center py-8">{t('noResults')}</p>
                        )}
                    </div>
                </ScrollArea>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute top-3 right-3 rounded-full">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
