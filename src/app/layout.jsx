import PropTypes from 'prop-types';
import Script from 'next/script';

// @style
import './globals.css';

// @mui
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// @project
import ProviderWrapper from './ProviderWrapper';
import JsonLd from '@/components/JsonLd';
import { mainMetadata } from '@/metadata';
import { grafo, organizacionLd, sitioLd, softwareLd } from '@/seo';

const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID || '';

/***************************  METADATA - MAIN  ***************************/

export const metadata = { ...mainMetadata };

/***************************  LAYOUT - MAIN  ***************************/

// Layout raíz que envuelve toda la aplicación
export default function RootLayout({ children }) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        {/* Nota: usar `gaId ? … : null` y no `gaId && …` — con la variable vacía, `&&` inyecta
            una cadena vacía como nodo de texto en <head> y rompe la hidratación. */}
        {gaId ? (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        ) : null}
      </head>
      <body>
        {/* Quién es la empresa y qué es el producto, para buscadores y motores de IA */}
        <JsonLd data={grafo(organizacionLd(), sitioLd(), softwareLd())} />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ProviderWrapper>{children}</ProviderWrapper>
        </AppRouterCacheProvider>
        {gaId ? <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} /> : null}
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.any };
