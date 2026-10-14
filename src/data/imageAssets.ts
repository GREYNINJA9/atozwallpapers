import type { ImageMetadata } from 'astro';
import ogDefault from '../assets/images/og-default.jpg';
import heroPoster from '../assets/images/hero-poster.jpg';
import blog1 from '../assets/images/blog-1.jpg';
import blog2 from '../assets/images/blog-2.jpg';
import blog3 from '../assets/images/blog-3.jpg';
import blog4 from '../assets/images/blog-4.jpg';
import blog5 from '../assets/images/blog-5.jpg';
import cat3d from '../assets/images/cat-3d.jpg';
import catBedroom from '../assets/images/cat-bedroom.jpg';
import catCustom from '../assets/images/cat-custom.jpg';
import catKids from '../assets/images/cat-kids.jpg';
import catLiving from '../assets/images/cat-living.jpg';
import catMurals from '../assets/images/cat-murals.jpg';
import catOffice from '../assets/images/cat-office.jpg';
import catTextured from '../assets/images/cat-textured.jpg';
import catWaterproof from '../assets/images/cat-waterproof.jpg';
import insta1 from '../assets/images/insta-1.jpg';
import insta2 from '../assets/images/insta-2.jpg';
import insta3 from '../assets/images/insta-3.jpg';
import insta4 from '../assets/images/insta-4.jpg';
import insta5 from '../assets/images/insta-5.jpg';
import insta6 from '../assets/images/insta-6.jpg';
import portraitPinterest from '../assets/images/portrait-pinterest.jpg';
import project1Before from '../assets/images/project-1-before.jpg';
import project1After from '../assets/images/project-1-after.jpg';
import project2Before from '../assets/images/project-2-before.jpg';
import project2After from '../assets/images/project-2-after.jpg';
import project3Before from '../assets/images/project-3-before.jpg';
import project3After from '../assets/images/project-3-after.jpg';
import project4Before from '../assets/images/project-4-before.jpg';
import project4After from '../assets/images/project-4-after.jpg';
import { site as siteData } from './site';

export const imageAssets = {
  'og-default.jpg': ogDefault,
  'hero-poster.jpg': heroPoster,
  'blog-1.jpg': blog1,
  'blog-2.jpg': blog2,
  'blog-3.jpg': blog3,
  'blog-4.jpg': blog4,
  'blog-5.jpg': blog5,
  'cat-3d.jpg': cat3d,
  'cat-bedroom.jpg': catBedroom,
  'cat-custom.jpg': catCustom,
  'cat-kids.jpg': catKids,
  'cat-living.jpg': catLiving,
  'cat-murals.jpg': catMurals,
  'cat-office.jpg': catOffice,
  'cat-textured.jpg': catTextured,
  'cat-waterproof.jpg': catWaterproof,
  'insta-1.jpg': insta1,
  'insta-2.jpg': insta2,
  'insta-3.jpg': insta3,
  'insta-4.jpg': insta4,
  'insta-5.jpg': insta5,
  'insta-6.jpg': insta6,
  'portrait-pinterest.jpg': portraitPinterest,
  'project-1-before.jpg': project1Before,
  'project-1-after.jpg': project1After,
  'project-2-before.jpg': project2Before,
  'project-2-after.jpg': project2After,
  'project-3-before.jpg': project3Before,
  'project-3-after.jpg': project3After,
  'project-4-before.jpg': project4Before,
  'project-4-after.jpg': project4After,
} satisfies Record<string, ImageMetadata>;

export function getImageAsset(name: string): ImageMetadata {
  const fileName = name.split('/').pop() ?? name;
  const asset = imageAssets[fileName as keyof typeof imageAssets];
  if (!asset) throw new Error(`Unknown local image asset: ${name}`);
  return asset;
}

export function getImageUrl(name: string): string {
  if (/^https?:\/\//.test(name)) return name;
  return new URL(getImageAsset(name).src, siteData.url).href;
}
