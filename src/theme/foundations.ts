import { theme as base } from "@chakra-ui/react"; // Add fallback to base theme

// For global style overrides
export const foundations = {
  colors: {
    redwood: {
      "50": "#F7F0ED",
      "100": "#E9D4CE",
      "200": "#DAB9AE",
      "300": "#CC9D8F",
      "400": "#BE826F",
      "500": "#AF6650",
      "600": "#8C5240",
      "700": "#693D30",
      "800": "#462920",
      "900": "#231410",
    },
  },
  fonts: {
    heading: `GeneralSans-Variable, ${base.fonts.heading}`,
    body: `GeneralSans-Variable, ${base.fonts.body}`,
  },
};
