/** A4 page dimensions in CSS pixels (96dpi). */
export const RESUME_PAGE_WIDTH_PX = (210 / 25.4) * 96;
export const RESUME_PAGE_HEIGHT_PX = (297 / 25.4) * 96;

export const RESUME_PAGE_WIDTH_MM = 210;
export const RESUME_PAGE_HEIGHT_MM = 297;

/** Scale factor so a page fits inside a box (width × height). */
export function fitResumeScale(
  availableWidthPx: number,
  availableHeightPx: number,
  maxScale = 1
): number {
  const w = Math.max(availableWidthPx, 1);
  const h = Math.max(availableHeightPx, 1);
  const scale = Math.min(w / RESUME_PAGE_WIDTH_PX, h / RESUME_PAGE_HEIGHT_PX);
  return Math.min(maxScale, Math.max(0.08, scale));
}

/** Zoom % so an A4 page fits inside the available width (with padding). */
export function fitResumeZoom(availableWidthPx: number, paddingPx = 32): number {
  const inner = Math.max(availableWidthPx - paddingPx, 120);
  const zoom = Math.floor((inner / RESUME_PAGE_WIDTH_PX) * 100);
  return Math.min(100, Math.max(35, zoom));
}

export function isNarrowViewport(maxWidth = 1024): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${maxWidth - 1}px)`).matches;
}
