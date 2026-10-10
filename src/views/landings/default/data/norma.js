// @project
import { PAGE_PATH } from '@/path';
import { ctaVerde } from './botones';

/***************************  LONGISTIK - NORMA RNDC 2026 (FEATURE 20)  ***************************/

/**
 * Lo que exige la Resolución 20263040016075 de 2026 y cómo lo resuelve Longistik.
 *
 * Cada tarjeta dice si la función ya está "Disponible" o "En desarrollo" (Fase 1 del plan de mejora).
 * No anunciar como disponible nada que no esté en producción: cuando salga una validación nueva,
 * cambiar aquí su estado.
 */

export const norma = {
  heading: 'La norma del RNDC cambió en 2026. Longistik se adelanta.',
  caption:
    'La Resolución 20263040016075 de 2026 endureció los controles del RNDC. Mientras terminamos las validaciones nuevas, haz las cuentas gratis en nuestro simulador.',
  actionBtn: ctaVerde('Probar el simulador', PAGE_PATH.simulador),
  secondaryBtn: { children: 'Leer sobre la norma', href: PAGE_PATH.articulos },
  features: [
    {
      icon: 'tabler-scale',
      title: 'Flete contra SICE-TAC',
      content:
        'En desarrollo. El RNDC rechaza el manifiesto si el valor a pagar queda por debajo del costo eficiente. Te avisaremos antes de enviarlo.'
    },
    {
      icon: 'tabler-percentage',
      title: 'Regla del 20 % de cumplidos',
      content:
        'En desarrollo. Si los cumplidos atrasados pasan del 20 %, no puedes expedir manifiestos. Verás el indicador en verde, amarillo o rojo.'
    },
    {
      icon: 'tabler-file-x',
      title: 'Límite de anulaciones',
      content: 'En desarrollo. Contador de anulaciones del mes frente al límite que te corresponde, para que nunca te tome por sorpresa.'
    },
    {
      icon: 'tabler-file-invoice',
      title: 'Flete en la factura electrónica',
      content: 'Disponible. Cargas al RNDC la factura con el flete de cada remesa desde la misma pantalla de facturación.'
    },
    {
      icon: 'tabler-clock',
      title: 'Tiempos logísticos',
      content: 'Disponible. Las horas de cargue y descargue llegan del monitoreo GPS que ya reporta el RNDC. Solo confirmas el cumplido.'
    },
    {
      icon: 'tabler-message-language',
      title: 'Errores del RNDC traducidos',
      content: 'Disponible. Cuando el Ministerio rechaza un documento, te decimos en lenguaje claro qué falló y cómo corregirlo.'
    }
  ]
};
