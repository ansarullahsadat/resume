import { Hero } from "@/components/landing/hero"
import { FeaturesSection } from "@/components/landing/features-section"
import { TemplatesShowcase } from "@/components/landing/templates-showcase"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { CTASection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <TemplatesShowcase />
      <Testimonials />

      <FAQ />
      <CTASection />
    </>
  )
}
