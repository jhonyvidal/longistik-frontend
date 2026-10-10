import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// @project
import JsonLd from '@/components/JsonLd';
import { articuloMeta } from '@/metadata';
import { articuloLd, grafo } from '@/seo';
import { articuloPath } from '@/path';
import { articulos, buscarArticulo } from '@/views/landings/default/data/articulos';

const Articulo = dynamic(() => import('@/views/landings/default/articulo'));

/***************************  RUTAS ESTÁTICAS  ***************************/

// Todos los artículos se generan en el build; un slug que no exista da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return articulos.map(({ slug }) => ({ slug }));
}

/***************************  METADATA - ARTÍCULO  ***************************/

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const articulo = buscarArticulo(slug);
  return articulo ? articuloMeta(articulo, articuloPath(slug)) : {};
}

/***************************  PAGE - ARTÍCULO  ***************************/

export default async function ArticuloPage({ params }) {
  const { slug } = await params;
  const articulo = buscarArticulo(slug);
  if (!articulo) notFound();

  return (
    <>
      <JsonLd data={grafo(articuloLd(articulo))} />
      <Articulo articulo={articulo} />
    </>
  );
}
