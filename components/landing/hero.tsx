"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-3 sm:px-4 text-center max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 sm:px-4 py-1.5 text-xs sm:text-sm mb-6 sm:mb-8 max-w-[95vw]">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Build your dream resume in minutes</span>
          </div>
          <h1 className="text-[1.75rem] leading-tight min-[380px]:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto px-1">
            Create a resume that{" "}
            <span className="text-primary">gets you hired</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-1">
            Professional templates, real-time preview, and one-click PDF export.
            No design skills needed — just fill in your details and go.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 w-full max-w-md sm:max-w-none mx-auto">
            <Button size="lg" className="text-base px-6 sm:px-8 w-full sm:w-auto touch-target min-h-[48px]" asChild>
              <Link href="/signup">
                Start Building Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-6 sm:px-8 w-full sm:w-auto touch-target min-h-[48px]" asChild>
              <Link href="/templates">View Templates</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free to start · No credit card required
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 sm:mt-16 relative mx-auto max-w-4xl w-full px-1"
        >
          <div className="rounded-xl border bg-card shadow-2xl p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto">
              <TemplateThumbnail templateId="minimal" accentColor="#2563eb" className="shadow-md" />
              <TemplateThumbnail templateId="modern" accentColor="#7c3aed" className="shadow-md ring-2 ring-primary/30" />
              <TemplateThumbnail templateId="professional" accentColor="#1e3a5f" className="shadow-md" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Six free templates · Live preview while you edit
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
