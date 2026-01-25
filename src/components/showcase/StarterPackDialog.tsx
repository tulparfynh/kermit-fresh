
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Mail, X } from 'lucide-react';
import type { Resource, Locale } from '@/lib/resources-data';
import { useTranslations } from 'next-intl';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M16.75 13.96c-.25-.13-1.48-.73-1.71-.82-.23-.08-.39-.13-.56.13-.17.25-.65.81-.79.98-.14.17-.29.18-.54.06-.25-.11-1.04-.38-1.99-1.22-.74-.66-1.23-1.46-1.38-1.71-.15-.25-.01-.39.11-.5.11-.11.25-.29.38-.43.12-.14.16-.25.25-.42.09-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.42h-.5c-.17 0-.42.06-.64.33-.22.27-.85.83-.85 2.01 0 1.18.87 2.33 1 2.51.13.17 1.71 2.63 4.17 3.66.58.25 1.03.4 1.39.51.54.17 1.01.14 1.38.08.42-.06 1.28-.52 1.46-1.03.18-.51.18-.94.12-1.04-.06-.1-.22-.15-.47-.28zM12.04 2.02c-5.46 0-9.91 4.45-9.91 9.91 0 1.79.46 3.5 1.28 5l-1.36 4.95 5.07-1.33c1.44.8 3.06 1.24 4.75 1.24h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM19.12 17.3c-1.89 1.89-4.4 2.93-7.08 2.93h-.01c-1.57 0-3.11-.42-4.45-1.21l-.31-.18-3.32.87.89-3.23-.2-.33c-.88-1.45-1.35-3.12-1.35-4.85 0-4.91 3.99-8.91 8.91-8.91 2.41 0 4.67.94 6.3 2.58s2.58 3.89 2.58 6.3c0 4.91-3.99 8.91-8.91 8.91z" /></svg>
);

type StarterPackDialogProps = {
    pack: Resource;
    locale: Locale;
};

export function StarterPackDialog({ pack, locale }: StarterPackDialogProps) {
    const t = useTranslations('StarterPackDialog');
    
    const title = locale === 'tr' ? pack.title_tr : pack.title;
    const email = "info@kermit.com.tr";
    const phone = locale === 'tr' ? "905532775896" : "905376156129";
    
    const whatsappMessage = t('whatsappMessage', { packName: title });
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm h-auto px-4 py-2">
                    <Download className="mr-2 h-4 w-4" />
                    {title}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-center font-bold">
                        {t('title', { packName: title })}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    <a href={`mailto:${email}`} className="block">
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                                <Mail className="h-10 w-10 text-primary" />
                                <p className="font-semibold text-lg">{t('emailAction')}</p>
                            </CardContent>
                        </Card>
                    </a>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                                <WhatsAppIcon className="h-10 w-10 text-primary" />
                                <p className="font-semibold text-lg">{t('whatsappAction')}</p>
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
    );
}
