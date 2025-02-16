import * as React from "react";
import { Heading, Text, Img } from "@react-email/components";
import { config } from "@emails-config";
import Layout from "@emails-layout";
import { Database } from "@supabase-types";
import Footer from "@emails-footer";

export type Props = {
  old: Database["public"]["Tables"]["profiles"]["Row"];
  new: Database["public"]["Tables"]["profiles"]["Row"];
};
export const Subject = `Profile Change` as const;
export const Email = (_props: Props) => (
  <Layout preview="Your profile information has been updated">
    <Heading
      style={{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
      }}
    >
      Profile Updated Successfully
    </Heading>
    <Text>
      Hello, We wanted to let you know that your profile information has been
      updated. If you made this change, you can safely ignore this message.
    </Text>
    <Text>
      If you did not update your profile, please review your account settings
      immediately and reset your password.
    </Text>
    <Footer
      text1="If you have any questions, feel free to reach out to our support team via email or via the contact form."
      withRegards
    />
  </Layout>
);
Email.PreviewProps = {};
export default Email;
