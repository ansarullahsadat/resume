"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-12 sm:py-20 md:py-28">
      <div className="container mx-auto px-3 sm:px-4 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-primary px-4 py-10 sm:px-8 sm:py-16 md:px-16 text-center text-primary-foreground"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Ready to land your dream job?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
            Join thousands of job seekers who built their winning resume with ResumeForge.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 text-base"
            asChild
          >
            <Link href="/signup">
              Create Your Resume Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
