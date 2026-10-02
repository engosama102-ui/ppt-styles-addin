import { getStaticFiles, staticFile } from 'remotion';

/**
 * Asset files in public/assets. If a file is missing, the film shows a
 * clearly labeled placeholder (never a recreated logo or fake UI).
 */
export const ASSET_FILES = {
  /** Your real Elevate Pay screenshot (PNG or JPG). */
  screenshot: 'assets/elevate-screenshot.png',
  /** Official Elevate Pay logo, light version for dark backgrounds (SVG or PNG). */
  elevateLogo: 'assets/elevate-logo.svg',
  /** Official Upwork logo, light/white or green version (SVG or PNG). */
  upworkLogo: 'assets/upwork-logo.svg',
};

const present = new Set(getStaticFiles().map((f) => f.name));

export const hasAsset = (path: string) => present.has(path);
export const assetSrc = (path: string) => staticFile(path);
