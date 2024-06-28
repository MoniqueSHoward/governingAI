import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Link,
  useToast
} from "@chakra-ui/react";

const GuidingPrinciplesTable = () => {
  const toast = useToast();
  const [values, setValues] = useState({
    consent: true,
    control: true,
    restrict: true,
    rectification: true,
    erasure: true,
    protection: true,
  });

  const [headerData, setHeaderData] = useState({
    companyname: "Healthways Insurance",
    address: "1234 Physician Hwy, Anytown, Anywhere",
    website: "www.hwfp.com",
    name: "Merative",
  });

  const fetchGuidingPrinciples = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/guiding-principle/v1/my-privacy-principles?userid=${localStorage.getItem(
          "userid"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setValues({
          consent: responseData.point1,
          control: responseData.point2,
          restrict: responseData.point3,
          rectification: responseData.point4,
          erasure: responseData.point5,
          protection: responseData.point6,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/v1/me?userid=${localStorage.getItem("userid")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setHeaderData({
          name: responseData.userinfo.username,
          companyname: responseData.userinfo.company,
          website: responseData.userinfo.website,
          address: responseData.userinfo.address,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchGuidingPrinciples();
    fetchUserData();
  }, []);

  const handleSave = async () => {
    const result = {
      userid: localStorage.getItem("userid"),
      point1: values.consent,
      point2: values.control,
      point3: values.restrict,
      point4: values.rectification,
      point5: values.erasure,
      point6: values.protection,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/guiding-principle/v1/my-privacy-principles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast({
              title: "Saved!",
              description: "Guiding principles updated successfully!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });

        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box m={10} maxH={"50vh"}>
      <Text mt={5}>
        {headerData.name} <br />
        {headerData.companyname} <br />
        {headerData.address} <br />
        <Link color={"blue"} href={`http://${headerData.website}`} isExternal>
          {headerData.website}
        </Link>
      </Text>
      <Text mt={5}>AI Guiding Principles will help you</Text>
      <Heading mt={5} size="md" mb={5}>
        PRIVACY
      </Heading>
      <Table mt={5} size="md" variant="simple" border="2px" borderColor="black">
        <Thead>
          <Tr backgroundColor={"lightgray"}>
            <Th border="2px" borderColor="black">
              Criteria
            </Th>
            <Th border="2px" borderColor="black">
              Description
            </Th>
            <Th border="2px" borderColor="black">
              Must Have
            </Th>
            <Th border="2px" borderColor="black">
              Nice to Have
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[
            {
              key: "consent",
              criteria: "Consent",
              description: "Our data should not be used without our knowledge and permission.",
            },
            {
              key: "control",
              criteria: "Control over the Use of Data",
              description:
                "We want to have some degree of influence over how and why our information is used.",
            },
            {
              key: "restrict",
              criteria: "Ability to Restrict Processing",
              description:
                "We want the ability to restrict our data from use in connection with certain AI practices or models.",
            },
            {
              key: "rectification",
              criteria: "Right to Rectification",
              description: "We want the option of amending or modifying our data when necessary",
            },
            {
              key: "erasure",
              criteria: "Right to Erasure",
              description: "Our data should be removed within a reasonable amount of time after a request is made.",
            },
            {
              key: "protection",
              criteria: "Data Protection Laws",
              description:
                "The vendor follows and maintains policies and procedures that adhere to data protection laws and regulations for my industry.",
            },
          ].map((item) => (
            <Tr key={item.key}>
              <Td border="2px" maxWidth={"10vw"} borderColor="black">
                <Text fontWeight={"medium"}>{item.criteria}</Text>
              </Td>
              <Td border="2px" maxWidth={"30vw"} borderColor="black">
                {item.description}
              </Td>
              <Td border="2px" width={"100px"} borderColor="black">
                <RadioGroup
                  onChange={(val) => setValues((prev) => ({ ...prev, [item.key]: val === "true" }))}
                  value={values[item.key].toString()}
                >
                  <Radio value={"true"}></Radio>
                </RadioGroup>
              </Td>
              <Td border="2px" width={"100px"} borderColor="black">
                <RadioGroup
                  onChange={(val) => setValues((prev) => ({ ...prev, [item.key]: val === "true" }))}
                  value={values[item.key].toString()}
                >
                  <Radio value={"false"}></Radio>
                </RadioGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justify="flex-end" m={2}>
        <Button colorScheme="teal" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default GuidingPrinciplesTable;