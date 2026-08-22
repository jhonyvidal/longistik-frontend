'use client';
import PropTypes from 'prop-types';

import { Suspense, useEffect, useState } from 'react';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// @project
import Loader from './Loader';
import longistikTheme from '@/views/landings/default/theme';

/***************************  COMMON - THEME PROVIDER  ***************************/

export default function ThemeProvider({ children }) {
  const [loader, setLoader] = useState(true);

  const selectedTheme = longistikTheme('data-color-scheme');

  useEffect(() => {
    setLoader(false);
  }, []);

  /**
   * El loader es necesario aquí para inicializar la configuración desde localStorage
   * y aplicar el tema por defecto. Sin él, la paleta y la fontFamily no coinciden entre
   * servidor y cliente y aparece el error "Prop className did not match".
   */

  return (
    <>
      <InitColorSchemeScript attribute="data-color-scheme" defaultMode="light" />
      <Suspense fallback={<Loader />}>
        {loader ? (
          <Loader />
        ) : (
          <MuiThemeProvider disableTransitionOnChange theme={selectedTheme} defaultMode="light">
            <CssBaseline enableColorScheme />
            {children}
          </MuiThemeProvider>
        )}
      </Suspense>
    </>
  );
}

ThemeProvider.propTypes = { children: PropTypes.any };
