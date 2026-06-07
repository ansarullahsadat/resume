"use client";

import { useEffect, useRef, useState } from "react";
import { ResumeRenderer } from "@/components/templates/resume-renderer";
import {
  fitResumeScale,
  RESUME_PAGE_HEIGHT_MM,
  RESUME_PAGE_HEIGHT_PX,
  RESUME_PAGE_WIDTH_MM,
  RESUME_PAGE_WIDTH_PX,
} from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { ResumeData, ResumeStyle, TemplateId } from "@/types/resume";

type ScaleMode = "thumbnail" | "full-page" | "fit-container";

interface ScaledResumePreviewProps {
  data: ResumeData;
  style: ResumeStyle;
  templateId: TemplateId;
  mode?: ScaleMode;
  className?: string;
  maxScale?: number;
}

function computeScale(
  width: number,
  height: number,
  mode: ScaleMode,
  maxScale: number
): number {
  if (width <= 0) return 0.2;

  if (mode === "thumbnail" || mode === "full-page") {
    const scale = width / RESUME_PAGE_WIDTH_PX;
    return Math.min(maxScale, Math.max(0.08, scale));
  }

  return fitResumeScale(width, height, maxScale);
}

export function ScaledResumePreview({
  data,
  style,
  templateId,
  mode = "fit-container",
  className,
  maxScale = 1,
}: ScaledResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.22);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setScale(computeScale(el.clientWidth, el.clientHeight, mode, maxScale));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mode, maxScale]);

  const scaledWidth = RESUME_PAGE_WIDTH_PX * scale;
  const scaledHeight = RESUME_PAGE_HEIGHT_PX * scale;

  const isThumbnail = mode === "thumbnail";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full",
        isThumbnail ? "h-full overflow-hidden" : "overflow-visible",
        mode === "fit-container" && "h-full overflow-hidden flex items-start justify-center",
        className
      )}
      style={mode === "full-page" ? { height: scaledHeight } : undefined}
    >
      <div style={{ width: scaledWidth, height: scaledHeight }}>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${RESUME_PAGE_WIDTH_MM}mm`,
            height: `${RESUME_PAGE_HEIGHT_MM}mm`,
          }}
        >
          <ResumeRenderer data={data} style={style} templateId={templateId} />
        </div>
      </div>
    </div>
  );
}
