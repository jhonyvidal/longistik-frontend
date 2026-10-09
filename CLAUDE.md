# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Escribe el contenido del sitio y los comentarios de código nuevos en **español** (el sitio es para clientes colombianos).

## Qué es esto

Sitio de marketing de **Longistik**, el software de gestión logística de **DEBUGPLOY S.A.S.** (NIT 901714840-3, Palmira, Valle del Cauca) para empresas de transporte de carga en Colombia. El producto genera guías (remesas), manifiestos y cumplidos, y los reporta automáticamente al **RNDC** del Ministerio de Transporte vía web services SOAP.

Partió de la plantilla gratuita SaasAble (React + MUI), a la que se le quitó el catálogo de bloques y se le reemplazó todo el contenido. El diseño de la plantilla se conserva a propósito: **cambiar contenido, no diseño**, salvo que se pida explícitamente.

Repos del producto (no de este sitio): frontend `jhonyvidal/TransLogistic` (Fuse React + MUI v5), backend `jhonyvidal/backlogistic` (NestJS + MySQL + SOAP al RNDC). El backend documenta sus funcionalidades en `docs/*.md`; es la fuente para escribir claims técnicos precisos.

Las capturas de la aplicación en producción están en **`docs/capturas-software/`** (fuera de `public/` y en `.gitignore`: contienen cédulas, teléfonos y correos de personas reales, no pueden publicarse). Son la referencia visual para la paleta y para el mockup.

## Comandos

Gestor de paquetes: **yarn 4** (`packageManager`). Si `yarn` global es la v1, usar `npx`.

```bash
npx next dev            # servidor de desarrollo
npx next build          # build de producción
npx next start          # servir el build
npx eslint "src/**/*.{js,jsx}"
npx prettier --write "src/**/*.{js,jsx}"
```

No hay tests ni TypeScript (`jsconfig.json` es solo para el alias `@/*` → `./src/*`).

Variables de entorno en `.env` (ver `.env.example`). Las que importan:
`NEXT_PUBLIC_METADATA_BASE` (dominio para URLs canónicas y Open Graph — **pendiente**),
`DEMO_API_URL` y `DEMO_API_KEY` (backend del panel que recibe las solicitudes de demo; la llave debe coincidir con el setting `demo_api_key` del panel),
`NEXT_PUBLIC_ANALYTICS_ID` (opcional; sin él no se carga ningún script de terceros).

## Estructura del sitio

Solo 4 páginas (`src/app/(default)/`), todas con slugs en español:

| Ruta | Vista |
|---|---|
| `/` | `src/views/landings/default/index.jsx` |
| `/contacto` | `.../contact.jsx` |
| `/politica-de-privacidad` | `.../privacy-policy.jsx` |
| `/terminos-y-condiciones` | `.../terms-condition.jsx` |

Más `src/app/api/demo/route.js`: proxy servidor a servidor hacia `POST /api/public/demo-requests` del backend del panel (repo ConfigPanel, contrato en `docs/demo-requests-api.md` de ese repo). Allá se valida (honeypot `website`, 5 por IP cada 10 min), se guarda el lead y se envían el aviso interno y la confirmación al prospecto. Este route reenvía la IP del visitante en `X-Client-IP` y le pasa al formulario 200/400/429 tal cual; cualquier otro error es 502.

## Paleta

`src/views/landings/default/theme/palette.js` usa los colores muestreados de la aplicación, para que el sitio y el producto se vean como una sola cosa:

| Color | Uso en la app | Uso en la landing |
|---|---|---|
| `#27568E` azul | menú lateral, identidad | `primary`: navbar, enlaces, títulos de módulo, iconos |
| `#419156` verde | botones de acción (Crear, Buscar, Exportar) | `secondary`: todos los CTA |
| `#D87029` naranja | avisos de "pendiente por enviar al RNDC" | `warning` |
| `#D2413C` rojo | error del RNDC | `error` |
| `#F1F3F8` gris | fondo de pantalla | `grey.100` |

Los tonos `main` de verde y naranja se oscurecieron un poco respecto a la captura para cumplir contraste AA sobre blanco (el verde de la app da 3.9:1).

**Los CTA van en verde, no en azul** — igual que en el software. No se logra pasando `color="primary"`: los botones lo reciben desde los datos, con `color: 'secondary'`, centralizado en `src/views/landings/default/data/botones.js` (`ctaDemo` y `ctaVerde()`). Si agregas un CTA nuevo, úsalos en vez de escribir el objeto a mano.

Para cambiar toda la identidad basta editar `palette.js`: los bloques usan tokens del tema (`primary.main`, `grey.100`…), no colores literales. La única excepción a propósito es el mockup, que tiene sus propios tokens.

## Dónde se edita el contenido

**Casi todo el texto vive en `src/views/landings/default/data/`** — objetos JS planos, un archivo por sección, reexportados en `data/index.js`. Los bloques de `src/blocks/` son puramente presentacionales y reciben todo por props; para cambiar textos no hay que tocarlos.

