// @next
import { Archivo, Figtree } from 'next/font/google';

/***************************  CONFIG  ***************************/

// Prefijo de las CSS variables que genera MUI (vacío → --palette-primary-main).
export const CSS_VAR_PREFIX = '';

// Estado inicial que ConfigContext guarda en localStorage.
const config = {
  themeDirection: 'ltr'
};

export default config;

/***************************  THEME - FONT FAMILY  ***************************/

const fontArchivo = Archivo({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const fontFigtree = Figtree({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const FONT_ARCHIVO = fontArchivo.style.fontFamily;
export const FONT_FIGTREE = fontFigtree.style.fontFamily;
