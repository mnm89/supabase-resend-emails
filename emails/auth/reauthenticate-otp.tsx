import * as React from "react";
import { Heading, Text, Section } from "@react-email/components";
import { AuthEmailProps } from "@emails-config";
import Layout from "@emails-layout";
import Footer from "@emails-footer";

export const Subject = "Confirm Identity" as const;
export const Email = ({ token }: AuthEmailProps) => (
  <Layout preview="Please confirm your action with the provided code">
    <Section>
      <Heading
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Enter the code
      </Heading>
      <Section>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 36,
            textAlign: "center",
          }}
        >
          {token}
        </Text>
      </Section>
    </Section>
    <Footer
      text1="We've received a request related to your account. Use the code above where prompted to continue."
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {
  token: "658259",
};
export default Email;
