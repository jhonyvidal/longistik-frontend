// @project
import { SmallHero3 } from '@/blocks/small-hero';
import TermsConditionPage from '@/blocks/TermsCondition';

// @data
import { smallHeroTerminos } from './data';

/***************************  PÁGINA - TÉRMINOS Y CONDICIONES  ***************************/

export default function TermsCondition() {
  return (
    <>
      <SmallHero3 {...smallHeroTerminos} />
      <TermsConditionPage />
    </>
  );
}
