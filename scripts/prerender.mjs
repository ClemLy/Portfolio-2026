#!/usr/bin/env node
/**
 * Pré-rend chaque page du site en HTML statique complet, à partir du build
 * client (dist/index.html, qui sert de gabarit) et du build serveur
 * (dist-ssr/entry-server.js).
 *
 * Sans cette étape, le HTML servi ne contient qu'une <div id="root"> vide :
 * Google finit par exécuter le JavaScript, mais la plupart des robots d'IA
 * (GPTBot, ClaudeBot, PerplexityBot...) et les aperçus de partage ne le
 * font pas, et ne voyaient donc ni le contenu ni les balises propres à
 * chaque projet.
 *
 * Écrit dist/index.html, dist/projet/<id>.html, leurs équivalents anglais
 * dist/en.html et dist/en/projet/<id>.html (servis sans extension grâce à
 * cleanUrls dans vercel.json) et dist/404.html.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { projectsData } from '../src/data/projectsData.js';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const DIST = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');

const template = await readFile(path.join(DIST, 'index.html'), 'utf-8');
for (const marker of ['<!--app-head-->', '<!--app-html-->', '<html lang="fr">']) {
  if (!template.includes(marker)) throw new Error(`Gabarit dist/index.html : marqueur ${marker} introuvable`);
}

const { render } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href);

const pages = [
  { url: '/', file: 'index.html' },
  ...projectsData.map((project) => ({ url: `/projet/${project.id}`, file: `projet/${project.id}.html` })),
  { url: '/en', file: 'en.html' },
  ...projectsData.map((project) => ({ url: `/en/projet/${project.id}`, file: `en/projet/${project.id}.html` })),
  { url: '/404', file: '404.html' },
];

for (const page of pages) {
  const { html, helmet } = await render(page.url);
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((tags) => tags.toString())
    .filter(Boolean)
    .join('\n    ');

  /* Remplacements par fonction : le HTML rendu peut contenir des séquences
     comme "$&" que String.replace interpréterait sinon comme des motifs */
  const output = template
    .replace('<html lang="fr">', () => `<html ${helmet.htmlAttributes.toString()}>`)
    .replace('<!--app-head-->', () => head)
    .replace('<!--app-html-->', () => html);

  const outPath = path.join(DIST, page.file);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, output, 'utf-8');
  console.log(`  ✓ ${page.url} → dist/${page.file}`);
}

await rm(SSR_DIR, { recursive: true, force: true });
console.log(`Pré-rendu terminé : ${pages.length} pages.`);
