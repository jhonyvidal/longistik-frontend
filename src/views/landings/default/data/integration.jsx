// @project
import SvgIcon from '@/components/SvgIcon';
import { ctaDemo, ctaVerde } from './botones';

/***************************  LONGISTIK - INTEGRACIÓN CON EL RNDC  ***************************/

export const integration = {
  headLine: 'Conectado a los web services del RNDC',
  captionLine:
    'Longistik habla el idioma del Ministerio de Transporte por ti: arma el mensaje, lo envía, guarda la respuesta y te la muestra en español. Si el RNDC rechaza algo, sabes exactamente qué corregir.',
  primaryBtn: {
    ...ctaDemo,
    startIcon: <SvgIcon name="tabler-plug" color="background.default" />
  },
  tagList: [
    { label: 'Expedir remesa de carga' },
    { label: 'Expedir manifiesto de carga' },
    { label: 'Crear y actualizar terceros' },
    { label: 'Crear y actualizar vehículos' },
    { label: 'Cumplido de remesa' },
    { label: 'Cumplido de manifiesto' },
    { label: 'Anulación de documentos' },
    { label: 'Monitoreo GPS del manifiesto' },
    { label: 'Consecutivos RM y MT' },
    { label: 'Registro de cada envío' },
    { label: 'Reenvío de pendientes' },
    { label: 'Validación previa de datos' },
    { label: 'Configuración por empresa (NIT)' },
    { label: 'Mensajes de error traducidos' }
  ]
};

/***************************  LONGISTIK - ECOSISTEMA DE INTEGRACIONES  ***************************/

/**
 * Sistemas con los que Longistik ya se integra. Si se agrega uno nuevo, basta sumarlo aquí.
 * Los nombres van como texto (sin logos) porque son marcas de terceros.
 */
export const ecosistema = {
  headLine: 'Se conecta con lo que tu empresa y tus clientes ya usan',
  captionLine:
    'La remesa nace en Longistik y viaja sola: al RNDC, a la DIAN, a tu contabilidad y al ERP de tus clientes. Nadie la vuelve a digitar en otro sistema.',
  primaryBtn: {
    ...ctaVerde('Pregunta por tu integración'),
    startIcon: <SvgIcon name="tabler-plug" color="background.default" />
  },
  tagList: [
    { label: 'RNDC', icon: 'tabler-truck' },
    { label: 'DIAN', icon: 'tabler-file-invoice' },
    { label: 'Siigo', icon: 'tabler-calculator' },
    { label: 'World Office', icon: 'tabler-calculator' },
    { label: 'Alegra', icon: 'tabler-calculator' },
    { label: 'Proveedores de facturación electrónica', icon: 'tabler-receipt-2' },
    { label: 'SAP', icon: 'tabler-building-warehouse' },
    { label: 'Odoo', icon: 'tabler-building-warehouse' },
    { label: 'Salesforce', icon: 'tabler-building-warehouse' },
    { label: 'API REST propia', icon: 'tabler-api' }
  ]
};
