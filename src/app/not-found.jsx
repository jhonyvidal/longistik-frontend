'use client';

// @project
import { Error404Page } from '@/blocks/maintenance';
import ThemeProviders from '@/components/ThemeProvider';

/***************************  ERROR 404 - DATOS  ***************************/

const data = {
  primaryBtn: { children: 'Volver al inicio', href: '/' },
  heading: 'Esta página no existe. Volvamos a ponerte en ruta.'
};

/***************************  ERROR - 404  ***************************/

export default function NotFound() {
  return (
    <ThemeProviders>
      <Error404Page {...data} />
    </ThemeProviders>
  );
}
