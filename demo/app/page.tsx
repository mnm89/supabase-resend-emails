import { LoginForm } from "@/components/login-form";
import { SocialLogin } from "@/components/social-login";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <span className="sr-only">Acme Inc.</span>
          </a>
          <h1 className="text-xl font-bold text-center">
            Welcome to Supabase Resend Emails Demo.
          </h1>
        </div>
        <LoginForm />
        <div className="flex flex-col gap-6">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <SocialLogin />
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
          By clicking continue, you agree to our
          <Link href="/terms-of-service" className="mx-1 underline">
            Terms of Service
          </Link>
          and
          <Link href="/privacy-policy" className="mx-1 underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
