import { PrivyClient, SiweSession } from "@privy-io/privy-browser";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useWeb3 } from "@/context/web3";
import { FileUpload } from "@/components/FileUpload";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { isNumeric } from "@/utils/regex";
import { FcCheckmark } from "react-icons/fc";

// Initialize the Privy client.
const provider = typeof window !== "undefined" ? window.ethereum : null;
const session = new SiweSession(
  process.env.NEXT_PUBLIC_PRIVY_PUBLIC_KEY,
  provider
);
const client = new PrivyClient({
  session: session,
});

interface Inputs {
  latitude: string;
  longitude: string;
  size: string;
  file: File;
}

export default function Home() {
  const toast = useToast();
  const { userAddress, setUserAddress } = useWeb3();

  // Connect to a MetaMask wallet.
  const connectToWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        toast({
          status: "error",
          title: "No Ethereum provider found.",
          description: "Please install Metamask.",
          position: "top",
        });
        return;
      }

      if (!(await session.isAuthenticated())) {
        await session.authenticate();
      }
      const address = await session.address();
      setUserAddress(address as string);
    } catch (error) {
      console.error(error);
    }
  };

  const { handleSubmit, setValue, control, watch } = useForm<Inputs>({
    defaultValues: {
      latitude: "0",
      longitude: "0",
      size: "0",
    },
  });

  const file = watch("file");
  console.log(file);

  if (!userAddress) {
    return (
      <Flex h="100vh" justifyContent={"center"} alignItems="center">
        <Button onClick={connectToWallet} colorScheme="orange" size="lg">
          Connect with Metamask
        </Button>
      </Flex>
    );
  }

  const onDropAccepted = ([file]: File[]) => {
    setValue("file", file);
  };

  const onSubmit: SubmitHandler<Inputs> = async ({
    file,
    latitude,
    longitude,
    size,
  }) => {
    const res = await Promise.all([
      client.putFile(userAddress, "file", file),
      client.put(userAddress, [
        { field: "longitude", value: longitude },
        { field: "latitude", value: latitude },
        { field: "size", value: size },
      ]),
    ]);
  };

  return (
    <Flex p="4" direction="column" alignItems={"center"}>
      <Box p="2" bg="pink.500" rounded="md" color="white">
        {userAddress}
      </Box>
      <Heading mt="4">Upload Scan</Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} mt="4">
        <FormControl>
          <FormLabel>Upload File</FormLabel>
          <FileUpload onDropAccepted={onDropAccepted}>
            <Button colorScheme={"pink"} rounded="full">
              Add File
            </Button>
          </FileUpload>
          {file && (
            <HStack mt="2">
              <Icon as={FcCheckmark} />
              <Text>{file.name}</Text>
            </HStack>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Latitude</FormLabel>
          <Controller
            control={control}
            name="latitude"
            render={({ field }) => (
              <NumberInput
                min={0}
                {...field}
                onChange={(string) => {
                  if (isNumeric.test(string)) {
                    field.onChange(string);
                  }
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Longitude</FormLabel>
          <Controller
            control={control}
            name="longitude"
            render={({ field }) => (
              <NumberInput
                min={0}
                {...field}
                onChange={(string) => {
                  if (isNumeric.test(string)) {
                    field.onChange(string);
                  }
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Size</FormLabel>
          <Controller
            control={control}
            name="size"
            render={({ field }) => (
              <NumberInput
                min={0}
                {...field}
                onChange={(string) => {
                  if (isNumeric.test(string)) {
                    field.onChange(string);
                  }
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
        </FormControl>
        <Box pt="4" w="full">
          <Button type="submit" w="full" colorScheme={"blue"}>
            Submit
          </Button>
        </Box>
      </VStack>
      <Button
        mt="5"
        onClick={async () => {
          const encryptedFile = await client.getFile(userAddress, "file");
          if (!encryptedFile) {
            return;
          }
          const file = encryptedFile.blob();

          const data = window.URL.createObjectURL(file);
          const filename = `scan.gltf`;

          // Create a link pointing to the ObjectURL containing the blob.
          const link = document.createElement("a");
          // @ts-expect-error we know this is a string
          link.style = "display: none;";
          link.href = data;
          link.download = filename;
          link.click();

          // Cleanup
          window.URL.revokeObjectURL(data);
          link.remove();
        }}
      >
        Download File
      </Button>
    </Flex>
  );
}
