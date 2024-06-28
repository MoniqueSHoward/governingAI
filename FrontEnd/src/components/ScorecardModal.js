import React from 'react';
import {
  Box,
  Button,
  Text,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
} from '@chakra-ui/react';
import ScoreCard from './ScoreCard';

const ScorecardModal = ({ isOpen, onClose, vendor }) => {
  if (!vendor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent  >
        <ModalHeader>{vendor.vendorName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
          <Flex>
            <Box flex="1">
              <Box mb={5}>
                <Text>{vendor.address}</Text>
                <Link href={`http://${vendor.website}`} isExternal color="blue.500">
                  {vendor.website}
                </Link>
              </Box>

              <Box mt={5} >
                <Heading size="sm" mb={2}>Summary</Heading>
                <Text mb={2}>{vendor.toolUsecase}</Text>
                <Heading size="sm" mb={2}>Privacy</Heading>
                <Text mb={2}>{vendor.privacy_summary}</Text>
                <Heading size="sm" mb={2}>Transparency & Explainability</Heading>
                <Text mb={2}>{vendor.transparency_summary}</Text>
                <Heading size="sm" mb={2}>Fairness & Inclusivity</Heading>
                <Text mb={2}>{vendor.fairness_summary}</Text>
              </Box>
            </Box>

            <Box flex="1" ml={5} maxW={'700px'}>
              <Heading size="md" mb={5}>EVALUATION SCORES</Heading>
              <ScoreCard
                privacy={vendor.privacy}
                transparency={vendor.transparency}
                fairness={vendor.fairness}
              />
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScorecardModal;