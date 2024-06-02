import React from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

const ScoreCard = ({ privacy, transparency, fairness }) => {
  return (
    <Box mb={10} p={5} borderWidth={1}  borderRadius="30px" boxShadow="lg">
      <Heading size="md" mb={5} textAlign="center">
        GOVERNANCE SCORECARD
      </Heading>
      <Flex justify="space-around">
        <Box textAlign="center" w={'15vw'} borderWidth={1} borderRadius="20px" boxShadow="lg">
          <Text mb={2}>Privacy</Text>
          <Flex align="center" justify="center" h="50px">
            <Text fontSize="2xl" color={privacy >= 80 ? 'green.500' : 'red.500'}>
              {privacy}%
            </Text>
          </Flex>
        </Box>
        <Box textAlign="center"  w={'15vw'} borderWidth={1} borderRadius="20px" boxShadow="lg">
          <Text mb={2}>Transparency & Explainability</Text>
          <Flex align="center" justify="center" h="50px">
            <Text fontSize="2xl" color={transparency >= 80 ? 'green.500' : 'red.500'}>
              {transparency}%
            </Text>
          </Flex>
        </Box>
        <Box textAlign="center"  w={'15vw'} borderWidth={1} borderRadius="20px" boxShadow="lg">
          <Text mb={2}>Fairness & Inclusivity</Text>
          <Flex align="center" justify="center" h="50px">
            <Text fontSize="2xl" color={fairness >= 80 ? 'green.500' : 'red.500'}>
              {fairness}%
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ScoreCard;