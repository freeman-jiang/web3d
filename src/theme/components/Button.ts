import { ColorMode } from "@chakra-ui/react";

interface ComponentProps {
  colorMode: ColorMode;
}

export const Button = {
  baseStyle: {},
  sizes: {},
  variants: {
    custom: ({ colorMode }: ComponentProps) => ({
      bg: "transparent",
      borderColor: "secondary",
      _hover: {
        color: "#fff",
        bg: colorMode === "dark" ? "redwood.600" : "chocolate",
      },
    }),
  },
  defaultProps: {},
};
