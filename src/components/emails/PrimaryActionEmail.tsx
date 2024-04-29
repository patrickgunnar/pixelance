import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    render,
} from "@react-email/components";
import { Icons } from "../icons/Icons";
import * as React from "react";

interface PrimaryActionEmailProps {
    actionLabel: string;
    buttonText: string;
    href: string;
}

export default function PrimaryActionEmail({
    actionLabel,
    buttonText,
    href,
}: PrimaryActionEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>The marketplace for high-quality digital goods.</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Icons.logo className="text-green-800 h-10 w-10" />
                    <Text style={paragraph}>Hi there,</Text>
                    <Text style={paragraph}>
                        Welcome to Pixelance, the marketplace for high quality
                        digital assets. Use the button below to {actionLabel}.
                    </Text>
                    <Section style={btnContainer}>
                        <Button style={button} href={href}>
                            {buttonText}
                        </Button>
                    </Section>
                    <Text style={paragraph}>
                        Best,
                        <br />
                        The Pixelance management.
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        If you did not request this email, you can safely ignore
                        it.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

export const PrimaryActionEmailHtml = (props: PrimaryActionEmailProps) =>
    render(<PrimaryActionEmail {...props} />, { pretty: true });

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    padding: "12px 12px",
    backgroundColor: "#2563eb",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
