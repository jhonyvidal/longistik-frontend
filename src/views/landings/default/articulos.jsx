'use client';

// @next
import NextLink from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { Cta5 } from '@/blocks/cta';
import { SmallHero3 } from '@/blocks/small-hero';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import { articuloPath } from '@/path';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @data
import { articulos, cta5, formatoFecha, smallHeroArticulos } from './data';

/***************************  PÁGINA - ARTÍCULOS  ***************************/

export default function Articulos() {
  return (
    <>
      <SmallHero3 {...smallHeroArticulos} />
      <ContainerWrapper sx={{ pb: SECTION_COMMON_PY }}>
        <Grid container spacing={1.5}>
          {articulos.map((articulo) => (
            <Grid key={articulo.slug} size={{ xs: 12, sm: 6 }}>
              <Box component="article" sx={{ bgcolor: 'grey.100', borderRadius: { xs: 6, sm: 8 }, p: { xs: 3, md: 5 }, height: 1 }}>
                <Stack sx={{ gap: 2, height: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {formatoFecha(articulo.fecha)} · {articulo.lectura} de lectura
                  </Typography>
                  <Typography variant="h4" component="h2">
                    <Link component={NextLink} href={articuloPath(articulo.slug)} color="text.primary" underline="hover">
                      {articulo.titulo}
                    </Link>
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', flexGrow: 1 }}>{articulo.resumen}</Typography>
                  <Link
                    component={NextLink}
                    href={articuloPath(articulo.slug)}
                    variant="subtitle1"
                    underline="hover"
                    aria-label={`Leer: ${articulo.titulo}`}
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                  >
                    Leer artículo
                    <SvgIcon name="tabler-arrow-right" size={16} />
                  </Link>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </ContainerWrapper>
      <Cta5 {...cta5} />
    </>
  );
}
