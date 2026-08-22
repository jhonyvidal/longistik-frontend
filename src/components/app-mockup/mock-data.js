/***************************  APP MOCKUP - DATOS DE MUESTRA  ***************************/

/**
 * Datos ficticios que reproducen la información y la estructura reales de Longistik
 * (ver las capturas del software en docs/capturas-software).
 *
 * Se respetan las convenciones del sistema: remesas con prefijo RM y 7 dígitos, manifiestos
 * con prefijo MT y 6 dígitos, estados en mayúscula, y la columna Cumplido con el número que
 * devuelve el RNDC. Ninguna operación, empresa o persona aquí es real.
 */

/***************************  ESTADOS  ***************************/

// Mismos colores que usa la aplicación para los chips de estado.
export const ESTADO = {
  creada: { label: 'CREADA', color: '#27568E', bg: '#E4EDF9' },
  manifiesto: { label: 'MANIFIESTO', color: '#4A4C86', bg: '#ECEBF3' },
  enRuta: { label: 'EN RUTA', color: '#954914', bg: '#FDECDC' },
  cumplido: { label: 'CUMPLIDO', color: '#2E6B41', bg: '#E7F4EA' },
  activo: { label: 'ACTIVO', color: '#2E6B41', bg: '#E7F4EA' },
  inactivo: { label: 'INACTIVO', color: '#B3322E', bg: '#FBE2E4' }
};

/***************************  MENÚ LATERAL  ***************************/

export const SIDEBAR_MENU = [
  { icon: 'tabler-gauge', label: 'Dashboard', screen: 'dashboard' },
  { type: 'group', label: 'MENU ADMINISTRATIVO', caption: 'Panel Administrativo' },
  { icon: 'tabler-circle-check', label: 'Configuraciones', expandable: true },
  { type: 'group', label: 'MENU OPERATIVO', caption: 'Panel Operativo' },
  { icon: 'tabler-circle-check', label: 'Maestros', expandable: true },
  { icon: 'tabler-chart-bar', label: 'Informes', expandable: true, screen: 'dashboard-informes' },
  { icon: 'tabler-circle-check', label: 'Despachos', expandable: true, open: true },
  { icon: 'tabler-file-text', label: 'Guía', child: true, screen: 'guias' },
  { icon: 'tabler-receipt', label: 'Manifiesto', child: true, screen: 'manifiestos' },
  { icon: 'tabler-clipboard-check', label: 'Cumplido Guía', child: true, screen: 'cumplido' },
  { icon: 'tabler-upload', label: 'Importación Masiva', child: true }
];

/***************************  GUÍAS (REMESAS)  ***************************/

export const GUIAS_TOTAL = '152 registros';

export const GUIAS = [
  {
    guia: 'RM0001956',
    id: 'ID: 160',
    cliente: 'DISTRIMOTOS DEL PACÍFICO',
    nit: '9007239889',
    servicio: 'Nacional',
    pago: 'Credito',
    fecha: 'Ago 22, 2026',
    estado: ESTADO.cumplido,
    rndcOk: true,
    cumplido: '141883793'
  },
  {
    guia: 'RM0001955',
    id: 'ID: 159',
    cliente: 'DISTRIMOTOS DEL PACÍFICO',
    nit: '9007239889',
    servicio: 'Nacional',
    pago: 'Credito',
    fecha: 'Ago 22, 2026',
    estado: ESTADO.manifiesto,
    rndcOk: true,
    cumplido: null
  },
  {
    guia: 'RM0001954',
    id: 'ID: 158',
    cliente: 'AGROCOMERCIAL DEL VALLE',
    nit: '8903029114',
    servicio: 'Nacional',
    pago: 'Contado',
    fecha: 'Ago 22, 2026',
    estado: ESTADO.cumplido,
    rndcOk: true,
    cumplido: '141888215'
  },
  {
    guia: 'RM0001953',
    id: 'ID: 157',
    cliente: 'FERRETERÍA ANDINA S.A.',
    nit: '8110458772',
    servicio: 'Nacional',
    pago: 'Credito',
    fecha: 'Ago 21, 2026',
    estado: ESTADO.creada,
    rndcOk: false,
    cumplido: null
  },
  {
    guia: 'RM0001952',
    id: 'ID: 156',
    cliente: 'IMPORTADORA PACÍFICO LTDA',
    nit: '9001847233',
    servicio: 'Nacional',
    pago: 'Credito',
    fecha: 'Ago 21, 2026',
    estado: ESTADO.enRuta,
    rndcOk: true,
    cumplido: null
  },
  {
    guia: 'RM0001951',
    id: 'ID: 155',
    cliente: 'DISTRIMOTOS DEL PACÍFICO',
    nit: '9007239889',
    servicio: 'Nacional',
    pago: 'Credito',
    fecha: 'Ago 20, 2026',
    estado: ESTADO.cumplido,
    rndcOk: true,
    cumplido: '141888196'
  }
];

