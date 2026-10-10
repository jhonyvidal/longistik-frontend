// @project
import branding from '@/branding.json';
import { articuloPath, PAGE_PATH } from '@/path';
import { articulos } from '@/views/landings/default/data/articulos';
import { faq } from '@/views/landings/default/data/faq';
import { formatoCOP, funciones, planes, volumenPlan } from '@/views/landings/default/data/planes';

/***************************  SEO - DOMINIO E INDEXACIÓN  ***************************/

/**
 * Dominio público del sitio. Sin `NEXT_PUBLIC_METADATA_BASE` (local, previews) el sitio se marca
 * como no indexable en robots.txt, para que Google no indexe copias de prueba.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_METADATA_BASE || 'http://localhost:3000').replace(/\/$/, '');
export const INDEXABLE = Boolean(process.env.NEXT_PUBLIC_METADATA_BASE);

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/***************************  DESCRIPCIÓN CANÓNICA  ***************************/

/**
 * Una sola frase que define el producto. Es la que leen buscadores y motores de IA (JSON-LD y
 * llms.txt), así que debe responder sola a «¿qué es Longistik?».
 */
export const DEFINICION =
  `${branding.brandName} es un software colombiano para empresas de transporte de carga por carretera: genera remesas, ` +
  'manifiestos electrónicos de carga y cumplidos, los reporta automáticamente al RNDC del Ministerio de Transporte, ' +
  'se integra con la facturación electrónica de la DIAN y la contabilidad, e incluye un asistente de inteligencia artificial.';

/***************************  JSON-LD  ***************************/

const ORG_ID = absoluteUrl('/#organizacion');
const OG_IMAGE = '/assets/images/metadata/og.png';
const SOFTWARE_ID = absoluteUrl('/#software');

export function organizacionLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: branding.company.name,
    legalName: branding.company.name,
    taxID: branding.company.nit,
    url: SITE_URL,
    logo: absoluteUrl(branding.logo.main),
    email: branding.company.email,
    telephone: branding.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: branding.company.city,
      addressRegion: branding.company.state,
      addressCountry: 'CO'
    },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    brand: { '@type': 'Brand', name: branding.brandName },
    // Temas en los que la empresa es referente: ayuda a que buscadores y motores de IA la asocien a ellos
    knowsAbout: [
      'Registro Nacional de Despachos de Carga (RNDC)',
      'Manifiesto electrónico de carga',
      'Remesa terrestre de carga',
      'Cumplido de manifiesto',
      'SICE-TAC',
      'Tiempos logísticos',
      'Facturación electrónica de transporte de carga',
      'Software para empresas de transporte de carga'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: branding.company.email,
      telephone: branding.contact.phone,
      areaServed: 'CO',
      availableLanguage: 'es'
    },
    sameAs: Object.values(branding.company.socialLink).filter(Boolean)
  };
}

export function softwareLd() {
  return {
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: branding.brandName,
    description: DEFINICION,
    url: SITE_URL,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Software de gestión de transporte de carga (TMS)',
    operatingSystem: 'Web',
    inLanguage: 'es-CO',
    countriesSupported: 'CO',
    publisher: { '@id': ORG_ID },
    featureList: funciones.map((f) => f.label),
    offers: planes.map((plan) => ({
      '@type': 'Offer',
      name: `Plan ${plan.nombre}`,
      description: `${volumenPlan(plan)}. ${plan.para}`,
      priceCurrency: 'COP',
      ...(plan.precio ? { price: plan.precio } : {}),
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`${PAGE_PATH.home}#planes`)
    }))
  };
}

export function sitioLd() {
  return {
    '@type': 'WebSite',
    '@id': absoluteUrl('/#sitio'),
    name: branding.brandName,
    url: SITE_URL,
    inLanguage: 'es-CO',
    publisher: { '@id': ORG_ID }
  };
}

