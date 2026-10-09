# Solicitud de demo: registro, correo y protección contra spam

Especificación para que el formulario "Agenda una demo" de **longistik.com** registre cada solicitud en el backend (`backlogistic`, NestJS) y que **el backend** envíe los correos:

1. **Confirmación al prospecto**: "Recibimos tu solicitud de demo de Longistik".
2. **Aviso interno al equipo**: con todos los datos del lead.

El sitio (`longistik-frontend`, Next.js) **no envía correos**: solo valida, protege contra bots y reenvía al backend.

---

## 1. Arquitectura

```
Navegador (longistik.com)
  │  formulario + widget Turnstile + honeypot
  ▼
Next.js  POST /api/demo                     ← mismo origen: sin CORS, URL del backend oculta
  │  límite por IP · valida forma · agrega X-Site-Key y X-Client-Ip
  ▼
Backend  POST /public/demo-request          ← instancia de DEBUGPLOY (ver 1.1)
  │  1. valida X-Site-Key
  │  2. límite por IP del cliente
  │  3. valida campos + honeypot
  │  4. verifica el token de Turnstile con Cloudflare (y que el hostname sea longistik.com)
  │  5. guarda en la tabla demo_request          ← el lead nunca se pierde
  │  6. aviso interno + confirmación (MailService, no bloquean la respuesta)
  ▼
200 { message }
```

**Por qué pasar por Next y no llamar al backend desde el navegador:** el endpoint del backend solo acepta peticiones con `X-Site-Key`, así que nadie puede llamarlo directamente saltándose el sitio; no hay que abrir CORS ni tocar la CSP para el dominio del API; y el formulario sigue llamando a `/api/demo` como hoy.

Igual que el resto del backend: **primero BD, después lo externo**. Si Cyberpersons falla, el lead ya quedó guardado (`emailStatus` indica qué pasó).

### 1.1 ¿En qué instancia del backend?

El backend se despliega **una instancia por empresa cliente** (`api.<cliente>.longistik.com`, `deploy/clients.json`). Los leads del sitio son de DEBUGPLOY, no de un cliente, así que:

- El módulo se registra en todas las instancias, pero **solo responde si `DEMO_REQUESTS_ENABLED=true`**. En las demás devuelve `404`.
- Se activa en **una sola instancia propia de DEBUGPLOY**. ⚠️ **Pendiente decidir cuál**: crear una instancia interna (p. ej. `api.longistik.com`) o usar una existente.

---

## 2. Capas de protección contra spam

Ninguna capa sola basta. Juntas frenan bots, abuso manual y el uso del formulario para bombardear la bandeja de un tercero con correos de confirmación.

| # | Capa | Dónde | Detiene |
|---|---|---|---|
| 1 | **Cloudflare Turnstile** (CAPTCHA invisible, gratis, sin cookies de rastreo) | widget en el form, verificación en el **backend** | la gran mayoría de bots |
| 2 | **Verificación de `hostname`** en la respuesta de Turnstile = `longistik.com` / `www.longistik.com` | backend | tokens obtenidos en otro sitio |
| 3 | **Honeypot** (campo `website` oculto) | form + backend | bots simples que llenan todos los campos |
| 4 | **Tiempo mínimo de llenado** (`elapsedMs` ≥ 3 s) | form + backend | envíos automatizados instantáneos |
| 5 | **Límite por IP**: 5 solicitudes / 10 min | Next (primera barrera) **y** backend (autoritativo) | ráfagas desde una misma IP |
| 6 | **Una confirmación por correo cada 24 h** | backend | usar el form para llenar de correos a una víctima |
| 7 | **Filtro de contenido**: más de 2 URLs en el mensaje → se guarda como `SPAM`, sin correos | backend | spam de enlaces que pasa las capas anteriores |
| 8 | **`X-Site-Key`** compartida Next ↔ backend | backend | llamadas directas al endpoint |

**Regla de respuesta:** lo que se detecta como spam (honeypot, tiempo, filtro de contenido) responde **`200` con el mismo mensaje de éxito**: no se le dan pistas al bot. Solo Turnstile inválido (`400`) y el límite por IP (`429`) responden error, porque una persona real puede necesitar reintentar.

