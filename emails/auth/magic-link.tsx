import * as React from "react";
import {
  Container,
  Heading,
  Link,
  Text,
  Section,
} from "@react-email/components";
import {
  AuthEmailProps,
  config,
  generateAuthCallbackUrl,
} from "@emails-config";
import Layout from "@emails-layout";
import Footer from "@emails-footer";

export const Subject = "Magic Link" as const;
export const Email = (props: AuthEmailProps) => (
  <Layout preview="Your magic link">
    <Container
      style={{
        padding: 20,
        margin: "0 auto",
        backgroundColor: config.colors.background,
      }}
    >
      <Section>
        <Heading
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Your magic link
        </Heading>
        <Text style={{ fontSize: 14, margin: "24px 0" }}>
          This link and code will only be valid for the next 5 minutes. If the
          link does not work, you can use the login verification code directly
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
              Click here to sign in
            </Link>
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
        </Section>
      </Section>
      <Footer
        text1="If you didn't try to login, you can safely ignore this email."
        withRegards
      />
    </Container>
  </Layout>
);
Email.PreviewProps = {
  token: "658259",
};
export default Email;
