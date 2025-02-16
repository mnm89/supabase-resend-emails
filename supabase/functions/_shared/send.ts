import nodemailer from "npm:nodemailer@6.9.10";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
};
type SupportedMailerProviders = "resend" | "smtp";
type MailerProvider = {
  [x in SupportedMailerProviders]: (args: SendArgs) => Promise<void>;
};

const mailerProviders: MailerProvider = {
  resend: async ({ html, subject, to, from, text }) => {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: from,
        to: [to],
        subject,
        html,
        text: text || html.replace(/<[^>]+>/g, ""),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Resend fails with " + res.statusText, { cause: data });
    }
    console.log("Resend response", data);
  },
  smtp: (args) => {
    const { html, subject, to, from, text } = args;
    const transport = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOSTNAME")!,
      port: Number(Deno.env.get("SMTP_PORT")!),
      secure: Deno.env.get("SMTP_SECURE") === "true",
      auth: {
        user: Deno.env.get("SMTP_USERNAME")!,
        pass: Deno.env.get("SMTP_PASSWORD")!,
      },
    });
    return new Promise<void>((resolve, reject) => {
      transport.sendMail({
        from,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]+>/g, ""),
      }, (error: unknown) => error ? reject(error) : resolve());
    });
  },
};

export async function send(
  { html, subject, to, from = Deno.env.get("DEFAULT_SENDER"), text = "" }:
    SendArgs,
): Promise<boolean> {
  const mailerProvider = Deno.env.get("MAILER_API");

  if (
    !mailerProvider || !Object.keys(mailerProviders).includes(mailerProvider)
  ) {
    throw new Error("Mailer API provider not defined or unrecognized", {
      cause: { mailerProvider, supported: Object.keys(mailerProviders) },
    });
  }
  console.log(
    `Sending "${subject}" email to ${to} using ${mailerProvider} API ....`,
  );
  try {
    await mailerProviders[mailerProvider as SupportedMailerProviders]({
      html,
      subject,
      to,
      from,
      text,
    });
    console.log(`Email delivered successfully ....`);
    return true;
  } catch (error) {
    console.warn(
      `We are not able to deliver "${subject}" email to ${to} using ${mailerProvider} API!!`,
    );
    console.error(error);
    return false;
  }
}
