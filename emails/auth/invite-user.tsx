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

export const Subject = "You have been invited" as const;
export const Email = (props: AuthEmailProps) => (
  <Layout preview="Please confirm invitation">
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
          You have been invited
        </Heading>
        <Text style={{ fontSize: 14, margin: "24px 0" }}>
          {`You have been invited to create an ${config.name.short} user account on`}
          <Link
            href="#"
            style={{
              marginLeft: 5,
              fontWeight: "bold",
              color: config.colors.accent,
            }}
          >
            {config.website}
          </Link>
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
              Follow this link to accept the invite
            </Link>
          </Text>
        </Section>
      </Section>
      <Footer
        text1="If you were not expecting this invitation, you can ignore this email."
        withRegards
      />
    </Container>
  </Layout>
);
Email.PreviewProps = {
  redirect_to: "https://webiste.example.com",
};
export default Email;
