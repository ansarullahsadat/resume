"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TemplatePicker } from "@/components/templates/template-picker"
import { TEMPLATES } from "@/lib/templates/config"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import type { TemplateId } from "@/types/resume"

interface CreateResumeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTemplateId?: TemplateId
}

export function CreateResumeDialog({
  open,
  onOpenChange,
  initialTemplateId = "minimal",
}: CreateResumeDialogProps) {
  const router = useRouter()
  const [title, setTitle] = useState("Untitled Resume")
  const [templateId, setTemplateId] = useState<TemplateId>(initialTemplateId)
  const [creating, setCreating] = useState(false)

  const selectedTemplate = TEMPLATES.find((t) => t.id === templateId)

  const handleCreate = async () => {
    setCreating(true)
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || "Untitled Resume",
          template_id: templateId,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Failed to create resume")
      }
      const data = await res.json()
      onOpenChange(false)
      router.push(`/editor/${data.id}`)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create resume",
      )
      setCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create new resume</DialogTitle>
          <DialogDescription>
            Pick a template to start with. You can change it anytime in the editor.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Label htmlFor='resume-title'>Resume name</Label>
            <Input
              id='resume-title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Untitled Resume'
            />
          </div>

          <div className='space-y-2'>
            <Label>Template</Label>
            {selectedTemplate && (
              <p className='text-xs text-muted-foreground'>
                {selectedTemplate.description}
              </p>
            )}
            <TemplatePicker
              selectedId={templateId}
              accentColor={selectedTemplate?.colors[0]}
              onSelect={setTemplateId}
            />
          </div>
        </div>

        <div className='flex flex-col-reverse sm:flex-row gap-2 pt-2'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={creating}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={creating} className='flex-1'>
            {creating && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Create with {selectedTemplate?.name ?? "template"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