/***************************  MANIFIESTOS  ***************************/

export const MANIFIESTOS_TOTAL = '79 registros';

export const MANIFIESTOS = [
  {
    manifiesto: 'MT000662',
    id: '123063895',
    ruta: 'PUERTO TEJADA → VILLA RICA',
    tipoFlete: 'General',
    flete: '800.000',
    peso: '17.780',
    anticipo: '0',
    fecha: 'Ago 22, 2026',
    estado: ESTADO.inactivo,
    rndcOk: true,
    cumplido: '116968062'
  },
  {
    manifiesto: 'MT000661',
    id: '123046806',
    ruta: 'VILLA RICA → SANTIAGO DE CALI',
    tipoFlete: 'General',
    flete: '720.000',
    peso: '3.200',
    anticipo: '0',
    fecha: 'Ago 22, 2026',
    estado: ESTADO.activo,
    rndcOk: true,
    cumplido: null
  },
  {
    manifiesto: 'MT000660',
    id: '123046387',
    ruta: 'VILLA RICA → SANTIAGO DE CALI',
    tipoFlete: 'General',
    flete: '720.000',
    peso: '3.900',
    anticipo: '0',
    fecha: 'Ago 22, 2026',
    estado: ESTADO.inactivo,
    rndcOk: true,
    cumplido: '116967888'
  },
  {
    manifiesto: 'MT000659',
    id: '—',
    ruta: 'VILLA RICA → SANTIAGO DE CALI',
    tipoFlete: 'General',
    flete: '720.000',
    peso: '3.900',
    anticipo: '0',
    fecha: 'Ago 22, 2026',
    estado: ESTADO.activo,
    rndcOk: false,
    cumplido: null
  },
  {
    manifiesto: 'MT000658',
    id: '122864369',
    ruta: 'PALMIRA → VILLA RICA',
    tipoFlete: 'General',
    flete: '1.100.000',
    peso: '16.030',
    anticipo: '0',
    fecha: 'Ago 19, 2026',
    estado: ESTADO.inactivo,
    rndcOk: true,
    cumplido: '116825328'
  }
];

/***************************  DASHBOARD  ***************************/

export const DASHBOARD_KPIS = [
  { icon: 'tabler-building-store', label: 'Clientes', value: 12, detalle: 'de 12 registros', color: '#27568E', soft: '#DCE8F6', pct: 100 },
  { icon: 'tabler-users', label: 'Remitentes', value: 45, detalle: 'de 47 registros', color: '#8E4EC6', soft: '#F0E4FA', pct: 96 },
  { icon: 'tabler-id-badge-2', label: 'Terceros', value: 9, detalle: 'de 9 registros', color: '#3A8250', soft: '#E1F2E6', pct: 100 },
  { icon: 'tabler-truck', label: 'Vehículos', value: 11, detalle: 'de 11 registros', color: '#D87029', soft: '#FDECDC', pct: 100 }
];

// Anillo "Remesas por Estado" — los valores suman el total.
export const DONUT_TOTAL = 152;
export const DONUT = [
  { label: 'Cumplido', value: 96, color: '#3A8250' },
  { label: 'Entregado', value: 34, color: '#7FC08F' },
  { label: 'Manifiesto', value: 14, color: '#4A4C86' },
  { label: 'Creada', value: 8, color: '#414956' }
];

export const RNDC_ENVIADOS = { enviadas: 149, total: 152, pendientes: 3 };

export const TENDENCIA = [
  { label: '16/08', remesas: 0, manifiestos: 0 },
  { label: '17/08', remesas: 0, manifiestos: 0 },
  { label: '18/08', remesas: 7, manifiestos: 3 },
  { label: '19/08', remesas: 10, manifiestos: 3 },
  { label: '20/08', remesas: 0, manifiestos: 1 },
  { label: '21/08', remesas: 5, manifiestos: 0 },
  { label: '22/08', remesas: 9, manifiestos: 4 }
];

/***************************  CUMPLIDO  ***************************/

export const CUMPLIDO = {
  guia: 'RM0001951',
  manifiesto: 'MT000661',
  origen: 'VILLA RICA (Cauca)',
  destino: 'SANTIAGO DE CALI (Valle del Cauca)',
  cargue: { fechaLlegada: '27/07/2026', horaLlegada: '06:23', horaEntrada: '06:27', horaSalida: '06:31' },
  descargue: { fechaLlegada: '27/07/2026', horaLlegada: '17:48', horaEntrada: '17:55', horaSalida: '18:12' }
};
