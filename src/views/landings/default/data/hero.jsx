// @mui
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// @project
import { AppScreen } from '@/components/app-mockup';
import { ANCHOR } from '@/path';
import { ctaDemo } from './botones';

/***************************  LONGISTIK - HERO  ***************************/

export const hero = {
  chip: {
    label: (
      <>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Integrado con el
        </Typography>
        <Chip
          label={
            <Typography variant="caption" sx={{ color: 'primary.main' }}>
              RNDC del Ministerio de Transporte
            </Typography>
          }
          sx={{ height: 24, bgcolor: 'primary.lighter', mr: -1, ml: 0.75, '& .MuiChip-label': { px: 1.25 } }}
        />
      </>
    )
  },
  headLine: 'Cumple con el RNDC sin pelear con el RNDC',
  captionLine:
    'Longistik genera tus guías, manifiestos y cumplidos desde una interfaz moderna y los reporta automáticamente al Ministerio de Transporte. Sin digitar dos veces y sin errores que nadie entiende.',
  primaryBtn: { ...ctaDemo },
  secondaryBtn: { children: 'Ver los módulos', href: ANCHOR.modulos },
  listData: [
    { icon: 'tabler-file-text', title: 'Guías' },
    { icon: 'tabler-receipt', title: 'Manifiestos' },
    { icon: 'tabler-clipboard-check', title: 'Cumplidos' },
    { icon: 'tabler-truck', title: 'Vehículos' },
    { icon: 'tabler-id-badge-2', title: 'Terceros' },
    { icon: 'tabler-route', title: 'Rutas' },
    { icon: 'tabler-chart-bar', title: 'Informes' }
  ],
  // Captura viva de la aplicación (componentes, no imagen) — ver src/components/app-mockup
  mockup: <AppScreen screen="guias" />
};