/** Texto plano de una respuesta de `faq.js` (string o { content, data: [{ primary }] }). */
function textoRespuesta(answer) {
  if (typeof answer === 'string') return answer;
  return [answer.content, ...(answer.data || []).map((item) => item.primary)].filter(Boolean).join(' ');
}

export function preguntasLd() {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.faqList.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: textoRespuesta(item.answer) }
    }))
  };
}

export function articuloLd(articulo) {
  const url = absoluteUrl(articuloPath(articulo.slug));
  return [
    {
      '@type': 'Article',
      headline: articulo.titulo,
      description: articulo.resumen,
      datePublished: articulo.fecha,
      dateModified: articulo.actualizado || articulo.fecha,
      inLanguage: 'es-CO',
      mainEntityOfPage: url,
      image: absoluteUrl(OG_IMAGE),
      isPartOf: { '@id': absoluteUrl('/#sitio') },
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      ...(articulo.fuentes?.length && { citation: articulo.fuentes.map((f) => f.href) })
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Artículos', item: absoluteUrl(PAGE_PATH.articulos) },
        { '@type': 'ListItem', position: 3, name: articulo.titulo, item: url }
      ]
    }
  ];
}

/** Listado de artículos como colección, para que se entienda que es una sección de contenido del sitio. */
export function articulosLd() {
  return {
    '@type': 'CollectionPage',
    name: 'Artículos sobre el RNDC',
    url: absoluteUrl(PAGE_PATH.articulos),
    inLanguage: 'es-CO',
    isPartOf: { '@id': absoluteUrl('/#sitio') },
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articulos.map((a, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(articuloPath(a.slug)),
        name: a.titulo
      }))
    }
  };
}

/** El simulador como herramienta web gratuita: así aparece en búsquedas de «calculadora SICE-TAC». */
export function simuladorLd() {
  return {
    '@type': 'WebApplication',
    name: 'Simulador SICE-TAC y regla del 20 % del RNDC',
    url: absoluteUrl(PAGE_PATH.simulador),
    description:
      'Calculadora gratuita: compara el valor a pagar de un manifiesto con el costo eficiente de SICE-TAC, calcula el porcentaje de cumplidos pendientes frente a la regla del 20 % y el límite mensual de anulaciones del RNDC.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'es-CO',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'COP' },
    publisher: { '@id': ORG_ID }
  };
}

/** Envuelve uno o varios nodos en un documento JSON-LD con @context. */
export function grafo(...nodos) {
  return { '@context': 'https://schema.org', '@graph': nodos.flat() };
}

/***************************  LLMS.TXT  ***************************/

/**
 * Resumen en Markdown para motores de IA (https://llmstxt.org). Se arma con los mismos datos del
 * sitio, así nunca dice algo distinto a la página.
 */
