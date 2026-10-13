'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

// @third-party
import { motion } from 'motion/react';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  VIDEO DEMO  ***************************/

/**
 * Bloque propio (no viene de la plantilla): el video del sistema funcionando, con controles y sonido.
 * A diferencia del video de Hero17 (silencioso y en bucle), este lo reproduce el visitante cuando quiere.
 * El archivo va en `public/` (la CSP solo permite video propio: `media-src 'self'`).
 */

export default function VideoDemo({ heading, caption, src, poster, duracion, pasos, actionBtn }) {
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

        {/* Lo que se ve en el video, para quien lo escanea antes de darle play */}
        {pasos?.length > 0 && (
          <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {duracion && (
              <Chip
                icon={<SvgIcon name="tabler-player-play" size={16} color="secondary.main" stroke={2} />}
                label={duracion}
                variant="outlined"
                slotProps={{ label: { sx: { typography: 'caption2' } } }}
                sx={{ height: 32, px: 1, bgcolor: 'grey.100' }}
              />
            )}
            {pasos.map((paso, index) => (
              <Chip
                key={index}
                label={`${index + 1}. ${paso}`}
                variant="outlined"
                slotProps={{ label: { sx: { typography: 'caption2' } } }}
                sx={{ height: 32, px: 1, bgcolor: 'grey.100' }}
              />
            ))}
          </Stack>
        )}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GraphicsCard
            role={undefined}
            aria-label={undefined}
            sx={{ border: '5px solid', borderColor: 'grey.300', overflow: 'hidden', maxWidth: 960, mx: 'auto' }}
          >
            {/* Sin portada se precargan los metadatos y `#t=0.1` hace que el primer cuadro sirva de portada (también en iOS) */}
            <video
              controls
              playsInline
              preload={poster ? 'none' : 'metadata'}
              poster={poster || undefined}
              aria-label={heading}
              style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 9', background: '#000' }}
            >
              <source src={poster ? src : `${src}#t=0.1`} type="video/mp4" />
            </video>
          </GraphicsCard>
        </motion.div>

        {actionBtn && (
          <Stack sx={{ alignItems: 'center' }}>
            <Box component={motion.div} whileHover={{ scale: 1.06 }} sx={{ width: { xs: 1, sm: 'auto' } }}>
              <ButtonAnimationWrapper>
                <Button variant="contained" size="large" {...actionBtn} sx={{ width: { xs: 1, sm: 'auto' }, ...actionBtn?.sx }} />
              </ButtonAnimationWrapper>
            </Box>
          </Stack>
        )}
      </Stack>
    </ContainerWrapper>
  );
}

VideoDemo.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  src: PropTypes.string,
  poster: PropTypes.string,
  duracion: PropTypes.string,
  pasos: PropTypes.array,
  actionBtn: PropTypes.any
};
