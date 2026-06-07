"use client";

import { useResumeStore } from "@/store/resume-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FONT_OPTIONS, ACCENT_COLORS } from "@/lib/templates/config";
import { cn } from "@/lib/utils";

export function StylePanel() {
  const { resume, updateStyle } = useResumeStore();
  if (!resume) return null;

  const { style } = resume;

  return (
    <div className="space-y-6 p-4">
      <div>
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Accent Color</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => updateStyle({ accentColor: color })}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
                style.accentColor === color ? "border-foreground scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>Font Family</Label>
        <Select value={style.fontFamily} onValueChange={(v) => updateStyle({ fontFamily: v })}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_OPTIONS.map((f) => (
              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Font Size: {style.fontSize}px</Label>
        <Slider
          className="mt-2"
          min={10}
          max={18}
          step={1}
          value={[style.fontSize]}
          onValueChange={([v]) => updateStyle({ fontSize: v })}
        />
      </div>

      <div>
        <Label>Line Height: {style.lineHeight}</Label>
        <Slider
          className="mt-2"
          min={1.2}
          max={2}
          step={0.1}
          value={[style.lineHeight]}
          onValueChange={([v]) => updateStyle({ lineHeight: v })}
        />
      </div>

      <div>
        <Label>Section Spacing: {style.sectionSpacing}px</Label>
        <Slider
          className="mt-2"
          min={8}
          max={32}
          step={2}
          value={[style.sectionSpacing]}
          onValueChange={([v]) => updateStyle({ sectionSpacing: v })}
        />
      </div>
    </div>
  );
}
