'use client';
import PropTypes from 'prop-types';

// @project
import ThemeProvider from '@/components/ThemeProvider';
import { ConfigProvider } from '@/contexts/ConfigContext';

/***************************  COMMON - CONFIG, THEME  ***************************/

/**
 * Sin loader a propósito: la plantilla original ocultaba todo el contenido hasta montar en el
 * navegador, y el HTML que recibían Google y los rastreadores de IA llegaba vacío. La única
 * configuración guardada en localStorage es `themeDirection` (siempre 'ltr'), así que servidor
 * y cliente renderizan lo mismo.
 */
export default function ProviderWrapper({ children }) {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <main>{children}</main>
      </ThemeProvider>
    </ConfigProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.any };
