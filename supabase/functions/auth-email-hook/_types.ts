import React from "npm:react@19.0.0";
import type { AuthEmailProps } from "@emails-config";
import { Database } from "@supabase-types";
import type {
  SupabaseClient,
  User,
} from "https://esm.sh/@supabase/supabase-js@2.47.10";
export type ActionType =
  | "signup"
  | "recovery"
  | "invite"
  | "magiclink"
  | "email_change"
  | "email"
  | "reauthentication";
export type EmailData = {
  site_url: string;
  email_action_type: ActionType;
  redirect_to: string;
  token_hash: string;
  token: string;
  token_new: string;
  token_hash_new: string;
};
export type WebhookVerifyResponse = {
  user: User;
  email_data: EmailData;
};
export type PrepareArgs = {
  client?: SupabaseClient<Database>;
  user: User;
  data: EmailData;
};
export type TemplateMap = {
  [x in ActionType]?: {
    template: (props: AuthEmailProps) => React.JSX.Element;
    subject: string;
    prepare: (
      args: PrepareArgs,
    ) => Promise<{ props: AuthEmailProps; to: User["email"] }>;
  }[];
};
