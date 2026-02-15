import { WizardData } from "@/lib/wizard-types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

interface Props { data: WizardData; onChange: (d: Partial<WizardData>) => void; }

export default function StepCertifications({ data, onChange }: Props) {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Award className="h-5 w-5 text-primary" /> Certifications & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">List your certifications and notable achievements (one per line)</p>
        <div className="space-y-2">
          <Label>Certifications & Achievements</Label>
          <Textarea
            value={data.certifications}
            onChange={(e) => onChange({ certifications: e.target.value })}
            placeholder={"AWS Certified Machine Learning – Specialty\nDeep Learning Specialization (Coursera)\nKaggle Competition — Top 5%\nPublished paper at NeurIPS 2024"}
            rows={8}
          />
        </div>
      </CardContent>
    </Card>
  );
}
