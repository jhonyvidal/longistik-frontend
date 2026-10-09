// @mui
import Typography from '@mui/material/Typography';

// @project
import { ctaVerde } from './botones';

/***************************  LONGISTIK - PLANES  ***************************/

/**
 * Plan base con precio publicado ("desde $650.000 al mes"); el plan grande se cotiza a la medida.
 * El precio va en `priceLabel` (no en `price`) para mostrarlo con formato colombiano y la unidad.
 *
 * El reparto de `featuresID` entre planes es una propuesta, no una decisión comercial.
 */

function Precio({ valor, unidad }) {
  return (
    <>
      {valor}
      <Typography component="div" variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
        {unidad}
      </Typography>
    </>
  );
}

export const pricing = {
  heading: 'Precios claros desde el primer día',
  caption: 'Implementación, migración y acompañamiento incluidos. Sin permanencia forzada.',
  features: [
    { id: 1, label: 'Guías y manifiestos ilimitados' },
    { id: 2, label: 'Reporte automático al RNDC' },
    { id: 3, label: 'Cumplidos y anulaciones' },
    { id: 4, label: 'Maestros: vehículos, terceros, rutas y tarifas' },
    { id: 5, label: 'Informes de ventas y fletes' },
    { id: 6, label: 'Usuarios con roles y permisos' },
    { id: 11, label: 'Acompañamiento en la migración' },
    { id: 7, label: 'Cargue masivo desde archivo' },
    { id: 8, label: 'Cumplido asistido con monitoreo GPS' },
    { id: 9, label: 'Manifiestos multiparada' },
    { id: 13, label: 'Facturación electrónica DIAN y contabilidad (Siigo, World Office, Alegra)' },
    { id: 10, label: 'API para tus clientes: crear, consultar, anular y rastrear remesas' },
    { id: 14, label: 'Integración con SAP, Odoo o Salesforce' },
    { id: 12, label: 'Soporte prioritario' }
  ],
  plans: [
    {
      title: 'Operación · desde',
      priceLabel: <Precio valor="$650.000" unidad="COP al mes" />,
      active: false,
      animationDelay: 0.1,
      featureTitle: 'Incluye',
      content: 'Para transportadoras que quieren dejar ya el RNDC manual.',
      exploreLink: ctaVerde('Empezar con Longistik'),
      featuresID: [1, 2, 3, 4, 5, 6, 11]
    },
    {
      title: 'Operación + Integraciones',
      priceLabel: <Precio valor="A la medida" unidad="según tus integraciones" />,
      active: true,
      animationDelay: 0.2,
      featureTitle: 'Todo lo anterior, más',
      content: 'Para volúmenes altos, facturación conectada y clientes que radican sus propios despachos.',
      exploreLink: ctaVerde('Solicitar cotización'),
      featuresID: [1, 2, 3, 4, 5, 6, 11, 7, 8, 9, 13, 10, 14, 12]
    }
  ]
};
