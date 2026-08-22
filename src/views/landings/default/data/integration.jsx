// @project
import SvgIcon from '@/components/SvgIcon';
import { ctaDemo } from './botones';

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
