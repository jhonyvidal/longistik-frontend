'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { Cta5 } from '@/blocks/cta';
import { SmallHero3 } from '@/blocks/small-hero';
import ContainerWrapper from '@/components/ContainerWrapper';
import { PAGE_PATH } from '@/path';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @data
import { cta5, formatoFecha } from './data';

const externo = (href) => href.startsWith('http');
const linkProps = (href) => (externo(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { component: NextLink, href });

/***************************  ARTÍCULO - SECCIÓN  ***************************/

function Seccion({ titulo, parrafos = [], lista = [], ejemplo }) {
  return (
    <Stack component="section" sx={{ gap: 2 }}>
      <Typography variant="h3" component="h2">
        {titulo}
      </Typography>
      {parrafos.map((parrafo) => (
        <Typography key={parrafo} variant="body1" sx={{ color: 'text.secondary' }}>
          {parrafo}
        </Typography>
      ))}
      {lista.length > 0 && (
        <Box component="ul" sx={{ m: 0, pl: 3, display: 'grid', gap: 1 }}>
          {lista.map((item) => (
            <Typography key={item} component="li" variant="body1" sx={{ color: 'text.secondary' }}>
              {item}
            </Typography>
          ))}
        </Box>
      )}
      {/* Los ejemplos son ficticios y se rotulan como tales (ver docs/plan-de-mejora.md, sección 2) */}
      {ejemplo ? (
        <Box sx={{ bgcolor: 'grey.100', borderLeft: '4px solid', borderColor: 'primary.main', borderRadius: 2, p: 2.5 }}>
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            Ejemplo
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {ejemplo}
          </Typography>
        </Box>
      ) : null}
    </Stack>
  );
}

Seccion.propTypes = { titulo: PropTypes.string, parrafos: PropTypes.array, lista: PropTypes.array, ejemplo: PropTypes.string };

/***************************  PÁGINA - ARTÍCULO  ***************************/

export default function Articulo({ articulo }) {
  const { titulo, resumen, fecha, lectura, secciones, enlaces = [], fuentes = [] } = articulo;

  return (
    <>
      <SmallHero3
        chip={{ label: `${formatoFecha(fecha)} · ${lectura} de lectura` }}
        headLine={
          <Typography variant="h1" sx={{ maxWidth: 900 }}>
            {titulo}
          </Typography>
        }
        captionLine={resumen}
        exploreBtn={{ children: 'Todos los artículos', component: NextLink, href: PAGE_PATH.articulos }}
      />

      <ContainerWrapper sx={{ pb: SECTION_COMMON_PY }}>
        <Stack component="article" sx={{ gap: { xs: 4, md: 5 }, maxWidth: 760 }}>
          {secciones.map((seccion) => (
            <Seccion key={seccion.titulo} {...seccion} />
          ))}

          {enlaces.length > 0 && (
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1.5, flexWrap: 'wrap' }}>
              {enlaces.map((enlace, index) => (
                <Button
                  key={enlace.href}
                  variant={index === 0 ? 'contained' : 'outlined'}
                  color={index === 0 ? 'secondary' : 'primary'}
                  {...linkProps(enlace.href)}
                >
                  {enlace.label}
                </Button>
              ))}
            </Stack>
          )}

          {fuentes.length > 0 && (
            <Stack sx={{ gap: 1, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1">Fuentes</Typography>
              {fuentes.map((fuente) => (
                <Link key={fuente.href} variant="body2" underline="hover" {...linkProps(fuente.href)}>
                  {fuente.label}
                </Link>
              ))}
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                Este artículo es informativo y no reemplaza la asesoría jurídica. Ante cualquier diferencia, prima el texto oficial de la
                norma.
              </Typography>
            </Stack>
          )}
        </Stack>
      </ContainerWrapper>

      <Cta5 {...cta5} />
    </>
  );
}

Articulo.propTypes = { articulo: PropTypes.object };
