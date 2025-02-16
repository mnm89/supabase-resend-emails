import { Separator } from "@/components/ui/separator";
import { PreferencesForm } from "./preferences-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app and Set your preferred language
          and timezone.
        </p>
      </div>
      <Separator />
      <PreferencesForm />
    </div>
  );
}
