'use client';

// @next
import NextLink from 'next/link';

// @mui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import branding from '@/branding.json';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright, FollowUS, Sitemap } from '@/components/footer';
import LogoSection from '@/components/logo';
import SvgIcon from '@/components/SvgIcon';

import { CopyrightType } from '@/enum';
import { ANCHOR, EMAIL_URL, PAGE_PATH, RNDC_URL } from '@/path';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER - 7 DATA  ***************************/

/**
 *
 * Demos:
 * - [Footer7](https://www.saasable.io/blocks/footer/footer7)
 */

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

const data = [
  {
    id: 'producto',
    grid: { size: { xs: 12, sm: 'auto' } },
    title: 'Producto',
    menu: [
      { label: 'Funcionalidades', link: { href: ANCHOR.funcionalidades } },
      { label: 'Módulos', link: { href: ANCHOR.modulos } },
      { label: 'Integración con el RNDC', link: { href: ANCHOR.rndc } },
      { label: 'Integraciones', link: { href: ANCHOR.integraciones } },
      { label: 'API para tus clientes', link: { href: ANCHOR.api } },
      { label: 'Planes', link: { href: ANCHOR.planes } }
    ]
  },
  {
    id: 'ayuda',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Ayuda',
    menu: [
      { label: 'Agenda una demo', link: { href: PAGE_PATH.contactPage } },
      { label: 'Preguntas frecuentes', link: { href: ANCHOR.faq } },
      { label: 'Escríbenos', link: { href: EMAIL_URL } }
    ]
  },
  {
    id: 'legal',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Legal',
    menu: [
      { label: 'Política de privacidad', link: { href: PAGE_PATH.privacyPolicyPage } },
      { label: 'Términos y condiciones', link: { href: PAGE_PATH.termsConditionPage } }
    ]
  }
];

const iconProps = { color: 'text.secondary' };

// Datos de la empresa. Los que llevan `href` se muestran como enlace; el resto, como texto.
const companyInfo = [
  {
    icon: <SvgIcon name="tabler-shield-check" {...iconProps} />,
    title: 'Integrado al RNDC del Ministerio de Transporte',
    href: RNDC_URL
  },
  {
    icon: <SvgIcon name="tabler-mail" {...iconProps} />,
    title: branding.company.email,
    href: EMAIL_URL
  },
  {
    icon: <SvgIcon name="tabler-map-pin" {...iconProps} />,
    title: `${branding.company.city}, ${branding.company.state} — ${branding.company.country}`
  },
  {
    icon: <SvgIcon name="tabler-building-store" {...iconProps} />,
    title: `${branding.company.name} — NIT ${branding.company.nit}`
  }
];

/***************************  FOOTER - 7  ***************************/

export default function Footer7() {
  const logoFollowContent = (
    <Stack sx={{ alignItems: 'flex-start', gap: { xs: 1.5, sm: 3 } }}>
      <LogoSection />
      <Typography variant="body2" sx={{ maxWidth: { sm: 300 } }}>
        Software de gestión logística para empresas de transporte de carga, con reporte automático al RNDC.
      </Typography>
    </Stack>
  );

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.4
        }}
      >
        <Stack id="footer-7" role="contentinfo" aria-label="Pie de página" sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
          <Grid container spacing={{ xs: 4, md: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction={{ sm: 'row', md: 'column' }} sx={{ gap: 3, justifyContent: 'space-between', height: 1 }}>
                {logoFollowContent}
                <Stack sx={{ gap: { xs: 2, sm: 2.5, md: 3 } }}>
                  {companyInfo.map((item, index) => (
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }} key={index}>
                      {item.icon}
                      {item.href ? (
                        <Link
                          component={NextLink}
                          variant="body2"
                          color="text.secondary"
                          href={item.href}
                          {...(item.href.startsWith('http') && linkProps)}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.title}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Sitemap list={data} isMenuDesign />
            </Grid>
          </Grid>
          <GraphicsCard sx={{ borderRadius: { xs: 6, sm: 8 } }}>
            <Stack
              direction={{ sm: 'row' }}
              sx={{
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'space-between' },
                gap: 1.5,
                py: { xs: 2, sm: 1.5 },
                px: { xs: 2, sm: 3 }
              }}
            >
              <Copyright type={CopyrightType.TYPE3} />
              <FollowUS heading={false} color="grey.100" />
            </Stack>
          </GraphicsCard>
        </Stack>
      </motion.div>
    </ContainerWrapper>
  );
}
