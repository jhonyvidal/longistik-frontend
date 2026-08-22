// @project
import { PrivacyPolicy1 } from '@/blocks/privacy-policy';
import { SmallHero3 } from '@/blocks/small-hero';

// @data
import { smallHeroPrivacidad } from './data';

/***************************  PÁGINA - POLÍTICA DE PRIVACIDAD  ***************************/

export default function PrivacyPolicy() {
  return (
    <>
      <SmallHero3 {...smallHeroPrivacidad} />
      <PrivacyPolicy1 />
    </>
  );
}
