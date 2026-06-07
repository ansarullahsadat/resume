"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { ResumeRenderer } from "@/components/templates/resume-renderer";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { getPreviewResumeData } from "@/lib/templates/sample-resume-data";
import {
  fitResumeZoom,
  RESUME_PAGE_HEIGHT_MM,
  RESUME_PAGE_HEIGHT_PX,
  RESUME_PAGE_WIDTH_MM,
  RESUME_PAGE_WIDTH_PX,
} from "@/lib/responsive";
import { cn } from "@/lib/utils";

export function ResumePreview() {
  const { resume, previewZoom, setPreviewZoom } = useResumeStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [zoomMode, setZoomMode] = useState<"auto" | "manual">("auto");
  const [fitZoom, setFitZoom] = useState(50);

  const applyFitZoom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const padding = el.clientWidth < 360 ? 16 : 32;
    const zoom = fitResumeZoom(el.clientWidth, padding);
    setFitZoom(zoom);
    if (zoomMode === "auto") {
      setPreviewZoom(zoom);
    }
  }, [zoomMode, setPreviewZoom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    applyFitZoom();
    const ro = new ResizeObserver(applyFitZoom);
    ro.observe(el);
    window.addEventListener("resize", applyFitZoom);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyFitZoom);
    };
  }, [applyFitZoom]);

  if (!resume) return null;

  const displayData = getPreviewResumeData(resume.data);
  const scale = previewZoom / 100;
  const scaledWidthPx = RESUME_PAGE_WIDTH_PX * scale;
  const scaledHeightPx = RESUME_PAGE_HEIGHT_PX * scale;

  const handleZoomOut = () => {
    setZoomMode("manual");
    setPreviewZoom(Math.max(25, previewZoom - 10));
  };

  const handleZoomIn = () => {
    setZoomMode("manual");
    setPreviewZoom(Math.min(150, previewZoom + 10));
  };

  const handleFitToPane = () => {
    const el = scrollRef.current;
    if (!el) return;
    const padding = el.clientWidth < 360 ? 16 : 32;
    const zoom = fitResumeZoom(el.clientWidth, padding);
    setFitZoom(zoom);
    setZoomMode("auto");
    setPreviewZoom(zoom);
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-2 sm:px-4 py-2 border-b bg-muted/30 shrink-0">
        <span className="text-sm font-medium shrink-0">Preview</span>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 touch-target"
            onClick={handleZoomOut}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs w-10 sm:w-12 text-center tabular-nums">{previewZoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 touch-target"
            onClick={handleZoomIn}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 touch-target",
              zoomMode === "auto" && "text-primary"
            )}
            onClick={handleFitToPane}
            aria-label="Fit to pane"
            title="Fit to pane"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden bg-muted/50 p-3 sm:p-4 md:p-6 min-h-0 w-full"
      >
        <div className="flex justify-center min-w-0 w-full">
          <div
            id="resume-preview"
            className="overflow-hidden shadow-md rounded-sm bg-white shrink-0"
            style={{
              width: scaledWidthPx,
              height: scaledHeightPx,
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: `${RESUME_PAGE_WIDTH_MM}mm`,
                height: `${RESUME_PAGE_HEIGHT_MM}mm`,
              }}
            >
              <ResumeRenderer
                data={displayData}
                style={resume.style}
                templateId={resume.template_id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