> **Por qué Turnstile y no reCAPTCHA:** no usa cookies de seguimiento publicitario ni perfila al usuario. Eso simplifica la política de privacidad (Ley 1581 de 2012) y no requiere banner de cookies.

---

## PARTE A: Backend (`backlogistic`)

### A.1 Archivos

```
src/public/demo-request/
├── demo-request.module.ts
├── demo-request.controller.ts
├── demo-request.controller.spec.ts
├── demo-request.service.ts
├── demo-request.service.spec.ts
├── demo-request.entity.ts
├── demo-request.validation.ts        ← validación manual (el proyecto no usa class-validator)
├── demo-request.validation.spec.ts
├── site-key.guard.ts
├── rate-limit.ts                     ← límite por IP en memoria
├── turnstile.service.ts
└── turnstile.service.spec.ts

src/shared/service/mail/mail.service.ts        ← + sendDemoConfirmationEmail / sendDemoInternalNotice
src/shared/templates/email-demo-confirmacion.html
src/shared/templates/email-demo-aviso-interno.html
migrations/databases/DD-MM-YYYY.sql            ← tabla demo_request
docs/demo-request-api.md                       ← contrato, con el mismo formato que password-reset-api.md
```

Registrar `DemoRequestModule` en `AppModule`. **No** incluirlo en el Swagger público (`main.ts` → `include`): es un endpoint interno del sitio.

### A.2 Variables de entorno (`env/*.env`, `deploy/env.client.template`)

```env
# Solicitudes de demo del sitio longistik.com. Solo "true" en la instancia de DEBUGPLOY.
DEMO_REQUESTS_ENABLED=false
# Secreto compartido con el sitio (mismo valor que DEMO_SITE_KEY en longistik-frontend). Generar con: openssl rand -hex 32
DEMO_SITE_KEY=
# Secret key de Cloudflare Turnstile
TURNSTILE_SECRET_KEY=
# Hostnames aceptados en el token de Turnstile, separados por coma
TURNSTILE_ALLOWED_HOSTNAMES=longistik.com,www.longistik.com
# Buzones que reciben el aviso interno, separados por coma
DEMO_NOTIFY_TO=servicioalcliente@debugploy.com
```

En esa instancia, además, `MAIL_FROM_ADDRESS` debe ser una dirección de `longistik.com` (p. ej. `demo@longistik.com`) verificada en Cyberpersons. Ver §C.

Si `DEMO_REQUESTS_ENABLED=true` y falta `TURNSTILE_SECRET_KEY` o `DEMO_SITE_KEY`, el servicio responde `503` y lo registra en el log. **Nunca** se omite la verificación en silencio.

### A.3 Migración

`migrations/databases/DD-MM-YYYY.sql`:

```sql
CREATE TABLE demo_request (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  company       VARCHAR(150)  NOT NULL,
  email         VARCHAR(254)  NOT NULL,
  phone         VARCHAR(20)   NOT NULL,
  fleet         VARCHAR(50)   NULL,
  message       TEXT          NULL,
  status        VARCHAR(20)   NOT NULL DEFAULT 'NUEVA',   -- NUEVA | SPAM | CONTACTADA | DESCARTADA
  spamReason    VARCHAR(50)   NULL,                      -- links | ...
  emailStatus   VARCHAR(255)  NULL,                      -- resultado de los correos, como statusWS
  clientIp      VARCHAR(45)   NULL,
  userAgent     VARCHAR(255)  NULL,
  createAt      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_demo_request_email_createAt (email, createAt)
);
```

`createAt` sin "d", según la convención del proyecto. Agregar el archivo a `deploy/migrations-order.json` si aplica.

Las solicitudes que caen en el honeypot o en el tiempo mínimo **no** se guardan (sería guardar basura de bots); las del filtro de contenido **sí**, con `status = 'SPAM'`, por si hay un falso positivo.

### A.4 Contrato

**`POST /public/demo-request`**

Headers:
```
Content-Type: application/json
X-Site-Key: <DEMO_SITE_KEY>
X-Client-Ip: <IP real del visitante>     ← solo se confía en él si X-Site-Key es válida
```

