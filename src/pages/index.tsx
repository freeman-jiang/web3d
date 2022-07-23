import { CNLink } from "@/components/utility";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Flex direction="column" w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text color={"blue.400"} as={"span"} position={"relative"}>
              Web3D
            </Text>
            <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
              Decentralized 3D Maps
            </Text>
          </Heading>
          <Text mt="2" fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            ETHCC 2022
          </Text>
          <Stack mt="6" direction={{ base: "column", md: "row" }} spacing={4}>
            <CNLink href="/app">
              <Button rounded="full" colorScheme="blue">
                Launch App
              </Button>
            </CNLink>
            <Button rounded={"full"}>How It Works</Button>
          </Stack>
        </Flex>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3164&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
