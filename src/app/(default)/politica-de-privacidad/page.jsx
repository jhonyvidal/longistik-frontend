import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const PoliticaPrivacidad = dynamic(() => import('@/views/landings/default/privacy-policy'));

/***************************  METADATA - POLÍTICA DE PRIVACIDAD  ***************************/

export const metadata = { ...SEO_CONTENT.privacyPolicy };

/***************************  PAGE - POLÍTICA DE PRIVACIDAD  ***************************/

export default function PoliticaPrivacidadPage() {
  return <PoliticaPrivacidad />;
}