Body:
```json
{
  "name": "Juan Ramírez",
  "company": "Transportes Ejemplo S.A.S.",
  "email": "juan@ejemplo.com",
  "phone": "3001234567",
  "fleet": "6 a 20 vehículos",
  "message": "Queremos ver el reporte de manifiestos al RNDC",
  "website": "",
  "elapsedMs": 41250,
  "turnstileToken": "0.AbCd...",
  "userAgent": "Mozilla/5.0 ..."
}
```

| Campo | Requerido | Regla |
|---|---|---|
| `name` | ✅ | 2–100 caracteres tras `trim` |
| `company` | ✅ | 2–150 |
| `email` | ✅ | formato de correo, ≤ 254, se guarda en minúscula |
| `phone` | ✅ | 7–20, solo dígitos, espacios, `+ - ( )` |
| `fleet` | — | ≤ 50 |
| `message` | — | ≤ 2.000 |
| `website` | — | honeypot: debe venir vacío |
| `elapsedMs` | ✅ | número; < 3.000 → spam |
| `turnstileToken` | ✅ | token del widget, de un solo uso, vence a los 5 min |
| `userAgent` | — | ≤ 255, solo para auditoría |

| Código | Cuándo | Cuerpo |
|---|---|---|
| `200` | Registrada, **o** detectada como spam silencioso | `{ "message": "Solicitud recibida" }` |
| `400` | Campos inválidos | `{ "message": "Campos no válidos: email, phone" }` |
| `400` | Token de Turnstile inválido, vencido, reutilizado o de otro hostname | `{ "message": "Verificación anti-bots no válida", "code": "TURNSTILE" }` |
| `401` | `X-Site-Key` ausente o incorrecta | `{ "message": "No autorizado" }` |
| `404` | `DEMO_REQUESTS_ENABLED` ≠ `true` | — |
| `429` | Más de 5 por IP en 10 min | `{ "message": "Demasiadas solicitudes, intenta más tarde" }` |
| `503` | Instancia activa pero mal configurada | `{ "message": "Servicio no disponible" }` |
| `500` | Error guardando en BD | `{ "message": "No se pudo registrar la solicitud" }` |

El `200` sale **después de guardar en BD** y **antes** de esperar los correos (ver A.8).

### A.5 Guard de `X-Site-Key`

```ts
// site-key.guard.ts
import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class SiteKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // En las instancias de clientes el endpoint no existe
    if (process.env.DEMO_REQUESTS_ENABLED !== 'true') throw new NotFoundException();

    const expected = process.env.DEMO_SITE_KEY || '';
    const received = String(context.switchToHttp().getRequest().headers['x-site-key'] || '');

    // Comparación en tiempo constante para no filtrar el secreto por tiempos de respuesta
    const ok =
      expected.length > 0 &&
      received.length === expected.length &&
      timingSafeEqual(Buffer.from(received), Buffer.from(expected));

    if (!ok) throw new UnauthorizedException('No autorizado');
    return true;
  }
}
```

### A.6 Límite por IP

En memoria: hay un proceso por instancia y solo una instancia tiene esto activo, así que no hace falta Redis. Se usa `X-Client-Ip` porque la IP de la conexión es la del servidor de Next. Es seguro porque el guard ya validó `X-Site-Key`.

```ts
// rate-limit.ts
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const intentos = new Map<string, number[]>();

export function excedeLimite(ip: string, ahora = Date.now()): boolean {
  const recientes = (intentos.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  intentos.set(ip, recientes);

  // Limpieza para que el Map no crezca sin límite
  if (intentos.size > 10_000) {
    for (const [k, v] of intentos) if (v.every((t) => ahora - t >= VENTANA_MS)) intentos.delete(k);
  }
  return recientes.length > MAX_POR_VENTANA;
}
```

### A.7 Verificación de Turnstile

