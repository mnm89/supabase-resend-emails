# Supabase Resend Email

## React Email

A basic email templates highly customizable via **config.ts** or jumping into the components code.

For more details, check out [the documentation](./emails/readme.md).

## Auth Email Hook

This Supabase Edge Function listens for authentication-related webhook events and sends corresponding emails using SMTP/Resend. It ensures users receive relevant notifications for authentication actions like signup, password recovery, email changes, and magic link authentication.

For more details, check out [the documentation](./supabase/functions/auth-email-hook/readme.md).

## Database Email Hook

This Supabase Edge Function listens for database webhook events and sends corresponding emails using SMTP/Resend. It ensures users receive relevant notifications for actions like profile updated, message received ...etc

For more details, check out [the documentation](./supabase/functions/database-email-hook/readme.md).


## Environment Variables

Ensure the following environment variables are set:

```env
# no defaults
SEND_EMAIL_HOOK_SECRET=<your_webhook_secret>
MAILER_API=<'nodemailer' | 'resend'> 
DEFAULT_SENDER=<the_default_email_address_to_send_from>
# resend 
RESEND_API_KEY=<your_resend_api_key>
# smtp
SMTP_PORT=<your_smtp_port>
SMTP_HOST=<your_smtp_host>
SMTP_PORT=<your_smtp_port>
SMTP_USERNAME=<your_smtp_username>
SMTP_PASSWORD=<your_smtp_password>
```

## Troubleshooting

- Ensure your **SEND_EMAIL_HOOK_SECRET** matches the webhook configuration.
- Ensure your **MAILER_API** matches 'resend' or 'nodemailer'.
- Ensure your default sender is defined with **DEFAULT_SENDER**
- Check SMTP credentials in the environment variables when **MAILER_API=nodemailer**
- Ensure your **RESEND_API_KEY** matches the api key when **MAILER_API=resend**.
- Verify that React Email were imported and defined properly within the `import-map.json` file.

## License

MIT License