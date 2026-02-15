import { WizardData } from "@/lib/wizard-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface Props { data: WizardData; onChange: (d: Partial<WizardData>) => void; }

export default function StepPersonal({ data, onChange }: Props) {
  const update = (field: keyof WizardData["personalDetails"], value: string) =>
    onChange({ personalDetails: { ...data.personalDetails, [field]: value } });

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <User className="h-5 w-5 text-primary" /> Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label>Full Name *</Label>
          <Input value={data.personalDetails.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label>Email *</Label>
          <Input type="email" value={data.personalDetails.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input value={data.personalDetails.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 234 567 890" />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input value={data.personalDetails.location} onChange={(e) => update("location", e.target.value)} placeholder="San Francisco, CA" />
        </div>
        <div className="space-y-2">
          <Label>LinkedIn</Label>
          <Input value={data.personalDetails.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="linkedin.com/in/johndoe" />
        </div>
        <div className="space-y-2">
          <Label>GitHub</Label>
          <Input value={data.personalDetails.github} onChange={(e) => update("github", e.target.value)} placeholder="github.com/johndoe" />
        </div>
      </CardContent>
    </Card>
  );
}
