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
