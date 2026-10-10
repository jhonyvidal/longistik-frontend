'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

/***************************  MAIN - CONTAINER  ***************************/

/**
 * Contenedor de todas las secciones. El ancho y el padding se resuelven con CSS por breakpoint
 * (antes con useMediaQuery): en el servidor useMediaQuery no conoce la pantalla, así que el HTML
 * llegaba con medidas de escritorio y en el celular la página saltaba al cargar el JavaScript.
 *
 * Mismas medidas que antes:
 *  - hasta md: ancho completo con 16 px de margen (32 px desde sm);
 *  - desde md: máximo 1128 px (override de MuiContainer-maxWidthLg) con el margen de MUI (24 px);
 *  - desde xl: máximo 1266 px.
 */
export default function ContainerWrapper({ children, sx }) {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 4, md: 3 },
        // Misma especificidad que el override del tema para poder ampliarlo en pantallas grandes
        '&.MuiContainer-maxWidthLg': { [theme.breakpoints.up('xl')]: { maxWidth: 1266 } },
        ...sx
      }}
    >
      {children}
    </Container>
  );
}

ContainerWrapper.propTypes = { children: PropTypes.any, sx: PropTypes.any };
