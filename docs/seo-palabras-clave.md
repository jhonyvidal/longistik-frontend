# SEO: palabras clave y plan de contenido

Octubre de 2026. Sale de revisar los resultados de búsqueda en español sobre software de transporte y RNDC, el contenido de los competidores (Ofima, Avansat/Grupo OET, SmartQuick, el módulo RNDC de Odoo, Fassiltrans) y las preguntas que hoy responden las páginas de la norma.

> **Límite del análisis:** no tenemos datos de volumen de búsqueda. La prioridad se estima por intención y por lo que posicionan los competidores. Validar con Google Search Console (consultas reales del sitio, a las 4–6 semanas de publicado) y con el Planificador de palabras clave de Google Ads (filtro: Colombia, español).

## 1. Cómo se busca

En esta categoría se busca poco el nombre del producto y mucho el problema o la norma. Hay tres grupos:

| Intención | Quién busca | Qué escribe | Página que debe responder |
|---|---|---|---|
| **Comercial** | gerente o dueño de una transportadora que busca proveedor | «software para transportadoras», «programa para hacer manifiestos de carga», «software RNDC», «TMS Colombia», «ERP de transporte de carga» | Home, planes, contacto |
| **Norma** | jefe de operaciones o de despachos que tuvo un rechazo o leyó un cambio | «manifiesto de carga 2026», «Decreto 1017 de 2025», «SICE-TAC flete mínimo», «regla del 20 % cumplidos», «tiempos logísticos RNDC», «RNDC 360» | Artículos y simulador |
| **Operación** | digitador o auxiliar que aprende el proceso | «qué es la remesa terrestre de carga», «cumplido de manifiesto plazo», «cómo anular un manifiesto», «RNDC web service» | Artículos (faltan, ver sección 3) |

Las búsquedas de norma son las que más tráfico traen hoy (el cambio de 2026 y el anuncio del RNDC 360 están en las noticias), y las comerciales son las que más convierten. El sitio sirve a las dos: el artículo de la norma enlaza al simulador y a la demo.

## 2. Palabras clave y dónde están

**P1** = prioridad alta. La columna «Dónde» indica la página que la trabaja hoy; las celdas en *cursiva* son huecos.

| Palabra clave | Intención | P | Dónde |
|---|---|---|---|
| software para transportadoras | comercial | P1 | `<title>` de la home, JSON-LD |
| software para empresas de transporte de carga | comercial | P1 | texto del hero, FAQ «¿Qué es Longistik?» |
| software RNDC / software conectado al RNDC | comercial | P1 | título, chip del hero, FAQ nueva «¿software o portal del Ministerio?» |
| programa para hacer manifiestos de carga | comercial | P1 | *solo en keywords: falta una página o sección que lo diga literal* |
| manifiesto electrónico de carga | norma/operación | P1 | descripción, hero, llms.txt; *falta artículo propio* |
| remesa terrestre de carga | operación | P1 | hero («remesas (guías)»), FAQ; *falta artículo propio* |
| cumplido de manifiesto | operación | P1 | artículo de la regla del 20 %; *falta artículo propio* |
| SICE-TAC / flete mínimo / costo eficiente | norma | P1 | artículo + simulador |
| Resolución 20263040016075 de 2026 | norma | P1 | artículo + FAQ |
| RNDC 360 | norma | P1 | artículo + FAQ |
| regla del 20 % cumplidos | norma | P2 | artículo + simulador |
| límite de anulaciones de manifiestos | norma | P2 | artículo + simulador |
| Decreto 1017 de 2025 | norma | P2 | *solo en keywords; Ofima posiciona con «qué cambió con el Decreto 1017»* |
| tiempos logísticos RNDC | norma | P2 | sección `#norma-2026`; *falta artículo* |
| TMS Colombia / ERP de transporte de carga | comercial | P2 | keywords, JSON-LD (`applicationSubCategory`) |
| factura electrónica RNDC / facturación electrónica transporte | comercial | P2 | FAQ de integraciones, tarjeta de norma |
| integración Siigo / World Office / Alegra | comercial | P3 | FAQ, sección de integraciones |
| RNDC web service / interoperabilidad RNDC | técnica | P3 | llms.txt; útil cuando exista `/api` |

**Vocabulario:** los transportadores dicen indistintamente «guía» y «remesa», pero la norma y Google usan **remesa**. En títulos y encabezados conviene escribir «remesa (guía)» la primera vez.

## 3. Plan de contenido

Los seis artículos del plan se publicaron el 10 de octubre de 2026 en `data/articulos.js`. Quedan solos en el sitemap, el JSON-LD y el `llms-full.txt`.

