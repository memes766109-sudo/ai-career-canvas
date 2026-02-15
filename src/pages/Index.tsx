import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, FileText, Globe, Sparkles, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Domain Focused",
    description: "Built specifically for AI/ML professionals — roles, skills, and templates tailored to the field.",
  },
  {
    icon: FileText,
    title: "ATS-Ready Resumes",
    description: "Download polished, ATS-optimized resumes as PDF. Choose from 3 professional templates.",
  },
  {
    icon: Globe,
    title: "Live Portfolio URL",
    description: "Get a shareable portfolio page with a unique URL to showcase your AI projects.",
  },
  {
    icon: Zap,
    title: "Step-by-Step Wizard",
    description: "Friendly multi-step form guides you through every section — no blank page anxiety.",
  },
];

const roles = ["AI Engineer", "ML Engineer", "Data Scientist", "GenAI Developer", "NLP Engineer", "CV Engineer"];

export default function Index() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Nav */}
      <nav className="container mx-auto flex items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">AI Folio</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/auth">Log in</Link>
          </Button>
          <Button asChild className="gradient-bg border-0">
            <Link to="/auth?tab=signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 pb-20 pt-16 text-center md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Built for AI Professionals
          </div>
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Build Your{" "}
            <span className="gradient-text">AI Career</span>{" "}
            Resume & Portfolio
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Create ATS-optimized resumes and stunning portfolio pages designed specifically for AI, ML, and Data Science professionals.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gradient-bg border-0 px-8 text-base">
              <Link to="/auth?tab=signup">
                Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Floating role badges */}
        <motion.div
          className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {roles.map((role, i) => (
            <span
              key={role}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium shadow-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {role}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="gradient-card rounded-2xl border border-border p-6 shadow-soft"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 AI Folio. Built for the AI community.</p>
      </footer>
    </div>
  );
}
