'use client';

// @mui
import Box from '@mui/material/Box';

// @project
import { Clientele3 } from '@/blocks/clientele';
import { Cta4, Cta5 } from '@/blocks/cta';
import { Faq6 } from '@/blocks/faq';
import { Feature18, Feature20, Feature21 } from '@/blocks/feature';
import { Hero17 } from '@/blocks/hero';
import { Integration2 } from '@/blocks/integration';
import { Metrics5 } from '@/blocks/metrics';
import { Other1 } from '@/blocks/other';
import { Pricing9 } from '@/blocks/pricing';
import { Testimonial10 } from '@/blocks/testimonial';
import { SECTION_ID } from '@/path';

// @data
import {
  clientele,
  cta4,
  cta5,
  ecosistema,
  faq,
  feature18,
  feature20,
  feature21,
  hero,
  integration,
  metrics,
  other,
  pricing,
  testimonial
} from './data';

/***************************  SECCIONES OPCIONALES  ***************************/

/**
 * Estas tres secciones aparecen solas en cuanto haya contenido real en sus archivos de datos.
 * Mientras estén vacías (cifras en 0, sin testimonios, sin logos) no se renderizan, para no
 * publicar datos inventados ni tarjetas a medio llenar.
 */
const hayMetricas = metrics.blockDetail.every((item) => item.counter > 0);
const hayTestimonios = testimonial.testimonials.length > 0;
const hayLogos = clientele.clienteleList.length > 0;

// Compensa la altura del navbar fijo cuando se llega a una sección por ancla (#modulos, #rndc…)
const anchorSx = { scrollMarginTop: { xs: 72, md: 96 } };

/***************************  PÁGINA - HOME  ***************************/

export default function Main() {
  return (
    <>
      <Hero17 {...hero} />

      <Box component="section" id={SECTION_ID.funcionalidades} sx={anchorSx}>
        <Feature20 {...feature20} />
      </Box>

      {hayMetricas && <Metrics5 {...metrics} />}

      <Box component="section" id={SECTION_ID.rndc} sx={anchorSx}>
        <Integration2 {...integration} />
      </Box>

      <Box component="section" id={SECTION_ID.modulos} sx={anchorSx}>
        <Other1 {...other} />
        <Feature18 {...feature18} />
      </Box>

      <Box component="section" id={SECTION_ID.integraciones} sx={anchorSx}>
        <Integration2 {...ecosistema} />
      </Box>

      <Box component="section" id={SECTION_ID.api} sx={anchorSx}>
        <Feature21 {...feature21} />
      </Box>

      <Cta4 {...cta4} />

      {(hayTestimonios || hayLogos) && (
        <Box component="section" id={SECTION_ID.clientes} sx={anchorSx}>
          {hayTestimonios && <Testimonial10 {...testimonial} />}
          {hayLogos && <Clientele3 {...clientele} />}
        </Box>
      )}

      <Box component="section" id={SECTION_ID.planes} sx={anchorSx}>
        <Pricing9 {...pricing} />
      </Box>

      <Cta5 {...cta5} />

      <Box component="section" id={SECTION_ID.faq} sx={anchorSx}>
        <Faq6 {...faq} />
      </Box>
    </>
  );
}
