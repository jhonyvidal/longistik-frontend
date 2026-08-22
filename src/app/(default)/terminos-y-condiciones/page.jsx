import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const TerminosCondiciones = dynamic(() => import('@/views/landings/default/terms-condition'));

/***************************  METADATA - TÉRMINOS Y CONDICIONES  ***************************/

export const metadata = { ...SEO_CONTENT.termsCondition };

/***************************  PAGE - TÉRMINOS Y CONDICIONES  ***************************/

export default function TerminosCondicionesPage() {
  return <TerminosCondiciones />;
}
