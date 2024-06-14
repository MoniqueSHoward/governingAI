import React, { useState, useEffect } from 'react';
import { Box, Text, Link, Grid, GridItem } from '@chakra-ui/react';




const UserProfile = () => {
  const [user, setUser] = useState({
    contact: "Dr. Trent Benson",
    company: "Healthways Insurance",
    website: "www.hwfp.com",
    address: "1234 Physician Hwy",
    city: "Chicago",
    zipCode: "06780",
    phone: "(410) 450 - 8080",
    industry: "Healthcare",
    aiPolicy: "No",
    aiParameters: "Strictest",
    usingAI: "Yes",
    currentAISolutions: "Perplexity.ai for marketing, email generation and article writing.",
  });

  const getData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/v1/me?userid=${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        
        const responseData = await response.json();
        setUser({
          "contact": responseData.userinfo.username,
          "company": responseData.userinfo.company,
          "website": responseData.userinfo.website,
          "address": responseData.userinfo.address,
          "city": responseData.userinfo.city,
          "zipCode": responseData.userinfo.zipcode,
          "phone": responseData.userinfo.phone,
          "industry": responseData.userinfo.industry,
          "aiPolicy": responseData.userinfo.ai_policy,
          "aiParameters": responseData.userinfo.ai_parameters,
          "usingAI": responseData.userinfo.ai_policy,
          "currentAISolutions": "Perplexity.ai for marketing, email generation and article writing.",
        });
        console.log(responseData)
        
  
      } else {
        
        // navigate(`/chat`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box p={5} m={2} maxHeight={'100vh'} mx="auto">
      <Grid templateColumns="repeat(2, 1fr)" gap={7}>
        <GridItem>
          <Text fontWeight="bold">CONTACT</Text>
        </GridItem>
        <GridItem>
          <Text>{user.contact}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">COMPANY</Text>
        </GridItem>
        <GridItem>
          <Text>{user.company}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">WEBSITE</Text>
        </GridItem>
        <GridItem>
          <Link href={`http://${user.website}`} isExternal color="blue.500">
            {user.website}
          </Link>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">ADDRESS</Text>
        </GridItem>
        <GridItem>
          <Text>{user.address}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">CITY</Text>
        </GridItem>
        <GridItem>
          <Text>{user.city}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">ZIP CODE</Text>
        </GridItem>
        <GridItem>
          <Text>{user.zipCode}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">PHONE</Text>
        </GridItem>
        <GridItem>
          <Text>{user.phone}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">INDUSTRY</Text>
        </GridItem>
        <GridItem>
          <Text>{user.industry}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">AI POLICY</Text>
        </GridItem>
        <GridItem>
          <Text>{user.aiPolicy}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">AI PARAMETERS</Text>
        </GridItem>
        <GridItem>
          <Text>{user.aiParameters}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">USING AI?</Text>
        </GridItem>
        <GridItem>
          <Text>{user.usingAI}</Text>
        </GridItem>

        <GridItem>
          <Text fontWeight="bold">CURRENT AI SOLUTIONS</Text>
        </GridItem>
        <GridItem maxW={'80vw'}>
          <Text>{user.currentAISolutions}</Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserProfile;