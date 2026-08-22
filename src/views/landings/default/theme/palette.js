// @project
import { extendPaletteWithChannels } from '@/utils/colorUtils';

/***************************  THEME - PALETTE  ***************************/

/**
 * Paleta tomada de la aplicación Longistik para que el sitio y el producto se vean como una sola cosa.
 * Colores de referencia muestreados de las capturas reales (ver docs/capturas-software):
 *
 *   #27568E  azul del menú lateral y de la identidad
 *   #3D6799  azul del ítem activo del menú
 *   #419156  verde de los botones de acción (Crear, Buscar, Exportar)
 *   #D87029  naranja de los avisos de "pendiente por enviar al RNDC"
 *   #D2413C  rojo del indicador de error del RNDC
 *   #F1F3F8  fondo gris de las pantallas
 *
 * `primary` (azul) es la identidad: navbar, enlaces, títulos destacados e iconos.
 * `secondary` (verde) es la acción, igual que en la aplicación: los botones de CTA lo usan
 * pasando `color: 'secondary'` desde los archivos de datos.
 *
 * Los tonos `main` se oscurecieron ligeramente respecto a la captura para que el texto
 * blanco encima cumpla contraste AA (verde 3.9:1 → 4.7:1, naranja 3.4:1 → 4.5:1).
 */
export function buildPalette() {
  const textPrimary = '#16233A'; // azul casi negro, como los títulos de la app
  const textSecondary = '#4A5568';
  const divider = '#D8DEE8';
  const background = '#FFF';

  const lightPalette = {
    primary: {
      lighter: '#DCE8F6', // fondos suaves (chips, badges de icono)
      light: '#7FA3CC',
      main: '#27568E', // azul del menú lateral
      dark: '#1D4270',
      darker: '#0F2542'
    },
    secondary: {
      lighter: '#E1F2E6', // fondo de los estados "Cumplido" / "Activo"
      light: '#419156', // verde exacto de la app, para superficies y detalles
      main: '#3A8250', // verde de acción, ajustado para contraste AA sobre blanco
      dark: '#2E6B41',
      darker: '#1B4227'
    },
    success: {
      lighter: '#E1F2E6',
      light: '#5BAE74',
      main: '#3A8250',
      dark: '#2E6B41',
      darker: '#1B4227'
    },
    warning: {
      lighter: '#FDECDC',
      light: '#E9954F',
      main: '#B85D1F', // naranja de "pendientes por enviar al RNDC"
      dark: '#954914',
      darker: '#5C2E0C'
    },
    error: {
      lighter: '#FBE2E1',
      light: '#E2726E',
      main: '#D2413C', // rojo del indicador de error del RNDC
      dark: '#B3322E',
      darker: '#701C1A'
    },
    grey: {
      50: '#FAFBFD',
      100: '#F1F3F8', // fondo de pantalla de la app
      200: '#EAEEF5',
      300: '#E3E8F1',
      400: '#DDE3EC',
      500: '#D2DAE6',
      600: divider,
      700: '#7B8798',
      800: textSecondary,
      900: textPrimary
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary
    },
    divider,
    background: {
      default: background
    }
  };

  const commonColor = { common: { black: '#000', white: '#fff' } };

  const extendedLight = extendPaletteWithChannels(lightPalette);
  const extendedCommon = extendPaletteWithChannels(commonColor);

  return {
    light: {
      mode: 'light',
      ...extendedCommon,
      ...extendedLight
    }
  };
}
