// @project
import { PAGE_PATH } from '@/path';

/***************************  LONGISTIK - BOTONES DE ACCIÓN  ***************************/

/**
 * En la aplicación los botones de acción (Crear, Buscar, Exportar) son verdes y el azul
 * queda para la identidad. La landing hace lo mismo: los CTA principales usan
 * `color: 'secondary'` (verde de la paleta) para que el sitio y el producto se vean igual.
 */

export const ctaDemo = { children: 'Agenda una demo', href: PAGE_PATH.contactPage, color: 'secondary' };

/** Mismo botón verde con otra etiqueta. */
export function ctaVerde(children, href = PAGE_PATH.contactPage) {
  return { children, href, color: 'secondary' };
}
