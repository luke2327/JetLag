export const siteConfig = {
  title: 'Next.js + Tailwind CSS + TypeScript Starter',
  description:
    'A starter for Next.js, Tailwind CSS, and TypeScript with Absolute Import, Seo, Link component, pre-configured with Husky',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://tsnext-tw.thcl.dev',
  lucideStrokeWidth: 1.5,
  apiScheme:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8484/api'
      : 'https://jetlag-chlogy.koyeb.app/api',
};
