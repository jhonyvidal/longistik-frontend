# Plan de mejora de Longistik

Octubre de 2026. Sale del estudio de competencia (SmartQuick, Transportando, Fassiltrans, Avansat, Rodando en Línea y el módulo RNDC de Odoo) y de la Resolución 20263040016075 de 2026 del Ministerio de Transporte, que unifica la norma del RNDC y rige desde el 6 de mayo de 2026.

**Público:** pequeñas empresas de transporte de carga con 1 a 10 usuarios. Si la empresa supera eso, se le cotiza un servidor dedicado (sección 4).

---

## 1. Mejoras del producto, en orden de prioridad

### Fase 1: Cumplir la norma de 2026 (diferenciador inmediato, 4 a 6 semanas)

Ningún competidor vende estas validaciones como función propia. Todas encajan con la promesa del sitio: «datos validados antes de enviar».

| # | Mejora | Por qué | Esfuerzo |
|---|---|---|---|
| 1.1 | **Validación del flete contra SICE-TAC** antes de enviar el manifiesto. Muestra en pantalla el costo eficiente de la ruta y avisa si el valor a pagar queda por debajo. | El RNDC rechaza el manifiesto si el flete es menor al costo eficiente. Hoy el operador se entera después del rechazo. | M |
| 1.2 | **Indicador de cumplidos pendientes**: porcentaje de cumplidos pendientes frente a los manifiestos de los últimos 30 días, en verde (< 12 %), amarillo (12–18 %) o rojo (> 18 %). Envía un correo al administrador al pasar a amarillo. | Si pasa del 20 %, el RNDC no deja expedir manifiestos nuevos: la empresa se queda sin poder despachar. | S |
| 1.3 | **Alerta de cumplidos por vencer**: lista diaria de manifiestos cuyo plazo de cumplido vence en 2 días o menos. | Evita sanciones y alimenta el indicador 1.2. | S |
| 1.4 | **Control del límite de anulaciones** (6 % mensual): contador visible y confirmación reforzada al acercarse. | Odoo ya lo tiene; es barato de hacer. | S |
| 1.5 | **Factura electrónica de transporte en el RNDC** (proceso 86). **Verificar primero en `backlogistic` si ya existe.** | El proyecto de decreto de 2026 lleva el registro del flete a la factura aceptada por el generador de carga. | M–L |
| 1.6 | **Panel de errores del RNDC**: top 10 de códigos de error del mes, con su traducción y cómo corregirlos. | Convierte nuestra fortaleza («errores traducidos») en algo que el cliente ve y valora. | S |

### Fase 2: Lo que tienen los competidores y nos falta (6 a 10 semanas)

| # | Mejora | Quién la tiene | Esfuerzo |
|---|---|---|---|
| 2.1 | **Vencimiento de documentos** de vehículos y conductores (SOAT, revisión técnico-mecánica, licencia, póliza), con alertas a 30, 15 y 5 días y aviso al asignar un vehículo vencido a un manifiesto. | Transportando, Rodando en Línea | M |
| 2.2 | **Liquidación del viaje en PDF para el propietario del vehículo** (flete, anticipos y descuentos de ley), enviada por correo o WhatsApp. | Avansat; Supertransporte exige entregarla | M |
| 2.3 | **Avisos al cliente final por WhatsApp o correo**: remesa despachada, en ruta y cumplida, con enlace de rastreo público. | Transportando | M |
| 2.4 | **Página ligera para el conductor** (PWA, sin instalar nada): foto de la entrega y firma del destinatario, que se adjuntan al cumplido. No duplica la firma del manifiesto, que ya hace la app oficial RNDC Transportador. | SmartQuick, Rodando en Línea | L |

### Fase 3: Más adelante

- Conexión con plataformas de anticipos (Carga Ya).
- Portal de autogestión para propietarios afiliados (extractos y documentos).
- No competir en GPS propio, ruteo con IA ni cubicaje: es otro producto, con otro precio.

### Para el sitio de marketing

- **Simulador gratuito de flete mínimo SICE-TAC** como gancho para captar contactos (Fassiltrans lo usa).
- **Artículos sobre la norma de 2026** (SICE-TAC, regla del 20 %, tiempos logísticos) para posicionar en Google.
- **Prueba social con los clientes reales** (sección 2).
- **Precio por volumen** en lugar de por vehículo o por usuario (sección 3).

