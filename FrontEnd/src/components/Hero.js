// src/components/Hero.js
import {
  Box,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import heroImage from "../assets/healthcare-image.png"; // Move the uploaded image to the src/assets folder
import GetStartedModal from "./GetStartedModal";
const Hero = () => (
  <Box bg="white" p={20} >
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing={5}
      align="right"
    >
      <HStack  align="start" spacing={300} minW="max-content" >
        <VStack align="start" spacing={10} maxW="md">
          <Text fontSize="4xl" fontWeight="bold">
            AI Governance and Monitoring
          </Text>
          <Text fontSize="lg">
            Quickly evaluate and monitor AI SAAS tools based on Responsible AI
            Guiding Principles.
          </Text>
          <GetStartedModal/>
        </VStack>
      <Box maxW="lg" overflow="hidden" >
        <Image src={heroImage} alt="Hero Image" />
      </Box>
      </HStack>
    </Stack>
  </Box>
);

export default Hero;
