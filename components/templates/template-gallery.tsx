"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TEMPLATES } from "@/lib/templates/config";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";
import { ScaledResumePreview } from "@/components/templates/scaled-resume-preview";
import { SAMPLE_RESUME_DATA } from "@/lib/templates/sample-resume-data";
import { DEFAULT_STYLE } from "@/types/resume";
import type { TemplateId } from "@/types/resume";

export function TemplateGallery() {
  const [previewId, setPreviewId] = useState<TemplateId | null>(null);
  const active = TEMPLATES.find((t) => t.id === previewId);

  return (
    <>
      <section className="py-12 sm:py-20 md:py-28">
        <div className="container mx-auto px-3 sm:px-4 max-w-full">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Beautiful templates</h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              Click a template to preview the full design. Every template is free to use.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setPreviewId(template.id)}
                className="group rounded-xl border bg-card overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 text-left w-full"
              >
                <div className="p-3" style={{ backgroundColor: `${template.colors[0]}08` }}>
                  <TemplateThumbnail
                    templateId={template.id}
                    accentColor={template.colors[0]}
                  />
                </div>
                <div className="p-4 border-t">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  <p className="text-xs text-primary mt-2 font-medium">Click to preview →</p>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link href="/signup">Create your free resume</Link>
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={previewId !== null} onOpenChange={(open) => !open && setPreviewId(null)}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
          {active && (
            <>
              <DialogHeader className="p-4 sm:p-6 pb-3 shrink-0 border-b">
                <DialogTitle>{active.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">{active.description}</p>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto bg-muted/40 p-4 sm:p-6 min-h-0">
                <div className="mx-auto w-full max-w-[210mm] rounded-sm shadow-lg bg-white">
                  <ScaledResumePreview
                    data={SAMPLE_RESUME_DATA}
                    style={{ ...DEFAULT_STYLE, accentColor: active.colors[0] }}
                    templateId={active.id}
                    mode="full-page"
                    maxScale={1}
                  />
                </div>
              </div>
              <div className="p-4 border-t flex flex-col sm:flex-row gap-2 shrink-0 bg-background">
                <Button className="flex-1" asChild>
                  <Link href="/signup">Start with this template</Link>
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setPreviewId(null)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
