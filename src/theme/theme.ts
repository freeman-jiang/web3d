import { extendTheme } from "@chakra-ui/react";

// Global style overrides:
import { foundations } from "@/theme/foundations";

// Component style overrides:
import { components } from "@/theme/components";

// Configuration overrides:
import { config } from "@/theme/config";

export const theme = extendTheme({ ...foundations, components, config });

// If you don't see types from the custom theme, try restarting the TS server in VSCode.
