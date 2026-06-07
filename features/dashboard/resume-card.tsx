"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Copy, Trash2, Pencil, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import type { Resume } from "@/types/resume";

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
}

export function ResumeCard({ resume, onDelete, onRename }: ResumeCardProps) {
  const router = useRouter();

  const handleDuplicate = async () => {
    try {
      const res = await fetch(`/api/resumes/${resume.id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      toast.success("Resume duplicated");
      router.refresh();
      router.push(`/editor/${data.id}`);
    } catch {
      toast.error("Failed to duplicate resume");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      const res = await fetch(`/api/resumes/${resume.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onDelete(resume.id);
      toast.success("Resume deleted");
    } catch {
      toast.error("Failed to delete resume");
    }
  };

  const handleRename = () => {
    const newTitle = prompt("Enter new title:", resume.title);
    if (newTitle && newTitle !== resume.title) {
      onRename(resume.id, newTitle);
    }
  };

  return (
    <Card className="group hover:shadow-md transition-all hover:border-primary/30">
      <CardContent className="p-0">
        <Link href={`/editor/${resume.id}`}>
          <div className="aspect-[3/4] bg-muted/50 flex items-center justify-center border-b relative overflow-hidden">
            <div className="w-3/4 h-4/5 bg-white rounded shadow-sm border p-3 space-y-2">
              <div className="h-2 w-16 bg-primary/30 rounded" />
              <div className="h-1.5 w-24 bg-gray-200 rounded" />
              <div className="mt-3 space-y-1">
                <div className="h-1 w-full bg-gray-100 rounded" />
                <div className="h-1 w-4/5 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </Link>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link href={`/editor/${resume.id}`}>
                <h3 className="font-semibold truncate hover:text-primary transition-colors">
                  {resume.title}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground mt-1">
                Edited {formatDate(resume.updated_at)}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/editor/${resume.id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRename}>
                  <FileText className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Badge
            variant={resume.status === "published" ? "success" : "secondary"}
            className="mt-3"
          >
            {resume.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
