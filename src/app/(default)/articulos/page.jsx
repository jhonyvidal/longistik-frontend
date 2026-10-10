import dynamic from 'next/dynamic';

// @project
import JsonLd from '@/components/JsonLd';
import { SEO_CONTENT } from '@/metadata';
import { articulosLd, grafo } from '@/seo';

const Articulos = dynamic(() => import('@/views/landings/default/articulos'));

/***************************  METADATA - ARTÍCULOS  ***************************/

export const metadata = { ...SEO_CONTENT.articulos };

/***************************  PAGE - ARTÍCULOS  ***************************/

export default function ArticulosPage() {
  return (
    <>
      {/* El listado como colección de artículos, para buscadores y motores de IA */}
      <JsonLd data={grafo(articulosLd())} />
      <Articulos />
    </>
  );
}
