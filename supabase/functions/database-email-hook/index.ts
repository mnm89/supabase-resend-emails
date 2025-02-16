import React from "npm:react@19.0.0";
import { htmlToTextOptions } from "@emails-config";
import { send } from "../_shared/send.ts";
import { supabaseClientWithAuthHeader } from "../_shared/supabase.ts";
import { templateMap } from "./_templates.ts";
import { WebhookPayload } from "./_types.ts";
import { render } from "npm:@react-email/components@0.0.33";

const handler = async (request: Request): Promise<Response> => {
  let success = false;
  try {
    const { record, schema, old_record, table, type }: WebhookPayload =
      await request.json();
    const client = supabaseClientWithAuthHeader(
      request.headers.get("Authorization")!,
    );
    const hooks = templateMap[schema]?.[table]?.[type];
    if (!hooks) {
      throw new Error("Template not found or hooks not implemented", {
        cause: { schema, table, type },
      });
    }
    for (const hook of hooks) {
      const { prepare, subject, template } = hook;
      const { props, to } = await prepare(
        client,
        record as never,
        old_record as never,
      );
      if (to) {
        success = await send(
          {
            to,
            subject,
            html: await render(React.createElement(template, props), {
              pretty: true,
            }),
            text: await render(React.createElement(template, props), {
              plainText: true,
              htmlToTextOptions,
            }),
          },
        );
      }
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: {
          code: error.code,
          message: error.message,
        },
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "application/json");
  return new Response(JSON.stringify({ success }), {
    status: 200,
    headers: responseHeaders,
  });
};
console.log(`Function "database-email-hook" up and running!`);
Deno.serve(handler);
