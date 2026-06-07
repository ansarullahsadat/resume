import type { Metadata } from "next";
import { TemplatesShowcase } from "@/components/landing/templates-showcase";
import { CTASection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "Resume Templates",
  description: "Browse our collection of professional resume templates.",
};

export default function TemplatesPage() {
  return (
    <div className="pt-6 sm:pt-8 w-full max-w-full overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4 text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold px-1">Professional resume templates</h1>
        <p className="mt-3 sm:mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-1">
          Six professional designs — all free to use.
        </p>
      </div>
      <TemplatesShowcase />
      <CTASection />
    </div>
  );
}
