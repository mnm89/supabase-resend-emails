import * as React from "react";
import { Container, Hr, Text, Section } from "@react-email/components";
import { config } from "@emails-config";

interface Props {
  text1: string;
  text2?: string;
  withRegards?: boolean;
}

const BestRegards = ({ withRegards }: Props) => {
  if (!withRegards) return null;
  return (
    <>
      <Text style={{ marginBottom: 0 }}>Best Regards,</Text>
      <Text style={{ margin: 0, fontSize: 14, fontWeight: "bold" }}>
        The {config.name.full} Team
      </Text>
    </>
  );
};

export const Footer = (props: Props) => {
  return (
    <Container style={{ fontFamily: config.font }}>
      <Hr />
      <Section>
        <Text style={{ margin: 0 }}>{props.text1}</Text>
        {props.text2 && <Text style={{ margin: 0 }}>{props.text2}</Text>}
        <BestRegards {...props} />
      </Section>
    </Container>
  );
};
Footer.PreviewProps = {
  withRegards: true,
  text1:
    "If you have any questions, feel free to reach out to our support team or via the contact form.",
  text2: "We’re excited to have you on board!",
};
export default Footer;
