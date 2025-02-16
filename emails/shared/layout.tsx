import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
} from "@react-email/components";
import { config } from "@emails-config";
import Header from "@emails-header";
import Signature from "@emails-signature";
const Layout = ({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: string;
}) => {
  return (
    <Html style={{ fontFamily: config.font }} lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: config.colors.muted }}>
        <Header />
        <Container
          style={{
            padding: 20,
            margin: "0 auto",
            backgroundColor: config.colors.background,
            minHeight: 320,
          }}
        >
          {children}
        </Container>
        <Signature />
      </Body>
    </Html>
  );
};
Layout.PreviewProps = {
  children: "Layout children goes here",
  preview: "This is an email preview",
};
export default Layout;
