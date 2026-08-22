'use client';
import { useEffect, useState } from 'react';

// @mui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { SECTION_COMMON_PY } from '@/utils/constant';

// Helper functions for scrollspy
const clamp = (value) => Math.max(0, value);
const isBetween = (value, floor, ceil) => value >= floor && value <= ceil;

/***************************  HOOKS - SCROLLSPY  ***************************/

function useScrollspy(ids, offset = 0) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => isBetween(scroll, top, bottom));

      setActiveId(position?.id || '');
    };

    window.addEventListener('scroll', listener);
    window.addEventListener('resize', listener);
    listener(); // Initial call to set the activeId

    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
    };
  }, [ids, offset]);

  return activeId;
}

/***************************  TERMS CONDITION - DATA  ***************************/

const menuItems = [
  {
    id: 'aceptacion',
    heading: 'Aceptación de los términos',
    caption:
      'Al acceder y usar este sitio web aceptas los presentes términos y condiciones. Si no estás de acuerdo con alguna parte de ellos, por favor abstente de usar el sitio.'
  },
  {
    id: 'objeto-del-sitio',
    heading: 'Objeto del sitio',
    caption:
      'Este sitio tiene una finalidad informativa y comercial: presentar Longistik, el software de gestión logística desarrollado por DEBUGPLOY S.A.S., y permitir que las empresas interesadas soliciten una demostración. El sitio no es la aplicación Longistik ni da acceso a ella.'
  },
  {
    id: 'uso-permitido',
    heading: 'Uso permitido',
    caption:
      'Te comprometes a usar el sitio conforme a la ley colombiana y a la buena fe, sin intentar acceder a áreas restringidas, interferir con su funcionamiento, extraer información de forma automatizada ni suplantar la identidad de terceros al diligenciar los formularios.'
  },
  {
    id: 'propiedad-intelectual',
    heading: 'Propiedad intelectual',
    caption:
      'El nombre Longistik, el logotipo, los textos, las imágenes, el diseño y el software presentados en este sitio son propiedad de DEBUGPLOY S.A.S. o de sus licenciantes, y están protegidos por la normativa colombiana e internacional sobre derechos de autor y propiedad industrial. No se concede ninguna licencia sobre ellos por el solo hecho de usar el sitio.'
  },
  {
    id: 'servicio-longistik',
    heading: 'Contratación del servicio',
    caption:
      'El uso de la plataforma Longistik se rige por el contrato de prestación de servicios que se suscriba con cada cliente, en el que se definen alcance, niveles de servicio, valores, vigencia y condiciones de soporte. La información publicada en este sitio es de carácter comercial y no constituye por sí sola una oferta vinculante.'
  },
  {
    id: 'relacion-con-el-rndc',
    heading: 'Relación con el RNDC',
    caption:
      'Longistik se integra con los servicios web del Registro Nacional de Despachos de Carga (RNDC) del Ministerio de Transporte para facilitar el reporte de la información. DEBUGPLOY S.A.S. no es el Ministerio de Transporte ni actúa en su nombre, no tiene control sobre la disponibilidad ni sobre las validaciones de esa plataforma, y el cumplimiento de las obligaciones legales de reporte continúa a cargo de la empresa transportadora.'
  },
  {
    id: 'disponibilidad',
    heading: 'Disponibilidad del sitio',
    caption:
      'Procuramos mantener el sitio disponible de forma continua, pero puede presentar interrupciones por mantenimiento, actualizaciones o causas ajenas a nuestro control. No garantizamos disponibilidad ininterrumpida de este sitio informativo.'
  },
  {
    id: 'limitacion-de-responsabilidad',
    heading: 'Limitación de responsabilidad',
    caption:
      'En la máxima medida permitida por la ley, DEBUGPLOY S.A.S. no será responsable por daños indirectos o lucro cesante derivados del uso o de la imposibilidad de uso de este sitio web. Esta limitación no afecta las responsabilidades pactadas en los contratos de prestación del servicio Longistik.'
  },
  {
    id: 'enlaces-de-terceros',
    heading: 'Enlaces a terceros',
    caption:
      'El sitio puede contener enlaces a páginas de terceros, como el portal del Ministerio de Transporte. Esos enlaces se ofrecen por conveniencia y no implican respaldo ni responsabilidad sobre su contenido o sus políticas.'
  },
  {
    id: 'datos-personales',
    heading: 'Datos personales',
    caption:
      'El tratamiento de los datos personales recolectados a través de este sitio se rige por nuestra Política de privacidad, que hace parte integral de estos términos.'
  },
  {
    id: 'modificaciones',
    heading: 'Modificaciones',
    caption:
      'Podemos modificar estos términos en cualquier momento. La versión vigente será siempre la publicada en esta página, y el uso continuado del sitio después de su publicación implica su aceptación.'
  },
  {
    id: 'ley-aplicable',
    heading: 'Ley aplicable y jurisdicción',
    caption:
      'Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a los jueces competentes de la ciudad de Palmira, Valle del Cauca, salvo que la ley disponga otra cosa.'
  },
  {
    id: 'contacto',
    heading: 'Contacto',
    caption:
      'Para cualquier duda sobre estos términos puedes escribirnos a servicioalcliente@debugploy.com. DEBUGPLOY S.A.S. — NIT 901714840-3 — Palmira, Valle del Cauca, Colombia.'
  }
];

/***************************  SECTIONS - TERMS CONDITION  ***************************/

/**
 *
 * Demos:
 * - [Terms Condition](https://www.saasable.io/sections/terms-condition)
 */

export default function TermsConditionPage() {
  const ids = menuItems.map((item) => item.id);

  // Adjust offset as per header height
  const activeId = useScrollspy(ids, 60);
  const [selectedID, setSelectedID] = useState(activeId);

  useEffect(() => {
    if (activeId) {
      setSelectedID(activeId);
    }
  }, [activeId]);

  return (
    <ContainerWrapper sx={{ pb: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <List component="div" sx={{ position: 'sticky', top: 20 }} disablePadding>
            {menuItems.map((item, index) => (
              <ListItemButton
                key={index}
                href={`#${item.id}`}
                sx={{
                  py: 1.25,
                  px: 1.5,
                  borderRadius: 3,
                  mb: 0.75,
                  ...(selectedID === item.id && { color: 'primary.main', bgcolor: 'grey.100' }),
                  '&:hover': { bgcolor: 'grey.50' }
                }}
                onClick={() => setSelectedID(item.id)}
              >
                <ListItemText primary={item.heading} sx={{ my: 0 }} slotProps={{ primary: { variant: 'subtitle1' } }} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 9 }}>
          {menuItems.map((item, index) => (
            <Stack
              key={index}
              id={item.id}
              sx={{ py: { xs: 1, sm: 1.5, md: 3 }, px: { md: 3 }, gap: 1, '&:first-of-type': { pt: { sm: 0 } } }}
            >
              <Typography variant="h4">{item.heading}</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {item.caption}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}