```ts
// turnstile.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

@Injectable()
export class TurnstileService {
  async verify(token: string, remoteIp?: string): Promise<{ ok: boolean; reason?: string }> {
    if (!token) return { ok: false, reason: 'sin-token' };

    try {
      const { data } = await axios.post(
        SITEVERIFY_URL,
        new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, ...(remoteIp ? { remoteip: remoteIp } : {}) }),
        { timeout: 10_000 },
      );

      if (!data?.success) return { ok: false, reason: (data?.['error-codes'] || []).join(',') || 'rechazado' };

      // Un token válido emitido en otro dominio no sirve
      const permitidos = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || '').split(',').map((h) => h.trim()).filter(Boolean);
      if (permitidos.length && !permitidos.includes(data.hostname)) return { ok: false, reason: `hostname ${data.hostname}` };

      return { ok: true };
    } catch (error: any) {
      // Si Cloudflare no responde se rechaza: preferible un reintento del usuario a dejar pasar bots
      return { ok: false, reason: `siteverify: ${error?.message}` };
    }
  }
}
```

### A.8 Servicio

Flujo de `DemoRequestService.create(body, clientIp)`:

```
1. ¿Falta TURNSTILE_SECRET_KEY o DEMO_SITE_KEY?   → 503
2. excedeLimite(clientIp)                          → 429
3. validarSolicitud(body)                          → 400 con los campos inválidos
4. website con valor, o elapsedMs < 3000           → log "spam: honeypot|rapido" y 200 (no guarda)
5. turnstile.verify(token, clientIp)               → 400 code TURNSTILE si falla
6. ¿más de 2 URLs en message?                      → guardar con status SPAM y 200 (sin correos)
7. guardar en demo_request con status NUEVA        → 500 si falla
8. responder 200
9. en segundo plano (sin await en la respuesta):
     a. mailService.sendDemoInternalNotice(lead)            → siempre
     b. ¿hay otra demo_request del mismo email en 24 h?     → no enviar confirmación
        si no → mailService.sendDemoConfirmationEmail(lead)
     c. actualizar emailStatus: "interno:OK|ERROR <msg>; confirmacion:OK|OMITIDA|ERROR <msg>"
```

Puntos importantes:
- El paso 9 corre después de responder (`void this.enviarCorreos(saved)` con su propio `try/catch`) para que el formulario no espere a Cyberpersons. `sendMail` ya no lanza excepciones, y `emailStatus` permite encontrar los avisos que no salieron.
- La comprobación de 24 h del paso 9b va **antes** de insertar el registro actual, o hay que excluir su propio `id`.
- Seguir las convenciones del proyecto: respuesta `{ data?, message? }` y `return new HttpException(...)`.
- Detectar URLs con `/(https?:\/\/|www\.)/gi`.

### A.9 Correos (`MailService`)

Dos métodos nuevos, con el mismo patrón que `sendPasswordResetEmail` (plantilla Mustache + `sendMail`):

```ts
export interface DemoRequestEmailParams {
  name: string;
  company: string;
  email: string;
  phone: string;
  fleet?: string;
  message?: string;
  createAt: Date;
}

async sendDemoConfirmationEmail(p: DemoRequestEmailParams) {
  const html = mustache.render(this.templateService.getTemplate('email-demo-confirmacion.html'), {
    firstName: p.name.split(/\s+/)[0],
    company: p.company,
    whatsappUrl: process.env.DEMO_WHATSAPP_URL || 'https://wa.me/573135959528',
    currentYear: new Date().getFullYear(),
  });
  return this.sendMail(p.email, 'Recibimos tu solicitud de demo de Longistik', html);
}

async sendDemoInternalNotice(p: DemoRequestEmailParams) {
  const html = mustache.render(this.templateService.getTemplate('email-demo-aviso-interno.html'), {
    ...p,
    fleet: p.fleet || '—',
    message: p.message || '—',
    createAt: p.createAt.toLocaleString('es-CO', { dateStyle: 'long', timeStyle: 'short', timeZone: 'America/Bogota' }),
  });
  const destinatarios = (process.env.DEMO_NOTIFY_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  const resultados = await Promise.all(destinatarios.map((to) => this.sendMail(to, `Nueva solicitud de demo: ${p.company}`, html)));
  return { status: resultados.every((r) => r.status), message: resultados.map((r) => r.message).join(' | ') };
}
```

**Plantillas** (`src/shared/templates/`), con la misma estructura que `email-reset-password.html` y los colores de la marca: encabezado `#27568E`, botón `#419156`, fondo `#F1F3F8`.