---

## 2. Clientes, casos y pruebas

### Clientes reales: Servicarga y Asistencia Logística

Son lo más valioso para el sitio. Para publicarlos se necesita:

1. **Autorización por escrito** de cada empresa para usar su nombre y logo (un correo basta).
2. **Logo** en SVG o PNG con fondo transparente → `data/clientele.js`.
3. **Testimonio real**: una frase del gerente o del jefe de operaciones, con nombre y cargo → `data/testimonial.js`.
4. **Cifras reales** sacadas de la base de datos: manifiestos por mes, tiempo promedio de expedición, porcentaje de envíos aceptados por el RNDC al primer intento → `data/metrics.js`.

Preguntas que sirven para la entrevista del testimonio:

- ¿Cómo hacían los manifiestos antes de Longistik y cuánto tiempo les tomaba?
- ¿Qué pasaba cuando el RNDC rechazaba un documento?
- ¿Qué es lo que más usa el equipo todos los días?

### Lo que no se debe inventar

Testimonios, logos y cifras **no se inventan para el sitio público**. Un testimonio falso puede considerarse publicidad engañosa (Estatuto del Consumidor, Ley 1480 de 2011). Además, en un mercado pequeño donde los transportadores se conocen entre sí, si alguien pregunta por una empresa que no existe, se pierde la confianza en las cifras reales. Por eso `index.jsx` oculta esas secciones mientras estén vacías.

Lo inventado sí sirve en tres lugares, siempre marcado como ejemplo:

- **Demos de venta**: datos ficticios en el mockup y en un ambiente de demostración (como ya hace `mock-data.js`).
- **Escenarios de ejemplo en el sitio**, rotulados como tales: «Ejemplo: una empresa con 4 tractomulas en la ruta Cali–Bogotá...».
- **Casos de prueba** del desarrollo, abajo.

### Escenarios de ejemplo (ficticios, para demos y para el sitio rotulados como «ejemplo»)

| Empresa ficticia | Perfil | Qué muestra |
|---|---|---|
| Transportes Río Cauca S.A.S. | 6 vehículos, 3 usuarios, ~8 manifiestos al día, Cali–Buenaventura | El indicador de cumplidos sube por demoras en puerto; la alerta 1.3 avisa a tiempo y nunca llega al 20 %. |
| Carga Andina del Valle | 12 vehículos, ruta Cali → Buga → Bogotá con paradas | Manifiesto con varias paradas y un cumplido por remesa, asistido con GPS. |
| Logística El Paso | 3 vehículos, 1 usuario, ~2 manifiestos al día | Plan Micro: el dueño hace todo solo y el validador SICE-TAC le evita un rechazo por flete bajo. |

### Casos de prueba de la Fase 1 (datos inventados)

**1.1 Validación SICE-TAC**

| Caso | Datos | Resultado esperado |
|---|---|---|
| Flete por encima del costo eficiente | Ruta Cali–Bogotá, configuración 3S3, costo eficiente $4.850.000, flete $5.200.000 | Se envía sin aviso. |
| Flete por debajo | Mismo viaje, flete $4.500.000 | Aviso en rojo «El RNDC rechazará este manifiesto: el flete está $350.000 por debajo del costo eficiente»; no deja enviar. |
| Flete igual | Flete $4.850.000 | Se envía (la norma dice «igual o superior»). |
| SICE-TAC no responde | Servicio caído | Aviso amarillo «No se pudo validar el flete»; deja enviar y lo registra. |

**1.2 Indicador de cumplidos pendientes**

| Caso | Datos | Resultado esperado |
|---|---|---|
| Verde | 100 manifiestos en 30 días, 8 sin cumplido | 8 %, verde. |
| Amarillo | 100 manifiestos, 15 sin cumplido | 15 %, amarillo y correo al administrador (una sola vez). |
| Rojo | 100 manifiestos, 19 sin cumplido | 19 %, rojo, aviso fijo en todas las pantallas de manifiesto. |
| Empresa nueva | 3 manifiestos, 1 sin cumplido | 33 %, pero con aviso «muestra pequeña»; no se manda correo con menos de 10 manifiestos. |
| Ventana móvil | Un manifiesto sin cumplido de hace 31 días | Ya no cuenta. |

**1.4 Límite de anulaciones**

