// @project
import branding from '@/branding.json';

/***************************  RUTAS INTERNAS DEL SITIO  ***************************/

export const PAGE_PATH = {
  home: '/',
  contactPage: '/contacto',
  privacyPolicyPage: '/politica-de-privacidad',
  termsConditionPage: '/terminos-y-condiciones',
  articulos: '/articulos',
  simulador: '/simulador-sice-tac'
};

/** Ruta de un artículo a partir de su slug. */
export function articuloPath(slug) {
  return `${PAGE_PATH.articulos}/${slug}`;
}

/***************************  ANCLAS DE LA HOME  ***************************/

// Se usan en el navbar y en los CTA para saltar a cada sección de la landing.
export const SECTION_ID = {
  funcionalidades: 'funcionalidades',
  modulos: 'modulos',
  rndc: 'rndc',
  norma: 'norma-2026',
  integraciones: 'integraciones',
  api: 'api',
  clientes: 'clientes',
  planes: 'planes',
  faq: 'faq'
};

export const ANCHOR = Object.fromEntries(Object.entries(SECTION_ID).map(([key, id]) => [key, `/#${id}`]));

/***************************  CONTACTO  ***************************/

export const EMAIL_URL = `mailto:${branding.company.email}`;

/**
 * Link de WhatsApp con mensaje pre-escrito.
 * Devuelve null mientras no haya número cargado en branding.json → contact.whatsapp,
 * para que los botones de WhatsApp simplemente no se rendericen en vez de apuntar a una URL rota.
 */
export function whatsappUrl(message = 'Hola, quiero conocer más sobre Longistik.') {
  const number = (branding.contact.whatsapp || '').replace(/\D/g, '');
  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/***************************  ENLACES EXTERNOS  ***************************/

// Portal del Ministerio de Transporte con el que se integra el producto.
export const RNDC_URL = 'https://rndc.mintransporte.gov.co/';
// Portal Logístico de Colombia: desde su barra superior se consulta SICE-TAC, gratis y sin usuario.
export const SICETAC_URL = 'https://plc.mintransporte.gov.co/';
// Resolución 20263040016075 de 2026, que unifica la norma del RNDC.
export const RESOLUCION_RNDC_2026_URL = 'https://mintransporte.gov.co/info/mintransporte/media/anexos/dx2Es4bu.pdf';
// Decreto 1017 de 2025: modifica el Decreto 1079 de 2015 (mérito ejecutivo, SICE-TAC, pago del flete, horas de cargue).
export const DECRETO_1017_2025_URL = 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=264276';
