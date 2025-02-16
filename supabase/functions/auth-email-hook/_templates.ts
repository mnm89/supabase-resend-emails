import * as ChangeEmailTemplate from "@auth-emails/change-email.tsx";
import * as NewEmailTemplate from "@auth-emails/new-email.tsx";
import * as ConfirmSignupTemplate from "@auth-emails/confirm-signup.tsx";
import * as InviteUserTemplate from "@auth-emails/invite-user.tsx";
import * as MagicLinkTemplate from "@auth-emails/magic-link.tsx";
import * as PasswordRecoveryTemplate from "@auth-emails/password-recovery.tsx";
import * as ReauthenticateOTPTemplate from "@auth-emails/reauthenticate-otp.tsx";
import { PrepareArgs, TemplateMap } from "./_types.ts";

const prepare = ({ data, user }: PrepareArgs) =>
  Promise.resolve({
    props: {
      ...data,
      email: user.email,
      email_new: user.new_email,
      supabase_url: Deno.env.get("SUPABASE_URL") ?? "",
    },
    to: user.email,
  });
export const templateMap: TemplateMap = {
  signup: [
    {
      template: ConfirmSignupTemplate.Email,
      subject: ConfirmSignupTemplate.Subject,
      prepare,
    },
  ],
  email: [
    {
      template: ReauthenticateOTPTemplate.Email,
      subject: ReauthenticateOTPTemplate.Subject,
      prepare,
    },
  ],
  reauthentication: [
    {
      template: ReauthenticateOTPTemplate.Email,
      subject: ReauthenticateOTPTemplate.Subject,
      prepare,
    },
  ],
  email_change: [
    {
      template: ChangeEmailTemplate.Email,
      subject: ChangeEmailTemplate.Subject,
      prepare,
    },
    {
      template: NewEmailTemplate.Email,
      subject: NewEmailTemplate.Subject,
      prepare: ({ data, user }: PrepareArgs) =>
        Promise.resolve({
          props: {
            ...data,
            email: user.email,
            email_new: user.new_email,
            supabase_url: Deno.env.get("SUPABASE_URL") ?? "",
          },
          to: user.new_email,
        }),
    },
  ],
  invite: [
    {
      template: InviteUserTemplate.Email,
      subject: InviteUserTemplate.Subject,
      prepare,
    },
  ],
  magiclink: [
    {
      template: MagicLinkTemplate.Email,
      subject: MagicLinkTemplate.Subject,
      prepare,
    },
  ],
  recovery: [
    {
      template: PasswordRecoveryTemplate.Email,
      subject: PasswordRecoveryTemplate.Subject,
      prepare,
    },
  ],
};
