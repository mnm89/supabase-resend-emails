import * as React from "react";
import { Heading, Link, Text, Section, Hr } from "@react-email/components";
import {
  AuthEmailProps,
  config,
  generateAuthCallbackUrl,
} from "@emails-config";
import Layout from "@emails-layout";
import Footer from "@emails-footer";

export const Subject = "Confirm Your Signup" as const;
export const Email = (props: AuthEmailProps) => (
  <Layout preview="Please confirm your email">
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
        {`Thanks for starting the new ${config.name.short} account creation
        process. We want to make sure it's really you. Please enter the
        following verification code when prompted. If you don't want to
        create an account, you can ignore this message.`}
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
          {props.token}
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
            Or Follow this link to complete your signup
          </Link>
        </Text>
      </Section>
    </Section>
    <Footer
      text1={`${config.name.full} will never email you and ask you to disclose or verify
    your password, credit card, or banking account number.`}
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {
  token: "658259",
};
export default Email;
