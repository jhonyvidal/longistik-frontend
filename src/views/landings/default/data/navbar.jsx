// @project
import SvgIcon from '@/components/SvgIcon';
import { ANCHOR, whatsappUrl } from '@/path';
import { ctaDemo } from './botones';

/***************************  LONGISTIK - NAVBAR  ***************************/

const whatsapp = whatsappUrl('Hola, quiero conocer Longistik para mi empresa de transporte.');

export const navbar = {
  customization: false,
  // El botón de WhatsApp solo aparece cuando hay número cargado en branding.json → contact.whatsapp
  ...(whatsapp && {
    secondaryBtn: {
      children: <SvgIcon name="tabler-brand-whatsapp" color="primary.main" size={18} />,
      href: whatsapp,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': 'Escríbenos por WhatsApp',
      sx: { minWidth: 40, width: 40, height: 40, p: 0 }
    }
  }),
  primaryBtn: { ...ctaDemo },
  navItems: [
    // Sin "Inicio": el logo ya lleva a la home y así cabe "Integraciones" sin saturar el menú
    { id: 'modulos', title: 'Módulos', link: ANCHOR.modulos },
    { id: 'rndc', title: 'RNDC', link: ANCHOR.rndc },
    { id: 'integraciones', title: 'Integraciones', link: ANCHOR.integraciones },
    { id: 'api', title: 'API', link: ANCHOR.api },
    { id: 'planes', title: 'Planes', link: ANCHOR.planes },
    { id: 'faq', title: 'Preguntas', link: ANCHOR.faq }
  ]
};
