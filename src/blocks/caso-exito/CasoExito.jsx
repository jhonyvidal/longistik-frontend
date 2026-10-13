'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'motion/react';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

// GraphicsCard trae role="img", que ocultaría el texto a los lectores de pantalla
const sinRolImagen = { role: undefined, 'aria-label': undefined };

/** Lista de puntos con icono (antes en rojo, después en verde). */
function Puntos({ titulo, items, icon, color }) {
  return (
    <Stack sx={{ gap: 1.5 }}>
      <Typography variant="subtitle1" sx={{ color }}>
        {titulo}
      </Typography>
      <Stack component="ul" sx={{ gap: 1.25, listStyle: 'none', p: 0, m: 0 }}>
        {items.map((item, index) => (
          <Stack component="li" key={index} direction="row" sx={{ gap: 1, alignItems: 'flex-start' }}>
            <SvgIcon name={icon} size={20} color={color} stroke={2} />
            <Typography sx={{ color: 'text.secondary' }}>{item}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

/***************************  CASO DE ÉXITO  ***************************/

/**
 * Bloque propio (no viene de la plantilla): un cliente real con sus cifras, cómo operaba antes
 * y qué cambió con Longistik. La cita y el logo son opcionales.
 */

export default function CasoExito({ heading, caption, empresa, ciudad, logo, desde, titulo, cifras, antes, despues, cita }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typeset
            {...{
              heading,
              caption,
              stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
              captionProps: { sx: { width: { xs: 1, sm: '80%', md: '65%' } } }
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GraphicsCard {...sinRolImagen} sx={{ p: { xs: 2.5, sm: 4, md: 5 } }}>
            <Stack sx={{ gap: { xs: 3, md: 4 } }}>
              {/* Cabecera: empresa y titular del caso */}
              <Stack sx={{ gap: 1.5 }}>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  {logo ? (
                    <GraphicsImage image={logo} sx={{ width: 120, height: 40, backgroundSize: 'contain', backgroundPosition: 'left' }} />
                  ) : (
                    <Avatar sx={{ width: 44, height: 44, bgcolor: 'grey.300' }}>
                      <SvgIcon name="tabler-truck" color="primary.main" />
                    </Avatar>
                  )}
                  <Stack>
                    <Typography variant="h4">{empresa}</Typography>
                    {ciudad && (
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {ciudad}
                      </Typography>
                    )}
                  </Stack>
                  {desde && (
                    <Chip
                      label={`Cliente en producción desde ${desde}`}
                      size="small"
                      sx={{ bgcolor: 'secondary.lighter', color: 'secondary.darker', ml: { sm: 'auto' } }}
                    />
                  )}
                </Stack>
                <Typography variant="h3">{titulo}</Typography>
              </Stack>

              {/* Cifras de la operación */}
              {cifras?.length > 0 && (
                <Grid container spacing={1.5}>
                  {cifras.map((cifra, index) => (
                    <Grid key={index} size={{ xs: 6, md: 12 / Math.min(cifras.length, 4) }}>
                      <Stack sx={{ gap: 0.5, p: 2, height: 1, borderRadius: 4, bgcolor: 'background.default' }}>
                        <Typography variant="h2" sx={{ color: 'primary.main' }}>
                          {cifra.valor}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {cifra.label}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Antes y después */}
              <Grid container spacing={{ xs: 3, md: 4 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Puntos titulo="Antes" items={antes} icon="tabler-circle-x" color="error.main" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Puntos titulo="Con Longistik" items={despues} icon="tabler-circle-check" color="secondary.main" />
                </Grid>
              </Grid>

              {/* Cita textual del cliente (opcional) */}
              {cita?.texto && (
                <>
                  <Divider />
                  <Stack component="figure" sx={{ gap: 1.5, m: 0 }}>
                    <SvgIcon name="tabler-quote" size={28} color="primary.main" />
                    <Typography component="blockquote" variant="h5" sx={{ m: 0, fontWeight: 400 }}>
                      {cita.texto}
                    </Typography>
                    <Typography component="figcaption" variant="body2" sx={{ color: 'text.secondary' }}>
                      <strong>{cita.autor}</strong>
                      {cita.cargo && ` · ${cita.cargo}`}
                    </Typography>
                  </Stack>
                </>
              )}
            </Stack>
          </GraphicsCard>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Puntos.propTypes = { titulo: PropTypes.string, items: PropTypes.array, icon: PropTypes.string, color: PropTypes.string };

CasoExito.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  empresa: PropTypes.string,
  ciudad: PropTypes.string,
  logo: PropTypes.string,
  desde: PropTypes.string,
  titulo: PropTypes.string,
  cifras: PropTypes.array,
  antes: PropTypes.array,
  despues: PropTypes.array,
  cita: PropTypes.object
};
