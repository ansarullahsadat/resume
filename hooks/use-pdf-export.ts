"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

const EXPORT_COLOR_OVERRIDES = `
  [data-resume-page] {
    background-color: #ffffff !important;
    color: #111827 !important;
    box-shadow: none !important;
  }
  [data-resume-page] .text-gray-900 { color: #111827 !important; }
  [data-resume-page] .text-gray-800 { color: #1f2937 !important; }
  [data-resume-page] .text-gray-700 { color: #374151 !important; }
  [data-resume-page] .text-gray-600 { color: #4b5563 !important; }
  [data-resume-page] .text-gray-500 { color: #6b7280 !important; }
  [data-resume-page] .text-white { color: #ffffff !important; }
  [data-resume-page] .text-stone-800 { color: #292524 !important; }
  [data-resume-page] .border-stone-800 { border-color: #292524 !important; }
  [data-resume-page] .bg-white { background-color: #ffffff !important; }
  [data-resume-page] .border-black { border-color: #000000 !important; }
  [data-resume-page] .text-black { color: #000000 !important; }
`;

function injectExportStyles(doc: Document) {
  const style = doc.createElement("style");
  style.textContent = EXPORT_COLOR_OVERRIDES;
  doc.head.appendChild(style);
}

function getResumePageElement(rootId: string): HTMLElement {
  const root = document.getElementById(rootId);
  if (!root) throw new Error("Export target not found");

  const page = root.querySelector("[data-resume-page]") as HTMLElement | null;
  if (!page) throw new Error("Resume page not found");

  return page;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[<>:"/\\|?*]+/g, "-").trim() || "resume";
}

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportPdf = useCallback(async (elementId: string, filename: string) => {
    setIsExporting(true);
    try {
      await document.fonts.ready;

      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const page = getResumePageElement(elementId);

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: page.offsetWidth,
        height: page.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          injectExportStyles(clonedDoc);
        },
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidthMm = 210;
      const pageHeightMm = 297;
      const imgWidthMm = pageWidthMm;
      const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;
      const imgData = canvas.toDataURL("image/png");

      if (imgHeightMm <= pageHeightMm) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidthMm, imgHeightMm);
      } else {
        let positionY = 0;
        let heightLeft = imgHeightMm;

        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, positionY, imgWidthMm, imgHeightMm);
          heightLeft -= pageHeightMm;
          if (heightLeft > 0) {
            positionY -= pageHeightMm;
            pdf.addPage();
          }
        }
      }

      pdf.save(`${sanitizeFilename(filename)}.pdf`);
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("PDF export failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to export PDF"
      );
    } finally {
      setIsExporting(false);
    }
  }, []);

  const printResume = useCallback(async (elementId: string) => {
    try {
      await document.fonts.ready;
      const page = getResumePageElement(elementId);
      const content = page.outerHTML;

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        toast.error("Please allow popups to print");
        return;
      }

      const styles = Array.from(
        document.querySelectorAll('link[rel="stylesheet"], style')
      )
        .map((el) => el.outerHTML)
        .join("\n");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume</title>
            ${styles}
            <style>
              ${EXPORT_COLOR_OVERRIDES}
              @page { size: A4; margin: 0; }
              body { margin: 0; padding: 0; background: white; }
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 600);
    } catch (error) {
      console.error("Print failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to open print dialog"
      );
    }
  }, []);

  return { exportPdf, printResume, isExporting };
}
