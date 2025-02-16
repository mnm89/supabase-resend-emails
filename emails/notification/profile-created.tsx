import * as React from "react";
import { Heading, Text, Img } from "@react-email/components";
import { config } from "@emails-config";
import Layout from "@emails-layout";
import { Database } from "@supabase-types";
import Footer from "@emails-footer";

export type Props = Database["public"]["Tables"]["profiles"]["Row"];
export const Subject = `🎉 Welcome to ${config.name.short}` as const;
export const Email = ({ full_name }: Props) => (
  <Layout preview="Your Account is Ready!">
    <Img alt="welcome" width="100%" src={config.images.welcome} />
    <Heading
      style={{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
      }}
    >
      Hi {full_name || "there"} !
    </Heading>
    <Text>
      {`Thank you for confirming your email! Your account has been successfully created, and you're all set to start exploring ${config.name.full} platform`}
    </Text>
    <Text style={{ margin: 0, fontWeight: "bold" }}>
      Here’s what you can do next:
    </Text>
    <Text>✅ - Log in to your account</Text>
    <Text>✅ - Set up your profile and preferences</Text>
    <Footer
      text1="If you have any questions, feel free to reach out to our support team via email or via the contact form."
      text2="We’re excited to have you on board!"
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {
  full_name: "Alex smith",
};
export default Email;
