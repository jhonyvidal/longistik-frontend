// @project
import branding from '@/branding.json';
import { PAGE_PATH } from '@/path';

/***************************  SEO - METADATA PRINCIPAL  ***************************/

const title = `${branding.brandName} — ${branding.title}`;

// ~155 caracteres: es lo que Google muestra bajo el título
const description =
  'Software para transportadoras en Colombia: remesas, manifiestos electrónicos de carga y cumplidos reportados solos al RNDC, con IA y facturación DIAN.';

/**
 * Palabras clave por intención de búsqueda. Salen del análisis de `docs/seo-palabras-clave.md`
 * (octubre de 2026): cómo buscan los transportadores, qué términos usan los competidores y los
 * temas de la norma del RNDC. Google ya no usa la meta keywords para posicionar; la lista sirve
 * de guía para títulos, encabezados y artículos.
 */
const keywords = [
  // Comercial: quien busca proveedor
  'software para transportadoras',
  'software para empresas de transporte de carga',
  'software de transporte de carga Colombia',
  'programa para hacer manifiestos de carga',
  'software para manifiestos de carga',
  'software RNDC',
  'software conectado al RNDC',
  'TMS Colombia',
  'ERP de transporte de carga',
  'sistema de gestión de transporte',
  'software logístico Colombia',
  'software de transporte con inteligencia artificial',
  // Documentos del RNDC
  'manifiesto electrónico de carga',
  'remesa terrestre de carga',
  'guía de transporte de carga',
  'cumplido de manifiesto',
  'cumplido de remesa',
  'anulación de manifiesto',
  // Conexión con el Ministerio
  'Registro Nacional de Despachos de Carga',
  'RNDC Ministerio de Transporte',
  'RNDC web service',
  'interoperabilidad RNDC',
  'RNDC 360',
  // Norma vigente y cambios
  'Resolución 20263040016075 de 2026',
  'Decreto 1017 de 2025',
  'manifiesto de carga 2026',
  'SICE-TAC',
  'flete mínimo SICE-TAC',
  'costo eficiente SICE-TAC',
  'regla del 20 % cumplidos RNDC',
  'tiempos logísticos RNDC',
  // Integraciones
  'facturación electrónica transporte de carga',
  'factura electrónica RNDC',
  'integración Siigo',
  'integración World Office',
  'integración Alegra',
  'API de remesas',
  'Colombia'
];

/**
 * Etiquetas de verificación de Google Search Console y Bing Webmaster Tools. Bing alimenta las
 * búsquedas de ChatGPT y Copilot, así que conviene dar de alta el sitio en los dos.
 * Solo se publican las que tengan valor en el .env.
 */
const googleVerificacion = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';
const bingVerificacion = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '';
const verification = {
  ...(googleVerificacion ? { google: googleVerificacion } : {}),
  ...(bingVerificacion ? { other: { 'msvalidate.01': bingVerificacion } } : {})
};

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
  openGraph: { title, description, url: '/', ...ogCommon },
  twitter: { card: 'summary_large_image', title, description },
  // Sin recorte de fragmentos ni imágenes: Google y su resumen con IA pueden citar respuestas completas
  robots: { googleBot: { 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } },
  // Versiones en Markdown para motores de IA (https://llmstxt.org)
  alternates: { canonical: '/', types: { 'text/markdown': '/llms.txt' } },
  verification
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
  }),
  articulos: pageMeta({
    title: 'Artículos sobre el RNDC',
    description:
      'La Resolución 20263040016075 de 2026 del RNDC explicada para empresas de transporte de carga: SICE-TAC, regla del 20 % de cumplidos y límite de anulaciones.',
    path: PAGE_PATH.articulos
  }),
  simulador: pageMeta({
    title: 'Simulador SICE-TAC y regla del 20 %',
    description:
      'Gratis: comprueba si el valor a pagar de tu manifiesto cumple el costo eficiente de SICE-TAC, calcula tus cumplidos pendientes frente al 20 % y tu límite de anulaciones en el RNDC.',
    path: PAGE_PATH.simulador
  })
};

/** Metadata de un artículo (`data/articulos.js`). */
export function articuloMeta({ titulo, resumen, fecha }, path) {
  const meta = pageMeta({ title: titulo, description: resumen, path });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: fecha } };
}