Además:
- `src/branding.json` — marca, datos de la empresa, redes, rutas de los logos. Un número en `contact.whatsapp` hace aparecer solos los botones de WhatsApp (navbar, CTA final, contacto).
- `src/path.js` — rutas internas, anclas de la home (`SECTION_ID` / `ANCHOR`), `whatsappUrl()`.
- `src/metadata.js` — SEO de todas las páginas.
- `src/blocks/privacy-policy/PrivacyPolicy1.jsx` y `src/blocks/TermsCondition.jsx` — el texto legal está en el array `menuItems` de cada archivo.

### Secciones que aparecen solas

`src/views/landings/default/index.jsx` renderiza métricas, testimonios y logos de clientes **solo si sus datos están llenos** (cifras > 0, arrays no vacíos). Es deliberado: evita publicar cifras inventadas o tarjetas vacías. Para activarlas basta llenar `data/metrics.js`, `data/testimonial.js` y `data/clientele.js`.

## El mockup de la aplicación

`src/components/app-mockup/` reproduce la interfaz real de Longistik **con componentes React, no con capturas**: se ve nítido en cualquier pantalla y se actualiza editando `mock-data.js`.

- `AppScreen.jsx` — la ventana (chrome de navegador opcional, menú lateral azul con los grupos "Menú administrativo" y "Menú operativo", barra superior) y el selector de pantalla: `guias`, `manifiestos`, `cumplido`, `dashboard`. Prop `fill` para que ocupe todo el alto del contenedor; `chrome={false}` para incrustarla en una tarjeta.
- `mock-data.js` — datos de muestra. Replican lo real: consecutivos `RM0001956` / `MT000662`, estados en mayúscula (`CREADA`, `MANIFIESTO`, `EN RUTA`, `CUMPLIDO`, `ACTIVO`, `INACTIVO`) con los colores exactos de la app, indicador circular del RNDC verde/rojo y píldora de cumplido con el número que devolvió el Ministerio. Son ficticios: ninguna empresa, persona u operación aquí es real.
- `elements.jsx` — tokens de color del mockup (`MOCK`) y piezas compartidas (chip de estado, indicador del RNDC, píldora de cumplido, cabeceras, botón). **No usa la paleta de la landing a propósito**: imita los colores de la aplicación píxel a píxel.

La estructura de cada pantalla (títulos, columnas, contadores, estados en mayúscula, celdas de dos líneas) replica las capturas reales. Si el software cambia, comparar contra `docs/capturas-software/` antes de tocar el mockup.

Se usa en `data/hero.jsx` (pantalla de guías) y `data/feature.jsx` (una pantalla por pestaña, y el dashboard en Feature21).

## Cosas que hay que saber antes de tocar

- **Bloques modificados respecto a la plantilla.** `Hero17` (props `mockup` y `secondaryBtn`, iconos en `listData`), `Feature18` y `Feature21` (prop `mockup`), `Other1` (prop `icon` como alternativa a `image`), `Pricing9` (prop `priceLabel` para mostrar texto en vez de precio), `Cta4` y `Cta5` (las tarjetas laterales y el grupo de avatares son opcionales), `Faq6` (`categories` opcional). Al actualizar la plantilla original hay que reaplicar estos cambios.
- **Enlaces de ancla.** Los que apuntan a una sección (`/#modulos`) se renderizan como `<a>` normal y no con `next/link` — ver `src/utils/anchorScroll.js`. El router de Next no desplaza la página cuando solo cambia el hash. Cada sección lleva `scrollMarginTop` para compensar el navbar fijo.
- **Cuidado con `{variable && <jsx/>}` cuando la variable es un string.** Con `''`, React renderiza un nodo de texto vacío; dentro de `<head>` eso rompe la hidratación (pasó con `NEXT_PUBLIC_ANALYTICS_ID`). Usar `cond ? … : null`.
- **Las secciones aparecen al hacer scroll** (`whileInView` de framer-motion, comportamiento original de la plantilla). En pestañas que se remontan hay que usar `animate` en su lugar, o el contenido se queda invisible.
- `no-restricted-imports` prohíbe `@mui/*/*/*`: un componente MUI por línea desde su propia ruta.
- Prettier: comillas simples, sin trailing commas, ancho 140, 2 espacios.
- `next.config.mjs` define una CSP estricta: cualquier script, fuente, imagen o fetch externo nuevo debe agregarse ahí o quedará bloqueado en producción.
- Los iconos salen de sprites SVG en `public/assets/svg/` a través de `src/components/SvgIcon.jsx`. Antes de usar un nombre nuevo, verificar que exista en el sprite.

## Pendientes conocidos

- El dominio del sitio es **longistik.com**: falta poner `NEXT_PUBLIC_METADATA_BASE=https://longistik.com` en producción.
- Cargar `DEMO_API_URL` y `DEMO_API_KEY` en producción (y la misma llave en el setting `demo_api_key` del panel).
- Política de privacidad: mencionar que los datos del formulario de demo se guardan y se usan para contactar al prospecto por correo (Ley 1581 de 2012).
- Cifras reales, testimonio y logos de clientes.
- Precio del plan grande (hoy "A la medida"; el básico es "desde $650.000 COP al mes", en `data/pricing.jsx`).
- Páginas propias para `/integraciones`, `/api` e `/implementacion` (hoy son anclas de la home), y URL pública de la documentación de la API.
- El texto legal es un borrador y necesita revisión de un abogado.
