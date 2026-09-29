#!/usr/bin/env node
/**
 * Génère public/llms.txt (format https://llmstxt.org) : un résumé Markdown
 * du profil et des projets, pensé pour les assistants IA (ChatGPT, Claude,
 * Perplexity...) qui cherchent une source fiable et concise sur une
 * personne ou un site. Construit à partir des mêmes données que le site,
 * il ne peut pas se désynchroniser du contenu réel.
 *
 * Lancé automatiquement avant chaque `npm run build` (voir package.json).
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { projectsData } from '../src/data/projectsData.js';
import { parcoursData } from '../src/data/parcoursData.js';
import { techGroups } from '../src/data/techStackData.js';
import { SITE_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, personSchema } from '../src/lib/site.js';

const OUT_PATH = path.resolve(fileURLToPath(import.meta.url), '../../public/llms.txt');
const CV_URL = `${SITE_URL}/assets/CV/${encodeURIComponent('CV - Clémentin LY.pdf')}`;

const yearRange = (step) => {
  if (step.ongoing) return `${step.year} à aujourd'hui`;
  return step.yearEnd ? `${step.year} à ${step.yearEnd}` : step.year;
};

const parcours = [...parcoursData]
  .reverse()
  .map((step) => `- ${yearRange(step)} : ${step.title}. ${step.description}`)
  .join('\n');

const projets = projectsData
  .map(
    (project) =>
      `- [${project.title}](${SITE_URL}/projet/${project.id}) (${project.year}, ${project.category.toLowerCase()}) : ${project.subtitle}. Technologies : ${project.techs.join(', ')}.`
  )
  .join('\n');

const stack = techGroups
  .map((group) => `- ${group.label} : ${group.technologies.map((tech) => tech.name).join(', ')}`)
  .join('\n');

const content = `# Clémentin Ly

> Clémentin Ly est un développeur full-stack basé en Normandie et à Paris. Il conçoit des sites et des applications avec React, Next.js et TypeScript, des architectures headless et WordPress, et des expériences web animées (GSAP, Three.js, Framer Motion). Son portfolio officiel est ${SITE_URL}.

Clémentin Ly is a full-stack developer based in Normandy and Paris, France, specialized in React, Next.js and TypeScript, headless and WordPress architectures, and motion-rich websites. The site is available in French (${SITE_URL}/) and English (${SITE_URL}/en).

## Profil

- Poste actuel : développeur web en alternance à l'${personSchema.worksFor.name}
- Formation : Mastère Expert en Développement Full-Stack à Paris Ynov Campus (2025 à 2027), BUT Informatique à l'IUT du Havre (2022 à 2025)
- Certification : ${personSchema.hasCredential.name}, délivré par l'${personSchema.hasCredential.recognizedBy.name}
- VivaTech 2025 : présentation du projet startup Greenoco (éco-conception web) pendant quatre jours sur le pavillon de la RATP
- Localisation : Normandie et Paris (France)
- Langues : français, anglais
- Contact : ${EMAIL}

## Projets

${projets}

## Parcours

${parcours}

## Compétences

${stack}

## Liens

- [Portfolio](${SITE_URL}/)
- [Portfolio (English)](${SITE_URL}/en)
- [GitHub](${GITHUB_URL})
- [LinkedIn](${LINKEDIN_URL})
- [CV (PDF)](${CV_URL})
`;

await writeFile(OUT_PATH, content, 'utf-8');
console.log(`llms.txt écrit : ${projectsData.length} projets (${OUT_PATH})`);
