// @project
import branding from '@/branding.json';

/***************************  RUTAS INTERNAS DEL SITIO  ***************************/

export const PAGE_PATH = {
  home: '/',
  contactPage: '/contacto',
  privacyPolicyPage: '/politica-de-privacidad',
  termsConditionPage: '/terminos-y-condiciones'
};

/***************************  ANCLAS DE LA HOME  ***************************/

// Se usan en el navbar y en los CTA para saltar a cada sección de la landing.
export const SECTION_ID = {
  funcionalidades: 'funcionalidades',
  modulos: 'modulos',
  rndc: 'rndc',
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
