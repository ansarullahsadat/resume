"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/resume-store";
import { useAutoSave } from "@/hooks/use-auto-save";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { SectionList, SectionEditor } from "./section-editor";
import { StylePanel } from "./style-panel";
import { TemplatesPanel } from "./templates-panel";
import { ResumePreview } from "./resume-preview";
import { ResumeExportTarget } from "@/components/templates/resume-export-target";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ChevronLeft,
  Download,
  Printer,
  Palette,
  PanelLeft,
  LayoutTemplate,
  Save,
  Loader2,
} from "lucide-react";
import type { Resume } from "@/types/resume";
import { cn } from "@/lib/utils";

interface EditorClientProps {
  initialResume: Resume;
}

type Panel = "sections" | "templates" | "style";
type MobileTab = "edit" | "templates" | "preview" | "style";
type MobileEditView = "sections" | "content";

const DESKTOP_PANELS: { id: Panel; label: string; icon: typeof PanelLeft }[] = [
  { id: "sections", label: "Sections", icon: PanelLeft },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "style", label: "Style", icon: Palette },
];

const MOBILE_TABS: { id: MobileTab; label: string }[] = [
  { id: "edit", label: "Edit" },
  { id: "templates", label: "Templates" },
  { id: "preview", label: "Preview" },
  { id: "style", label: "Style" },
];

function LeftPanelContent({
  panel,
  onTemplateSelected,
  onSectionSelect,
}: {
  panel: Panel;
  onTemplateSelected: () => void;
  onSectionSelect: () => void;
}) {
  if (panel === "sections") {
    return <SectionList onSectionSelect={onSectionSelect} />;
  }
  if (panel === "templates") {
    return <TemplatesPanel onTemplateSelected={onTemplateSelected} />;
  }
  return <StylePanel />;
}

export function EditorClient({ initialResume }: EditorClientProps) {
  const { resume, setResume, updateTitle, isSaving, isDirty, lastSaved } = useResumeStore();
  const { save } = useAutoSave(initialResume.id);
  const { exportPdf, printResume, isExporting } = usePdfExport();
  const [exportMounted, setExportMounted] = useState(false);
  const [leftPanel, setLeftPanel] = useState<Panel>("sections");
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const [mobileEditView, setMobileEditView] = useState<MobileEditView>("sections");

  useEffect(() => {
    setResume(initialResume);
    return () => useResumeStore.getState().reset();
  }, [initialResume, setResume]);

  useEffect(() => {
    if (mobileTab === "edit") {
      setMobileEditView("sections");
    }
  }, [mobileTab]);

  if (!resume) return null;

  const showPreviewAfterTemplate = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileTab("preview");
    }
  };

  const withExportTarget = async (action: () => Promise<void>) => {
    setExportMounted(true);
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    try {
      await action();
    } finally {
      setExportMounted(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden">
      {exportMounted && <ResumeExportTarget />}
      <header className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 border-b bg-card shrink-0 z-20 safe-top">
        <Button variant="ghost" size="icon" asChild className="shrink-0 h-9 w-9 touch-target">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Input
          value={resume.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="min-w-0 flex-1 max-w-[140px] min-[380px]:max-w-[180px] sm:max-w-xs h-9 border-0 bg-transparent font-semibold text-sm sm:text-base focus-visible:ring-0 px-1"
        />
        <div className="flex-1 min-w-0" />
        <span className="hidden md:block text-xs text-muted-foreground truncate max-w-[120px]">
          {isSaving ? (
            <span className="flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin shrink-0" /> Saving...
            </span>
          ) : isDirty ? (
            "Unsaved"
          ) : lastSaved ? (
            `Saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
          ) : null}
        </span>
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 touch-target sm:w-auto sm:px-3"
            onClick={() => save()}
            disabled={isSaving || !isDirty}
            title="Save"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline sm:ml-1 text-sm">Save</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 touch-target sm:w-auto sm:px-3"
            onClick={() => withExportTarget(() => printResume("resume-export"))}
            title="Print"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline sm:ml-1 text-sm">Print</span>
          </Button>
          <Button
            size="icon"
            className="h-9 w-9 touch-target sm:w-auto sm:px-3"
            onClick={() => withExportTarget(() => exportPdf("resume-export", resume.title))}
            disabled={isExporting}
            title="Download PDF"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span className="hidden sm:inline sm:ml-1 text-sm">PDF</span>
          </Button>
        </div>
      </header>

      <div className="flex lg:hidden border-b shrink-0 bg-card overflow-x-auto">
        {MOBILE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMobileTab(tab.id)}
            className={cn(
              "flex-1 min-w-[4.5rem] py-3 text-xs sm:text-sm font-medium transition-colors touch-target min-h-[44px] whitespace-nowrap px-1",
              mobileTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <aside className="hidden lg:flex w-64 xl:w-72 border-r bg-card shrink-0 flex-col min-h-0">
          <div className="p-2 border-b flex gap-1 shrink-0">
            {DESKTOP_PANELS.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={leftPanel === id ? "secondary" : "ghost"}
                size="sm"
                className="flex-1 text-[11px] xl:text-xs px-1"
                onClick={() => setLeftPanel(id)}
              >
                <Icon className="h-3.5 w-3.5 mr-0.5 shrink-0" />
                {label}
              </Button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            <LeftPanelContent
              panel={leftPanel}
              onTemplateSelected={showPreviewAfterTemplate}
              onSectionSelect={() => {}}
            />
          </div>
        </aside>

        {mobileTab === "edit" && (
          <div className="flex flex-1 flex-col min-w-0 min-h-0 lg:hidden">
            {mobileEditView === "sections" ? (
              <div className="flex-1 overflow-y-auto min-h-0">
                <SectionList onSectionSelect={() => setMobileEditView("content")} />
              </div>
            ) : (
              <div className="flex flex-1 flex-col min-h-0">
                <div className="flex items-center gap-2 px-2 py-2 border-b shrink-0 bg-card">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="touch-target shrink-0"
                    onClick={() => setMobileEditView("sections")}
                  >
                    <ChevronLeft className="h-4 w-4 mr-0.5" />
                    Sections
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto min-h-0">
                  <SectionEditor />
                </div>
              </div>
            )}
          </div>
        )}

        {mobileTab === "templates" && (
          <aside className="flex-1 overflow-y-auto min-h-0 lg:hidden">
            <TemplatesPanel onTemplateSelected={showPreviewAfterTemplate} />
          </aside>
        )}

        <div
          className={cn(
            "flex-1 overflow-y-auto border-r min-w-0 min-h-0",
            "hidden lg:block"
          )}
        >
          <SectionEditor />
        </div>

        {mobileTab === "style" && (
          <aside className="flex-1 overflow-y-auto min-h-0 lg:hidden">
            <StylePanel />
          </aside>
        )}

        <div
          className={cn(
            "flex-1 min-w-0 min-h-0 overflow-hidden flex flex-col isolate",
            "lg:max-w-[min(48%,520px)] lg:shrink-0",
            "hidden lg:flex",
            mobileTab === "preview" && "flex !max-w-none"
          )}
        >
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
