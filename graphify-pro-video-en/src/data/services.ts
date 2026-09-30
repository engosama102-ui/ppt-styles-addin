import { brand } from '../config/brand';
import { SceneId } from './scenes';

/** The five services, linked to their navigation tab and scene. */
export const services: { nav: string; scene: SceneId; number: string }[] = [
  { nav: brand.navigation[0], scene: 'presentations', number: '01' },
  { nav: brand.navigation[1], scene: 'reports', number: '02' },
  { nav: brand.navigation[2], scene: 'data', number: '03' },
  { nav: brand.navigation[3], scene: 'templates', number: '04' },
  { nav: brand.navigation[4], scene: 'formats', number: '05' },
];
