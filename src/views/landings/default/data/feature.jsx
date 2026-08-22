// @project
import { AppScreen } from '@/components/app-mockup';
import { ANCHOR } from '@/path';
import { ctaDemo } from './botones';

/***************************  LONGISTIK - FUNCIONALIDADES (FEATURE 20)  ***************************/

export const feature20 = {
  heading: 'Todo lo que exige el RNDC, en un solo lugar',
  caption: 'Cada operación queda registrada en tu sistema y reportada al Ministerio de Transporte en el mismo paso.',
  actionBtn: { ...ctaDemo },
  secondaryBtn: { children: 'Cómo funciona la integración', href: ANCHOR.rndc },
  features: [
    {
      icon: 'tabler-file-text',
      title: 'Guías con consecutivo automático',
      content: 'Expide remesas terrestres de carga con numeración propia y envío al RNDC en el mismo momento.'
    },
    {
      icon: 'tabler-receipt',
      title: 'Manifiestos multiparada',
      content: 'Arma un manifiesto con varias remesas y paradas intermedias, y liquida el flete del viaje.'
    },
    {
      icon: 'tabler-clipboard-check',
      title: 'Cumplidos sin digitar',
      content: 'Los horarios de cargue y descargue llegan del monitoreo GPS que ya reporta el RNDC.'
    },
    {
      icon: 'tabler-id-badge-2',
      title: 'Terceros y vehículos',
      content: 'Crea y actualiza conductores, propietarios y vehículos directamente contra el RNDC.'
    },
    {
      icon: 'tabler-shield-check',
      title: 'Nada se pierde si el RNDC se cae',
      content: 'La operación se guarda igual y queda marcada para reenviarla cuando el servicio vuelva.'
    },
    {
      icon: 'tabler-chart-bar',
      title: 'Ventas contra fletes',
      content: 'Informes de lo que cobras y lo que pagas por cliente, vehículo, ruta o conductor.'
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
        { primary: 'Exportación para contabilidad' }
      ],
      actionBtn: { ...ctaDemo }
    }
  ]
};

/***************************  LONGISTIK - CARGUE MASIVO Y API (FEATURE 21)  ***************************/

export const feature21 = {
  heading: 'Cuando el volumen crece, no crece el trabajo',
  caption: 'Cargue masivo desde archivo y una API para que tus propios clientes radiquen sus despachos.',
  mockup: <AppScreen screen="dashboard" />,
  primaryBtn: { ...ctaDemo },
  features: [
    { animationDelay: 0.1, icon: 'tabler-upload', title: 'Cargue masivo por archivo' },
    { animationDelay: 0.2, icon: 'tabler-check', title: 'Validación antes de crear' },
    { animationDelay: 0.3, icon: 'tabler-api', title: 'API para tus clientes' },
    { animationDelay: 0.4, icon: 'tabler-lock', title: 'Cada cliente ve solo lo suyo' },
    { animationDelay: 0.1, icon: 'tabler-package', title: 'Varias unidades por remesa' },
    { animationDelay: 0.2, icon: 'tabler-world', title: 'Consulta pública de estado' },
    { animationDelay: 0.3, icon: 'tabler-users', title: 'Roles y permisos por usuario' },
    { animationDelay: 0.4, icon: 'tabler-printer', title: 'PDF con código de barras' }
  ]
};
