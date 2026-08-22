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
import { MANIFIESTOS, MANIFIESTOS_TOTAL } from './mock-data';

/***************************  APP MOCKUP - PANTALLA DE MANIFIESTOS  ***************************/

const hideSm = { display: { xs: 'none', md: 'table-cell' } };
const hideXs = { display: { xs: 'none', sm: 'table-cell' } };

export default function ScreenManifiestos() {
  return (
    <>
      <PageHeader
        title="Manifiestos"
        subtitle="Manifiesto"
        right={
          <Stack direction="row" sx={{ gap: 0.75, display: { xs: 'none', sm: 'flex' } }}>
            <MockButton label="Descargar" icon="tabler-download" tone="ghost" />
          </Stack>
        }
      />

      <MockCard>
        <CardHeader title="Registros de Manifiestos" count={MANIFIESTOS_TOTAL} />

        <Box component="table" sx={{ width: 1, borderCollapse: 'collapse' }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" sx={{ ...headCellSx, ...hideXs }}>
                Acciones
              </Box>
              <Box component="th" sx={headCellSx}>
                Manifiesto
              </Box>
              <Box component="th" sx={{ ...headCellSx, ...hideXs }}>
                Ruta
              </Box>
              <Box component="th" sx={{ ...headCellSx, ...hideSm }}>
                Tipo Flete / Flete
              </Box>
              <Box component="th" sx={{ ...headCellSx, ...hideSm }}>
                Peso / Anticipo
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
            {MANIFIESTOS.map((row) => (
              <Box component="tr" key={row.manifiesto}>
                <Box component="td" sx={{ ...cellSx, ...hideXs }}>
                  <RowActions icons={['tabler-pencil', 'tabler-clipboard-check', 'tabler-cloud-upload']} />
                </Box>
                <Box component="td" sx={cellSx}>
                  <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: MOCK.text, lineHeight: 1.4 }}>{row.manifiesto}</Typography>
                  <SubText>{row.id}</SubText>
                </Box>
                <Box component="td" sx={{ ...cellSx, ...hideXs, maxWidth: 210, overflow: 'hidden' }}>
                  {row.ruta}
                </Box>
                <Box component="td" sx={{ ...cellSx, ...hideSm }}>
                  <Typography sx={{ fontSize: 10, color: MOCK.text, lineHeight: 1.4 }}>{row.tipoFlete}</Typography>
                  <SubText>{row.flete}</SubText>
                </Box>
                <Box component="td" sx={{ ...cellSx, ...hideSm }}>
                  <Typography sx={{ fontSize: 10, color: MOCK.text, lineHeight: 1.4 }}>{row.peso}</Typography>
                  <SubText>{row.anticipo}</SubText>
                </Box>
                <Box component="td" sx={{ ...cellSx, ...hideSm }}>
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

        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, px: 1.5, py: 1 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: MOCK.red }} />
          <Typography sx={{ fontSize: 9, color: MOCK.muted }}>
            1 manifiesto pendiente de reporte al RNDC — se reenvía sin volver a digitarlo
          </Typography>
        </Stack>
      </MockCard>
    </>
  );
}
