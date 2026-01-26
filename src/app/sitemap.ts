import { MetadataRoute } from 'next';
import { locales, pathnames, defaultLocale } from '@/navigation';
 
const domain = 'https://kermitfloor.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  function getUrl(locale: string, path: string) {
    // The root path for the default locale is the domain with a slash.
    // For other locales, it's domain + /locale + slash.
    if (path === '/') {
        return locale === defaultLocale ? `${domain}/` : `${domain}/${locale}/`;
    }
    // For all other paths, prefix with locale if not default.
    return locale === defaultLocale ? `${domain}${path}` : `${domain}/${locale}${path}`;
  }

  // Add the homepage route
  const routes: MetadataRoute.Sitemap = [{
    url: getUrl(defaultLocale, '/'),
    lastModified,
    alternates: {
      languages: Object.fromEntries(locales.map(locale => [locale, getUrl(locale, '/')]))
    },
  }];

  // Add other routes from pathnames
  (Object.keys(pathnames) as Array<keyof typeof pathnames>).forEach((pathname) => {
    
    const languageAlternates = Object.fromEntries(
      locales.map(locale => {
        const path = pathnames[pathname][locale];
        return [locale, getUrl(locale, path)];
      })
    );

    routes.push({
      url: languageAlternates[defaultLocale],
      lastModified,
      alternates: {
        languages: languageAlternates,
      },
    });
  });

  return routes;
}
