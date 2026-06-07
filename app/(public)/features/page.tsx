import type { Metadata } from "next";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "Features",
  description: "Discover all the powerful features of ResumeForge resume builder.",
};

export default function FeaturesPage() {
  return (
    <div className="pt-8">
      <div className="container mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl font-bold">Powerful features, simple experience</h1>
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to create a professional resume — nothing you don&apos;t.
        </p>
      </div>
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