| Caso | Datos | Resultado esperado |
|---|---|---|
| Bajo el límite | 50 manifiestos en el mes, 1 anulado | 2 %, anulación normal. |
| Cerca del límite | 50 manifiestos, 2 anulados, se intenta anular el tercero | 6 %: pide confirmar escribiendo el número del manifiesto. |
| Sobre el límite | 50 manifiestos, 3 anulados | Bloquea y explica que el RNDC no aceptará más anulaciones este mes. |

---

## 3. Cobro por volumen de manifiestos

### La unidad de cobro: el manifiesto

Cobrar por manifiesto tiene sentido porque **crece con el negocio del cliente**: quien despacha más, gana más y paga más. Los competidores cobran por vehículo (SmartQuick, $150.000–200.000 por vehículo al mes) o por usuario (Transportando, desde $79.900). Por manifiesto es más fácil de entender para una empresa pequeña.

Dos ajustes a la idea de «por día»:

1. **Medir por mes, mostrar el equivalente diario.** La operación de carga tiene picos (lunes, fin de mes, cosechas). Con un tope diario, el cliente quedaría bloqueado justo en sus días buenos. Un tope mensual absorbe los picos.
2. **Nunca bloquear un manifiesto por el plan.** Si el cliente pasa del tope, se le cobra el excedente al mes siguiente y se le ofrece subir de plan. Bloquear un documento legal deja un camión parado, y ese cliente se va.

Remesas, cumplidos, anulaciones y terceros quedan ilimitados: la unidad es el manifiesto expedido.

### Planes propuestos (COP al mes, a validar)

| Plan | Manifiestos al mes | ≈ por día hábil | Usuarios simultáneos | Precio | Excedente |
|---|---|---|---|---|---|
| **Micro** | hasta 60 | ~2–3 | 2 | $390.000 | $5.000 por manifiesto |
| **Básico** | hasta 250 | ~10 | 5 | $650.000 (precio actual del sitio) | $3.500 |
| **Crecimiento** | hasta 700 | ~25–30 | 10 | $1.150.000 | $2.500 |
| **Empresarial** | más de 700, o más de 10 usuarios simultáneos | — | a la medida | servidor dedicado + licencia (sección 4) | — |

Referencia: con 5 vehículos, SmartQuick cuesta ~$1.000.000 al mes. Una empresa de 5 vehículos hace en promedio 5–8 manifiestos al día, así que cabe en el Básico y paga $650.000.

Las integraciones (contabilidad, API para clientes, SAP/Odoo) se cobran aparte como complemento, o vienen incluidas desde el plan Crecimiento.

### Qué hay que construir para cobrar así

- Contador de manifiestos del mes por empresa (NIT) y aviso al 80 % y al 100 % del plan.
- Reporte mensual de consumo para facturar el excedente.
- Límite de sesiones simultáneas por plan, con un mensaje claro: «Tu plan permite 5 usuarios conectados a la vez».

---

## 4. Capacidad del servidor (VPS de Hostinger)

### Lo que realmente consume recursos

Un manifiesto **no** es pesado para el servidor. Su ciclo de vida completo genera unas 7–10 llamadas SOAP al RNDC (manifiesto, sus remesas, cumplidos de cada una y del manifiesto). Cada llamada tarda 1–5 segundos, pero casi todo es **espera de red, no CPU**: NestJS atiende otras peticiones mientras espera.

Lo que de verdad pesa, en orden:

1. **Disco.** Si se guarda el XML enviado y recibido de cada llamada para auditoría (~10–20 KB por llamada), son ~150 KB por manifiesto, más el PDF (~100 KB). Con 20 clientes del plan Básico (~5.000 manifiestos al mes) son **~1,2 GB al mes, ~15 GB al año**, más copias de seguridad. En el KVM 2 (100 GB) es el primer límite que se alcanza.
2. **Informes de rangos grandes** y **cargues masivos**: consultas pesadas en MySQL que frenan a los demás clientes del mismo servidor.
3. **Usuarios simultáneos**: cada usuario conectado hace consultas mientras navega; con muchas empresas a la vez se nota en MySQL.
4. **Generación de PDF**: puntual, unos cientos de milisegundos de CPU por documento.

### Planes de Hostinger (precios en USD a agosto de 2026; verificar en hostinger.com)

