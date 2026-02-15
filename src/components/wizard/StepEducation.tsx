import { WizardData } from "@/lib/wizard-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface Props { data: WizardData; onChange: (d: Partial<WizardData>) => void; }

export default function StepEducation({ data, onChange }: Props) {
  const update = (field: keyof WizardData["education"], value: string) =>
    onChange({ education: { ...data.education, [field]: value } });

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <GraduationCap className="h-5 w-5 text-primary" /> Education
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label>Degree *</Label>
          <Input value={data.education.degree} onChange={(e) => update("degree", e.target.value)} placeholder="B.Tech in Computer Science" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>College / University *</Label>
          <Input value={data.education.college} onChange={(e) => update("college", e.target.value)} placeholder="MIT" />
        </div>
        <div className="space-y-2">
          <Label>Graduation Year</Label>
          <Input value={data.education.gradYear} onChange={(e) => update("gradYear", e.target.value)} placeholder="2025" />
        </div>
        <div className="space-y-2">
          <Label>CGPA / GPA</Label>
          <Input value={data.education.cgpa} onChange={(e) => update("cgpa", e.target.value)} placeholder="3.8 / 4.0" />
        </div>
      </CardContent>
    </Card>
  );
}
