'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'motion/react';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROCESO - PASOS PARA EMPEZAR  ***************************/

/**
 * Bloque propio (no viene de la plantilla): los pasos numerados desde la demo hasta la puesta en marcha.
 * Sigue el estilo de Metrics5 (Typeset centrado y tarjetas GraphicsCard) para que no desentone.
 */

export default function Proceso({ heading, caption, steps, note, primaryBtn, secondaryBtn }) {
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

        <Grid component="ol" container spacing={1.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {steps.map((step, index) => (
            <Grid component="li" key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{ height: '100%' }}
              >
                {/* role/aria-label en undefined: GraphicsCard trae role="img", que ocultaría el texto a los lectores de pantalla */}
                <GraphicsCard role={undefined} aria-label={undefined} sx={{ p: { xs: 2.5, md: 3 }, height: 1 }}>
                  <Stack sx={{ gap: 2 }}>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Avatar sx={{ width: 52, height: 52, bgcolor: 'grey.300' }}>
                        <SvgIcon name={step.icon} color="primary.main" />
                      </Avatar>
                      <Typography component="span" variant="h2" sx={{ color: 'grey.400' }} aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                    </Stack>
                    <Stack sx={{ gap: 0.75 }}>
                      <Typography variant="h4">{step.title}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{step.content}</Typography>
                    </Stack>
                  </Stack>
                </GraphicsCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Stack sx={{ alignItems: 'center', gap: 2 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ alignItems: 'center', justifyContent: 'center', gap: 1.5, width: 1, maxWidth: { xs: 320, sm: 'none' } }}
            >
              {primaryBtn && (
                <Box component={motion.div} whileHover={{ scale: 1.06 }} sx={{ width: { xs: 1, sm: 'auto' } }}>
                  <ButtonAnimationWrapper>
                    <Button variant="contained" {...primaryBtn} sx={{ width: { xs: 1, sm: 'auto' }, ...primaryBtn?.sx }} />
                  </ButtonAnimationWrapper>
                </Box>
              )}
              {secondaryBtn && (
                <Box component={motion.div} whileHover={{ scale: 1.06 }} sx={{ width: { xs: 1, sm: 'auto' } }}>
                  <ButtonAnimationWrapper>
                    <Button
                      variant="outlined"
                      color="primary"
                      {...secondaryBtn}
                      sx={{ width: { xs: 1, sm: 'auto' }, ...secondaryBtn?.sx }}
                    />
                  </ButtonAnimationWrapper>
                </Box>
              )}
            </Stack>
            {note && (
              <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
                {note}
              </Typography>
            )}
          </Stack>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
}

Proceso.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  steps: PropTypes.array,
  note: PropTypes.string,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any
};
