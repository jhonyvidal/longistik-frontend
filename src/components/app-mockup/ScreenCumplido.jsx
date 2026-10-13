'use client';
import PropTypes from 'prop-types';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import SvgIcon from '@/components/SvgIcon';
import { MOCK, MockButton, MockCard, PageHeader } from './elements';
import { CUMPLIDO } from './mock-data';

/***************************  APP MOCKUP - CAMPO DE FORMULARIO  ***************************/

/**
 * Reproduce el campo con etiqueta flotante que usa la aplicación.
 * `autocompletado` marca en verde los que Longistik llenó con el monitoreo del RNDC.
 */
function Field({ label, value, autocompletado }) {
  return (
    <Box sx={{ position: 'relative', mt: 0.6 }}>
      <Typography
        sx={{
          position: 'absolute',
          top: -5,
          left: 8,
          px: 0.4,
          bgcolor: MOCK.card,
          fontSize: 7.5,
          color: autocompletado ? MOCK.greenDark : MOCK.muted,
          lineHeight: 1
        }}
      >
        {label}
      </Typography>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 0.5,
          px: 1,
          py: 0.65,
          borderRadius: 1,
          border: `1px solid ${autocompletado ? MOCK.green : MOCK.border}`
        }}
      >
        <Typography sx={{ fontSize: 10, color: MOCK.text, overflow: 'hidden', whiteSpace: 'nowrap' }}>{value}</Typography>
        {autocompletado && <SvgIcon name="tabler-check" size={10} color={MOCK.green} stroke={3} />}
      </Stack>
    </Box>
  );
}

Field.propTypes = { label: PropTypes.string, value: PropTypes.string, autocompletado: PropTypes.bool };

/***************************  APP MOCKUP - BLOQUE CARGUE / DESCARGUE  ***************************/

function Bloque({ titulo, datos }) {
  return (
    <>
      <Typography sx={{ fontSize: 10, fontWeight: 600, color: MOCK.greenDark, mb: 0.25 }}>{titulo}</Typography>
      <Grid container spacing={1}>
        <Grid size={6}>
          <Field label="Fecha llegada" value={datos.fechaLlegada} autocompletado />
        </Grid>
        <Grid size={6}>
          <Field label="Hora llegada" value={datos.horaLlegada} autocompletado />
        </Grid>
        <Grid size={6}>
          <Field label="Hora entrada" value={datos.horaEntrada} autocompletado />
        </Grid>
        <Grid size={6}>
          <Field label="Hora salida" value={datos.horaSalida} autocompletado />
        </Grid>
      </Grid>
    </>
  );
}

Bloque.propTypes = { titulo: PropTypes.string, datos: PropTypes.object };

/***************************  APP MOCKUP - PANTALLA DE CUMPLIDO  ***************************/

export default function ScreenCumplido() {
  return (
    <>
      <PageHeader
        title="Cumplido Remesa"
        subtitle="Cumplido"
        right={
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <MockButton label="Registrar cumplido" icon="tabler-clipboard-check" />
          </Box>
        }
      />

      <MockCard sx={{ p: 1.5 }}>
        {/* datos de la remesa */}
        <Grid container spacing={1} sx={{ mb: 1.25 }}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Field label="Remesa" value={CUMPLIDO.guia} />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Field label="Manifiesto" value={CUMPLIDO.manifiesto} />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Field label="Origen" value={CUMPLIDO.origen} />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Field label="Destino" value={CUMPLIDO.destino} />
          </Grid>
        </Grid>

        {/* aviso de autocompletado desde el monitoreo del RNDC */}
        <Stack
          direction="row"
          sx={{ alignItems: 'center', gap: 0.75, px: 1, py: 0.7, mb: 1.25, borderRadius: 1.5, bgcolor: MOCK.greenSoft }}
        >
          <SvgIcon name="tabler-map-pin" size={12} color={MOCK.greenDark} stroke={2} />
          <Typography sx={{ fontSize: 9, color: MOCK.greenDark, fontWeight: 500 }}>
            Horarios tomados del monitoreo GPS que el RNDC ya tiene registrado — revisa y confirma
          </Typography>
        </Stack>

        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Bloque titulo="Cargue" datos={CUMPLIDO.cargue} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Bloque titulo="Descargue" datos={CUMPLIDO.descargue} />
          </Grid>
        </Grid>
      </MockCard>
    </>
  );
}
