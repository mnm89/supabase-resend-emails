export const config = {
  name: { full: "Supabase Resend Emails", short: "SRE" },
  description:
    "A reusable code example of sending emails with resend and supabase edge functions with auth hook and database hook",
  email: "info@yourdomain.com",
  website: "https://www.yourdomain.com",
  domain: "yourdomain.com",
  phone: {
    formatted: "+1 32 238430",
    link: "tel:+132238430",
  },
  address: {
    street: "Street And House Number 36",
    postal: " 12345",
    state: "State",
    country: "Country",
    maps: "https://maps.app.goo.gl",
  },
  font:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  colors: {
    background: "#ffffff",
    foreground: "#1b1b29",
    muted: "#f0f4f8",
    mutedForeground: "#798295",
    primary: "#8cc9ff",
    secondary: "#fafafa",
    accent: "#20416f",
    destructive: "#ff0000",
  },
  logo: {
    small: "https://placehold.co/200x200.png",
    large: "https://placehold.co/400x400.png",
  },
  images: {
    header: "https://placehold.co/600x400.png",
    welcome: "https://placehold.co/600x400.png",
  },
  links: [
    {
      image:
        "https://cxklmrezqrjsxxczgjmk.supabase.co/storage/v1/object/public/assets//website.png",
      alt: "website",
      url: "",
    },
    {
      image:
        "https://cxklmrezqrjsxxczgjmk.supabase.co/storage/v1/object/public/assets//x.png",
      alt: "twitter",
      url: "",
    },
    {
      image:
        "https://cxklmrezqrjsxxczgjmk.supabase.co/storage/v1/object/public/assets//facebook.png",
      alt: "facebook",
      url: "",
    },
    {
      image:
        "https://cxklmrezqrjsxxczgjmk.supabase.co/storage/v1/object/public/assets//instagram.png",
      alt: "instagram",
      url: "",
    },
    {
      image:
        "https://cxklmrezqrjsxxczgjmk.supabase.co/storage/v1/object/public/assets//youtube.png",
      alt: "youtube",
      url: "",
    },
    {
      image:
        "https://cxklmrezqrjsxxczgjmk.supabase.co/storage/v1/object/public/assets//tiktok.png",
      alt: "tiktok",
      url: "",
    },
  ],
  stores: [
    {
      image:
        "https://cxklmrezqrjsxxczgjmk.supabase.co/storage/v1/object/public/assets//google-play.png",
      alt: "Get it on Google Play button",
      url: "",
    },
    {
      image:
        "https://cxklmrezqrjsxxczgjmk.supabase.co/storage/v1/object/public/assets//app-store.png",
      alt: "Download on the App Store button",
      url: "",
    },
  ],
} as const;

export interface AuthEmailProps {
  supabase_url: string;
  email_action_type:
    | "signup"
    | "recovery"
    | "invite"
    | "magiclink"
    | "email_change"
    | "email"
    | "reauthentication";
  redirect_to: string;
  email: string | undefined;
  token_hash: string;
  token: string;
  email_new: string | undefined;
  token_new: string;
  token_hash_new: string;
}

export const htmlToTextOptions = {
  selectors: [
    { selector: "img", format: "skip" },
    { selector: "#__react-email-preview", format: "skip" },
    {
      selector: "a",
      options: { linkBrackets: true },
    },
    { selector: ".social-links", format: "skip" },
    { selector: ".store-links", format: "skip" },
  ],
};
export const generateAuthCallbackUrl = (
  { redirect_to, token_hash, email_action_type, supabase_url }: AuthEmailProps,
) => {
  return `${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`;
};
export function humanizeKey(key: string) {
  return key
    .replace(/_|-/g, " ") // Replace all underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}
