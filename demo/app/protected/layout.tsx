import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./_components/side-nav";
import { UserProfileProvider } from "./_components/provider";
import { createClient } from "@/utils/supabase/server";
import { forbidden } from "next/navigation";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const client = await createClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) return forbidden();

  const profile = await client.from("profiles").select().single();

  if (profile.error || !profile.data) return forbidden();

  return (
    <div className="space-y-6 px-5 md:px-10 py-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <UserProfileProvider user={user} profile={profile.data}>
            {children}
          </UserProfileProvider>
        </div>
      </div>
    </div>
  );
}
