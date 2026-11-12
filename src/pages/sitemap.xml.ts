import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { work } from '../data/work';
export const GET: APIRoute = async ({ site }) => {
  const pages = [
    '/',
    '/about/',
    '/contact/',
    '/services/',
    '/services/design/',
    '/services/hosting/',
    '/services/consultation/',
    '/services/social/',
    '/pricing/',
    '/services/design/pricing/',
    '/services/hosting/pricing/',
    '/services/consultation/pricing/',
    '/services/social/pricing/',
    '/mentorship/',
    '/portfolio/',
    '/portfolio/personal/',
    '/portfolio/professional/',
    '/blog/',
  ];
  for (const post of await getCollection('blog'))
    pages.push(`/blog/${post.id}/`);
  for (const project of work) pages.push(`/portfolio/work/${project.id}/`);
  const escape = (value: string) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('"', '&quot;');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(path => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
