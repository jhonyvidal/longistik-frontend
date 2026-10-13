// @project
import { ctaVerde } from './botones';

/***************************  LONGISTIK - VIDEO DEMO  ***************************/

/**
 * Video del sistema funcionando (clip de 10 s, 1280×720, en `public/assets/video/`).
 *
 * Si `src` queda vacío, la sección NO se muestra y el botón secundario del hero vuelve a llevar a los módulos.
 * Sin `poster`, el bloque muestra el primer cuadro del video como portada.
 * `pasos` y `duracion` son opcionales: solo llenarlos si describen lo que de verdad se ve en el video.
 *
 * ⚠️ Cualquier video nuevo se graba en una empresa de prueba con datos ficticios: en producción salen
 * cédulas, teléfonos y correos de personas reales, que no pueden publicarse.
 */

export const videoDemo = {
  heading: 'Mira Longistik en acción',
  caption: 'Así se ve el software con el que tu empresa expide remesas, manifiestos y cumplidos y los reporta automáticamente al RNDC.',
  src: '/assets/video/Longistik.mp4',
  poster: '',
  duracion: '',
  pasos: [],
  actionBtn: ctaVerde('Quiero verlo con mi operación')
};

/** El video está listo para mostrarse. */
export const hayVideo = Boolean(videoDemo.src);
