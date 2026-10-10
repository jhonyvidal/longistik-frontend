// @project
import { articuloPath, PAGE_PATH } from '@/path';
import { absoluteUrl } from '@/seo';
import { articulos } from '@/views/landings/default/data/articulos';

/***************************  SITEMAP.XML  ***************************/

// Fecha de la última publicación de contenido: la usan Google, Bing y los rastreadores de IA para
// decidir cuándo volver. Las páginas fijas toman la del artículo más reciente.
const ultimaFecha = articulos.map((a) => a.actualizado || a.fecha).sort().at(-1);

export default function sitemap() {
  const paginas = [
    { path: PAGE_PATH.home, priority: 1, changeFrequency: 'weekly', lastModified: ultimaFecha },
    { path: PAGE_PATH.simulador, priority: 0.9, changeFrequency: 'monthly', lastModified: ultimaFecha },
    { path: PAGE_PATH.articulos, priority: 0.8, changeFrequency: 'weekly', lastModified: ultimaFecha },
    { path: PAGE_PATH.contactPage, priority: 0.7, changeFrequency: 'yearly' },
    { path: PAGE_PATH.privacyPolicyPage, priority: 0.2, changeFrequency: 'yearly' },
    { path: PAGE_PATH.termsConditionPage, priority: 0.2, changeFrequency: 'yearly' }
  ].map(({ path, ...resto }) => ({ url: absoluteUrl(path), ...resto }));

  const notas = articulos.map((a) => ({
    url: absoluteUrl(articuloPath(a.slug)),
    lastModified: a.actualizado || a.fecha,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  return [...paginas, ...notas];
}
