import { WizardData, AI_ROLES } from "@/lib/wizard-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brain } from "lucide-react";

interface Props { data: WizardData; onChange: (d: Partial<WizardData>) => void; }

export default function StepRole({ data, onChange }: Props) {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Brain className="h-5 w-5 text-primary" /> Target Role
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">Select the AI role you're targeting</p>
        <RadioGroup value={data.targetRole} onValueChange={(v) => onChange({ targetRole: v })}>
          <div className="grid gap-3 sm:grid-cols-2">
            {AI_ROLES.map((role) => (
              <Label
                key={role}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                  data.targetRole === role ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/30"
                }`}
              >
                <RadioGroupItem value={role} />
                <span className="font-medium">{role}</span>
              </Label>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