export function llmsTxt() {
  const lineaPlan = (plan) =>
    `- **${plan.nombre}**: ${plan.precio ? `${formatoCOP(plan.precio)} COP al mes` : 'cotización a la medida'}. ${volumenPlan(plan)}. ${plan.para}`;

  const nombre = (id) => funciones.find((f) => f.id === id)?.label;
  const [basico, profesional, aLaMedida] = planes;
  const nuevas = (plan, anterior) => plan.funcionesID.filter((id) => !anterior.funcionesID.includes(id)).map(nombre);

  return [
    `# ${branding.brandName}`,
    '',
    `> ${DEFINICION}`,
    '',
    `Desarrollado y soportado por ${branding.company.name} (NIT ${branding.company.nit}), ${branding.company.city}, ${branding.company.state}, Colombia. Atiende empresas de transporte de carga habilitadas por el Ministerio de Transporte de Colombia.`,
    '',
    '## Qué hace',
    '',
    '- Expide remesas terrestres de carga (guías) y manifiestos electrónicos de carga, con consecutivos automáticos.',
    '- Reporta remesas, manifiestos, cumplidos y anulaciones al RNDC por web services, sin entrar al portal del Ministerio.',
    '- Si el RNDC se cae o rechaza un documento, lo deja pendiente con el error traducido a lenguaje claro y permite reenviarlo.',
    '- Toma los tiempos logísticos de cargue y descargue del monitoreo GPS para el cumplido.',
    '- Carga al RNDC la factura electrónica con el flete; se integra con la DIAN, Siigo, World Office, Alegra, SAP, Odoo y Salesforce.',
    '- API para que los clientes del transportador creen, consulten, anulen y rastreen sus remesas.',
    '- Asistente de inteligencia artificial integrado en el software.',
    '',
    '## Planes y precios',
    '',
    'Se cobra por manifiestos expedidos al día. Remesas, cumplidos y anulaciones son ilimitados, y no hay límite de usuarios. Implementación y migración incluidas, sin permanencia.',
    '',
    ...planes.map(lineaPlan),
    '',
    `Incluido en ${basico.nombre}: ${basico.funcionesID.map(nombre).join('; ')}.`,
    `${profesional.nombre} agrega: ${nuevas(profesional, basico).join('; ')}.`,
    `${aLaMedida.nombre} agrega: ${nuevas(aLaMedida, profesional).join('; ')}.`,
    '',
    '## Páginas',
    '',
    `- [Inicio](${absoluteUrl(PAGE_PATH.home)}): funcionalidades, módulos, integración con el RNDC, planes y preguntas frecuentes.`,
    `- [Simulador SICE-TAC y regla del 20 %](${absoluteUrl(PAGE_PATH.simulador)}): calculadora gratuita de flete mínimo, cumplidos pendientes y límite de anulaciones.`,
    `- [Agendar una demo](${absoluteUrl(PAGE_PATH.contactPage)})`,
    `- [Versión completa para IA](${absoluteUrl('/llms-full.txt')}): este resumen más el texto completo de los artículos.`,
    '',
    '## Artículos sobre la norma del RNDC',
    '',
    ...articulos.map((a) => `- [${a.titulo}](${absoluteUrl(articuloPath(a.slug))}): ${a.resumen}`),
    '',
    '## Preguntas frecuentes',
    '',
    ...faq.faqList.flatMap((item) => [`### ${item.question}`, '', textoRespuesta(item.answer), '']),
    '## Contacto',
    '',
    `- Correo: ${branding.company.email}`,
    `- WhatsApp: ${branding.contact.phone}`,
    `- Sitio: ${SITE_URL}`,
    ''
  ].join('\n');
}

/** Un artículo de `data/articulos.js` en Markdown, con sus secciones y fuentes. */
function articuloMarkdown(articulo) {
  const seccion = ({ titulo, parrafos = [], lista = [], ejemplo }) => [
    `### ${titulo}`,
    '',
    ...parrafos.flatMap((p) => [p, '']),
    ...(lista.length ? [...lista.map((item) => `- ${item}`), ''] : []),
    ...(ejemplo ? [`> Ejemplo: ${ejemplo}`, ''] : [])
  ];

  return [
    `## ${articulo.titulo}`,
    '',
    `URL: ${absoluteUrl(articuloPath(articulo.slug))}`,
    `Publicado: ${articulo.fecha}${articulo.actualizado ? ` · Actualizado: ${articulo.actualizado}` : ''}`,
    '',
    articulo.resumen,
    '',
    ...articulo.secciones.flatMap(seccion),
    ...(articulo.fuentes?.length ? ['Fuentes:', '', ...articulo.fuentes.map((f) => `- [${f.label}](${f.href})`), ''] : [])
  ];
}

/**
 * Versión extendida de llms.txt: el resumen más el texto completo de los artículos, para que un
 * asistente de IA pueda responder sobre la norma del RNDC citando al sitio sin rastrear cada página.
 */
export function llmsFullTxt() {
  return [llmsTxt(), '# Artículos completos', '', ...articulos.flatMap(articuloMarkdown)].join('\n');
}
