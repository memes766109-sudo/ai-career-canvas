import { WizardData, Project } from "@/lib/wizard-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus, Trash2 } from "lucide-react";

interface Props { data: WizardData; onChange: (d: Partial<WizardData>) => void; }

export default function StepProjects({ data, onChange }: Props) {
  const addProject = () => {
    const newProject: Project = { id: crypto.randomUUID(), title: "", problem: "", techStack: "", contributions: "", outcome: "" };
    onChange({ projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({ projects: data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)) });
  };

  const removeProject = (id: string) => {
    onChange({ projects: data.projects.filter((p) => p.id !== id) });
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-display">
          <span className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" /> AI Projects
          </span>
          <Button size="sm" variant="outline" onClick={addProject}>
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.projects.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No projects yet. Click "Add" to add your AI projects.
          </p>
        )}
        {data.projects.map((p, i) => (
          <div key={p.id} className="space-y-3 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">Project {i + 1}</span>
              <Button size="sm" variant="ghost" onClick={() => removeProject(p.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={p.title} onChange={(e) => updateProject(p.id, "title", e.target.value)} placeholder="AI-Powered Chatbot" />
            </div>
            <div className="space-y-2">
              <Label>Problem Statement</Label>
              <Textarea value={p.problem} onChange={(e) => updateProject(p.id, "problem", e.target.value)} placeholder="What problem does this solve?" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <Input value={p.techStack} onChange={(e) => updateProject(p.id, "techStack", e.target.value)} placeholder="Python, LangChain, GPT-4, ChromaDB" />
            </div>
            <div className="space-y-2">
              <Label>Key Contributions</Label>
              <Textarea value={p.contributions} onChange={(e) => updateProject(p.id, "contributions", e.target.value)} placeholder="Bullet points of what you did (one per line)" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Outcome / Impact</Label>
              <Input value={p.outcome} onChange={(e) => updateProject(p.id, "outcome", e.target.value)} placeholder="Reduced query time by 40%" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
