import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/features/settings/settings-form";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single<{ full_name: string | null; email: string }>();

  const { data: settings } = await supabase
    .from("settings")
    .select("theme, accent_color, font_family")
    .eq("user_id", user.id)
    .single<{ theme: string; accent_color: string; font_family: string }>();

  return (
    <div className="max-w-4xl mx-auto w-full min-w-0">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Account Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your profile and app preferences
      </p>
      <SettingsForm
        profile={{
          full_name: profile?.full_name || user.user_metadata?.full_name || "",
          email: profile?.email || user.email || "",
        }}
        settings={{
          theme: settings?.theme || "system",
          accent_color: settings?.accent_color || "#2563eb",
          font_family: settings?.font_family || "Inter",
        }}
      />
    </div>
  );
}
