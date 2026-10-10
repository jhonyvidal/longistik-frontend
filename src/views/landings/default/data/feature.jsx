// @project
import { AppScreen } from '@/components/app-mockup';
import SvgIcon from '@/components/SvgIcon';
import { ANCHOR } from '@/path';
import { ctaDemo } from './botones';

/***************************  LONGISTIK - FUNCIONALIDADES (FEATURE 20)  ***************************/

/**
 * Cada tarjeta parte de un dolor real del día a día (el que el cliente reconoce) y cierra con
 * lo que hace Longistik. Es la narrativa "problema → solución" con la que abre la home.
 */
export const feature20 = {
  heading: 'Si despachas carga en Colombia, esto te suena',
  caption: 'Software hecho solo para transporte de carga, no un ERP genérico adaptado. Cada dolor de la operación tiene su solución.',
  actionBtn: { ...ctaDemo },
  secondaryBtn: { children: 'Ver con qué se integra', href: ANCHOR.integraciones },
  features: [
    {
      icon: 'tabler-copy',
      title: 'Digitar la misma remesa dos veces',
      content: 'La registras una sola vez en Longistik y se reporta sola al RNDC, con consecutivo automático.'
    },
    {
      icon: 'tabler-alert-triangle',
      title: 'Errores del RNDC que nadie entiende',
      content: 'Validamos los datos antes de enviar y traducimos la respuesta del Ministerio a lenguaje claro.'
    },
    {
      icon: 'tabler-clipboard-check',
      title: 'Cumplidos llenados a mano',
      content: 'Las horas de cargue y descargue llegan del monitoreo GPS que ya reporta el RNDC. Solo confirmas.'
    },
    {
      icon: 'tabler-file-invoice',
      title: 'Facturar copiando de un sistema a otro',
      content: 'La remesa cumplida pasa a tu facturación electrónica y a Siigo, World Office o Alegra sin transcribir.'
    },
    {
      icon: 'tabler-phone',
      title: 'Clientes llamando a preguntar por su carga',
      content: 'Con nuestra API consultan el estado y el rastreo de cada remesa desde su propio sistema.'
    },
    {
      icon: 'tabler-chart-bar',
      title: 'No saber si el viaje dejó plata',
      content: 'Ventas contra fletes por cliente, vehículo, ruta o conductor, en el mismo informe.'
    }
  ]
};

/***************************  LONGISTIK - MÓDULOS EN DETALLE (FEATURE 18)  ***************************/

export const feature18 = {
  heading: 'La misma operación, en una interfaz que sí se entiende',
  caption: 'Cada pantalla resuelve un paso del proceso, con los datos que el RNDC exige ya validados antes de enviar.',
  topics: [
    {
      icon: 'tabler-file-text',
      title: 'Guías',
      title2: 'Expide remesas en un solo formulario',
      description: 'Cliente, remitente, destinatario, producto y tarifa en una sola pantalla, con el consecutivo listo.',
      mockup: <AppScreen screen="guias" chrome={false} fill />,
      list: [
        { primary: 'Consecutivo RM automático, sin saltos ni duplicados' },
        { primary: 'Envío al RNDC en segundo plano, sin bloquear al operador' },
        { primary: 'Estado visible: creada, en manifiesto, en ruta, cumplida' },
        { primary: 'Guía en PDF con código de barras lista para imprimir' }
      ],
      actionBtn: { ...ctaDemo }
    },
    {
      icon: 'tabler-receipt',
      title: 'Manifiestos',
      title2: 'Un manifiesto, varias remesas y varias paradas',
      description: 'Agrupa las remesas del viaje, asigna vehículo y conductor, y liquida el flete.',
      mockup: <AppScreen screen="manifiestos" chrome={false} fill />,
      list: [
        { primary: 'Rutas con paradas intermedias (Cali → Buga → Bogotá)' },
        { primary: 'Validación de que cada remesa pertenece al recorrido' },
        { primary: 'Liquidación de flete y anticipos por viaje' },
        { primary: 'Consecutivo MT y reporte al RNDC en el mismo paso' }
      ],
      actionBtn: { ...ctaDemo }
    },
    {
      icon: 'tabler-clipboard-check',
      title: 'Cumplidos',
      title2: 'El cumplido se llena solo',
      description: 'Longistik consulta el monitoreo del manifiesto en el RNDC y propone fechas y horas reales.',
      mockup: <AppScreen screen="cumplido" chrome={false} fill />,
      list: [
        { primary: 'Horarios de cargue y descargue tomados del GPS' },
        { primary: 'Un cumplido por remesa, incluso en rutas multiparada' },
        { primary: 'El operador revisa y confirma, no transcribe' },
        { primary: 'Ajuste de puntos de control cuando algo no cuadra' }
      ],
      actionBtn: { ...ctaDemo }
    },
    {
      icon: 'tabler-chart-bar',
      title: 'Informes',
      title2: 'Saber si el viaje dejó plata',
      description: 'Ingresos por remesa contra gastos de flete, en el mismo rango de fechas.',
      mockup: <AppScreen screen="dashboard" chrome={false} fill />,
      list: [
        { primary: 'Ventas por cliente, producto y ruta' },
        { primary: 'Fletes por vehículo, conductor y propietario' },
        { primary: 'Comparativo de utilidad mes a mes' },
        { primary: 'Integración con Siigo, World Office y Alegra' }
      ],
      actionBtn: { ...ctaDemo }
    }
  ]
};

/***************************  LONGISTIK - API PARA LOS CLIENTES (FEATURE 21)  ***************************/

/**
 * Lo que expone hoy la API de Longistik: creación, consulta y anulación de remesas, consulta por
 * cliente, rastreo y la trazabilidad completa de la remesa desde que se crea hasta que se factura.
 */
export const feature21 = {
  heading: 'Tus clientes crean y rastrean sus remesas desde su propio sistema',
  caption:
    'Una API para que los clientes de tu transportadora radiquen despachos y sigan cada remesa, desde que se crea hasta que se factura. Menos llamadas, menos correos, más carga.',
  mockup: <AppScreen screen="dashboard" />,
  // Mismo ícono que los demás botones de demo (el bloque trae uno de descarga por defecto)
  primaryBtn: { ...ctaDemo, startIcon: <SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" /> },
  features: [
    { animationDelay: 0.1, icon: 'tabler-file-plus', title: 'Creación de remesas' },
    { animationDelay: 0.2, icon: 'tabler-search', title: 'Consulta de remesas' },
    { animationDelay: 0.3, icon: 'tabler-circle-x', title: 'Anulación de remesas' },
    { animationDelay: 0.4, icon: 'tabler-users', title: 'Consulta por cliente' },
    { animationDelay: 0.1, icon: 'tabler-map-pin-check', title: 'Rastreo de cada remesa' },
    { animationDelay: 0.2, icon: 'tabler-route', title: 'Seguimiento hasta la factura' },
    { animationDelay: 0.3, icon: 'tabler-lock', title: 'Cada cliente ve solo lo suyo' },
    { animationDelay: 0.4, icon: 'tabler-upload', title: 'Cargue masivo por archivo' }
  ]
};
