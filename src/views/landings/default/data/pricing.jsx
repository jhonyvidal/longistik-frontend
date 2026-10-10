// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { ctaVerde } from './botones';
import { formatoCOP, funciones, planes, volumenPlan } from './planes';

/***************************  LONGISTIK - PLANES  ***************************/

/**
 * Presentación de los planes. Precios, topes y funciones viven en `planes.js` (fuente única,
 * también la leen los datos estructurados y el llms.txt).
 * El precio va en `priceLabel` (no en `price`) para mostrarlo con formato colombiano, la unidad y el volumen.
 */

function Precio({ valor, unidad, detalle = [] }) {
  return (
    <>
      {valor}
      <Typography component="div" variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
        {unidad}
      </Typography>
      {detalle.length > 0 && (
        <Stack sx={{ gap: 0.25, mt: 2 }}>
          {detalle.map((linea) => (
            <Typography key={linea} component="div" variant="body2" sx={{ color: 'text.primary' }}>
              {linea}
            </Typography>
          ))}
        </Stack>
      )}
    </>
  );
}

// Lo que cambia entre planes y no sale de los datos: etiquetas, botón y cuál se destaca
const presentacion = {
  basico: { active: false, featureTitle: 'Incluye', boton: 'Empezar con Básico', extra: 'Usuarios ilimitados' },
  profesional: { active: true, featureTitle: 'Todo lo de Básico, más', boton: 'Empezar con Profesional', extra: 'Usuarios ilimitados' },
  'a-la-medida': {
    active: false,
    featureTitle: 'Todo lo de Profesional, más',
    boton: 'Solicitar cotización',
    extra: 'Manejo de la operación con IA'
  }
};

export const pricing = {
  heading: 'Pagas según tu volumen, no por usuario',
  caption:
    'Cuentan solo los manifiestos que expides al día: remesas, cumplidos y anulaciones son ilimitados. Conecta a todo tu equipo sin pagar por usuario. Si un día tienes un pico, no te bloqueamos ningún documento. Implementación y migración incluidas, sin permanencia forzada.',
  features: funciones,
  plans: planes.map((plan, index) => {
    const p = presentacion[plan.id];
    return {
      title: plan.nombre,
      priceLabel: (
        <Precio
          valor={plan.precio ? formatoCOP(plan.precio) : 'Cotización'}
          unidad={plan.precio ? 'COP al mes' : 'licencia + servidor dedicado'}
          detalle={[volumenPlan(plan), p.extra]}
        />
      ),
      active: p.active,
      animationDelay: 0.1 * (index + 1),
      featureTitle: p.featureTitle,
      content: plan.para,
      exploreLink: ctaVerde(p.boton),
      featuresID: plan.funcionesID
    };
  })
};
