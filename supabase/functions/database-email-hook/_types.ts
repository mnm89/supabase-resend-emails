import React from "npm:react@19.0.0";
import { Database } from "@supabase-types";
import {
  SupabaseClient,
  User,
} from "https://esm.sh/@supabase/supabase-js@2.47.10";

export type Table = keyof Database["public"]["Tables"];
export type Schema = keyof Database;
export type Row<S extends Schema = Schema, T extends Table = Table> =
  Database[S]["Tables"][T]["Row"];
export type Event = "INSERT" | "UPDATE" | "DELETE";
export type WebhookPayload<
  S extends Schema = Schema,
  T extends Table = Table,
  E extends Event = Event,
> = E extends "INSERT" ? {
    type: "INSERT";
    table: T;
    schema: S;
    record: Row<S, T>;
    old_record: null;
  }
  : E extends "UPDATE" ? {
      type: "UPDATE";
      table: T;
      schema: S;
      record: Row<S, T>;
      old_record: Row<S, T>;
    }
  : E extends "DELETE" ? {
      type: "DELETE";
      table: T;
      schema: S;
      record: null;
      old_record: Row<S, T>;
    }
  : never;
// deno-lint-ignore no-explicit-any
export type AnyProps = any;
export type DatabaseEventHook<
  P extends AnyProps = AnyProps,
  S extends Schema = Schema,
  T extends Table = Table,
  E extends Event = Event,
> = {
  template: (props: P) => React.JSX.Element;
  subject: string;
  prepare: (
    client: SupabaseClient<Database, S>,
    record: WebhookPayload<S, T, E>["record"],
    old_record: WebhookPayload<S, T, E>["old_record"],
  ) => Promise<{ props: P; to: User["email"] }>;
};
export type TemplateMap<
  S extends Schema = "public",
  T extends Table = Table,
  E extends Event = Event,
> = {
  [schema in S]: {
    [table in T]?: {
      [event in E]?: DatabaseEventHook<AnyProps, schema, table, event>[];
    };
  };
};
