import { WizardData, Experience } from "@/lib/wizard-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, Trash2 } from "lucide-react";

interface Props { data: WizardData; onChange: (d: Partial<WizardData>) => void; }

export default function StepExperience({ data, onChange }: Props) {
  const addExp = () => {
    const newExp: Experience = { id: crypto.randomUUID(), title: "", company: "", duration: "", description: "" };
    onChange({ experiences: [...data.experiences, newExp] });
  };

  const updateExp = (id: string, field: keyof Experience, value: string) => {
    onChange({ experiences: data.experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)) });
  };

  const removeExp = (id: string) => {
    onChange({ experiences: data.experiences.filter((e) => e.id !== id) });
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-display">
          <span className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" /> Experience (Optional)
          </span>
          <Button size="sm" variant="outline" onClick={addExp}>
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.experiences.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No experience added. This is optional — your projects and skills speak volumes!
          </p>
        )}
        {data.experiences.map((exp, i) => (
          <div key={exp.id} className="space-y-3 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">Experience {i + 1}</span>
              <Button size="sm" variant="ghost" onClick={() => removeExp(exp.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input value={exp.title} onChange={(e) => updateExp(exp.id, "title", e.target.value)} placeholder="ML Intern" />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} placeholder="Google AI" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input value={exp.duration} onChange={(e) => updateExp(exp.id, "duration", e.target.value)} placeholder="Jun 2024 – Aug 2024" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={exp.description} onChange={(e) => updateExp(exp.id, "description", e.target.value)} placeholder="Key responsibilities and achievements" rows={3} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
