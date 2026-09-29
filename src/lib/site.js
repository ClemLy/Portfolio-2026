export const SITE_URL = 'https://clementinly.fr';
export const SITE_NAME = 'Clémentin Ly | Portfolio';
export const OG_IMAGE = `${SITE_URL}/assets/og/og-image.jpg`;
export const EMAIL = 'ly.clementin@gmail.com';
export const GITHUB_URL = 'https://github.com/ClemLy';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/cl%C3%A9mentin-ly/';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Clémentin Ly',
  givenName: 'Clémentin',
  familyName: 'Ly',
  /* Sans accent : la graphie que la plupart des gens tapent au clavier */
  alternateName: 'Clementin Ly',
  jobTitle: 'Développeur Full-Stack',
  description:
    "Développeur full-stack basé à Paris, spécialisé React, Next.js et TypeScript, architectures headless et WordPress, et sites animés (GSAP, Three.js, Framer Motion).",
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: `mailto:${EMAIL}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
  knowsLanguage: ['fr', 'en'],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'React Native',
    'WordPress',
    'Headless CMS',
    'Laravel',
    'Shopify',
    'GSAP',
    'Three.js',
    'Framer Motion',
    'Creative development',
    'Éco-conception web',
    'Accessibilité web',
    'SEO technique',
    'Performance web',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'IUT du Havre' },
    { '@type': 'CollegeOrUniversity', name: 'Paris Ynov Campus' },
  ],
  worksFor: { '@type': 'Organization', name: 'Agence Kurtis' },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Certificat de connaissance Numérique Responsable',
    credentialCategory: 'certificate',
    recognizedBy: { '@type': 'Organization', name: 'Institut du Numérique Responsable (INR)' },
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: ['fr-FR', 'en-US'],
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
};
