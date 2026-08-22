// @project
import { ctaVerde } from './botones';

/***************************  LONGISTIK - PLANES  ***************************/

/**
 * ⚠️ PRECIOS PENDIENTES — hoy los dos planes muestran "A convenir" y llevan al formulario de demo.
 *
 * Cuando definas valores, reemplaza `priceLabel` por `price: <número>` en cada plan
 * (el bloque ya sabe pintar el precio y un precio tachado con `offerPrice`).
 * También conviene revisar qué funcionalidad va en cada plan: el reparto de `featuresID`
 * de abajo es una propuesta, no una decisión comercial.
 */

export const pricing = {
  heading: 'Un plan según el tamaño de tu operación',
  caption: 'Implementación, migración y acompañamiento incluidos. Sin permanencia forzada.',
  features: [
    { id: 1, label: 'Guías y manifiestos ilimitados' },
    { id: 2, label: 'Reporte automático al RNDC' },
    { id: 3, label: 'Cumplidos y anulaciones' },
    { id: 4, label: 'Maestros: vehículos, terceros, rutas y tarifas' },
    { id: 5, label: 'Informes de ventas y fletes' },
    { id: 6, label: 'Usuarios con roles y permisos' },
    { id: 7, label: 'Cargue masivo desde archivo' },
    { id: 8, label: 'Cumplido asistido con monitoreo GPS' },
    { id: 9, label: 'Manifiestos multiparada' },
    { id: 10, label: 'API para tus propios clientes' },
    { id: 11, label: 'Acompañamiento en la migración' },
    { id: 12, label: 'Soporte prioritario' }
  ],
  plans: [
    {
      title: 'Operación',
      priceLabel: 'A convenir',
      active: false,
      animationDelay: 0.1,
      featureTitle: 'Incluye',
      content: 'Para transportadoras que quieren salir ya del RNDC manual.',
      exploreLink: ctaVerde('Solicitar cotización'),
      featuresID: [1, 2, 3, 4, 5, 6, 11]
    },
    {
      title: 'Operación + Escala',
      priceLabel: 'A convenir',
      active: true,
      animationDelay: 0.2,
      featureTitle: 'Todo lo anterior, más',
      content: 'Para volúmenes altos y clientes que radican sus propios despachos.',
      exploreLink: ctaVerde('Solicitar cotización'),
      featuresID: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  ]
};
