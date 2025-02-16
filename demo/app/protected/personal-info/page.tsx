import { Separator } from "@/components/ui/separator";
import { InfoForm } from "./info-form";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Personal information</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal data. Set your address and date of birth.
        </p>
      </div>
      <Separator />
      <InfoForm />
    </div>
  );
}
