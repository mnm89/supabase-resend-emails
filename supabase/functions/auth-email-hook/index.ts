import React from "npm:react@19.0.0";
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";
import { render } from "npm:@react-email/components@0.0.33";
import { htmlToTextOptions } from "@emails-config";
import type { WebhookVerifyResponse } from "./_types.ts";
import { templateMap } from "./_templates.ts";
import { send } from "../_shared/send.ts";

const hookSecret = Deno.env.get("SEND_EMAIL_HOOK_SECRET") as string;

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("not allowed", { status: 400 });
  }

  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);
  const wh = new Webhook(hookSecret);
  let success = false;
  try {
    const {
      user,
      email_data,
    } = wh.verify(payload, headers) as WebhookVerifyResponse;
    console.log(
      "Webhook Verification pass for action",
      email_data.email_action_type,
    );
    const hooks = templateMap[email_data.email_action_type];
    if (!hooks) {
      throw new Error("Template not found or hooks not implemented", {
        cause: {
          have: Object.keys(templateMap),
          got: email_data.email_action_type,
        },
      });
    }
    for (const hook of hooks) {
      const { prepare, subject, template } = hook;
      const { props, to } = await prepare({ data: email_data, user });
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
          http_code: error.code,
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

console.log(`Function "auth-email-hook" up and running!`);
Deno.serve(handler);
