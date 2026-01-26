import createMiddleware from 'next-intl/middleware';
import {locales, pathnames, localePrefix, defaultLocale} from './navigation';

// The middleware is now simplified to only handle internationalization.
export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix
});

export const config = {
  // Match all pathnames except for static files (e.g. images) and API routes.
  // This prevents the middleware from interfering with static asset requests.
  // We have removed /robots.txt from this matcher.
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|.*\\.[^/]+$).*)',
  ]
};
