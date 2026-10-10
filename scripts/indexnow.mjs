/***************************  INDEXNOW - AVISO DE URLS  ***************************/

/**
 * Le avisa a los buscadores que usan IndexNow (Bing, que alimenta a ChatGPT y Copilot, Yandex y
 * otros) que el sitio cambió, para que lo vuelvan a rastrear en minutos y no en semanas.
 *
 * Uso, después de publicar en producción:
 *   NEXT_PUBLIC_METADATA_BASE=https://longistik.com INDEXNOW_KEY=<llave> node scripts/indexnow.mjs
 *
 * Toma todas las URLs del sitemap publicado. La llave debe ser la misma que sirve /indexnow.txt.
 */

const sitio = (process.env.NEXT_PUBLIC_METADATA_BASE || '').replace(/\/$/, '');
const llave = process.env.INDEXNOW_KEY || '';

if (!sitio || !llave) {
  console.error('Faltan NEXT_PUBLIC_METADATA_BASE o INDEXNOW_KEY.');
  process.exit(1);
}

async function avisar() {
  const sitemap = await fetch(`${sitio}/sitemap.xml`).then((r) => r.text());
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  const respuesta = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(sitio).host, key: llave, keyLocation: `${sitio}/indexnow.txt`, urlList: urls })
  });

  console.log(`IndexNow: ${urls.length} URLs enviadas, respuesta ${respuesta.status}`);
  process.exit(respuesta.ok ? 0 : 1);
}

avisar();
