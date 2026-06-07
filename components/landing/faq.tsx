"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Is ResumeForge free to use?",
    a: "Yes! ResumeForge is completely free. Create, edit, and export resumes with every template at no cost.",
  },
  {
    q: "Can I download my resume as a PDF?",
    a: "Absolutely. Export pixel-perfect, print-ready PDFs with one click. Multi-page support included.",
  },
  {
    q: "Are the templates ATS-friendly?",
    a: "We include a dedicated ATS-Friendly template optimized for applicant tracking systems, plus best practices across all designs.",
  },
  {
    q: "Do I need design experience?",
    a: "Not at all. ResumeForge is built for beginners. Just fill in your information and pick a template.",
  },
  {
    q: "Can I edit on my phone?",
    a: "Yes, the editor and dashboard are fully responsive and work great on mobile devices.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-20 md:py-28">
      <div className="container mx-auto px-3 sm:px-4 max-w-3xl w-full">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border bg-card overflow-hidden">
              <button
                className="flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left font-medium text-sm sm:text-base touch-target min-h-[48px]"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="px-5 pb-5 text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
