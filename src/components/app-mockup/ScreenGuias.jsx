'use client';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import {
  CardHeader,
  CumplidoTag,
  MOCK,
  MockButton,
  MockCard,
  PageHeader,
  RndcDot,
  RowActions,
  StatusChip,
  SubText,
  cellSx,
  headCellSx
} from './elements';
import { GUIAS, GUIAS_TOTAL } from './mock-data';

/***************************  APP MOCKUP - PANTALLA DE GUÍAS  ***************************/

const hideSm = { display: { xs: 'none', md: 'table-cell' } };
const hideXs = { display: { xs: 'none', sm: 'table-cell' } };

export default function ScreenGuias() {
  return (
    <>
      <PageHeader
        title="Guía"
        subtitle="Guía"
        right={
          <Stack direction="row" sx={{ gap: 0.75, display: { xs: 'none', sm: 'flex' } }}>
            <MockButton label="Descargar" icon="tabler-download" tone="ghost" />
          </Stack>
        }
      />

      <MockCard>
        <CardHeader title="Guías de Transporte" count={GUIAS_TOTAL} />

        <Box component="table" sx={{ width: 1, borderCollapse: 'collapse' }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" sx={{ ...headCellSx, ...hideXs }}>
                Acciones
              </Box>
              <Box component="th" sx={headCellSx}>
                Guía
              </Box>
              <Box component="th" sx={headCellSx}>
                Cliente
              </Box>
              <Box component="th" sx={{ ...headCellSx, ...hideSm }}>
                Servicio
              </Box>
              <Box component="th" sx={{ ...headCellSx, ...hideSm }}>
                Fecha
              </Box>
              <Box component="th" sx={headCellSx}>
                Estado
              </Box>
              <Box component="th" sx={{ ...headCellSx, ...hideXs, textAlign: 'center' }}>
                RNDC
              </Box>
              <Box component="th" sx={{ ...headCellSx, ...hideSm }}>
                Cumplido
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            {GUIAS.map((row) => (
              <Box component="tr" key={row.guia}>
                <Box component="td" sx={{ ...cellSx, ...hideXs }}>
                  <RowActions />
                </Box>
                <Box component="td" sx={cellSx}>
                  <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: MOCK.text, lineHeight: 1.4 }}>{row.guia}</Typography>
                  <SubText>{row.id}</SubText>
                </Box>
                <Box component="td" sx={{ ...cellSx, maxWidth: 190, overflow: 'hidden' }}>
                  <Typography sx={{ fontSize: 10, color: MOCK.text, lineHeight: 1.4 }}>{row.cliente}</Typography>
                  <SubText>{row.nit}</SubText>
                </Box>
                <Box component="td" sx={{ ...cellSx, ...hideSm }}>
                  <Typography sx={{ fontSize: 10, color: MOCK.text, lineHeight: 1.4 }}>{row.servicio}</Typography>
                  <SubText>{row.pago}</SubText>
                </Box>
                <Box component="td" sx={{ ...cellSx, ...hideSm, color: MOCK.text }}>
                  {row.fecha}
                </Box>
                <Box component="td" sx={cellSx}>
                  <StatusChip estado={row.estado} />
                </Box>
                <Box component="td" sx={{ ...cellSx, ...hideXs, textAlign: 'center' }}>
                  <RndcDot ok={row.rndcOk} />
                </Box>
                <Box component="td" sx={{ ...cellSx, ...hideSm }}>
                  <CumplidoTag numero={row.cumplido} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end', gap: 1.5, px: 1.5, py: 1 }}>
          <Typography sx={{ fontSize: 9, color: MOCK.muted }}>10 ▾</Typography>
          <Typography sx={{ fontSize: 9, color: MOCK.muted }}>1–6 de 152</Typography>
        </Stack>
      </MockCard>
    </>
  );
}
