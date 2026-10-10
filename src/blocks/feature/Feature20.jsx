'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'motion/react';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Star from '@/images/graphics/Star';

/***************************  FEATURE - 20  ***************************/

/**
 *
 * Demos:
 * - [Feature20](https://www.saasable.io/blocks/feature/feature20)
 *
 * API
 * - [Feature20 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/feature/feature20#props-details)
 */

export default function Feature20({ heading, caption, image, features, actionBtn, secondaryBtn }) {
  const theme = useTheme();
  // Columnas por breakpoint. Las líneas divisorias se calculan para cada uno y se aplican con sx
  // responsivo: con useMediaQuery el servidor no conoce la pantalla y en el celular llegaban las
  // líneas de la versión de escritorio hasta que cargaba el JavaScript.
  const partitionInExtraSmall = 1;
  const partitionInSmall = 2;
  const partitionInLarge = 3;

  /** Para un número de columnas: ¿el elemento lleva línea abajo (no está en la última fila) y a la derecha (no es el último de su fila)? */
  const bordes = (index, columns) => {
    const total = features.length;
    const enUltimaFila = index >= total - (total % columns || columns);
    const ultimoDeSuFila = (index + 1) % columns === 0 || index === total - 1;
    return { abajo: !enUltimaFila, derecha: !ultimoDeSuFila };
  };

  const lineaSi = (condiciones) => ({
    xs: condiciones[0] ? `1px solid ${theme.vars.palette.grey[300]}` : 'none',
    sm: condiciones[1] ? `1px solid ${theme.vars.palette.grey[300]}` : 'none',
    md: condiciones[2] ? `1px solid ${theme.vars.palette.grey[300]}` : 'none'
  });

  const porBreakpoint = (index) => [partitionInExtraSmall, partitionInSmall, partitionInLarge].map((columns) => bordes(index, columns));

  const bordesResponsivos = (index) => {
    const b = porBreakpoint(index);
    return { borderBottom: lineaSi(b.map((x) => x.abajo)), borderRight: lineaSi(b.map((x) => x.derecha)) };
  };

  // La estrella va en el cruce de las dos líneas: solo donde el elemento tiene línea abajo y a la derecha
  const estrellaDisplay = (index) => {
    const [xs, sm, md] = porBreakpoint(index).map((x) => (x.abajo && x.derecha ? 'flex' : 'none'));
    return { xs, sm, md };
  };

  const gc = theme.vars.palette.background.default;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.3
          }}
        >
          <Typeset {...{ heading, stackProps: { sx: { maxWidth: { md: 500 }, ...(!image && { maxWidth: 1, textAlign: 'center' }) } } }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
        >
          <GraphicsCard sx={{ position: 'relative', overflow: 'visible' }}>
            {image && (
              <GraphicsCard
                sx={{
                  height: { md: 267 },
                  width: { md: 456 },
                  bgcolor: 'transparent',
                  position: 'absolute',
                  top: -190,
                  right: 45,
                  zIndex: -1,
                  display: { xs: 'none', md: 'block' }
                }}
              >
                <GraphicsImage sx={{ height: 1, backgroundPositionX: 'right', backgroundPositionY: 'top' }} image={image}>
                  <Box
                    sx={{ width: 1, height: 1, background: `linear-gradient(180deg, ${withAlpha(gc, 0)} 0%, ${withAlpha(gc, 0.6)} 100%)` }}
                  />
                </GraphicsImage>
              </GraphicsCard>
            )}
            <Box sx={{ p: 3 }}>
              <Grid container>
                {features.map((item, index) => (
                  <Grid
                    key={index}
                    size={{ xs: 12 / partitionInExtraSmall, sm: 12 / partitionInSmall, md: 12 / partitionInLarge }}
                    sx={{ position: 'relative', ...bordesResponsivos(index) }}
                  >
                    <Stack sx={{ gap: { xs: 3, sm: 4 }, height: 1, py: { xs: 1.5, sm: 3, md: 4 }, px: { xs: 0, sm: 3, md: 4 } }}>
                      <Avatar sx={{ width: 60, height: 60, bgcolor: 'grey.300' }}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: index * 0.1 }}
                        >
                          <SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                        </motion.div>
                      </Avatar>
                      <Stack sx={{ gap: { xs: 0.5, md: 1 } }}>
                        <motion.div
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          {item.title && <Typography variant="h4">{item.title}</Typography>}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.3 }}
                        >
                          {item.content && <Typography sx={{ color: 'text.secondary' }}>{item.content}</Typography>}
                        </motion.div>
                      </Stack>
                    </Stack>
                    <Stack sx={{ position: 'absolute', bottom: -9, right: -9, display: estrellaDisplay(index) }}>
                      <Star />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </GraphicsCard>
        </motion.div>
        <Stack sx={{ alignItems: 'center', gap: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: { xs: '75%', sm: '45%' }, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4
              }}
            >
              {caption}
            </motion.div>
          </Typography>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.5
            }}
          >
            {/* En el celular los botones van uno debajo del otro y del mismo ancho; lado a lado el texto se partía */}
            <Stack
              direction={{ xs: 'column-reverse', sm: 'row' }}
              sx={{ alignItems: 'center', justifyContent: 'center', gap: 1.5, mx: 'auto', maxWidth: { xs: 320, sm: 'none' } }}
            >
              {secondaryBtn && (
                <Box component={motion.div} whileHover={{ scale: 1.06 }} sx={{ width: { xs: 1, sm: 'auto' } }}>
                  <ButtonAnimationWrapper>
                    <Button variant="outlined" {...secondaryBtn} sx={{ width: { xs: 1, sm: 'auto' }, ...secondaryBtn?.sx }} />
                  </ButtonAnimationWrapper>
                </Box>
              )}
              {actionBtn && (
                <Box component={motion.div} whileHover={{ scale: 1.06 }} sx={{ width: { xs: 1, sm: 'auto' } }}>
                  <ButtonAnimationWrapper>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                      {...actionBtn}
                      sx={{ width: { xs: 1, sm: 'auto' }, ...actionBtn?.sx }}
                    />
                  </ButtonAnimationWrapper>
                </Box>
              )}
            </Stack>
          </motion.div>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Feature20.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.any,
  features: PropTypes.array,
  actionBtn: PropTypes.any,
  secondaryBtn: PropTypes.any
};
