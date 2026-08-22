import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

// @project
import branding from '@/branding.json';
import { NextLink } from '../routes';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { IconType } from '@/enum';

/***************************  FOLLOW US - DATA  ***************************/

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

// Solo se listan las redes que tengan URL en branding.json — las vacías no se renderizan.
const socialIcons = [
  { key: 'linkedin', icon: 'tabler-filled-linkedin' },
  { key: 'facebook', icon: 'tabler-filled-facebook' },
  { key: 'youtube', icon: 'tabler-filled-youtube' },
  { key: 'github', icon: 'tabler-filled-brand-github' }
]
  .map((item) => ({ ...item, href: branding.company.socialLink[item.key] }))
  .filter((item) => Boolean(item.href));

/***************************  FOOTER - FOLLOW US  ***************************/

export default function FollowUS({ heading = true, color }) {
  if (!socialIcons.length) return null;

  return (
    <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' }, gap: 2, textAlign: { xs: 'center', md: 'left' } }}>
      {heading && <Typeset {...{ heading: typeof heading === 'string' ? heading : 'Síguenos', headingProps: { variant: 'h4' } }} />}
      <Stack direction="row" sx={{ gap: { xs: 0.5, sm: 1.5 } }}>
        {socialIcons.map((item) => (
          <Link component={NextLink} key={item.key} href={item.href} {...linkProps} aria-label={`Síguenos en ${item.key}`}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: color || 'grey.200',
                width: { xs: 40, sm: 52, lg: 56 },
                height: { xs: 40, sm: 52, lg: 56 },
                borderRadius: 3,
                ':hover': { bgcolor: 'grey.300' }
              }}
            >
              <SvgIcon type={IconType.FILL} name={item.icon} />
            </Avatar>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}

FollowUS.propTypes = { heading: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), color: PropTypes.string };
