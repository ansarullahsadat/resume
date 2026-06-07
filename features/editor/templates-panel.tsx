"use client";

import { useResumeStore } from "@/store/resume-store";
import { TemplatePicker } from "@/components/templates/template-picker";
import { TEMPLATES } from "@/lib/templates/config";
import type { TemplateId } from "@/types/resume";

interface TemplatesPanelProps {
  onTemplateSelected?: () => void;
}

export function TemplatesPanel({ onTemplateSelected }: TemplatesPanelProps) {
  const { resume, updateTemplate, updateStyle } = useResumeStore();
  if (!resume) return null;

  const active = TEMPLATES.find((t) => t.id === resume.template_id);

  const handleSelect = (id: TemplateId) => {
    const template = TEMPLATES.find((t) => t.id === id);
    updateTemplate(id);
    if (template) {
      updateStyle({ accentColor: template.colors[0] });
    }
    onTemplateSelected?.();
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-sm font-semibold">Choose a template</h2>
        <p className="text-xs text-muted-foreground mt-1">
          All {TEMPLATES.length} templates are free. Your content stays the same when you switch.
        </p>
        {active && (
          <p className="text-xs text-primary mt-2 font-medium">
            Current: {active.name}
          </p>
        )}
      </div>
      <TemplatePicker
        selectedId={resume.template_id}
        accentColor={resume.style.accentColor}
        onSelect={handleSelect}
      />
    </div>
  );
}
