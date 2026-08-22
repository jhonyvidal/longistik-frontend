// @mui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// @project
import branding from '@/branding.json';
import { NextLink } from '@/components/routes';
import SvgIcon from '@/components/SvgIcon';
import { EMAIL_URL, whatsappUrl } from '@/path';
import { ctaDemo } from './botones';

const whatsapp = whatsappUrl('Hola, quiero agendar una demo de Longistik.');

/***************************  LONGISTIK - POR QUÉ NOSOTROS (CTA 4)  ***************************/

export const cta4 = {
  headLine: 'Un software que ya está operando, no una promesa',
  primaryBtn: { ...ctaDemo },
  list: [
    { primary: 'Hecho en Colombia para el RNDC colombiano' },
    { primary: 'En producción todos los días' },
    { primary: 'Acompañamiento en la migración' },
    { primary: 'Soporte directo con quien desarrolla' },
    { primary: 'Se ajusta a tu forma de operar' },
    { primary: 'Tu información sigue siendo tuya' }
  ],
  clientContent: 'Sin compromiso'
};

/***************************  LONGISTIK - CIERRE (CTA 5)  ***************************/

function DescriptionLine() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      ¿Prefieres escribirnos? Estamos en{' '}
      <Link component={NextLink} variant="caption2" color="primary" href={EMAIL_URL} underline="hover">
        {branding.company.email}
      </Link>
    </Typography>
  );
}

export const cta5 = {
  label: 'Sin compromiso',
  heading: 'Muéstranos cómo despachas hoy y te mostramos cómo sería con Longistik',
  caption: 'Una sesión de 30 minutos sobre tu propia operación: tus rutas, tus clientes y tus documentos del RNDC.',
  primaryBtn: { ...ctaDemo },
  // El botón de WhatsApp solo aparece cuando hay número cargado en branding.json → contact.whatsapp
  ...(whatsapp && {
    secondaryBtn: {
      children: 'Escríbenos por WhatsApp',
      startIcon: <SvgIcon name="tabler-brand-whatsapp" size={18} color="primary.main" />,
      href: whatsapp,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }),
  description: <DescriptionLine />
};
