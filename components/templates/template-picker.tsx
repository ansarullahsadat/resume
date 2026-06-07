"use client";

import { TEMPLATES } from "@/lib/templates/config";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";
import { cn } from "@/lib/utils";
import type { TemplateId } from "@/types/resume";

interface TemplatePickerProps {
  selectedId: TemplateId;
  accentColor?: string;
  onSelect: (id: TemplateId) => void;
  className?: string;
  showDescriptions?: boolean;
}

export function TemplatePicker({
  selectedId,
  accentColor,
  onSelect,
  className,
  showDescriptions = true,
}: TemplatePickerProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TEMPLATES.map((t) => {
          const isSelected = selectedId === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={cn(
                "rounded-lg border p-2.5 text-left transition-all hover:border-primary hover:shadow-sm",
                isSelected && "border-primary bg-primary/5 ring-1 ring-primary/20"
              )}
            >
              <TemplateThumbnail
                templateId={t.id}
                accentColor={accentColor ?? t.colors[0]}
                selected={isSelected}
              />
              <p className="font-medium text-sm leading-tight mt-2">{t.name}</p>
              {showDescriptions && (
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                  {t.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
