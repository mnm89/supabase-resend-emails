"use client";

import ZForm from "@/zform";

import { z } from "zod";
import { useAsyncTransition } from "@/hooks/use-async-transition";
import { createClient } from "@/utils/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { LoadingButton } from "./molecules/loading-button";
import { useToast } from "@/hooks/use-toast";
import { OTPModal } from "./molecules/otp-modal";
import { useState } from "react";
import { useRouter } from "@/hooks/user-router";
import { Button } from "./ui/button";

export function LoginForm(props: React.ComponentPropsWithoutRef<"div">) {
  const { isPending, run } = useAsyncTransition();
  const client = createClient();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const router = useRouter();

  return (
    <div {...props}>
      <Tabs defaultValue="link">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="link">Magic Link</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="link">
          <ZForm
            schema={z.object({ email: z.string().email() })}
            onSubmit={(data) => {
              run(async () => {
                const { error } = await client.auth.signInWithOtp({
                  email: data.email,
                });
                if (error) {
                  return toast({
                    variant: "destructive",
                    title: error.code,
                    description: error.message,
                  });
                }
                setEmail(data.email);
                setIsOTPOpen(true);
              });
            }}
            config={{ email: { inputProps: { placeholder: "m@example.com" } } }}
          >
            <LoadingButton
              type="submit"
              className="w-full"
              isLoading={isPending}
            >
              Continue
            </LoadingButton>
          </ZForm>
        </TabsContent>
        <TabsContent value="password">
          <ZForm
            schema={z.object({
              email: z.string().email(),
              password: z.string(),
            })}
            onSubmit={(data) => {
              run(async () => {
                const { error } = await client.auth.signInWithPassword({
                  email: data.email,
                  password: data.password,
                });
                if (error) {
                  return toast({
                    variant: "destructive",
                    title: error.code,
                    description: error.message,
                  });
                }
                router.push("/protected");
              });
            }}
            config={{
              email: {
                inputProps: {
                  placeholder: "m@example.com",
                  autoComplete: "username",
                },
              },
              password: {
                typeOverride: "password",
                inputProps: {
                  autoComplete: "current-password",
                },
              },
            }}
          >
            <Button
              variant="link"
              type="button"
              className="float-right"
              onClick={() =>
                toast({
                  variant: "default",
                  title: "Not Implemented",
                  description: "Feel free to submit a pull request",
                })
              }
            >
              Forgot password ?
            </Button>
            <LoadingButton
              type="submit"
              className="w-full"
              isLoading={isPending}
            >
              Continue
            </LoadingButton>
          </ZForm>
        </TabsContent>
      </Tabs>
      <OTPModal
        open={isOTPOpen}
        isPending={isPending}
        handleConfirm={(otp) => {
          run(async () => {
            const { error } = await client.auth.verifyOtp({
              token: otp,
              email,
              type: "email",
            });
            if (error) {
              return toast({
                variant: "destructive",
                title: error.code,
                description: error.message,
              });
            }
            router.push("/protected");
          });
        }}
      />
    </div>
  );
}
