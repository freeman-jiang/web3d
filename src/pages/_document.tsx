import Document, { Html, Head, Main, NextScript } from "next/document";
import dotenv from "dotenv-safe";
import { ColorModeScript } from "@chakra-ui/react";

// Check that all environment variables in ".env.example" are defined
dotenv.config();

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
