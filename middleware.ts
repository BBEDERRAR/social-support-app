import { defaultLocale, locales } from '@/i18n/config';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Available locales
  locales: locales,
  // Used when no locale matches
  defaultLocale: defaultLocale,
  // Disable locale prefixes in URL paths
  localePrefix: 'never'
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /public (public files)
  // - .*\\..*\\.* (files with extensions)
  matcher: ['/((?!api|_next|public|.*\\..*).*)']
}; 