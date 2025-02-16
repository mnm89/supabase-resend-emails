import * as React from "react";
import {
  Column,
  Container,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { config } from "@emails-config";
const Signature = () => {
  return (
    <Container style={{ fontFamily: config.font }}>
      <Hr />
      <Row
        style={{
          height: 44,
          width: 56,
          alignItems: "center",
        }}
        className="social-links"
      >
        {config.links.map((link) => (
          <Column key={link.alt} style={{ paddingRight: 8 }}>
            <Link
              href={link.url}
              style={{ color: config.colors.mutedForeground }}
            >
              <Img alt={link.alt} height={24} src={link.image} />
            </Link>
          </Column>
        ))}
      </Row>
      <Row
        cellSpacing={8}
        style={{
          backgroundColor: config.colors.primary,
          overflow: "hidden",
        }}
        className="store-links"
      >
        {config.stores.map((store) => (
          <Column
            align={
              store.alt === "Get it on Google Play button" ? "right" : "left"
            }
            width={"50%"}
            key={store.alt}
          >
            <Link href={store.url}>
              <Img alt={store.alt} height={32} src={store.image} />
            </Link>
          </Column>
        ))}
      </Row>
      <Section style={{ backgroundColor: config.colors.accent }}>
        <Text
          style={{
            fontSize: "12px",
            textAlign: "center",
            margin: 0,
            color: config.colors.secondary,
          }}
        >
          <Link
            style={{
              color: config.colors.secondary,
              marginRight: 5,
            }}
            href="#"
          >
            {config.email}
          </Link>
          |
          <Link
            style={{
              color: config.colors.secondary,
              marginLeft: 5,
            }}
            href="#"
          >
            {config.phone.formatted}
          </Link>
        </Text>
        <Text
          style={{
            fontSize: "12px",
            textAlign: "center",
            margin: 0,
          }}
        >
          <Link
            style={{
              color: config.colors.secondary,
            }}
            href={config.address.maps}
          >
            {`${config.address.street} | ${config.address.state} ${config.address.postal} | ${config.address.country}`}
          </Link>
        </Text>
      </Section>
      <Text
        style={{
          fontSize: "12px",
          color: config.colors.mutedForeground,
          textAlign: "center",
          margin: 0,
        }}
      >
        🌱🌍 Please consider the environment before printing this email.
      </Text>
      <Text
        style={{
          margin: 0,
          textAlign: "center",
          color: config.colors.mutedForeground,
        }}
      >
        Copyright © {config.domain} {new Date().getFullYear()}
      </Text>
    </Container>
  );
};
export default Signature;
