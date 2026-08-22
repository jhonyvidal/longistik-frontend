'use client';

// @project
import { Error500Page } from '@/blocks/maintenance';
import ThemeProviders from '@/components/ThemeProvider';

/***************************  ERROR 500 - DATOS  ***************************/

const data = {
  primaryBtn: { children: 'Volver al inicio', href: '/' },
  heading: 'Algo falló de nuestro lado. Inténtalo de nuevo o escríbenos si el problema continúa.'
};

/***************************  ERROR - 500  ***************************/

export default function InternalServerError() {
  return (
    <ThemeProviders>
      <Error500Page {...data} />
    </ThemeProviders>
  );
}
