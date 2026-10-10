/***************************  INDEXNOW - LLAVE  ***************************/

// Archivo de verificación de IndexNow (https://www.indexnow.org): Bing, Yandex y otros buscadores
// lo leen para confirmar que el aviso de URLs nuevas viene del dueño del sitio. Bing alimenta las
// búsquedas de ChatGPT y Copilot. Sin INDEXNOW_KEY responde 404. El aviso lo manda
// `scripts/indexnow.mjs` después de cada publicación.
export const dynamic = 'force-static';

export function GET() {
  const llave = process.env.INDEXNOW_KEY || '';
  if (!llave) return new Response('No encontrado', { status: 404 });

  return new Response(llave, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
