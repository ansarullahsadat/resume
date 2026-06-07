"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FileText,
  Menu,
  X,
  Sparkles,
  LayoutTemplate,
  LogIn,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/features", label: "Features", icon: Sparkles },
  { href: "/templates", label: "Templates", icon: LayoutTemplate },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md safe-top">
        <div className="container mx-auto flex h-14 items-center justify-between gap-3 px-4 max-w-full">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-base min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <FileText className="h-4 w-4" />
            </div>
            <span className="truncate">ResumeForge</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <ThemeToggle variant="icon" />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden h-9 w-9 shrink-0"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(100vw,20rem)] flex-col border-l bg-background shadow-2xl md:hidden transition-transform duration-300 ease-out safe-top safe-bottom",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!mobileOpen}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between gap-2 px-4 h-14 border-b shrink-0">
          <span className="font-semibold text-sm text-muted-foreground">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors min-h-[48px]",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-70" />
                {link.label}
                <ArrowRight
                  className={cn(
                    "h-4 w-4 ml-auto opacity-0 -translate-x-1 transition-all",
                    isActive && "opacity-50 translate-x-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4 space-y-3 shrink-0 bg-muted/30">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm text-muted-foreground">Appearance</span>
            <ThemeToggle variant="icon" />
          </div>
          <Button variant="outline" className="w-full h-11" asChild>
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <LogIn className="h-4 w-4 mr-2" />
              Log in
            </Link>
          </Button>
          <Button className="w-full h-11" asChild>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              Get Started Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
