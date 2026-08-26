#!/usr/bin/env node
/**
 * Génère les variantes responsives (AVIF + WebP, plusieurs largeurs) des
 * images de projets à partir des fichiers "lourds" (haute résolution) posés
 * dans src/assets/projets-source/<id-du-projet>/.
 *
 * Utilisation :
 *   npm run optimize:images          -> traite uniquement les fichiers nouveaux/modifiés
 *   npm run optimize:images -- --force -> retraite tout, même si déjà généré
 *
 * Pour chaque image source (ex: papaie.webp), le script écrit dans
 * public/assets/projets/<projet>/ :
 *   - papaie-400.webp / .avif
 *   - papaie-800.webp / .avif
 *   - papaie-1200.webp / .avif
 *   - papaie-1600.webp / .avif
 *   - papaie-2400.webp / .avif   (seulement si l'original est assez grand)
 *   - papaie.webp                (version "canonique" ~1200px, utilisée telle
 *                                  quelle par les balises meta/og:image)
 *
 * Les composants du site (ResponsiveImage) référencent toujours le même
 * chemin de base que dans data/projectsData.js (ex: "/assets/projets/papaie/papaie.webp")
 * et déduisent automatiquement les variantes -{largeur}.webp/.avif : il n'y a
 * donc rien à changer dans les données quand on remplace une photo.
 */
import { readdirSync, statSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, extname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE_DIR = join(ROOT, 'src/assets/projets-source');
const OUT_DIR = join(ROOT, 'public/assets/projets');
const MANIFEST_PATH = join(ROOT, 'src/data/imageManifest.json');

const WIDTHS = [400, 800, 1200, 1600, 2400];
const CANONICAL_WIDTH = 1200;
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 55;
/* Légère accentuation après redimensionnement : contrebalance le flou
   naturel du sous-échantillonnage et évite le rendu "mou" en sortie */
const SHARPEN = { sigma: 0.8 };

const FORCE = process.argv.includes('--force');
const IMAGE_EXT = /\.(jpe?g|png|webp|tiff?)$/i;

const fmtBytes = (n) => (n < 1024 ? `${n} o` : n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} Ko` : `${(n / 1024 / 1024).toFixed(1)} Mo`);

const isStale = (outputPath, sourceMtimeMs) => {
  if (FORCE || !existsSync(outputPath)) return true;
  return statSync(outputPath).mtimeMs < sourceMtimeMs;
};

const processImage = async (sourcePath, outDir, baseName) => {
  const sourceStat = statSync(sourcePath);
  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const originalWidth = metadata.width ?? CANONICAL_WIDTH;

  mkdirSync(outDir, { recursive: true });

  const widths = WIDTHS.filter((w) => w <= originalWidth);
  if (widths.length === 0) widths.push(originalWidth);

  let bytesWritten = 0;
  let filesWritten = 0;
  const outputs = [];

  for (const width of widths) {
    for (const format of ['avif', 'webp']) {
      const outPath = join(outDir, `${baseName}-${width}.${format}`);
      outputs.push(outPath);
      if (!isStale(outPath, sourceStat.mtimeMs)) continue;

      const pipeline = sharp(sourcePath)
        .resize({ width, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
        .sharpen(SHARPEN);

      if (format === 'avif') pipeline.avif({ quality: AVIF_QUALITY, effort: 4 });
      else pipeline.webp({ quality: WEBP_QUALITY });

      const info = await pipeline.toFile(outPath);
      bytesWritten += info.size;
      filesWritten += 1;
    }
  }

  /* Fichier canonique sans suffixe, pour og:image et tout usage direct */
  const canonicalPath = join(outDir, `${baseName}.webp`);
  outputs.push(canonicalPath);
  if (isStale(canonicalPath, sourceStat.mtimeMs)) {
    const canonicalWidth = Math.min(CANONICAL_WIDTH, originalWidth);
    const info = await sharp(sourcePath)
      .resize({ width: canonicalWidth, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
      .sharpen(SHARPEN)
      .webp({ quality: WEBP_QUALITY })
      .toFile(canonicalPath);
    bytesWritten += info.size;
    filesWritten += 1;
  }

  return { originalBytes: sourceStat.size, bytesWritten, filesWritten, widths, originalWidth };
};

const walk = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (IMAGE_EXT.test(entry.name)) files.push(full);
  }
  return files;
};

const main = async () => {
  if (!existsSync(SOURCE_DIR)) {
    console.error(`Dossier source introuvable : ${relative(ROOT, SOURCE_DIR)}`);
    console.error("Crée-le et dépose tes images lourdes dans src/assets/projets-source/<id-du-projet>/");
    process.exit(1);
  }

  const files = walk(SOURCE_DIR);
  if (files.length === 0) {
    console.log('Aucune image trouvée dans src/assets/projets-source/. Rien à faire.');
    return;
  }

  console.log(`${files.length} image${files.length > 1 ? 's' : ''} source détectée${files.length > 1 ? 's' : ''}${FORCE ? ' (mode --force)' : ''}\n`);

  let totalOriginal = 0;
  let totalWritten = 0;
  let totalFiles = 0;
  let skipped = 0;
  const manifest = {};

  for (const sourcePath of files) {
    const relPath = relative(SOURCE_DIR, sourcePath);
    const projectDir = relPath.split('/')[0];
    const baseName = basename(sourcePath, extname(sourcePath));
    const outDir = join(OUT_DIR, projectDir);

    const result = await processImage(sourcePath, outDir, baseName);
    totalOriginal += result.originalBytes;
    totalWritten += result.bytesWritten;
    totalFiles += result.filesWritten;
    /* Clé de manifeste = chemin public exact tel que référencé dans
       data/projectsData.js (ex: /assets/projets/papaie/papaie.webp) */
    manifest[`/assets/projets/${projectDir}/${baseName}.webp`] = result.widths;

    if (result.filesWritten === 0) {
      skipped += 1;
      console.log(`  = ${relPath} (déjà à jour, ignoré)`);
    } else {
      console.log(
        `  ✓ ${relPath} — ${fmtBytes(result.originalBytes)} → ${result.widths.length} largeur${result.widths.length > 1 ? 's' : ''} ` +
          `(jusqu'à ${result.widths[result.widths.length - 1]}px) × AVIF/WebP, ${result.filesWritten} fichier${result.filesWritten > 1 ? 's' : ''} écrit${result.filesWritten > 1 ? 's' : ''}`
      );
    }
  }

  mkdirSync(join(ROOT, 'src/data'), { recursive: true });
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log('');
  console.log(`Terminé : ${totalFiles} fichiers générés, ${skipped} déjà à jour.`);
  if (totalWritten > 0) {
    console.log(`Poids source traité : ${fmtBytes(totalOriginal)} → poids généré : ${fmtBytes(totalWritten)}`);
  }
  console.log(`Manifeste écrit : ${relative(ROOT, MANIFEST_PATH)}`);
};

main().catch((error) => {
  console.error('Échec de la génération des images :', error);
  process.exit(1);
});
