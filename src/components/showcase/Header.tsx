
'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MobileMenu } from './MobileMenu';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '#', label: 'FLOORS' },
  { href: '/spc-wall-panels', label: 'WALLS' },
  { href: '#', label: 'SKIRTINGS' },
  { href: '#', label: 'DOWNLOAD' },
  { href: '#', label: 'ABOUT' },
  { href: '#', label: 'CONTACT' },
];

const DynamicMobileMenu = dynamic(
  () => import('./MobileMenu').then((mod) => mod.MobileMenu),
  { ssr: false }
);

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="https://www.kermitfloor.com/wp-content/uploads/2022/11/Kermit-Floor-Logo-PNG-2-3-1-1024x347.png"
        alt="Kermit Floor Logo"
        width={140}
        height={48}
        className="object-contain"
      />
    </Link>
  );
}

export function NavMenu({ isMobile = false }) {
  const pathname = usePathname();
  
  return (
    <nav
      className={cn(
        'flex items-center gap-4 lg:gap-8',
        isMobile ? 'flex-col items-start space-y-4 p-6' : 'hidden md:flex'
      )}
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              'text-lg font-semibold tracking-wider transition-colors hover:text-primary whitespace-nowrap',
              isActive
                ? 'text-primary'
                : 'text-foreground/70',
              isMobile && 'text-2xl'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const isWallPanelPage = pathname.startsWith('/spc-wall-panels');
  const is3DPage = pathname.startsWith('/spc-3d-wall-panels');

  let pageTitle;
  let heroImage;
  let heroImageHint;

  if (is3DPage) {
    pageTitle = 'SPC 3D WALL PANEL COLLECTION';
    heroImage = '/images/placeholder-3d-hero.jpg';
    heroImageHint = '3d wall panel texture';
  } else if (isWallPanelPage) {
    pageTitle = 'SPC WALL PANEL COLLECTION';
    heroImage = '/images/Marble-Statuario-w23138-product-image.png';
    heroImageHint = 'marble texture';
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-28 items-center justify-between">
            <div className="flex items-center gap-8">
                <Logo />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <NavMenu />
            </div>
            <div className="md:hidden">
              <DynamicMobileMenu />
            </div>
          </div>
        </div>
      </header>
      {pageTitle && (
        <div className="relative h-48 lg:h-64 w-full">
          <Image
            src={heroImage || ''}
            alt="Wall panel texture background"
            fill
            className="object-cover"
            data-ai-hint={heroImageHint}
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-white text-center">
              {pageTitle}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
