import * as React from "react";
import {
  Column,
  Container,
  Heading,
  Hr,
  Img,
  Row,
  Section,
} from "@react-email/components";
import { config } from "@emails-config";
export const Header = () => {
  return (
    <Container style={{ fontFamily: config.font }}>
      <Section
        style={{
          backgroundColor: config.colors.accent,
        }}
      >
        <Row>
          <Column style={{ width: "33.333333%" }}>
            <Img
              src={config.logo.small}
              width="96"
              height="96"
              alt={config.name.full}
            />
          </Column>
          <Column style={{ width: "66.666667%" }}>
            <Heading
              style={{
                color: config.colors.secondary,
                fontSize: "20px",
              }}
            >
              {config.name.full}
            </Heading>
          </Column>
        </Row>
      </Section>
      <Hr />
    </Container>
  );
};
export default Header;
