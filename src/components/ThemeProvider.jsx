'use client';
import PropTypes from 'prop-types';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// @project
import longistikTheme from '@/views/landings/default/theme';

/***************************  COMMON - THEME PROVIDER  ***************************/

/**
 * Renderiza el contenido desde el servidor (sin loader), para que buscadores y motores de IA
 * lean el texto en el HTML. Ver la nota en src/app/ProviderWrapper.jsx.
 */
export default function ThemeProvider({ children }) {
  const selectedTheme = longistikTheme('data-color-scheme');

  return (
    <>
      <InitColorSchemeScript attribute="data-color-scheme" defaultMode="light" />
      <MuiThemeProvider disableTransitionOnChange theme={selectedTheme} defaultMode="light">
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </>
  );
}

ThemeProvider.propTypes = { children: PropTypes.any };
