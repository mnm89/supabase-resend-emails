import { Separator } from "@/components/ui/separator";
import { SocialLinksForm } from "./social-links-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Social Links</h3>
        <p className="text-sm text-muted-foreground">
          Update Your Social Links
        </p>
      </div>
      <Separator />
      <SocialLinksForm />
    </div>
  );
}
