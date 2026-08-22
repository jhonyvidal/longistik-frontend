// @project
import { ContactUs4 } from '@/blocks/contact-us';
import { Cta5 } from '@/blocks/cta';

// @data
import { contactUS, cta5 } from './data';

/***************************  PÁGINA - CONTACTO  ***************************/

export default function Contact() {
  return (
    <>
      <ContactUs4 {...contactUS} />
      <Cta5 {...cta5} />
    </>
  );
}
