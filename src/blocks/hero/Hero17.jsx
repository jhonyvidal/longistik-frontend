'use client';
import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion, useScroll, useTransform } from 'motion/react';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { getBackgroundDots } from '@/utils/getBackgroundDots';
import { withAlpha } from '@/utils/colorUtils';

// @assets
import Wave from '@/images/graphics/Wave';

// threshold - adjust threshold as needed
const options = { root: null, rootMargin: '0px', threshold: 0.6 };

/***************************  HERO - 17  ***************************/

/**
 *
 * Demos:
 * - [Hero17](https://www.saasable.io/blocks/hero/hero17)
 *
 * API:
 * - [Hero17 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/hero/hero17#props-details)
 */

export default function Hero17({ chip, headLine, captionLine, primaryBtn, secondaryBtn, videoSrc, videoThumbnail, listData, mockup }) {
  const theme = useTheme();
  const boxRadius = { xs: 24, sm: 32, md: 40 };

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.4, 0.6], [0.9, 0.92, 0.94, 0.96, 1]);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle video play/pause based on intersection with the viewport
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (videoRef.current && !isPlaying) {
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.error('Autoplay was prevented:', error);
              });
          }
        } else {
          if (videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const videoElement = videoRef.current;

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [isPlaying]);

  return (
    <>
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Box ref={containerRef}>
          <Box
            sx={{
              pb: { xs: 3, sm: 4, md: 5 },
              position: 'relative',
              // Fondo gris del hero. Antes tenía alto fijo (592 px en el celular) y con un título más
              // largo los botones quedaban mitad dentro y mitad fuera. Ahora va atado al contenido:
              // sube hasta el borde superior de la página, ocupa todo el ancho de la pantalla y
              // termina un poco por dentro del mockup, como en el diseño original.
              '&::before': {
                content: '""',
                position: 'absolute',
                zIndex: -1,
                top: -600,
                bottom: { xs: -40, sm: -60, md: -100 },
                left: '50%',
                width: '100vw',
                transform: 'translateX(-50%)',
                borderBottomLeftRadius: boxRadius,
                borderBottomRightRadius: boxRadius,
                ...getBackgroundDots(theme.vars.palette.grey[300], 2, 35),
                bgcolor: 'grey.100'
              }
            }}
          >
            <Stack sx={{ alignItems: 'center', gap: 1.5 }}>
              {/* El texto y los botones del hero llegan visibles desde el servidor (`initial={false}`):
                  es lo primero que se ve en el celular y no puede esperar a que cargue el JavaScript. */}
              <motion.div
                initial={false}
                animate={{
                  boxShadow: [
                    `0 0 0px ${withAlpha(theme.vars.palette.primary.dark, 0)}`,
                    `0 0 20px ${withAlpha(theme.vars.palette.primary.main, 0.8)}`,
                    `0 0 0px ${withAlpha(theme.vars.palette.primary.dark, 0)}`
                  ],
                  borderRadius: '74px'
                }}
                transition={{ duration: 0.6, delay: 0.8, ease: 'linear' }}
              >
                <Chip
                  variant="outlined"
                  label={chip.label}
                  slotProps={{
                    label: {
                      sx: { py: 0.5, px: 1.5, ...(typeof chip.label === 'string' && { typography: 'caption', color: 'text.secondary' }) }
                    }
                  }}
                  sx={{ bgcolor: 'grey.100' }}
                />
              </motion.div>

              <Typography variant="h1" align="center" sx={{ maxWidth: 800 }}>
                {headLine}
              </Typography>
              <Box sx={{ pt: 0.5, pb: 0.75 }}>
                <Wave />
              </Box>
              <Typography variant="h6" align="center" sx={{ color: 'text.secondary', maxWidth: 650 }}>
                {captionLine}
              </Typography>
            </Stack>
            <Stack sx={{ alignItems: 'center', gap: 2, mt: { xs: 3, sm: 4, md: 5 } }}>
              {/* En el celular, uno debajo del otro y del mismo ancho */}
              <Stack
                direction={{ sm: 'row' }}
                sx={{ alignItems: 'center', gap: 1.5, width: { xs: 1, sm: 'auto' }, maxWidth: { xs: 320, sm: 'none' } }}
              >
                <Box component={motion.div} whileHover={{ scale: 1.06 }} sx={{ width: { xs: 1, sm: 'auto' } }}>
                  <ButtonAnimationWrapper>
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                      {...primaryBtn}
                      sx={{ width: { xs: 1, sm: 'auto' }, ...primaryBtn?.sx }}
                    />
                  </ButtonAnimationWrapper>
                </Box>
                {secondaryBtn && (
                  <Box component={motion.div} whileHover={{ scale: 1.06 }} sx={{ width: { xs: 1, sm: 'auto' } }}>
                    <ButtonAnimationWrapper>
                      <Button color="primary" variant="outlined" {...secondaryBtn} sx={{ width: { xs: 1, sm: 'auto' }, ...secondaryBtn?.sx }} />
                    </ButtonAnimationWrapper>
                  </Box>
                )}
              </Stack>
              <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                {listData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: index * 0.08, ease: 'linear' }}
                  >
                    <Chip
                      label={item.title}
                      variant="outlined"
                      icon={
                        item.icon ? (
                          <SvgIcon name={item.icon} size={16} color="primary.main" stroke={2} />
                        ) : (
                          <GraphicsImage image={item.image} sx={{ width: 16, height: 16 }} />
                        )
                      }
                      slotProps={{ label: { sx: { py: 0.75, px: 1, typography: 'caption2' } } }}
                      sx={{ height: 32, px: 1, bgcolor: 'grey.100' }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </Stack>
          </Box>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{ scale }}
          >
            {mockup ? (
              <GraphicsCard sx={{ border: '5px solid', borderColor: 'grey.300', overflow: 'hidden' }}>{mockup}</GraphicsCard>
            ) : (
              <GraphicsCard sx={{ border: '5px solid', borderColor: 'grey.300' }}>
                <video
                  playsInline
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  style={{ display: 'flex', objectFit: 'cover' }}
                  preload="metadata"
                  autoPlay={false}
                  loop={true}
                  muted={true}
                  poster={videoThumbnail}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </GraphicsCard>
            )}
          </motion.div>
        </Box>
      </ContainerWrapper>
    </>
  );
}

Hero17.propTypes = {
  chip: PropTypes.object,
  headLine: PropTypes.string,
  captionLine: PropTypes.string,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  videoSrc: PropTypes.string,
  videoThumbnail: PropTypes.string,
  listData: PropTypes.array,
  mockup: PropTypes.node
};
