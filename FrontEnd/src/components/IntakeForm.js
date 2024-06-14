import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
//   Link,
  VStack,
  useToast,
  Spacer,
} from '@chakra-ui/react';

const VendorIntakeForm = () => {
  const [vendorName, setVendorName] = useState('');
  const [vendorWebsite, setVendorWebsite] = useState('');
  const toast = useToast();

  const sendData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/vendor-intake/v1/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userid":localStorage.getItem("userid"),
          "vendor_name":vendorName,
          "website": vendorWebsite
      }),
      });

      if (response.ok) {
        toast({
              title: "vendor evaluated",
              description: "Your form has been submitted successfully!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box p={5} maxWidth="70vw" minHeight={'600px'} maxHeight={'80vh'} mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <VStack spacing={10} align="stretch">
        <Heading size="lg" color="teal.600" textAlign="left">
          VENDOR INTAKE FORM
        </Heading>
        <Text mb={4} textAlign="left">
          Submit information about the AI solution you want evaluated.
        </Text>
        <FormControl>
          <FormLabel>Vendor Name</FormLabel>
          <Input
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            boxShadow="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Vendor Website</FormLabel>
          <Input
            type="url"
            value={vendorWebsite}
            onChange={(e) => setVendorWebsite(e.target.value)}
            boxShadow="md"
          />
        </FormControl>
        <Spacer/>
        <Flex justify="center" mt={4}>
          <Button colorScheme="teal" onClick={sendData} width={'100vw'}>
            Submit
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default VendorIntakeForm;