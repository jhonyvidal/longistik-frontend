'use client';

// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import SvgIcon from '@/components/SvgIcon';
import { MOCK, MockCard } from './elements';
import { DASHBOARD_KPIS, DONUT, DONUT_TOTAL, RNDC_ENVIADOS, TENDENCIA } from './mock-data';

/***************************  APP MOCKUP - ANILLO DE REMESAS POR ESTADO  ***************************/

const RADIO = 33;
const GROSOR = 15;
const PERIMETRO = 2 * Math.PI * RADIO;

function Donut() {
  let acumulado = 0;

  return (
    <Box sx={{ position: 'relative', width: 92, height: 92, flexShrink: 0 }}>
      <Box component="svg" viewBox="0 0 92 92" sx={{ width: 1, height: 1, transform: 'rotate(-90deg)' }}>
        {DONUT.map((parte) => {
          const largo = (parte.value / DONUT_TOTAL) * PERIMETRO;
          const offset = -(acumulado / DONUT_TOTAL) * PERIMETRO;
          acumulado += parte.value;

          return (
            <circle
              key={parte.label}
              cx="46"
              cy="46"
              r={RADIO}
              fill="none"
              stroke={parte.color}
              strokeWidth={GROSOR}
              strokeDasharray={`${largo} ${PERIMETRO - largo}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </Box>
      <Stack sx={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        <Typography sx={{ fontSize: 8.5, color: MOCK.muted, lineHeight: 1.2 }}>Total</Typography>
        <Typography sx={{ fontSize: 17, fontWeight: 700, color: MOCK.text, lineHeight: 1.1 }}>{DONUT_TOTAL}</Typography>
      </Stack>
    </Box>
  );
}

/***************************  APP MOCKUP - PANTALLA DE DASHBOARD  ***************************/

export default function ScreenDashboard() {
  const maxBarra = Math.max(...TENDENCIA.map((dia) => Math.max(dia.remesas, dia.manifiestos)));
  const pctRndc = Math.round((RNDC_ENVIADOS.enviadas / RNDC_ENVIADOS.total) * 100);

  return (
    <>
      {/* bienvenida */}
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25, mb: 1.5 }}>
        <Box sx={{ width: 30, height: 30, borderRadius: '50%', bgcolor: MOCK.border, flexShrink: 0 }} />
        <Stack sx={{ gap: 0 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: MOCK.text, lineHeight: 1.2 }}>Bienvenido, Administrador</Typography>
          <Typography sx={{ fontSize: 9, color: MOCK.muted }}>Sábado, 22 de agosto de 2026</Typography>
        </Stack>
      </Stack>

      <Grid container spacing={1}>
        {/* tarjetas de conteo */}
        {DASHBOARD_KPIS.map((kpi) => (
          <Grid key={kpi.label} size={{ xs: 6, md: 3 }}>
            <MockCard sx={{ p: 1.25 }}>
              <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                <Typography sx={{ fontSize: 9.5, color: MOCK.muted }}>{kpi.label}</Typography>
                <Box sx={{ p: 0.6, borderRadius: 1.5, bgcolor: kpi.soft, display: 'flex' }}>
                  <SvgIcon name={kpi.icon} size={12} color={kpi.color} stroke={2} />
                </Box>
              </Stack>
              <Typography sx={{ fontSize: 22, fontWeight: 700, color: kpi.color, lineHeight: 1.2, mt: 0.25 }}>{kpi.value}</Typography>
              <Typography sx={{ fontSize: 8.5, color: MOCK.muted, mb: 0.75 }}>{kpi.detalle}</Typography>
              <Box sx={{ height: 3, borderRadius: 2, bgcolor: kpi.soft }}>
                <Box sx={{ width: `${kpi.pct}%`, height: 1, borderRadius: 2, bgcolor: kpi.color }} />
              </Box>
            </MockCard>
          </Grid>
        ))}

        {/* remesas por estado */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MockCard sx={{ p: 1.5, height: 1 }}>
            <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Stack sx={{ gap: 0 }}>
                <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: MOCK.text }}>Remesas por Estado</Typography>
                <Typography sx={{ fontSize: 8.5, color: MOCK.muted }}>152 total · 9 hoy</Typography>
              </Stack>
              <Stack sx={{ alignItems: 'flex-end', gap: 0 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: MOCK.text, lineHeight: 1.1 }}>9</Typography>
                <Typography sx={{ fontSize: 8, color: MOCK.muted }}>creadas hoy</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" sx={{ alignItems: 'center', gap: 2, mt: 1 }}>
              <Donut />
              <Stack sx={{ gap: 0.4 }}>
                {DONUT.map((parte) => (
                  <Stack key={parte.label} direction="row" sx={{ alignItems: 'center', gap: 0.6 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: parte.color }} />
                    <Typography sx={{ fontSize: 8.5, color: MOCK.muted }}>{parte.label}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>

            {/* avance del reporte al RNDC */}
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 1.25 }}>
              <Typography sx={{ fontSize: 9, color: MOCK.muted }}>RNDC enviados</Typography>
              <Typography sx={{ fontSize: 9, fontWeight: 600, color: MOCK.text }}>
                {RNDC_ENVIADOS.enviadas} / {RNDC_ENVIADOS.total} ({pctRndc}%)
              </Typography>
            </Stack>
            <Box sx={{ height: 4, borderRadius: 2, bgcolor: MOCK.orangeSoft, mt: 0.4 }}>
              <Box sx={{ width: `${pctRndc}%`, height: 1, borderRadius: 2, bgcolor: MOCK.orange }} />
            </Box>
            <Typography sx={{ fontSize: 8.5, color: MOCK.orange, mt: 0.4 }}>
              {RNDC_ENVIADOS.pendientes} remesas pendientes de envío RNDC
            </Typography>
          </MockCard>
        </Grid>

        {/* tendencia de 7 días */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MockCard sx={{ p: 1.5, height: 1 }}>
            <Stack sx={{ gap: 0 }}>
              <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: MOCK.text }}>Tendencia 7 Días</Typography>
              <Typography sx={{ fontSize: 8.5, color: MOCK.muted }}>Remesas y manifiestos creados por día</Typography>
            </Stack>

            <Stack direction="row" sx={{ justifyContent: 'center', gap: 1.5, mt: 0.75 }}>
              {[
                { label: 'Remesas', color: '#414956' },
                { label: 'Manifiestos', color: MOCK.green }
              ].map((serie) => (
                <Stack key={serie.label} direction="row" sx={{ alignItems: 'center', gap: 0.4 }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: 0.5, bgcolor: serie.color }} />
                  <Typography sx={{ fontSize: 8.5, color: MOCK.muted }}>{serie.label}</Typography>
                </Stack>
              ))}
            </Stack>

            <Stack direction="row" sx={{ alignItems: 'flex-end', gap: 0.75, height: 104, mt: 0.75 }}>
              {TENDENCIA.map((dia) => (
                <Stack key={dia.label} sx={{ flex: 1, alignItems: 'center', gap: 0.4 }}>
                  <Stack direction="row" sx={{ alignItems: 'flex-end', gap: 0.3, height: 88, width: 1, justifyContent: 'center' }}>
                    <Box
                      sx={{
                        width: '40%',
                        height: `${(dia.remesas / maxBarra) * 100}%`,
                        minHeight: dia.remesas ? 2 : 0,
                        bgcolor: '#414956',
                        borderRadius: '2px 2px 0 0'
                      }}
                    />
                    <Box
                      sx={{
                        width: '40%',
                        height: `${(dia.manifiestos / maxBarra) * 100}%`,
                        minHeight: dia.manifiestos ? 2 : 0,
                        bgcolor: MOCK.green,
                        borderRadius: '2px 2px 0 0'
                      }}
                    />
                  </Stack>
                  <Typography sx={{ fontSize: 8, color: MOCK.muted }}>{dia.label}</Typography>
                </Stack>
              ))}
            </Stack>
          </MockCard>
        </Grid>
      </Grid>
    </>
  );
}
