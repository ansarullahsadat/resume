import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/features/dashboard/dashboard-client";
import type { Resume } from "@/types/resume";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single<{ full_name: string | null }>();

  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const userName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    "";

  return (
    <DashboardClient
      resumes={(resumes as unknown as Resume[]) ?? []}
      userName={userName}
    />
  );
}
