'use client';
import PropTypes from 'prop-types';

// @mui
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import branding from '@/branding.json';
import SvgIcon from '@/components/SvgIcon';
import { MOCK } from './elements';
import { SIDEBAR_MENU } from './mock-data';
import ScreenCumplido from './ScreenCumplido';
import ScreenDashboard from './ScreenDashboard';
import ScreenGuias from './ScreenGuias';
import ScreenManifiestos from './ScreenManifiestos';

/***************************  APP MOCKUP - PANTALLAS DISPONIBLES  ***************************/

const screens = {
  dashboard: ScreenDashboard,
  guias: ScreenGuias,
  manifiestos: ScreenManifiestos,
  cumplido: ScreenCumplido
};

/***************************  APP MOCKUP - MENÚ LATERAL  ***************************/

function Sidebar({ screen }) {
  return (
    <Stack
      sx={{
        width: 158,
        flexShrink: 0,
        bgcolor: MOCK.sidebar,
        pb: 1,
        gap: 0.1,
        display: { xs: 'none', md: 'flex' },
        overflow: 'hidden'
      }}
    >
      {/* marca */}
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', px: 1.5, py: 1.5 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
          <CardMedia
            component="img"
            image={branding.logo.logoIcon}
            alt=""
            sx={{ width: 15, height: 'auto', filter: 'brightness(0) invert(1)' }}
            loading="lazy"
          />
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', letterSpacing: 0.2 }}>{branding.brandName}</Typography>
        </Stack>
        <SvgIcon name="tabler-menu-2" size={13} color="#FFFFFF" stroke={2} />
      </Stack>

      {SIDEBAR_MENU.map((item, index) => {
        if (item.type === 'group') {
          return (
            <Stack key={index} sx={{ px: 1.5, pt: 1.25, pb: 0.5, gap: 0 }}>
              <Typography sx={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 0.5, color: MOCK.sidebarGroup }}>{item.label}</Typography>
              <Typography sx={{ fontSize: 7.5, color: MOCK.sidebarGroup, opacity: 0.75 }}>{item.caption}</Typography>
            </Stack>
          );
        }

        const activo = item.screen === screen;

        return (
          <Stack
            key={index}
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mx: 0.75,
              pl: item.child ? 2 : 0.9,
              pr: 0.9,
              py: 0.55,
              borderRadius: 1.5,
              bgcolor: activo ? MOCK.sidebarActive : 'transparent'
            }}
          >
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, minWidth: 0 }}>
              <SvgIcon name={item.icon} size={12} color={activo ? '#FFFFFF' : MOCK.sidebarText} stroke={1.8} />
              <Typography
                sx={{
                  fontSize: 9.5,
                  fontWeight: activo ? 600 : 400,
                  color: activo ? '#FFFFFF' : MOCK.sidebarText,
                  whiteSpace: 'nowrap'
                }}
              >
                {item.label}
              </Typography>
            </Stack>
            {item.expandable && (
              <Box sx={{ transform: item.open ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'flex' }}>
                <SvgIcon name="tabler-chevron-down" size={10} color={MOCK.sidebarText} stroke={2} />
              </Box>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}

Sidebar.propTypes = { screen: PropTypes.string };

/***************************  APP MOCKUP - BARRA SUPERIOR  ***************************/

function Topbar() {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        px: 1.5,
        py: 0.9,
        bgcolor: MOCK.card,
        borderBottom: `1px solid ${MOCK.border}`
      }}
    >
      <SvgIcon name="tabler-star" size={12} color={MOCK.orange} stroke={2} />
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
        {['tabler-search', 'tabler-bell'].map((icon) => (
          <SvgIcon key={icon} name={icon} size={12} color={MOCK.muted} stroke={2} />
        ))}
        <Stack sx={{ alignItems: 'flex-end', gap: 0, display: { xs: 'none', sm: 'flex' } }}>
          <Typography sx={{ fontSize: 9.5, fontWeight: 700, color: MOCK.text, lineHeight: 1.2 }}>Administrador</Typography>
          <Typography sx={{ fontSize: 8, color: MOCK.muted, lineHeight: 1.2 }}>admin@longistik.com</Typography>
        </Stack>
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: MOCK.bg,
            border: `1px solid ${MOCK.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <SvgIcon name="tabler-user" size={11} color={MOCK.muted} stroke={2} />
        </Box>
      </Stack>
    </Stack>
  );
}

/***************************  APP MOCKUP - VENTANA COMPLETA  ***************************/

/**
 * Reproduce la interfaz real de Longistik para usarla como "captura viva" en la landing:
 * al ser componentes y no imágenes, se ve nítida en cualquier pantalla y se actualiza
 * cuando cambian los datos de muestra en `mock-data.js`.
 *
 * Referencia visual: docs/capturas-software (fuera de `public/`, contienen datos reales).
 */
export default function AppScreen({ screen = 'guias', chrome = true, fill = false, sx }) {
  const Screen = screens[screen] || screens.guias;

  return (
    <Box
      sx={{
        borderRadius: { xs: 3, sm: 4 },
        overflow: 'hidden',
        border: `1px solid ${MOCK.border}`,
        bgcolor: MOCK.bg,
        boxShadow: '0 24px 48px -24px rgba(22, 35, 58, 0.3)',
        // `fill` hace que la ventana ocupe todo el alto del contenedor (se usa al incrustarla en una tarjeta).
        ...(fill && { height: 1, display: 'flex', flexDirection: 'column' }),
        ...sx
      }}
    >
      {chrome && (
        <Stack
          direction="row"
          sx={{ alignItems: 'center', gap: 1, px: 1.25, py: 0.75, bgcolor: '#E3E8F1', borderBottom: `1px solid ${MOCK.border}` }}
        >
          <Stack direction="row" sx={{ gap: 0.5 }}>
            {['#F87171', '#FBBF24', '#34D399'].map((color) => (
              <Box key={color} sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color }} />
            ))}
          </Stack>
          <Box sx={{ flexGrow: 1, maxWidth: 240, bgcolor: MOCK.card, borderRadius: 4, px: 1, py: 0.15 }}>
            <Typography sx={{ fontSize: 8.5, color: MOCK.muted, textAlign: 'center' }}>tuempresa.longistik.com</Typography>
          </Box>
        </Stack>
      )}

      <Stack direction="row" sx={{ minHeight: { xs: 240, sm: 300, md: 340 }, ...(fill && { flexGrow: 1 }) }}>
        <Sidebar screen={screen} />
        <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
          <Topbar />
          <Box sx={{ p: { xs: 1.25, sm: 1.75 }, flexGrow: 1 }}>
            <Screen />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

AppScreen.propTypes = { screen: PropTypes.string, chrome: PropTypes.bool, fill: PropTypes.bool, sx: PropTypes.any };
