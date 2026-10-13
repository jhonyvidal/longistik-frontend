// @mui
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// @project
import { AppScreen } from '@/components/app-mockup';
import { ANCHOR } from '@/path';
import { ctaDemo } from './botones';
import { hayVideo } from './video-demo';

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
  // H1 de la home: la señal más fuerte para Google. Lleva la marca y la búsqueda principal
  // («software para transportadoras»), ver docs/seo-palabras-clave.md
  headLine: 'Longistik, el software para transportadoras que reporta al RNDC por ti',
  captionLine:
    'Longistik es el software para empresas de transporte de carga que genera tus remesas, manifiestos electrónicos de carga y cumplidos, los reporta solo al RNDC del Ministerio de Transporte y los conecta con tu facturación electrónica, tu contabilidad y el sistema de tus clientes. Y trae inteligencia artificial integrada para resolver tus dudas al instante, sin esperar a un asesor.',
  primaryBtn: { ...ctaDemo },
  // Con video publicado, el segundo botón lleva a verlo funcionando; si no, a los módulos
  secondaryBtn: hayVideo ? { children: 'Ver cómo funciona', href: ANCHOR.demo } : { children: 'Ver los módulos', href: ANCHOR.modulos },
  listData: [
    { icon: 'tabler-sparkles', title: 'Con IA' },
    { icon: 'tabler-file-text', title: 'Remesas' },
    { icon: 'tabler-receipt', title: 'Manifiestos' },
    { icon: 'tabler-clipboard-check', title: 'Cumplidos' },
    { icon: 'tabler-file-invoice', title: 'Facturación' },
    { icon: 'tabler-plug', title: 'Integraciones' },
    { icon: 'tabler-api', title: 'API' },
    { icon: 'tabler-chart-bar', title: 'Informes' }
  ],
  // Captura viva de la aplicación (componentes, no imagen) — ver src/components/app-mockup
  mockup: <AppScreen screen="guias" />
};
