import { BoxProps, Box } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & BoxProps;

export const CNImage = (props: Props) => {
  const { src, alt, width, height, priority, quality, ...rest } = props;
  return (
    <Box position="relative" {...rest}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
      />
    </Box>
  );
};
