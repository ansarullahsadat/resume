"use client"

import { useState } from "react"
import { Plus, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumeCard } from "./resume-card"
import { CreateResumeDialog } from "./create-resume-dialog"
import { toast } from "sonner"
import type { Resume } from "@/types/resume"

interface DashboardClientProps {
  resumes: Resume[]
  userName: string
}

export function DashboardClient({
  resumes: initialResumes,
  userName,
}: DashboardClientProps) {
  const [resumes, setResumes] = useState(initialResumes)
  const [createOpen, setCreateOpen] = useState(false)

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id))
  }

  const handleRename = async (id: string, title: string) => {
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
      if (!res.ok) throw new Error()
      setResumes((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, title, updated_at: new Date().toISOString() }
            : r,
        ),
      )
      toast.success("Resume renamed")
    } catch {
      toast.error("Failed to rename resume")
    }
  }

  const recentResumes = [...resumes].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  )

  return (
    <div className='max-w-7xl mx-auto w-full min-w-0'>
      <CreateResumeDialog open={createOpen} onOpenChange={setCreateOpen} />

      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold'>
            Welcome back{userName ? `, ${userName}` : ""}
          </h1>
          <p className='text-muted-foreground mt-1'>
            {resumes.length} resume{resumes.length !== 1 ? "s" : ""} in your
            workspace
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} size='lg'>
          <Plus className='mr-2 h-4 w-4' />
          Create New Resume
        </Button>
      </div>

      <section>
        <div className='flex items-center gap-2 mb-4'>
          <FileText className='h-4 w-4 text-muted-foreground' />
          <h2 className='text-lg font-semibold'>All resumes</h2>
        </div>

        {resumes.length === 0 ? (
          <div className='rounded-xl border border-dashed bg-muted/30 p-12 text-center'>
            <FileText className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
            <h3 className='text-lg font-semibold'>No resumes yet</h3>
            <p className='text-muted-foreground mt-2 mb-6'>
              Choose from 6 free templates and build your first resume in
              minutes.
            </p>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              Create Your First Resume
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDelete={handleDelete}
                onRename={handleRename}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
