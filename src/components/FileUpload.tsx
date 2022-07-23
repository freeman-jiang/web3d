import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useDropzone } from "react-dropzone";

interface Props extends BoxProps {
  onDropAccepted: (files: File[]) => void;
}

/**
  @summary Wrap elements with this component to activate the file browser on click. It also accepts drag and drop.
 */
export const FileUpload = ({
  children,
  onDropAccepted,
  ...rest
}: PropsWithChildren<Props>) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "model/gltf-binary": [".gltf"],
    },
    maxFiles: 1,
    onDropAccepted: onDropAccepted,
  });

  return (
    <Box {...rest} w="fit-content">
      <Box {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {children}
      </Box>
    </Box>
  );
};
