import { WizardData } from "@/lib/wizard-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";

interface Props { data: WizardData; onChange: (d: Partial<WizardData>) => void; }

export default function StepSkills({ data, onChange }: Props) {
  const update = (field: keyof WizardData["skills"], value: string) =>
    onChange({ skills: { ...data.skills, [field]: value } });

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Code className="h-5 w-5 text-primary" /> Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Separate items with commas</p>
        <div className="space-y-2">
          <Label>Programming Languages</Label>
          <Input value={data.skills.languages} onChange={(e) => update("languages", e.target.value)} placeholder="Python, R, C++, SQL" />
        </div>
        <div className="space-y-2">
          <Label>AI/ML Skills</Label>
          <Input value={data.skills.mlSkills} onChange={(e) => update("mlSkills", e.target.value)} placeholder="Deep Learning, NLP, Computer Vision, Transformers" />
        </div>
        <div className="space-y-2">
          <Label>Tools</Label>
          <Input value={data.skills.tools} onChange={(e) => update("tools", e.target.value)} placeholder="Jupyter, Docker, Git, MLflow, Weights & Biases" />
        </div>
        <div className="space-y-2">
          <Label>Frameworks / Libraries</Label>
          <Input value={data.skills.frameworks} onChange={(e) => update("frameworks", e.target.value)} placeholder="PyTorch, TensorFlow, Scikit-learn, Hugging Face, LangChain" />
        </div>
        <div className="space-y-2">
          <Label>Databases</Label>
          <Input value={data.skills.databases} onChange={(e) => update("databases", e.target.value)} placeholder="PostgreSQL, MongoDB, Pinecone, ChromaDB" />
        </div>
      </CardContent>
    </Card>
  );
}
