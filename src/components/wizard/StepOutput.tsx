import { WizardData } from "@/lib/wizard-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Globe, Layers } from "lucide-react";

interface Props { data: WizardData; onChange: (d: Partial<WizardData>) => void; }

const docTypes = [
  { value: "resume", label: "Resume Only", icon: FileText, desc: "Download as PDF" },
  { value: "portfolio", label: "Portfolio Only", icon: Globe, desc: "Get a live URL" },
  { value: "both", label: "Resume + Portfolio", icon: Layers, desc: "Best of both worlds" },
] as const;

const resumeTemplates = [
  { value: "classic-ats", label: "Classic ATS", desc: "Single column, ATS-optimized" },
  { value: "modern-ai", label: "Modern AI", desc: "Modern layout, strong project focus" },
  { value: "fresher-ai", label: "Fresher AI", desc: "Projects & certifications heavy" },
];

const portfolioTemplates = [
  { value: "minimal-ai", label: "Minimal AI", desc: "Clean, minimal sections" },
  { value: "modern-dev", label: "Modern AI Dev", desc: "Hero + Skills + Timeline" },
  { value: "research", label: "AI Research", desc: "Research-oriented layout" },
];

export default function StepOutput({ data, onChange }: Props) {
  const showResume = data.documentType === "resume" || data.documentType === "both";
  const showPortfolio = data.documentType === "portfolio" || data.documentType === "both";

  return (
    <div className="space-y-6">
      {/* Document Type */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-display">Choose Output Type</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={data.documentType} onValueChange={(v) => onChange({ documentType: v as any })}>
            <div className="grid gap-3 sm:grid-cols-3">
              {docTypes.map((t) => (
                <Label
                  key={t.value}
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-5 text-center transition-all ${
                    data.documentType === t.value ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/30"
                  }`}
                >
                  <RadioGroupItem value={t.value} className="sr-only" />
                  <t.icon className="h-6 w-6 text-primary" />
                  <span className="font-semibold">{t.label}</span>
                  <span className="text-xs text-muted-foreground">{t.desc}</span>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Resume Template */}
      {showResume && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display text-lg">Resume Template</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={data.resumeTemplate} onValueChange={(v) => onChange({ resumeTemplate: v })}>
              <div className="grid gap-3 sm:grid-cols-3">
                {resumeTemplates.map((t) => (
                  <Label
                    key={t.value}
                    className={`flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-all ${
                      data.resumeTemplate === t.value ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value={t.value} className="sr-only" />
                    <span className="font-semibold">{t.label}</span>
                    <span className="text-xs text-muted-foreground">{t.desc}</span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Portfolio Template */}
      {showPortfolio && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display text-lg">Portfolio Template</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={data.portfolioTemplate} onValueChange={(v) => onChange({ portfolioTemplate: v })}>
              <div className="grid gap-3 sm:grid-cols-3">
                {portfolioTemplates.map((t) => (
                  <Label
                    key={t.value}
                    className={`flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-all ${
                      data.portfolioTemplate === t.value ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value={t.value} className="sr-only" />
                    <span className="font-semibold">{t.label}</span>
                    <span className="text-xs text-muted-foreground">{t.desc}</span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
