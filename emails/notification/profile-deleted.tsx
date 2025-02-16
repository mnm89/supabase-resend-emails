import * as React from "react";
import { Heading, Text, Img, Section } from "@react-email/components";
import { config } from "@emails-config";
import Layout from "@emails-layout";
import { Database } from "@supabase-types";
import Footer from "@emails-footer";

export type Props = Database["public"]["Tables"]["profiles"]["Row"];
export const Subject = `Profile Change` as const;
export const Email = ({ full_name }: Props) => (
  <Layout preview="Your profile information has been updated">
    <Img alt="welcome" width="100%" src={config.images.goodby} />
    <Heading
      style={{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
      }}
    >
      Your Account Has Been Deleted
    </Heading>
    <Text>Dear {full_name},</Text>
    <Text>
      We want to inform you that your account has been successfully deleted from
      our system. This means all your personal data, preferences, and associated
      information have been removed.
    </Text>
    <Section
      style={{
        marginTop: "10px",
        padding: "15px",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        borderRadius: "5px",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>What This Means:</Text>
      <ul>
        <li>You will no longer be able to log in or access your profile.</li>
        <li>Any stored data linked to your account has been erased.</li>
        <li>This action is **permanent and cannot be undone**.</li>
      </ul>
    </Section>
    <Footer
      text1="If you did not request this deletion or have any concerns, please reach out to our support team"
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {
  full_name: "Alice Joe",
};
export default Email;
