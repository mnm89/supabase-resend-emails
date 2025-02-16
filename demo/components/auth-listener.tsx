"use client";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { User, Subscription } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/client";

import { Button } from "./ui/button";
import { useRouter } from "@/hooks/user-router";

export function AuthListener() {
  const pathname = usePathname();
  const client = createClient();
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    let subscription: Subscription;

    async function subscribe() {
      const { data } = await client.auth.onAuthStateChange((event, session) => {
        setUser(session?.user);
      });
      subscription = data.subscription;
    }

    subscribe();

    return () => subscription && subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout() {
    await client.auth.signOut();
    router.replace("/");
  }

  if (user) {
    if (pathname === "/")
      return (
        <div className="bg-foreground text-background py-1 px-2 text-sm rounded-sm">
          Continue as
          <Button
            variant="link"
            onClick={logout}
            className="underline mx-2 text-background"
          >
            {user.email}
          </Button>
          Or
          <Button
            className="underline mx-2 text-background"
            variant="link"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      );

    return (
      <Button asChild size="icon">
        <Button variant="link" onClick={logout}>
          <LogOut className="rotate-180" />
        </Button>
      </Button>
    );
  }

  return null;
}
