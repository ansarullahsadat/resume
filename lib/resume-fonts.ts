/** Maps style panel font names to CSS font stacks (includes Next.js-loaded fonts). */
export function getResumeFontStack(fontFamily: string): string {
  switch (fontFamily) {
    case "Inter":
      return "var(--font-inter), Inter, system-ui, sans-serif";
    case "Roboto":
      return "var(--font-roboto), Roboto, system-ui, sans-serif";
    case "Georgia":
      return "Georgia, 'Times New Roman', serif";
    case "Times New Roman":
      return "'Times New Roman', Times, serif";
    case "Arial":
      return "Arial, Helvetica, sans-serif";
    case "Helvetica":
      return "Helvetica, Arial, sans-serif";
    default:
      return `${fontFamily}, system-ui, sans-serif`;
  }
}
