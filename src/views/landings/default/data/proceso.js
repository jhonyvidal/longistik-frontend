// @project
import { whatsappUrl } from '@/path';
import { ctaVerde } from './botones';

const whatsapp = whatsappUrl('Hola, quiero agendar una demo de Longistik.');

/***************************  LONGISTIK - CÓMO EMPEZAMOS (PROCESO)  ***************************/

/**
 * El camino desde la demo hasta el primer despacho. Va junto a los planes: primero la demo,
 * después la recomendación del plan según los manifiestos al día del cliente.
 */

export const proceso = {
  heading: 'Cómo empezamos',
  caption: 'Primero te mostramos Longistik con tu operación. Después decides, con el plan que te recomendamos según tu volumen.',
  steps: [
    {
      icon: 'tabler-presentation',
      title: 'Demo de 30 minutos',
      content: 'Nos cuentas cómo despachas hoy y te mostramos tus remesas, manifiestos y cumplidos en Longistik.'
    },
    {
      icon: 'tabler-file-check',
      title: 'Te recomendamos un plan',
      content: 'Según los manifiestos que expides al día. Sin cobro por usuario: remesas, cumplidos y anulaciones ilimitados.'
    },
    {
      icon: 'tabler-database-import',
      title: 'Migramos y configuramos',
      content: 'Cargamos tus vehículos, terceros, rutas y tarifas, y dejamos lista la conexión con el RNDC.'
    },
    {
      icon: 'tabler-rocket',
      title: 'Despachas con soporte',
      content: 'Acompañamos a tu equipo en los primeros despachos, con soporte directo de quien desarrolla y el asistente de IA.'
    }
  ],
  note: 'Sin compromiso y sin permanencia. Resolvemos tus dudas antes de que decidas.',
  primaryBtn: ctaVerde('Agenda una demo de 30 minutos'),
  // Solo aparece cuando hay número cargado en branding.json → contact.whatsapp
  ...(whatsapp && {
    secondaryBtn: { children: 'Prefiero escribir por WhatsApp', href: whatsapp, target: '_blank', rel: 'noopener noreferrer' }
  })
};
