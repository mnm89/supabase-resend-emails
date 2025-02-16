"use client";

import { z } from "zod";
import ZForm, { usePhone, zf } from "@/zform";
import { LoadingButton } from "@/components/molecules/loading-button";
import { useAsyncTransition } from "@/hooks/use-async-transition";
import { useUserProfile } from "../_components/provider";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "@/hooks/user-router";
import { Separator } from "@/components/ui/separator";
import { OTPModal } from "@/components/molecules/otp-modal";
import { useState } from "react";
import { format } from "date-fns";

function EmailChange() {
  const { user } = useUserProfile();
  const { isPending, run } = useAsyncTransition();
  const [isOTPEmailOpen, setIsOTPEmailOpen] = useState(false);
  const [isOTPNewEmailOpen, setIsOTPNewEmailOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const client = createClient();
  const { toast } = useToast();
  const router = useRouter();

  return (
    <ZForm
      schema={z.object({
        email: z.string().email(),
      })}
      defaultValues={{ email: user.email }}
      formProps={{ className: "grid grid-cols-2 gap-2 items-end" }}
      onSubmit={(data) =>
        run(async () => {
          if (data.email.trim() === user.email) return;
          setNewEmail(data.email);
          const { error } = await client.auth.updateUser({ email: data.email });
          if (error) {
            return toast({
              variant: "destructive",
              title: error.code,
              description: error.message,
            });
          }
          setIsOTPEmailOpen(true);
        })
      }
      header={
        <OTPModal
          open={isOTPEmailOpen}
          isPending={isPending}
          description={`Please provide the OTP send to ${user.email}`}
          handleConfirm={(otp) =>
            run(async () => {
              /// This also does not work ????
              const { error } = await client.auth.verifyOtp({
                email: user.email!,
                token: otp,
                type: "email_change",
              });
              if (error) {
                return toast({
                  variant: "destructive",
                  title: error.code,
                  description: error.message,
                });
              }
              setIsOTPEmailOpen(false);
              setIsOTPNewEmailOpen(true);
            })
          }
        />
      }
      footer={
        <OTPModal
          open={isOTPNewEmailOpen}
          isPending={isPending}
          description={`Please provide the OTP send to ${newEmail}`}
          handleConfirm={(otp) =>
            run(async () => {
              const { error } = await client.auth.verifyOtp({
                email: newEmail,
                token: otp,
                type: "email_change",
              });
              if (error) {
                return toast({
                  variant: "destructive",
                  title: error.code,
                  description: error.message,
                });
              }
              setIsOTPNewEmailOpen(false);
              router.refresh();
              toast({
                title: "Updated",
                description: "Your email has been updated successfully",
              });
            })
          }
        />
      }
    >
      <div>
        {user.email_change_sent_at && (
          <p className="text-destructive text-xs">
            Your Requested Change Email to
            <span className="mx-1 font-bold">{user.new_email}</span>on
            <span className="mx-1 font-bold">
              {format(new Date(user.email_change_sent_at), "PP 'at' HH:mm")}
            </span>
          </p>
        )}
        <LoadingButton isLoading={isPending} className="max-w-sm w-full mb-2">
          Change
        </LoadingButton>
      </div>
    </ZForm>
  );
}

function PasswordChange() {
  const { user } = useUserProfile();
  const { isPending, run } = useAsyncTransition();
  const client = createClient();
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState("");
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  return (
    <ZForm
      schema={z.object({
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
          .regex(/[0-9]/, "Password must contain at least one number"),
      })}
      formProps={{ className: "grid grid-cols-2 gap-2 items-end" }}
      onSubmit={(data, form) =>
        run(async () => {
          /*   
          This does not work for some reasons 
            const { error } = await client.auth.reauthenticate();
          I can receive the Reauthenticate email but I can 
          not verify the OTP always returning token expired
          maybe I miss understood this https://supabase.com/docs/reference/javascript/auth-reauthentication 

          => As a work around I used the resetPasswordForEmail() with pkce flow
          */
          const { error } = await client.auth.resetPasswordForEmail(
            user.email!
          );
          if (error)
            return toast({
              variant: "destructive",
              title: error.code,
              description: error.message,
            });
          setNewPassword(data.password);
          setIsOTPOpen(true);
          form.reset();
        })
      }
      footer={
        <OTPModal
          open={isOTPOpen}
          isPending={isPending}
          handleConfirm={(otp) => {
            run(async () => {
              const { error } = await client.auth.verifyOtp({
                email: user.email!,
                token: otp,
                type: "recovery",
              });
              if (error) {
                return toast({
                  variant: "destructive",
                  title: error.code,
                  description: error.message,
                });
              }

              const update = await client.auth.updateUser({
                password: newPassword,
              });
              if (!update.error) setIsOTPOpen(false);
              toast({
                variant: update.error ? "destructive" : "default",
                title: update.error ? update.error.code : "Updated",
                description: update.error
                  ? update.error.message
                  : "Your password has been updated successfully",
              });
            });
          }}
        />
      }
    >
      <LoadingButton isLoading={isPending} className="max-w-sm mb-2">
        New Password
      </LoadingButton>
    </ZForm>
  );
}
function PhoneChange() {
  const { user } = useUserProfile();
  const { isPending } = useAsyncTransition();
  const { toast } = useToast();
  const { parse } = usePhone();
  const phoneNumber = parse(user.phone || "");
  return (
    <ZForm
      schema={z.object({ phone: zf.phoneNumber() })}
      defaultValues={{
        phone: {
          formatted: phoneNumber?.formatInternational(),
          phoneCode: phoneNumber?.countryCallingCode,
          value: user.phone,
        },
      }}
      config={{ phone: { typeOverride: "phone-number" } }}
      formProps={{ className: "grid grid-cols-2 gap-2 items-end" }}
      onSubmit={() =>
        toast({
          variant: "default",
          title: "Not Implemented",
          description: "Feel free to submit a pull request",
        })
      }
    >
      <LoadingButton isLoading={isPending} className="max-w-sm mb-2">
        Change
      </LoadingButton>
    </ZForm>
  );
}

export function AccountForm() {
  return (
    <>
      <EmailChange />
      <Separator className="my-6" />
      <PasswordChange />
      <Separator className="my-6" />
      <PhoneChange />
    </>
  );
}
