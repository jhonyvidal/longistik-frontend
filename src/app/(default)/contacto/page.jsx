import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Contacto = dynamic(() => import('@/views/landings/default/contact'));

/***************************  METADATA - CONTACTO  ***************************/

export const metadata = { ...SEO_CONTENT.contactUs };

/***************************  PAGE - CONTACTO  ***************************/

export default function ContactoPage() {
  return <Contacto />;
}
