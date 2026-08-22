// @project
import branding from '@/branding.json';
import { ANCHOR, EMAIL_URL, whatsappUrl } from '@/path';

/***************************  LONGISTIK - CONTACTO  ***************************/

const whatsapp = whatsappUrl('Hola, quiero agendar una demo de Longistik.');

export const contactUS = {
  heading: 'Agenda una demo de Longistik',
  caption:
    'Cuéntanos cómo despachas hoy y te mostramos el sistema con tu propio flujo: tus rutas, tus clientes y tus documentos del RNDC. Te respondemos en menos de un día hábil.',
  list: [
    {
      animationDelay: 0.2,
      icon: 'tabler-mail',
      title: 'Escríbenos',
      content: branding.company.email,
      link: { children: 'Enviar correo', href: EMAIL_URL }
    },
    ...(whatsapp
      ? [
          {
            animationDelay: 0.3,
            icon: 'tabler-brand-whatsapp',
            title: 'WhatsApp',
            content: 'Respuesta rápida en horario laboral.',
            link: { children: 'Abrir WhatsApp', href: whatsapp, target: '_blank', rel: 'noopener noreferrer' }
          }
        ]
      : []),
    {
      animationDelay: 0.4,
      icon: 'tabler-help',
      title: '¿Dudas antes de hablar?',
      content: 'Revisa las preguntas frecuentes sobre el RNDC y la migración.',
      link: { children: 'Ver preguntas', href: ANCHOR.faq }
    }
  ]
};
