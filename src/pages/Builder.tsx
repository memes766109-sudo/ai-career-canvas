import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { WizardData, defaultWizardData } from "@/lib/wizard-types";
import StepPersonal from "@/components/wizard/StepPersonal";
import StepEducation from "@/components/wizard/StepEducation";
import StepRole from "@/components/wizard/StepRole";
import StepSkills from "@/components/wizard/StepSkills";
import StepProjects from "@/components/wizard/StepProjects";
import StepExperience from "@/components/wizard/StepExperience";
import StepCertifications from "@/components/wizard/StepCertifications";
import StepOutput from "@/components/wizard/StepOutput";
import { Link } from "react-router-dom";

const STEPS = [
  "Personal Details",
  "Education",
  "Target Role",
  "Skills",
  "Projects",
  "Experience",
  "Certifications",
  "Choose Output",
];

export default function Builder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(defaultWizardData);
  const [saving, setSaving] = useState(false);
  const [existingResumeId, setExistingResumeId] = useState<string | null>(null);
  const [existingPortfolioId, setExistingPortfolioId] = useState<string | null>(null);

  // Load existing data if editing
  useEffect(() => {
    const resumeId = searchParams.get("resume");
    const portfolioId = searchParams.get("portfolio");

    if (resumeId) {
      setExistingResumeId(resumeId);
      supabase.from("resumes").select("*").eq("id", resumeId).single().then(({ data: r }) => {
        if (r) setData((prev) => ({ ...prev, ...(r.data as Partial<WizardData>), resumeTemplate: r.template }));
      });
    }
    if (portfolioId) {
      setExistingPortfolioId(portfolioId);
      supabase.from("portfolios").select("*").eq("id", portfolioId).single().then(({ data: p }) => {
        if (p) setData((prev) => ({ ...prev, ...(p.data as Partial<WizardData>), portfolioTemplate: p.template }));
      });
    }
  }, [searchParams]);

  const updateData = (partial: Partial<WizardData>) => setData((prev) => ({ ...prev, ...partial }));
  const progress = ((step + 1) / STEPS.length) * 100;

  const handleSaveAndPreview = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const title = data.personalDetails.fullName || "Untitled";

      if (data.documentType === "resume" || data.documentType === "both") {
        if (existingResumeId) {
          await supabase.from("resumes").update({ data: data as any, template: data.resumeTemplate, title: `${title} - Resume` }).eq("id", existingResumeId);
        } else {
          const { data: newResume } = await supabase.from("resumes").insert({ user_id: user.id, data: data as any, template: data.resumeTemplate, title: `${title} - Resume` }).select().single();
          if (newResume) setExistingResumeId(newResume.id);
        }
      }

      if (data.documentType === "portfolio" || data.documentType === "both") {
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-ai";
        if (existingPortfolioId) {
          await supabase.from("portfolios").update({ data: data as any, template: data.portfolioTemplate, title: `${title} - Portfolio`, slug }).eq("id", existingPortfolioId);
        } else {
          const { data: newPortfolio } = await supabase.from("portfolios").insert({ user_id: user.id, data: data as any, template: data.portfolioTemplate, title: `${title} - Portfolio`, slug, is_published: true }).select().single();
          if (newPortfolio) setExistingPortfolioId(newPortfolio.id);
        }
      }

      toast.success("Saved! Redirecting to preview...");
      navigate(`/preview?type=${data.documentType}&resumeId=${existingResumeId || ""}&portfolioId=${existingPortfolioId || ""}`);
    } catch (err) {
      toast.error("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  const stepComponents = [
    <StepPersonal data={data} onChange={updateData} />,
    <StepEducation data={data} onChange={updateData} />,
    <StepRole data={data} onChange={updateData} />,
    <StepSkills data={data} onChange={updateData} />,
    <StepProjects data={data} onChange={updateData} />,
    <StepExperience data={data} onChange={updateData} />,
    <StepCertifications data={data} onChange={updateData} />,
    <StepOutput data={data} onChange={updateData} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-semibold">AI Resume Builder</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-3xl px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-primary">Step {step + 1} of {STEPS.length}</span>
            <span className="text-muted-foreground">{STEPS[step]}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="mb-8 min-h-[400px]">
          {stepComponents[step]}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} className="gradient-bg border-0">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSaveAndPreview} disabled={saving} className="gradient-bg border-0">
              {saving ? "Saving..." : "Save & Preview"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
