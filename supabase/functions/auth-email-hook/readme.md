# Supabase Auth Email Hook

This Supabase Edge Function listens for authentication-related webhook events and sends corresponding emails using SMTP/Resend. It ensures users receive relevant notifications for authentication actions like signup, password recovery, email changes, and magic link authentication.

## Features

- Verifies webhook payloads using `standardwebhooks`.
- Sends emails based on authentication event types (`signup`, `recovery`, `invite`, `magiclink`, etc.).
- Uses React Email templates for email rendering.
- Supports both HTML and plain text emails.
- Logs the email sending process for debugging.


## Installation

This function requires Deno to run. Install dependencies using:

```sh
deno cache --reload
```

## Deployment

Deploy the function to your Supabase Edge Functions:

```sh
npm run deploy:auth-email-hook

or

supabase functions deploy auth-email-hook --import-map ./import-map.json --no-verify-jwt
```

## Usage

This function is triggered when Supabase emits an authentication-related event. It expects a `POST` request containing a verified webhook payload.

### Expected Webhook Payload

```json
{
  "user": {
    "email": "user@example.com",
    "new_email": "newuser@example.com"
    ...
  },
  "email_data": {
    "email_action_type": "email_change"
    ...
  }
}
```

### Handling Different Authentication Events

The function processes different email actions:

- **Signup** → Sends a welcome email.
- **Password Recovery** → Sends a password reset email.
- **User Invitation** → Sends an invite email.
- **Magic Link Login** → Sends a magic link.
- **Email Change** → Notifies both old and new email addresses.
- **Reauthentication OTP** → Sends a one-time passcode.

## Response

The function returns a JSON response indicating success:

```json
{
  "success": true
}
```

If an error occurs, it returns:

```json
{
  "error": {
    "http_code": 401,
    "message": "Error message here"
  }
}
```

## Logs

Logs will show webhook verification, email sending attempts, and their success or failure status.
