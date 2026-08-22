// @project
import branding from '@/branding.json';
import { PAGE_PATH } from '@/path';

/***************************  SEO - METADATA PRINCIPAL  ***************************/

const title = `${branding.brandName} — ${branding.title}`;

const description =
  'Genera guías, manifiestos y cumplidos en minutos y repórtalos automáticamente al RNDC del Ministerio de Transporte. ' +
  'Longistik reemplaza el trabajo manual en la plataforma del RNDC por una interfaz moderna, clara y sin errores crípticos.';

const keywords = [
  'RNDC',
  'software logístico',
  'transporte de carga',
  'manifiesto de carga',
  'remesa terrestre de carga',
  'guía de transporte',
  'Ministerio de Transporte',
  'cumplido de remesa',
  'software para transportadoras',
  'Colombia'
];

const ogCommon = {
  locale: 'es_CO',
  type: 'website',
  siteName: branding.brandName,
  images: '/assets/images/metadata/og.png' // dimensiones recomendadas 1200x630
};

export const mainMetadata = {
  title: {
    template: `%s | ${branding.brandName}`,
    default: title // requerido cuando se usa template
  },
  description,
  applicationName: branding.brandName,
  keywords,
  creator: branding.company.name,
  publisher: branding.company.name,
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE || 'http://localhost:3000'),
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/', ...ogCommon }
};

/***************************  SEO - METADATA POR PÁGINA  ***************************/

function pageMeta({ title: pageTitle, description: pageDescription, path }) {
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: path },
    openGraph: { title: `${pageTitle} | ${branding.brandName}`, description: pageDescription, url: path, ...ogCommon }
  };
}

export const SEO_CONTENT = {
  contactUs: pageMeta({
    title: 'Agenda una demo',
    description: `Cuéntanos cómo opera tu empresa de transporte y te mostramos ${branding.brandName} funcionando con tu propio flujo de guías y manifiestos.`,
    path: PAGE_PATH.contactPage
  }),
  privacyPolicy: pageMeta({
    title: 'Política de privacidad',
    description: `Cómo ${branding.company.name} recolecta, usa y protege la información de quienes visitan el sitio y usan ${branding.brandName}.`,
    path: PAGE_PATH.privacyPolicyPage
  }),
  termsCondition: pageMeta({
    title: 'Términos y condiciones',
    description: `Condiciones de uso del sitio y del servicio ${branding.brandName}, prestado por ${branding.company.name}.`,
    path: PAGE_PATH.termsConditionPage
  })
};