- **Usar siempre `{{variable}}` (doble llave), nunca `{{{variable}}}`**: Mustache escapa el HTML con doble llave, y todos los datos vienen de un formulario público.
- `email-demo-confirmacion.html`: "Hola {{firstName}}, recibimos la solicitud de demo para **{{company}}**. Un asesor te contactará en menos de un día hábil…", botón "Escríbenos por WhatsApp" y "Si no fuiste tú, ignora este correo". Pie: DEBUGPLOY S.A.S. · NIT 901714840-3 · Palmira, Valle del Cauca.
- `email-demo-aviso-interno.html`: tabla con todos los campos y un enlace `mailto:{{email}}` y `https://wa.me/57{{phone}}` para responder rápido. `MailService.sendMail` no maneja `reply_to`; si la API de Cyberpersons lo admite, agregar un parámetro opcional `replyTo` a `sendMail` es una mejora aparte.

### A.10 Tests (obligatorios, según el CLAUDE.md del backend)

Mockear `axios`, el repositorio, `MailService` y `logger.config`. Casos mínimos:

- **validation**: cada campo obligatorio faltante o fuera de rango; correo y teléfono inválidos; `trim` y minúsculas en el correo.
- **guard**: sin header → 401; header incorrecto → 401; `DEMO_REQUESTS_ENABLED=false` → 404; correcto → pasa.
- **rate-limit**: el 6.º intento en la ventana excede; pasada la ventana se libera.
- **turnstile**: `success:false` → rechaza; `hostname` no permitido → rechaza; timeout → rechaza; OK → acepta.
- **service**:
  - honeypot o `elapsedMs < 3000` → 200 sin `save` ni correos
  - Turnstile inválido → 400 sin `save`
  - más de 2 URLs → `save` con `SPAM`, sin correos
  - válida → `save` con `NUEVA` y los dos correos
  - mismo correo en 24 h → aviso interno sí, confirmación no
  - si falla `sendMail`, igual responde 200 y queda en `emailStatus`
  - error en BD → 500
  - falta `TURNSTILE_SECRET_KEY` → 503

`npm test`, `npm run test:types` y `npm run build` en verde.

---

## PARTE B: Frontend (`longistik-frontend`)

### B.1 Variables de entorno (`.env.example`)

Reemplazan a `DEMO_WEBHOOK_URL`:

```bash
## -----------------------------------------
## Solicitudes de demo → backend
## -----------------------------------------
# Endpoint del backend (instancia de DEBUGPLOY). Ej. https://api.longistik.com/public/demo-request
BACKEND_DEMO_URL=
# Secreto compartido con el backend (mismo valor que DEMO_SITE_KEY allá)
DEMO_SITE_KEY=
# Site key pública de Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

Para desarrollo, Cloudflare publica claves de prueba que siempre pasan: site key `1x00000000000000000000AA` y secret `1x0000000000000000000000000000000AA`. Con ellas el `hostname` devuelto es `localhost`; agregarlo a `TURNSTILE_ALLOWED_HOSTNAMES` **solo** en `env/dev.env`.

Además, el dominio del sitio queda en `NEXT_PUBLIC_METADATA_BASE=https://longistik.com`.

### B.2 `src/app/api/demo/route.js`: proxy

Reemplaza el comportamiento actual (log + webhook):

