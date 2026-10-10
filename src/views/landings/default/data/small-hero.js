// @project
import branding from '@/branding.json';
import { PAGE_PATH } from '@/path';

/***************************  LONGISTIK - ENCABEZADO DE PÁGINAS LEGALES  ***************************/

export const smallHeroPrivacidad = {
  headLine: 'Política de privacidad',
  captionLine: `Cómo ${branding.company.name} recolecta, usa y protege la información de quienes visitan este sitio y usan ${branding.brandName}.`,
  exploreBtn: { children: 'Contáctanos', href: PAGE_PATH.contactPage }
};

export const smallHeroTerminos = {
  headLine: 'Términos y condiciones',
  captionLine: `Condiciones de uso de este sitio y del servicio ${branding.brandName}, prestado por ${branding.company.name}.`,
  exploreBtn: { children: 'Contáctanos', href: PAGE_PATH.contactPage }
};

/***************************  LONGISTIK - ENCABEZADO DE RECURSOS  ***************************/

export const smallHeroArticulos = {
  headLine: 'Artículos sobre el RNDC',
  captionLine:
    'La norma del RNDC de 2026 explicada para quien despacha: SICE-TAC, la regla del 20 %, anulaciones y lo que conviene hacer ya.',
  exploreBtn: { children: 'Probar el simulador', href: PAGE_PATH.simulador }
};

export const smallHeroSimulador = {
  headLine: 'Simulador de la norma RNDC 2026',
  captionLine:
    'Comprueba en segundos si tu flete pasa el control de SICE-TAC, qué tan cerca estás de la regla del 20 % de cumplidos y cuántas anulaciones te quedan este mes. Gratis y sin registrarte.',
  exploreBtn: { children: 'Leer sobre la norma', href: PAGE_PATH.articulos }
};
