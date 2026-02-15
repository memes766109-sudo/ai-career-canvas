import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { WizardData, defaultWizardData } from "@/lib/wizard-types";
import { Brain, Code, FolderOpen, GraduationCap, Award, Mail, MapPin, Github, Linkedin, Globe } from "lucide-react";

export default function PublicPortfolio() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<WizardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("portfolios")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()
      .then(({ data: p }) => {
        if (p) setData(p.data as unknown as WizardData);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold">Portfolio Not Found</h1>
          <p className="mt-2 text-muted-foreground">This portfolio doesn't exist or isn't published.</p>
        </div>
      </div>
    );
  }

  const { personalDetails: p, education: edu, targetRole, skills, projects, experiences, certifications } = data;
  const certList = certifications.split("\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl font-bold md:text-5xl">{p.fullName}</h1>
          {targetRole && (
            <p className="mt-3 text-lg font-medium gradient-text">{targetRole}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {p.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {p.location}</span>}
            {p.email && <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {p.email}</span>}
            {p.github && <span className="flex items-center gap-1"><Github className="h-4 w-4" /> {p.github}</span>}
            {p.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-4 w-4" /> {p.linkedin}</span>}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-center font-display text-2xl font-bold flex items-center justify-center gap-2">
            <Code className="h-6 w-6 text-primary" /> Skills
          </h2>
          <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
            {skills.languages && <SkillCard title="Languages" items={skills.languages} />}
            {skills.mlSkills && <SkillCard title="AI/ML" items={skills.mlSkills} />}
            {skills.frameworks && <SkillCard title="Frameworks" items={skills.frameworks} />}
            {skills.tools && <SkillCard title="Tools" items={skills.tools} />}
            {skills.databases && <SkillCard title="Databases" items={skills.databases} />}
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <h2 className="mb-8 text-center font-display text-2xl font-bold flex items-center justify-center gap-2">
              <FolderOpen className="h-6 w-6 text-primary" /> Projects
            </h2>
            <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
              {projects.map((proj) => (
                <div key={proj.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-lg font-semibold">{proj.title}</h3>
                  <p className="mt-1 text-xs text-primary font-medium">{proj.techStack}</p>
                  {proj.problem && <p className="mt-2 text-sm text-muted-foreground">{proj.problem}</p>}
                  {proj.contributions && (
                    <ul className="mt-3 space-y-1 text-sm list-disc list-inside">
                      {proj.contributions.split("\n").filter(Boolean).map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  )}
                  {proj.outcome && <p className="mt-3 text-sm font-medium gradient-text">→ {proj.outcome}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {edu.degree && (
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-8 font-display text-2xl font-bold flex items-center justify-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" /> Education
            </h2>
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="font-display text-lg font-semibold">{edu.degree}</p>
              <p className="text-muted-foreground">{edu.college}</p>
              <div className="mt-2 flex justify-center gap-4 text-sm text-muted-foreground">
                {edu.gradYear && <span>{edu.gradYear}</span>}
                {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {certList.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-8 font-display text-2xl font-bold flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-primary" /> Certifications
            </h2>
            <div className="mx-auto max-w-2xl flex flex-wrap justify-center gap-3">
              {certList.map((c, i) => (
                <span key={i} className="rounded-full border border-border bg-card px-4 py-2 text-sm shadow-soft">{c}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        Built with AI Folio
      </footer>
    </div>
  );
}

function SkillCard({ title, items }: { title: string; items: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <h3 className="mb-2 text-sm font-semibold text-primary">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.split(",").map((s, i) => (
          <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">{s.trim()}</span>
        ))}
      </div>
    </div>
  );
}
