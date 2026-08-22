/***************************  LONGISTIK - LOGOS DE CLIENTES  ***************************/

/**
 * 📌 APARTADO LIBRE — logos de clientes.
 *
 * Mientras `clienteleList` esté vacío, la franja de logos NO se muestra en la home.
 * Para activarla:
 *   1. Copia los logos en `public/assets/images/clientes/` (SVG o PNG con fondo transparente).
 *   2. Agrega una entrada por cliente en `clienteleList`, usando `logoSx` para que se ajuste al alto.
 * La sección aparece sola, no hay que tocar ningún otro archivo.
 *
 * Ejemplo:
 *   { image: '/assets/images/clientes/servicargas.svg', sx: logoSx }
 */

export const logoSx = { height: 1, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' };

export const clientele = {
  title: 'Empresas de transporte que ya operan con Longistik',
  clienteleList: []
};
