import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Available locales
  locales: ['en', 'ar'],
  // Used when no locale matches
  defaultLocale: 'en',
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