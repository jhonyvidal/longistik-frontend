'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import SvgIcon from '@/components/SvgIcon';

/***************************  APP MOCKUP - TOKENS  ***************************/

/**
 * Colores muestreados de las capturas reales del software (docs/capturas-software).
 * El mockup no usa el tema de la landing: reproduce la aplicación tal cual, para que
 * el visitante vea el producto y no una versión "de marketing".
 */
export const MOCK = {
  bg: '#F1F3F8',
  sidebar: '#27568E',
  sidebarActive: '#3D6799',
  sidebarText: '#D6E3F2',
  sidebarGroup: '#A9C2DE',
  card: '#FFFFFF',
  border: '#E5E9F0',
  text: '#16233A',
  muted: '#6B7A90',
  blue: '#27568E',
  green: '#419156',
  greenDark: '#2E6B41',
  greenSoft: '#E7F4EA',
  orange: '#D87029',
  orangeSoft: '#FDECDC',
  red: '#D2413C',
  redSoft: '#FBE2E4'
};

/***************************  APP MOCKUP - CHIP DE ESTADO  ***************************/

export function StatusChip({ estado }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 0.9,
        py: 0.2,
        borderRadius: 5,
        bgcolor: estado.bg,
        color: estado.color,
        fontSize: 8.5,
        fontWeight: 700,
        letterSpacing: 0.4,
        lineHeight: 1.7,
        whiteSpace: 'nowrap'
      }}
    >
      {estado.label}
    </Box>
  );
}

StatusChip.propTypes = { estado: PropTypes.object };

/***************************  APP MOCKUP - INDICADOR DEL RNDC  ***************************/

/**
 * En la aplicación es un icono circular: verde cuando el Ministerio aceptó el registro,
 * rojo cuando lo rechazó y queda pendiente de reenvío.
 */
export function RndcDot({ ok }) {
  return (
    <Box
      sx={{
        width: 15,
        height: 15,
        borderRadius: '50%',
        bgcolor: ok ? MOCK.green : MOCK.red,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: 700,
        fontStyle: 'italic',
        lineHeight: 1
      }}
    >
      i
    </Box>
  );
}

RndcDot.propTypes = { ok: PropTypes.bool };

/***************************  APP MOCKUP - CUMPLIDO  ***************************/

// Píldora verde con el número que devolvió el RNDC, o guion cuando aún no se ha cumplido.
export function CumplidoTag({ numero }) {
  if (!numero) {
    return <Typography sx={{ fontSize: 10, color: MOCK.muted }}>—</Typography>;
  }

  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', gap: 0.4, px: 0.75, py: 0.2, borderRadius: 5, bgcolor: MOCK.greenSoft, width: 'max-content' }}
    >
      <SvgIcon name="tabler-check" size={9} color={MOCK.greenDark} stroke={3} />
      <Typography sx={{ fontSize: 9, fontWeight: 600, color: MOCK.greenDark }}>{numero}</Typography>
    </Stack>
  );
}

CumplidoTag.propTypes = { numero: PropTypes.string };

/***************************  APP MOCKUP - CABECERA DE PÁGINA  ***************************/

// El bloque de título que va por fuera de la tarjeta, como en la aplicación.
export function PageHeader({ title, subtitle, right }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 1.25 }}>
      <Stack sx={{ gap: 0.1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: MOCK.text, lineHeight: 1.2 }}>{title}</Typography>
        {subtitle && <Typography sx={{ fontSize: 9.5, color: MOCK.muted }}>{subtitle}</Typography>}
      </Stack>
      {right}
    </Stack>
  );
}

PageHeader.propTypes = { title: PropTypes.string, subtitle: PropTypes.string, right: PropTypes.node };

/***************************  APP MOCKUP - BOTÓN  ***************************/

export function MockButton({ label, icon, tone = 'green' }) {
  const filled = tone !== 'ghost';

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 0.5,
        px: 1.25,
        py: 0.55,
        borderRadius: 5,
        flexShrink: 0,
        bgcolor: filled ? MOCK.green : 'transparent',
        border: filled ? 'none' : `1px solid ${MOCK.border}`
      }}
    >
      {icon && <SvgIcon name={icon} size={11} color={filled ? '#FFFFFF' : MOCK.muted} stroke={2} />}
      <Typography sx={{ fontSize: 9.5, fontWeight: 600, color: filled ? '#FFFFFF' : MOCK.text, whiteSpace: 'nowrap' }}>{label}</Typography>
    </Stack>
  );
}

MockButton.propTypes = { label: PropTypes.string, icon: PropTypes.string, tone: PropTypes.string };

/***************************  APP MOCKUP - CABECERA DE TARJETA  ***************************/

// Título del listado + contador a la izquierda, buscador y botón "Crear" a la derecha.
export function CardHeader({ title, count, placeholder = 'Buscar' }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1, px: 1.5, pt: 1.25, pb: 1 }}>
      <Stack sx={{ gap: 0 }}>
        <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: MOCK.text }}>{title}</Typography>
        <Typography sx={{ fontSize: 9, color: MOCK.muted }}>{count}</Typography>
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.5,
            borderRadius: 5,
            border: `1px solid ${MOCK.border}`,
            minWidth: { xs: 90, sm: 150 },
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          <SvgIcon name="tabler-search" size={11} color={MOCK.muted} stroke={2} />
          <Typography sx={{ fontSize: 9.5, color: MOCK.muted }}>{placeholder}</Typography>
        </Stack>
        <MockButton label="Crear" />
      </Stack>
    </Stack>
  );
}

CardHeader.propTypes = { title: PropTypes.string, count: PropTypes.string, placeholder: PropTypes.string };

/***************************  APP MOCKUP - TARJETA  ***************************/

export function MockCard({ children, sx }) {
  return (
    <Box sx={{ bgcolor: MOCK.card, borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 3px rgba(22,35,58,0.08)', ...sx }}>
      {children}
    </Box>
  );
}

MockCard.propTypes = { children: PropTypes.any, sx: PropTypes.any };

/***************************  APP MOCKUP - CELDAS DE TABLA  ***************************/

export const cellSx = {
  px: 1,
  py: 0.9,
  fontSize: 10,
  color: MOCK.text,
  borderBottom: `1px solid ${MOCK.border}`,
  textAlign: 'left',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap'
};

export const headCellSx = {
  ...cellSx,
  py: 0.75,
  fontSize: 9,
  fontWeight: 600,
  color: MOCK.muted,
  bgcolor: MOCK.card
};

// Segunda línea de una celda (el ID bajo la guía, el NIT bajo el cliente…).
export function SubText({ children }) {
  return <Typography sx={{ fontSize: 8.5, color: MOCK.muted, lineHeight: 1.5 }}>{children}</Typography>;
}

SubText.propTypes = { children: PropTypes.any };

/***************************  APP MOCKUP - ICONOS DE ACCIÓN  ***************************/

export function RowActions({ icons = ['tabler-pencil', 'tabler-eye'] }) {
  return (
    <Stack direction="row" sx={{ gap: 0.9 }}>
      {icons.map((icon) => (
        <SvgIcon key={icon} name={icon} size={12} color={MOCK.muted} stroke={1.8} />
      ))}
    </Stack>
  );
}

RowActions.propTypes = { icons: PropTypes.array };
