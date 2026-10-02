/**
 * SCREENSHOT FRAMING (privacy)
 * ----------------------------
 * Coordinates are in pixels of the ORIGINAL screenshot file.
 * Only the `crop` region is ever shown. Everything outside it is never
 * rendered. Inside the crop, add `masks` over anything private
 * (balance, name, other transactions). `focus` is the +$2.99 highlight.
 *
 * Set these once you add public/assets/elevate-screenshot.png.
 */
export const screenshot = {
  /** Size of the original image file. */
  width: 1170,
  height: 2532,
  /** Region that contains ONLY the Upwork Reward transaction row. */
  crop: { x: 0, y: 1400, w: 1170, h: 360 },
  /** Box around "+$2.99" (inside the crop, original-image coordinates). */
  focus: { x: 820, y: 1460, w: 300, h: 110 },
  /** Extra privacy masks, original-image coordinates. Blurred and dimmed. */
  masks: [] as { x: number; y: number; w: number; h: number }[],
};
