import { Sidebar } from "@/components/layout/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh max-h-dvh overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden pt-14 px-3 sm:px-4 pb-6 lg:pt-6 lg:px-6 lg:pb-8">
        {children}
      </main>
    </div>
  );
}
