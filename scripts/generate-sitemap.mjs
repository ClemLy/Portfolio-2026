#!/usr/bin/env node
/**
 * Génère public/sitemap.xml à partir de src/data/projectsData.js, pour que
 * le sitemap ne puisse plus se désynchroniser de la liste réelle de projets
 * (avant ce script, il était maintenu à la main et avait fini par référencer
 * un slug inexistant et oublier plusieurs projets).
 *
 * Lancé automatiquement avant chaque `npm run build` (voir package.json).
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { projectsData } from '../src/data/projectsData.js';
import { SITE_URL, OG_IMAGE } from '../src/lib/site.js';

const OUT_PATH = path.resolve(fileURLToPath(import.meta.url), '../../public/sitemap.xml');
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'monthly', priority: '1.0', images: [OG_IMAGE] },
  ...projectsData.map((project) => ({
    loc: `${SITE_URL}/projet/${project.id}`,
    lastmod: today,
    priority: '0.8',
    images: [project.image, ...(project.gallery ?? [])].map((src) => `${SITE_URL}${src}`),
  })),
];

const imageTags = (images) =>
  images.map((src) => `    <image:image>\n      <image:loc>${src}</image:loc>\n    </image:image>\n`).join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
${u.changefreq ? `    <changefreq>${u.changefreq}</changefreq>\n` : ''}    <priority>${u.priority}</priority>
${imageTags(u.images)}  </url>`
  )
  .join('\n')}
</urlset>
`;

await writeFile(OUT_PATH, xml, 'utf-8');
console.log(`Sitemap écrit : ${urls.length} URLs (${OUT_PATH})`);
