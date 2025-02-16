import * as React from "react";
import { Heading, Link, Text, Section } from "@react-email/components";
import {
  AuthEmailProps,
  config,
  generateAuthCallbackUrl,
} from "@emails-config";
import Layout from "@emails-layout";
import Footer from "@emails-footer";

export const Subject = "Confirm Your Email" as const;
export const Email = (props: AuthEmailProps) => (
  <Layout preview="Please confirm your new email address">
    <Section>
      <Heading
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Verify your email address
      </Heading>
      <Text style={{ fontSize: 14, margin: "24px 0" }}>
        You recently requested to change your email address. Please use the
        following one-time password (OTP) to confirm your new email
      </Text>
      <Section>
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
          {props.token_new}
        </Text>
        <Text style={{ textAlign: "center" }}>
          (This code is valid for 5 minutes)
        </Text>
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
            Or Click here to confirm your email
          </Link>
        </Text>
      </Section>
    </Section>
    <Footer
      text1="If you did not request this change, please ignore this email."
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {
  token_new: "658259",
};
export default Email;
