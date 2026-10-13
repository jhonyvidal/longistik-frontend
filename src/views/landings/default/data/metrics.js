/***************************  LONGISTIK - MÉTRICAS  ***************************/

/**
 * ⚠️ CIFRAS PENDIENTES — reemplazar antes de publicar.
 *
 * Estos números son un marcador de posición para ver el diseño de la sección.
 * Hay que sustituirlos por las cifras reales de la operación de Servicargas
 * (remesas/mes, manifiestos/mes, vehículos en operación, tiempo ahorrado).
 * Si alguna cifra no se puede sustentar, es mejor quitar esa tarjeta que dejarla inventada.
 */
export const metrics = {
  heading: 'Lo que cambia cuando dejas de operar en el RNDC',
  caption: 'Cifras de la operación de nuestros clientes usando Longistik.',
  blockDetail: [
    { animationDelay: 0.1, counter: 0, defaultUnit: '+', caption: 'Remesas expedidas' },
    { animationDelay: 0.2, counter: 0, defaultUnit: '+', caption: 'Manifiestos generados' },
    { animationDelay: 0.3, counter: 0, defaultUnit: '', caption: 'Vehículos en operación' },
    { animationDelay: 0.4, counter: 0, defaultUnit: '%', caption: 'Reportes aceptados por el RNDC' }
  ]
};
