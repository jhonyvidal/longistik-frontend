/***************************  ENLACES A SECCIONES (ANCLAS)  ***************************/

/**
 * Indica si un enlace apunta a una sección de la página (`/#modulos`, `#faq`…).
 */
export function isHashLink(link) {
  return typeof link === 'string' && link.includes('#');
}

/**
 * Props para renderizar un enlace de ancla.
 *
 * Los enlaces a secciones se rendericen como `<a>` normal y no con `next/link`:
 * el router de Next no desplaza la página cuando solo cambia el hash de la ruta
 * actual, mientras que la navegación por fragmento del navegador siempre funciona.
 * El espacio que ocupa el navbar fijo lo resuelve el `scrollMarginTop` de cada sección.
 *
 * Para el resto de enlaces internos se sigue usando `next/link`.
 */
export function linkComponentProps(link, NextLink) {
  return isHashLink(link) ? { component: 'a', href: link } : { component: NextLink, href: link };
}
