"use client";

import { Fragment } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { generateId } from "@/lib/utils";
import type {
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  SocialLink,
} from "@/types/resume";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableSectionItem({
  id,
  title,
  isActive,
  onClick,
}: {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
        isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent"
      }`}
    >
      <span {...attributes} {...listeners} className="cursor-grab touch-none">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </span>
      {title}
    </button>
  );
}

export function SectionList({ onSectionSelect }: { onSectionSelect?: () => void }) {
  const { resume, activeSection, setActiveSection, updateSections } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!resume) return null;

  const sections = [...resume.data.sections].sort((a, b) => a.order - b.order);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({
      ...s,
      order: i,
    }));
    updateSections(reordered);
  };

  const toggleVisibility = (sectionId: string) => {
    const updated = sections.map((s) =>
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );
    updateSections(updated);
  };

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
        Sections
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {sections.map((section) => (
            <div key={section.id} className="flex items-center gap-1 px-1">
              <div className="flex-1">
                <SortableSectionItem
                  id={section.id}
                  title={section.title}
                  isActive={activeSection === section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    onSectionSelect?.();
                  }}
                />
              </div>
              <button
                onClick={() => toggleVisibility(section.id)}
                className={`text-xs px-1.5 py-0.5 rounded ${
                  section.visible ? "text-primary" : "text-muted-foreground"
                }`}
                title={section.visible ? "Hide section" : "Show section"}
              >
                {section.visible ? "●" : "○"}
              </button>
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export function SectionEditor() {
  const { resume, activeSection, updateData } = useResumeStore();
  if (!resume) return null;

  const section = resume.data.sections.find((s) => s.id === activeSection);
  const data = resume.data;

  if (!section) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Select a section to edit
      </div>
    );
  }

  switch (section.type) {
    case "personal":
      return (
        <div className="space-y-4 p-3 sm:p-4">
          <h3 className="font-semibold text-base sm:text-lg">Personal Information</h3>
          {(["fullName", "title", "email", "phone", "location", "website"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</Label>
              <Input
                value={data.personal[field]}
                onChange={(e) =>
                  updateData({ personal: { ...data.personal, [field]: e.target.value } })
                }
              />
            </div>
          ))}
        </div>
      );

    case "summary":
      return (
        <div className="space-y-4 p-3 sm:p-4">
          <h3 className="font-semibold text-base sm:text-lg">About / Summary</h3>
          <Textarea
            rows={6}
            placeholder="Write a compelling professional summary..."
            value={data.summary}
            onChange={(e) => updateData({ summary: e.target.value })}
          />
        </div>
      );

    case "experience":
      return (
        <ListEditor
          title="Work Experience"
          items={data.experience}
          onChange={(experience) => updateData({ experience })}
          emptyItem={{
            id: generateId(),
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
          }}
          renderItem={(item, update, remove) => (
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Experience</span>
                <Button variant="ghost" size="icon" onClick={remove}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Input placeholder="Position" value={item.position} onChange={(e) => update({ position: e.target.value })} />
              <Input placeholder="Company" value={item.company} onChange={(e) => update({ company: e.target.value })} />
              <Input placeholder="Location" value={item.location} onChange={(e) => update({ location: e.target.value })} />
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2">
                <Input placeholder="Start" value={item.startDate} onChange={(e) => update({ startDate: e.target.value })} />
                <Input placeholder="End" value={item.endDate} onChange={(e) => update({ endDate: e.target.value })} disabled={item.current} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={item.current} onChange={(e) => update({ current: e.target.checked })} />
                Currently working here
              </label>
              <Textarea
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
                value={item.description}
                onChange={(e) => update({ description: e.target.value })}
              />
            </div>
          )}
        />
      );

    case "education":
      return (
        <ListEditor
          title="Education"
          items={data.education}
          onChange={(education) => updateData({ education })}
          emptyItem={{
            id: generateId(),
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            description: "",
          }}
          renderItem={(item, update, remove) => (
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Education</span>
                <Button variant="ghost" size="icon" onClick={remove}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Input placeholder="Institution" value={item.institution} onChange={(e) => update({ institution: e.target.value })} />
              <Input placeholder="Degree" value={item.degree} onChange={(e) => update({ degree: e.target.value })} />
              <Input placeholder="Field of Study" value={item.field} onChange={(e) => update({ field: e.target.value })} />
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2">
                <Input placeholder="Start" value={item.startDate} onChange={(e) => update({ startDate: e.target.value })} />
                <Input placeholder="End" value={item.endDate} onChange={(e) => update({ endDate: e.target.value })} />
              </div>
            </div>
          )}
        />
      );

    case "skills":
      return (
        <div className="space-y-4 p-3 sm:p-4">
          <h3 className="font-semibold text-base sm:text-lg">Skills</h3>
          <Textarea
            placeholder="Enter skills separated by commas (e.g. React, TypeScript, Node.js)"
            rows={4}
            value={data.skills.join(", ")}
            onChange={(e) =>
              updateData({
                skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
          />
        </div>
      );

    case "projects":
      return (
        <ListEditor
          title="Projects"
          items={data.projects}
          onChange={(projects) => updateData({ projects })}
          emptyItem={{ id: generateId(), name: "", url: "", description: "", technologies: "" }}
          renderItem={(item, update, remove) => (
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Project</span>
                <Button variant="ghost" size="icon" onClick={remove}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Input placeholder="Project Name" value={item.name} onChange={(e) => update({ name: e.target.value })} />
              <Input placeholder="URL" value={item.url} onChange={(e) => update({ url: e.target.value })} />
              <Input placeholder="Technologies" value={item.technologies} onChange={(e) => update({ technologies: e.target.value })} />
              <Textarea placeholder="Description" value={item.description} onChange={(e) => update({ description: e.target.value })} />
            </div>
          )}
        />
      );

    case "certifications":
      return (
        <ListEditor
          title="Certifications"
          items={data.certifications}
          onChange={(certifications) => updateData({ certifications })}
          emptyItem={{ id: generateId(), name: "", issuer: "", date: "", url: "" }}
          renderItem={(item, update, remove) => (
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Certification</span>
                <Button variant="ghost" size="icon" onClick={remove}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Input placeholder="Name" value={item.name} onChange={(e) => update({ name: e.target.value })} />
              <Input placeholder="Issuer" value={item.issuer} onChange={(e) => update({ issuer: e.target.value })} />
              <Input placeholder="Date" value={item.date} onChange={(e) => update({ date: e.target.value })} />
            </div>
          )}
        />
      );

    case "languages":
      return (
        <ListEditor
          title="Languages"
          items={data.languages}
          onChange={(languages) => updateData({ languages })}
          emptyItem={{ id: generateId(), name: "", proficiency: "" }}
          renderItem={(item, update, remove) => (
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Language</span>
                <Button variant="ghost" size="icon" onClick={remove}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Input placeholder="Language" value={item.name} onChange={(e) => update({ name: e.target.value })} />
              <Input placeholder="Proficiency (e.g. Native, Fluent)" value={item.proficiency} onChange={(e) => update({ proficiency: e.target.value })} />
            </div>
          )}
        />
      );

    case "social":
      return (
        <ListEditor
          title="Social Links"
          items={data.social}
          onChange={(social) => updateData({ social })}
          emptyItem={{ id: generateId(), platform: "", url: "" }}
          renderItem={(item, update, remove) => (
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Link</span>
                <Button variant="ghost" size="icon" onClick={remove}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Input placeholder="Platform (LinkedIn, GitHub...)" value={item.platform} onChange={(e) => update({ platform: e.target.value })} />
              <Input placeholder="URL" value={item.url} onChange={(e) => update({ url: e.target.value })} />
            </div>
          )}
        />
      );

    default:
      return null;
  }
}

function ListEditor<T extends { id: string }>({
  title,
  items,
  onChange,
  emptyItem,
  renderItem,
}: {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  emptyItem: T;
  renderItem: (
    item: T,
    update: (partial: Partial<T>) => void,
    remove: () => void
  ) => React.ReactNode;
}) {
  return (
    <div className="space-y-4 p-3 sm:p-4 max-w-full">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChange([...items, { ...emptyItem, id: generateId() }])}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <Fragment key={item.id}>
            {renderItem(
              item,
              (partial) => onChange(items.map((i) => (i.id === item.id ? { ...i, ...partial } : i))),
              () => onChange(items.filter((i) => i.id !== item.id))
            )}
          </Fragment>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No items yet. Click Add to get started.
          </p>
        )}
      </div>
    </div>
  );
}
