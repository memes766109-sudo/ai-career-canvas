import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { WizardData, defaultWizardData } from "@/lib/wizard-types";
import { ArrowLeft, Download, Globe, Sparkles } from "lucide-react";
import ResumeClassicATS from "@/components/templates/ResumeClassicATS";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

export default function Preview() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<WizardData>(defaultWizardData);
  const [portfolioSlug, setPortfolioSlug] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const type = searchParams.get("type") || "resume";
  const resumeId = searchParams.get("resumeId");
  const portfolioId = searchParams.get("portfolioId");

  useEffect(() => {
    const load = async () => {
      if (resumeId) {
        const { data: r } = await supabase.from("resumes").select("*").eq("id", resumeId).single();
        if (r) setData((prev) => ({ ...prev, ...(r.data as Partial<WizardData>), resumeTemplate: r.template }));
      }
      if (portfolioId) {
        const { data: p } = await supabase.from("portfolios").select("*").eq("id", portfolioId).single();
        if (p) {
          setData((prev) => ({ ...prev, ...(p.data as Partial<WizardData>), portfolioTemplate: p.template }));
          setPortfolioSlug(p.slug);
        }
      }
    };
    load();
  }, [resumeId, portfolioId]);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    toast.info("Generating PDF...");
    const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save(`${data.personalDetails.fullName || "resume"}-ai-resume.pdf`);
    toast.success("PDF downloaded!");
  };

  const showResume = type === "resume" || type === "both";
  const showPortfolio = type === "portfolio" || type === "both";

  return (
    <div className="min-h-screen bg-muted">
      {/* Top bar */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            {showResume && (
              <Button size="sm" onClick={downloadPDF} className="gradient-bg border-0">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            )}
            {showPortfolio && portfolioSlug && (
              <Button size="sm" variant="outline" asChild>
                <Link to={`/portfolio/${portfolioSlug}`} target="_blank">
                  <Globe className="mr-2 h-4 w-4" /> View Live Portfolio
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {showResume && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Resume Preview
            </h2>
            <div className="mx-auto max-w-[800px] bg-card rounded-lg shadow-soft overflow-hidden">
              <div ref={resumeRef}>
                <ResumeClassicATS data={data} />
              </div>
            </div>
          </section>
        )}

        {showPortfolio && portfolioSlug && (
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-secondary" /> Portfolio Preview
            </h2>
            <div className="rounded-lg border border-border overflow-hidden shadow-soft">
              <iframe
                src={`/portfolio/${portfolioSlug}`}
                className="w-full h-[600px]"
                title="Portfolio Preview"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