| Ruta | Palabra clave principal | Fuente verificada |
|---|---|---|
| `/articulos/manifiesto-electronico-de-carga` | manifiesto electrónico de carga | Resolución, arts. 3, 9–11 y 19; Anexo 1, num. 5.2.4 |
| `/articulos/software-rndc-o-portal-del-ministerio` | software RNDC | Resolución, art. 6; Anexo 1, num. 4.1 y 9.1 |
| `/articulos/cumplido-de-remesa-y-cumplido-de-manifiesto` | cumplido de manifiesto | Resolución, art. 3; Anexo 1, num. 5.3.2 a 5.3.6 |
| `/articulos/remesa-terrestre-de-carga` | remesa terrestre de carga | Resolución, art. 8; Anexo 1, num. 5.2.3 |
| `/articulos/tiempos-logisticos-rndc` | tiempos logísticos RNDC | Resolución, arts. 2, 3 y 18; Decreto 1079, art. 2.2.1.7.6.8 |
| `/articulos/decreto-1017-de-2025` | Decreto 1017 de 2025 | Texto del decreto en el Gestor Normativo de Función Pública |

**Regla para los próximos:** cada cifra o plazo se verifica contra el texto oficial antes de publicar (comentario al inicio de `articulos.js`). Lo que se diga de Longistik debe estar en producción (documentación en `docs/` del backend). Cada artículo enlaza a otro relacionado, al simulador cuando aplica y a la demo.

**Datos que circulan y son falsos:** las «72 horas para registrar el cumplido» venían de la Resolución 377 de 2013, derogada por la de 2026. Hoy el control es la regla del 20 % con 5 días hábiles. Además, la norma lista **cinco** tipos de manifiesto, no cuatro: nuestro artículo `/articulos/resolucion-rndc-2026` decía cuatro y se corrigió.

Ideas siguientes: anulación de remesas y de manifiestos (proceso paso a paso), factura electrónica de transporte en el RNDC, RNDC 360 (actualizar cuando el Ministerio publique las especificaciones) y mercancías peligrosas en el RNDC.

## 4. Lo que se implementó en el sitio

- `metadata.js`: lista de palabras clave actualizada con esta investigación, tarjeta `summary_large_image` para redes, directivas `max-snippet: -1` y `max-image-preview: large` para que Google (y su resumen con IA) pueda citar respuestas completas, y enlace `<link rel="alternate" type="text/markdown">` a `/llms.txt`.
- `layout.jsx`: `lang="es-CO"` (antes `es`), para que el sitio se asocie a Colombia.
- Hero: el texto dice «remesas (guías), manifiestos electrónicos de carga y cumplidos» y «RNDC del Ministerio de Transporte».
- FAQ nueva: «¿Necesito un software para el RNDC o puedo usar el portal del Ministerio?». Entra sola al JSON-LD `FAQPage` y al `llms.txt`.
- `robots.js`: se agregan los rastreadores de Perplexity, Apple, Meta, DuckDuckGo, Mistral, Amazon y Common Crawl a los que ya estaban (OpenAI, Anthropic, Google, Bing).
- `/llms-full.txt`: el `llms.txt` más el texto completo de los artículos, con sus fuentes.
- H1 de la home: «Longistik, el software para transportadoras que reporta al RNDC por ti».
- JSON-LD nuevo: `knowsAbout` y `contactPoint` en `Organization`, `WebApplication` gratuita en el simulador, `CollectionPage` en `/articulos`, e imagen y `isPartOf` en cada `Article`.
- `sitemap.xml` con `lastmod` en las páginas principales (la fecha del artículo más reciente).
- Verificación de Google Search Console y Bing Webmaster Tools por variable de entorno (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`).
- IndexNow: `/indexnow.txt` sirve la llave (`INDEXNOW_KEY`) y `node scripts/indexnow.mjs` avisa a Bing y a los demás buscadores de IndexNow cada vez que se publica.

Ya existían y siguen igual: `/llms.txt`, `/sitemap.xml`, `/robots.txt` y JSON-LD de `Organization`, `SoftwareApplication` (con precios), `WebSite`, `FAQPage`, `Article` y `BreadcrumbList`.

## 5. Fuera del código: qué hace que una IA recomiende el producto

Los asistentes (ChatGPT, Copilot, Perplexity, Gemini) recomiendan lo que encuentran **citado en varios lugares**, no solo en el sitio propio:

1. **Publicar el dominio** y poner `NEXT_PUBLIC_METADATA_BASE=https://longistik.com`. Sin eso robots.txt bloquea todo a propósito.
2. **Google Search Console y Bing Webmaster Tools**: dar de alta el sitio con la metaetiqueta (variables `NEXT_PUBLIC_*_SITE_VERIFICATION`) y enviar `https://longistik.com/sitemap.xml`. Bing es la fuente de búsqueda de ChatGPT y Copilot, así que no se debe omitir. Después de cada publicación, correr `node scripts/indexnow.mjs`.
3. **Perfil de empresa en Google** (Palmira, Valle del Cauca): aparece en búsquedas locales y en Gemini.
4. **Fichas en directorios de software**: ComparaSoftware (ya lista a Avansat), Capterra y G2. Son las fuentes que más citan las IA para «mejor software de X».
5. **LinkedIn de DEBUGPLOY y de Longistik**, y llenar `socialLink` en `branding.json` para que se agreguen al `sameAs` del JSON-LD.
6. **Menciones en el sector**: Colfecar, ANDI, Fenalco y medios de transporte (artículos invitados sobre la norma del RNDC).
7. **Clientes reales** (sección 2 de `plan-de-mejora.md`): un testimonio con nombre y cargo pesa más que cualquier etiqueta.
