"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Palette,
  Zap,
  Shield,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Professional Templates",
    description: "5+ modern templates designed by experts for every industry.",
  },
  {
    icon: Zap,
    title: "Real-time Preview",
    description: "See changes instantly as you type. No surprises when you export.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download pixel-perfect, print-ready PDFs in one click.",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description: "Colors, fonts, spacing — make it uniquely yours.",
  },
  {
    icon: Shield,
    title: "ATS-Friendly",
    description: "Templates optimized to pass applicant tracking systems.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Edit on desktop or mobile. Your resume, anywhere.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-3 sm:px-4 max-w-full">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Everything you need</h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-1">
            Powerful features wrapped in a simple, beginner-friendly interface.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
