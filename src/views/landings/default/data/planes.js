/***************************  LONGISTIK - PLANES (DATOS PLANOS)  ***************************/

/**
 * Fuente única de precios, topes y funciones por plan. La usan la sección de planes (`pricing.jsx`),
 * los datos estructurados para buscadores (`src/seo.js`) y el `llms.txt` para motores de IA.
 * Cambiar algo aquí lo cambia en los tres lugares.
 *
 * Cobro por volumen diario: cuenta solo el manifiesto expedido. Remesas, cumplidos y anulaciones son
 * ilimitados, y no hay límite de usuarios. Nunca se bloquea un documento por el plan; si el cliente
 * pasa del tope con frecuencia, se le propone el plan siguiente.
 *
 * ⚠️ Decidido: Básico $650.000 (hasta 50 manifiestos al día) y Profesional $1.200.000. El tope de
 * Profesional (200 manifiestos al día) es una propuesta pendiente de validar.
 *
 * `precio`: COP al mes; null = se cotiza. `manifiestosDia`: tope diario; null = sin tope (`desde` indica el piso).
 */

export const funciones = [
  { id: 1, label: 'Remesas, cumplidos y anulaciones ilimitados' },
  { id: 2, label: 'Reporte automático al RNDC' },
  { id: 6, label: 'Usuarios ilimitados, con roles y permisos' },
  { id: 4, label: 'Maestros: vehículos, terceros, rutas y tarifas' },
  { id: 5, label: 'Informes de ventas y fletes' },
  { id: 16, label: 'Soporte con asistente de IA integrado' },
  { id: 11, label: 'Acompañamiento en la migración' },
  { id: 7, label: 'Cargue masivo desde archivo' },
  { id: 9, label: 'Manifiestos multiparada' },
  { id: 8, label: 'Cumplido asistido con monitoreo GPS' },
  { id: 13, label: 'Facturación electrónica DIAN y contabilidad (Siigo, World Office, Alegra)' },
  { id: 10, label: 'API para tus clientes: crear, consultar, anular y rastrear remesas' },
  { id: 14, label: 'Integración con SAP, Odoo o Salesforce' },
  { id: 12, label: 'Soporte prioritario' },
  { id: 15, label: 'Servidor dedicado, con recursos que crecen con tu volumen' },
  { id: 17, label: 'Manejo de la operación con IA' }
];

const basico = [1, 2, 6, 4, 5, 16, 11];
const profesional = [...basico, 7, 9, 8, 13, 10, 14, 12];

export const planes = [
  {
    id: 'basico',
    nombre: 'Básico',
    precio: 650000,
    manifiestosDia: 50,
    para: 'Para la transportadora que despacha unos pocos viajes al día.',
    funcionesID: basico
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    precio: 1200000,
    manifiestosDia: 200,
    para: 'Para operaciones de alto volumen, con facturación y clientes conectados.',
    funcionesID: profesional
  },
  {
    id: 'a-la-medida',
    nombre: 'A la medida',
    precio: null,
    manifiestosDia: null,
    desde: 200,
    para: 'Para empresas grandes que necesitan su propio servidor y la operación asistida con IA.',
    funcionesID: [...profesional, 15, 17]
  }
];

/** 650000 → "$650.000" */
export const formatoCOP = (valor) => `$${new Intl.NumberFormat('es-CO').format(valor)}`;

/** "Hasta 50 manifiestos al día" / "Más de 200 manifiestos al día" */
export const volumenPlan = (plan) =>
  plan.manifiestosDia ? `Hasta ${plan.manifiestosDia} manifiestos al día` : `Más de ${plan.desde} manifiestos al día`;
