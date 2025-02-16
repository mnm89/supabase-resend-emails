import * as React from "react";
import { Heading, Link, Text, Section } from "@react-email/components";
import {
  AuthEmailProps,
  config,
  generateAuthCallbackUrl,
} from "@emails-config";
import Layout from "@emails-layout";
import Footer from "@emails-footer";

export const Subject = "Confirm Email Change" as const;
export const Email = (props: AuthEmailProps) => (
  <Layout preview="Please confirm change of your email">
    <Section>
      <Heading
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Confirm Change of Email
      </Heading>

      <Text style={{ fontSize: 14, margin: "24px 0" }}>
        We received a request to update the email address associated with your
        account. Your email is being changed
      </Text>
      <Text>
        - from:
        <Link
          style={{
            marginLeft: 10,
            color: config.colors.accent,
            fontWeight: "bold",
          }}
          href="#"
        >
          {props.email}
        </Link>
      </Text>
      <Text>
        - to:
        <Link
          style={{
            marginLeft: 10,
            color: config.colors.accent,
            fontWeight: "bold",
          }}
          href="#"
        >
          {props.email_new}
        </Link>
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
          Follow this link to confirm request
        </Link>
      </Text>
      <Section>
        <Text>Alternatively, use the following 6-digit code when prompted</Text>
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
      text1="If you did not request this change, please take immediate action to secure your account by contacting our support team or resetting your password."
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {
  token: "658259",
  email: "old.email@example.com",
  email_new: "new.email@example.com",
};
export default Email;
