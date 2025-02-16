import * as React from "react";
import { Heading, Text } from "@react-email/components";
import { config } from "@emails-config";
import Layout from "@emails-layout";
import { Database } from "@supabase-types";
import Footer from "@emails-footer";

export type Props = Database["public"]["Tables"]["contact_message"]["Row"];
export const Subject = `✅ We've Received Your Message!` as const;
export const Email = (props: Props) => (
  <Layout preview="Thank you">
    <Heading
      style={{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
      }}
    >
      Hi {props.first_name || "there"} !
    </Heading>
    <Text>
      Thank you for reaching out to us! We've received your message and our team
      will review it shortly.
    </Text>
    <Text style={{ margin: 0, fontWeight: "bold" }}>
      Here’s what you sent us:
    </Text>
    <Text style={{ fontWeight: "bold", fontSize: 16 }}>- Subject:</Text>
    <Text style={{ textAlign: "left" }}>{props.subject}</Text>

    <Text style={{ fontWeight: "bold", fontSize: 16 }}>- Message:</Text>
    <Text>{props.message}</Text>
    <Footer
      text1={`We aim to respond as soon as possible. If your inquiry is urgent, feel free to reach out to us directly at ${config.email} or ${config.phone.formatted}.`}
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {
  first_name: "Alice Joe",
  subject: "Partnership Inquiry",
  message:
    "I would love to discuss the opportunity to have a partnership and share my expertise with you",
};
export default Email;
