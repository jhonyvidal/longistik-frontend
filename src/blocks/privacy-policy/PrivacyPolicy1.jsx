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

/***************************  PRIVACY POLICY - DATA  ***************************/

const menuItems = [
  {
    id: 'responsable',
    heading: 'Responsable del tratamiento',
    caption:
      'DEBUGPLOY S.A.S., identificada con NIT 901714840-3, con domicilio en Palmira, Valle del Cauca (Colombia) y correo servicioalcliente@debugploy.com, es la responsable del tratamiento de los datos personales recolectados a través de este sitio web y del servicio Longistik.'
  },
  {
    id: 'informacion-que-recolectamos',
    heading: 'Información que recolectamos',
    caption:
      'A través del formulario de solicitud de demo recolectamos nombre, empresa, correo electrónico, número de teléfono, tamaño aproximado de la flota y la información que decidas incluir en el mensaje. Adicionalmente, si la analítica web está habilitada, se recogen datos técnicos de navegación como páginas visitadas, tipo de dispositivo y origen de la visita.'
  },
  {
    id: 'finalidad',
    heading: 'Finalidad del tratamiento',
    caption:
      'Usamos tus datos para responder tu solicitud, agendar y realizar la demostración del producto, enviarte la información comercial que nos pediste, dar seguimiento a la relación comercial y mejorar el sitio y el servicio. No vendemos ni comercializamos tu información personal.'
  },
  {
    id: 'autorizacion',
    heading: 'Autorización',
    caption:
      'Al enviar el formulario de contacto autorizas de manera previa, expresa e informada el tratamiento de tus datos personales para las finalidades descritas en esta política, en los términos de la Ley 1581 de 2012 y el Decreto 1074 de 2015.'
  },
  {
    id: 'derechos-del-titular',
    heading: 'Derechos del titular',
    caption:
      'Como titular de los datos tienes derecho a conocer, actualizar y rectificar tu información; solicitar prueba de la autorización otorgada; ser informado sobre el uso que se le ha dado a tus datos; presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley; revocar la autorización y solicitar la supresión de tus datos cuando proceda; y acceder de forma gratuita a la información que tengamos sobre ti.'
  },
  {
    id: 'como-ejercer-tus-derechos',
    heading: 'Cómo ejercer tus derechos',
    caption:
      'Puedes ejercer cualquiera de estos derechos escribiendo a servicioalcliente@debugploy.com, indicando tu nombre, el dato o la solicitud concreta y un medio de contacto. Atendemos las consultas dentro de los diez (10) días hábiles siguientes y los reclamos dentro de los quince (15) días hábiles siguientes a su recepción, conforme a los plazos de ley.'
  },
  {
    id: 'conservacion',
    heading: 'Conservación de la información',
    caption:
      'Conservamos los datos de contacto comercial mientras exista una relación o un interés comercial vigente y, en todo caso, hasta que solicites su supresión. La información asociada a contratos se conserva por los plazos que exijan las obligaciones legales, contables y tributarias aplicables.'
  },
  {
    id: 'cookies-y-analitica',
    heading: 'Cookies y analítica',
    caption:
      'Este sitio puede usar cookies propias y de terceros con fines de analítica web para entender cómo se navega y mejorar el contenido. Puedes bloquear o eliminar las cookies desde la configuración de tu navegador; hacerlo no impide el uso del sitio.'
  },
  {
    id: 'encargados-y-terceros',
    heading: 'Encargados y terceros',
    caption:
      'Podemos apoyarnos en proveedores de infraestructura, correo electrónico y herramientas de gestión comercial que actúan como encargados del tratamiento y que están obligados a proteger la información en los mismos términos de esta política. No transferimos tus datos a terceros con fines distintos a los aquí descritos.'
  },
  {
    id: 'datos-de-la-operacion',
    heading: 'Datos operativos de nuestros clientes',
    caption:
      'La información que las empresas transportadoras registran dentro de Longistik (remesas, manifiestos, terceros, vehículos) es de su propiedad. DEBUGPLOY S.A.S. actúa únicamente como encargado del tratamiento para prestar el servicio y para cumplir el reporte obligatorio ante el RNDC del Ministerio de Transporte, en los términos del contrato suscrito con cada cliente.'
  },
  {
    id: 'seguridad',
    heading: 'Seguridad de la información',
    caption:
      'Aplicamos medidas técnicas, humanas y administrativas razonables para proteger la información contra acceso no autorizado, pérdida o alteración, incluyendo control de acceso por usuario, cifrado del tráfico y respaldos periódicos.'
  },
  {
    id: 'cambios',
    heading: 'Cambios en esta política',
    caption:
      'Podemos actualizar esta política para reflejar cambios legales o en nuestros procesos. La versión vigente será siempre la publicada en esta página, junto con su fecha de actualización.'
  }
];

/***************************  PRIVACY POLICY - 1 ***************************/

/**
 *
 * Demos:
 * - [PrivacyPolicy1](https://www.saasable.io/blocks/privacy-policy/privacy-policy1)
 */

export default function PrivacyPolicy1() {
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
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
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
                <ListItemText primary={item.heading} slotProps={{ primary: { variant: 'subtitle1' } }} sx={{ my: 0 }} />
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
