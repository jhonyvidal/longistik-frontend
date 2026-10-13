// @project
import branding from '@/branding.json';
import SvgIcon from '@/components/SvgIcon';
import { ANCHOR, whatsappUrl } from '@/path';
import { ctaDemo } from './botones';
import { hayCaso } from './caso-exito';

/***************************  LONGISTIK - NAVBAR  ***************************/

const whatsapp = whatsappUrl('Hola, quiero conocer Longistik para mi empresa de transporte.');
// Enlace a la aplicación: que se vea que hay clientes entrando todos los días. Aparece cuando hay URL en branding.json → app.loginUrl
const loginUrl = branding.app?.loginUrl;

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
    // «Caso real» solo cuando data/caso-exito.js tiene contenido
    ...(hayCaso ? [{ id: 'clientes', title: 'Caso real', link: ANCHOR.clientes }] : []),
    { id: 'planes', title: 'Planes', link: ANCHOR.planes },
    { id: 'faq', title: 'Preguntas', link: ANCHOR.faq },
    ...(loginUrl ? [{ id: 'login', title: 'Iniciar sesión', link: loginUrl, target: '_blank' }] : [])
  ]
};