```js
// @next
import { NextResponse } from 'next/server';

/***************************  API - SOLICITUD DE DEMO  ***************************/

/**
 * Reenvía la solicitud de demo al backend, que la guarda, verifica Turnstile y envía los correos.
 * Aquí solo hay una primera barrera barata (límite por IP) antes de gastar una llamada al backend.
 */

export const runtime = 'nodejs';

const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const intentos = new Map();

function excedeLimite(ip) {
  const ahora = Date.now();
  const recientes = (intentos.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  intentos.set(ip, recientes);
  return recientes.length > MAX_POR_VENTANA;
}

export async function POST(request) {
  const { BACKEND_DEMO_URL, DEMO_SITE_KEY } = process.env;
  if (!BACKEND_DEMO_URL || !DEMO_SITE_KEY) {
    console.error('[longistik] BACKEND_DEMO_URL / DEMO_SITE_KEY no configuradas');
    return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || '';
  if (excedeLimite(ip || 'desconocida')) {
    return NextResponse.json({ error: 'Demasiadas solicitudes, intenta más tarde' }, { status: 429 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la solicitud no válido' }, { status: 400 });
  }

  try {
    const response = await fetch(BACKEND_DEMO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Site-Key': DEMO_SITE_KEY, 'X-Client-Ip': ip },
      body: JSON.stringify({ ...payload, userAgent: request.headers.get('user-agent') || '' }),
      signal: AbortSignal.timeout(15_000)
    });

    const body = await response.json().catch(() => ({}));
    // Se reenvían el código y el mensaje del backend, salvo 401/5xx que son problemas de configuración
    if (response.status === 401 || response.status >= 500) {
      console.error('[longistik] el backend rechazó la solicitud de demo:', response.status, body);
      return NextResponse.json({ error: 'No se pudo registrar la solicitud' }, { status: 502 });
    }
    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error('[longistik] no se pudo contactar al backend:', error);
    return NextResponse.json({ error: 'No se pudo registrar la solicitud' }, { status: 502 });
  }
}
```

Detrás de un proxy propio (Nginx), verificar que `x-forwarded-for` lleve la IP del visitante. En Vercel ya viene así.

### B.3 `DemoForm.jsx`

**1. Widget de Turnstile.** Cargar el script en modo explícito y renderizarlo en un `div`. Crear `src/components/contact-us/Turnstile.jsx`:

```jsx
'use client';
import PropTypes from 'prop-types';

import { useEffect, useRef } from 'react';

// @next
import Script from 'next/script';

/***************************  TURNSTILE (ANTI-BOTS)  ***************************/

export default function Turnstile({ onToken, resetSignal }) {
  const ref = useRef(null);
  const widgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const render = () => {
    if (!window.turnstile || !ref.current || widgetId.current !== null) return;
    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: siteKey,
      language: 'es',
      appearance: 'interaction-only', // solo se ve si Cloudflare necesita que la persona interactúe
      callback: onToken,
      'expired-callback': () => onToken(''),
      'error-callback': () => onToken('')
    });
  };

  useEffect(render);

  // El token es de un solo uso: tras cada envío se pide uno nuevo
  useEffect(() => {
    if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
  }, [resetSignal]);

  useEffect(() => () => widgetId.current !== null && window.turnstile?.remove(widgetId.current), []);

  if (!siteKey) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={render} />
      <div ref={ref} />
    </>
  );
}

Turnstile.propTypes = { onToken: PropTypes.func, resetSignal: PropTypes.number };
```

**2. En `DemoForm`:**

- Estado `turnstileToken` y un contador `resetSignal`. Incrementar el contador después de **cada** envío, exitoso o fallido.
- `const startedAt = useRef(Date.now())` y enviar `elapsedMs: Date.now() - startedAt.current`.
- Deshabilitar el botón "Enviar" mientras `!turnstileToken` (si existe `NEXT_PUBLIC_TURNSTILE_SITE_KEY`).
- Mensajes por código:
  - `429`: "Hiciste varias solicitudes seguidas. Intenta de nuevo en unos minutos o escríbenos por WhatsApp."
  - `400` con `code: 'TURNSTILE'`: "No pudimos verificar que no eres un robot. Intenta de nuevo."
  - Otros errores: el mensaje genérico actual.
- **Honeypot**, fuera de la pantalla (no `display:none`, que algunos bots detectan):

```jsx
<Box aria-hidden="true" sx={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
  <label htmlFor="website">No llenar este campo</label>
  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
</Box>
```

### B.4 CSP (`next.config.mjs`)

El widget necesita (según la documentación de Turnstile):

```
script-src … https://challenges.cloudflare.com;
frame-src  … https://challenges.cloudflare.com;
```

`connect-src` no cambia: la llamada al backend sale desde el servidor de Next.

### B.5 Textos legales

En `src/blocks/privacy-policy/PrivacyPolicy1.jsx`, mencionar:
- Los datos del formulario de demo se almacenan en la infraestructura de DEBUGPLOY.
- Se usan para contactar al prospecto y enviarle una confirmación por correo.
- Se usa Cloudflare Turnstile para prevenir abuso automatizado.

