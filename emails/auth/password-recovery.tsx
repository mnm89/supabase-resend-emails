import * as React from "react";
import { Heading, Link, Text, Section } from "@react-email/components";
import {
  AuthEmailProps,
  config,
  generateAuthCallbackUrl,
} from "@emails-config";
import Layout from "@emails-layout";
import Footer from "@emails-footer";

export const Subject = "Reset Your Password" as const;
export const Email = (props: AuthEmailProps) => (
  <Layout preview="Please follow these instructions to reset your password">
    <Section>
      <Heading
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Password Recovery
      </Heading>
      <Text style={{ fontSize: 14, margin: "24px 0" }}>
        {`Someone recently requested a password change for your ${config.name.short} account. If
        this was you, you can set a new password here:`}
      </Text>
      <Section>
        <Text style={{ textAlign: "center" }}>
          <Link
            href={generateAuthCallbackUrl(props)}
            target="_blank"
            style={{
              color: config.colors.accent,
              fontSize: "20px",
              textDecoration: "underline",
            }}
          >
            Reset Password
          </Link>
        </Text>
        <Text style={{ fontSize: 14, margin: "24px 0" }}>
          Or enter the following verification code when prompted
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Verification code
        </Text>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 36,
            textAlign: "center",
          }}
        >
          {props.token}
        </Text>
        <Text style={{ textAlign: "center" }}>
          (This code is valid for 5 minutes)
        </Text>
      </Section>
    </Section>
    <Footer
      text1="If you don't want to change your password or didn't request this, just
        ignore and delete this message."
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {
  token: "658259",
};
export default Email;