| Plan | vCPU | RAM | Disco NVMe | Promoción 24 meses | Renovación |
|---|---|---|---|---|---|
| KVM 1 | 1 | 4 GB | 50 GB | $6,49/mes | $11,99/mes |
| KVM 2 | 2 | 8 GB | 100 GB | $8,79/mes | $14,99/mes |
| KVM 4 | 4 | 16 GB | 200 GB | $12,99/mes | $28,99/mes |
| KVM 8 | 8 | 32 GB | 400 GB | $25,99/mes | $49,99/mes |

Hay que presupuestar con el **precio de renovación**, no con el de la promoción.

### Estimación de capacidad (a confirmar con una prueba de carga)

| Servidor | Uso sugerido | Clientes pequeños compartidos (estimado) |
|---|---|---|
| KVM 2 | Servidor compartido para Micro y Básico | 15–25 empresas, ~40 usuarios simultáneos en total |
| KVM 4 | Compartido con más volumen, o dedicado para un cliente Empresarial | 40–60 empresas, o 1 empresa grande con 30+ usuarios |
| KVM 8 | Dedicado para una empresa con mucho volumen e integraciones | — |

**Estas cifras son estimaciones, no mediciones.** Antes de vender con base en ellas hay que hacer una prueba de carga:

1. Montar una copia del backend en un KVM igual al de producción, apuntando al **ambiente de pruebas del RNDC** (nunca al de producción).
2. Simular con [k6](https://k6.io) N usuarios que crean remesas, arman manifiestos, consultan listados y sacan informes de 3 meses.
3. Subir N hasta que el tiempo de respuesta pase de 2 segundos o la CPU supere el 70 % de forma sostenida.
4. Ese N, menos un 30 % de margen, es la capacidad real del servidor.

### La regla de más de 10 usuarios simultáneos

Tiene sentido como **regla comercial**, pero la razón no es que el servidor no aguante: un KVM 2 soporta varias decenas de usuarios. Las razones de fondo para darle servidor dedicado a una empresa grande son:

- **Que no afecte a los demás**: sus informes y cargues masivos no frenan a los clientes pequeños.
- **Sus propios datos aparte**: lo suelen pedir en auditorías o compras corporativas.
- **Que pague su propia infraestructura**: el servidor dedicado se factura aparte.

Precio sugerido del Empresarial: **licencia desde $1.500.000 al mes + costo del servidor dedicado** (KVM 4: ~$29 USD ≈ $120.000 COP) **+ 20 % de administración**, con implementación cotizada aparte.

### Riesgos de operar sobre un solo VPS

- **Punto único de falla**: si el VPS se cae, todos los clientes se quedan sin poder despachar. Mitigación: monitoreo externo (UptimeRobot, gratis) con alerta por WhatsApp y un procedimiento escrito para restaurar en otro VPS en menos de 2 horas.
- **Copias de seguridad**: los snapshots de Hostinger no bastan. Se necesita un `mysqldump` diario cifrado fuera del servidor (por ejemplo Backblaze B2 u otro proveedor), con 30 días de retención, y probar la restauración una vez al mes.
- **Retención de XML**: comprimir los XML de más de 90 días y moverlos a almacenamiento externo para que el disco no se llene.
- **Ventanas de mantenimiento**: actualizar fuera del horario de despacho (los domingos en la noche), porque los camiones salen de madrugada.

---

## 5. Orden sugerido

1. Pedir autorización, logo, testimonio y cifras a Servicarga y Asistencia Logística.
2. Prueba de carga en un KVM 2 para confirmar la capacidad real.
3. Fase 1 (norma 2026) + contador de manifiestos por plan.
4. Publicar los nuevos planes y la prueba social en el sitio.
5. Fase 2 según lo que pidan los clientes actuales.

---

## Fuentes

- [Resolución 20263040016075 de 2026, MinTransporte](https://mintransporte.gov.co/info/mintransporte/media/anexos/dx2Es4bu.pdf)
- [SmartQuick, TMS Colombia](https://smartquick.ai/tms-colombia.html) · [Transportando](https://www.transportando.com.co/) · [Fassiltrans](https://fassiltrans.com/) · [Rodando en Línea](https://www.rodandoenlinea.com/)
- [Avansat TMS](https://www.comparasoftware.com/avansat-tms) · [Módulo RNDC para Odoo](https://apps.odoo.com/apps/modules/19.0/l10n_co_rndc)
- [Planes de Hostinger VPS (findstack)](https://findstack.com/resources/hostinger-vps-for-ai-agents)
