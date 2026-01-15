import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';

export const locales = ['en', 'tr'] as const;
export const defaultLocale = 'en';

export const pathnames = {
  '/spc-wall-panels': {
    en: '/spc-wall-panels',
    tr: '/spc-duvar-panelleri',
  },
  '/spc-3d-wall-panels-model-a': {
    en: '/spc-3d-wall-panels-model-a',
    tr: '/spc-3d-duvar-panelleri-model-a',
  },
  '/spc-3d-wall-panels-model-b': {
    en: '/spc-3d-wall-panels-model-b',
    tr: '/spc-3d-duvar-panelleri-model-b',
  },
  '/spc-parquet-natural-collection': {
    en: '/spc-parquet-natural-collection',
    tr: '/spc-parke-natural-koleksiyonu',
  },
  '/spc-parquet-stone-collection': {
    en: '/spc-parquet-stone-collection',
    tr: '/spc-parke-tas-koleksiyonu',
  },
  '/full-natural-collection': {
    en: '/full-natural-collection',
    tr: '/tam-dogal-koleksiyon',
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});


export type AppPathnames = keyof typeof pathnames;