Revisión del abogado pendiente: transferencia internacional (Cloudflare y Cyberpersons), Ley 1581 de 2012.

---

## C. Configuración de correo para `longistik.com` (una sola vez)

1. Agregar `longistik.com` como dominio remitente en Cyberpersons y publicar los registros **SPF** y **DKIM** que entregue. El DNS está en Hostinger: ver `deploy/create-hostinger-dns.sh` del backend.
2. Publicar **DMARC** si no existe: `_dmarc.longistik.com TXT "v=DMARC1; p=none; rua=mailto:servicioalcliente@debugploy.com"`. Sin él, Gmail y Outlook tienden a mandar los correos a spam.
3. `MAIL_FROM_ADDRESS=demo@longistik.com` y `MAIL_FROM_NAME=Longistik` en la instancia que recibe las demos.
4. Probar con `POST /mail/test/send` de esa instancia y revisar los encabezados en Gmail ("Mostrar original": SPF, DKIM y DMARC en `PASS`).

## D. Configuración de Turnstile (una sola vez)

1. Cloudflare dashboard → Turnstile → **Add widget**. Hostnames: `longistik.com`, `www.longistik.com`. Modo: **Managed**.
2. La *site key* va a `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (frontend) y la *secret key* a `TURNSTILE_SECRET_KEY` (backend).
3. No hace falta que el dominio use los DNS de Cloudflare: Turnstile funciona con cualquier proveedor.

---

## E. Pruebas de punta a punta

| Caso | Esperado |
|---|---|
| Formulario válido desde longistik.com | 200, fila `NUEVA` en `demo_request`, llegan los dos correos |
| Mismo correo dos veces en 24 h | dos filas; aviso interno ×2; confirmación ×1 |
| Honeypot lleno (editar el DOM) | 200, sin fila, sin correos |
| Enviar en menos de 3 s (script) | 200, sin fila, sin correos |
| Mensaje con 3 URLs | 200, fila `SPAM`, sin correos |
| `curl` directo al backend sin `X-Site-Key` | 401 |
| `curl` al backend con key pero token falso | 400 `TURNSTILE` |
| 6 envíos seguidos desde la misma IP | el 6.º → 429 y mensaje específico en el form |
| `company` = `<b>X</b><script>alert(1)</script>` | en el correo se ve el texto literal |
| Cyberpersons caído | 200 al usuario, fila guardada, error en `emailStatus` |
| Backend caído | 502, mensaje genérico en el form |
| Instancia de un cliente (`api.servicargas360…`) | 404 |

---

## F. Checklist de entrega

**Backend**
- [ ] Módulo `public/demo-request` + guard + Turnstile + límite por IP
- [ ] Migración `demo_request`
- [ ] Plantillas de correo y métodos en `MailService`
- [ ] Variables en `env/*.env` y `deploy/env.client.template` (`DEMO_REQUESTS_ENABLED=false` por defecto)
- [ ] Tests en verde (`npm test`, `npm run test:types`, `npm run build`)
- [ ] `docs/demo-request-api.md`
- [ ] Decidir y configurar la instancia que recibe las demos (§1.1)

**Frontend**
- [ ] `route.js` como proxy
- [ ] `Turnstile.jsx`, honeypot y `elapsedMs` en `DemoForm.jsx`
- [ ] CSP con `challenges.cloudflare.com`
- [ ] `.env.example`: quitar `DEMO_WEBHOOK_URL`, agregar las tres nuevas
- [ ] `CLAUDE.md`: actualizar la descripción de `api/demo/route.js`, las variables y los pendientes
- [ ] Política de privacidad

**Infraestructura**
- [ ] SPF / DKIM / DMARC de `longistik.com`
- [ ] Widget de Turnstile creado
- [ ] Mismo `DEMO_SITE_KEY` en ambos lados

---

## G. Fuera de alcance

- Pantalla en el software para ver y gestionar los leads (cambiar `status` a `CONTACTADA` / `DESCARTADA`).
- Reintento automático de los correos con `emailStatus` en error.
- Enlace de agenda (Calendly / Google Calendar) dentro del correo de confirmación.
