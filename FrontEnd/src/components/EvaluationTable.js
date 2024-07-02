import React, { useState } from 'react';
import {
  Box,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useDisclosure
} from '@chakra-ui/react';
import ScorecardModal from './ScorecardModal';

const EvaluationTable = ({ data }) => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSymbol = (value) => (value >= 80 ? '✅' : '❌');

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
    onOpen();
  };

  return (
    <Box p={5} borderWidth={2} borderRadius="30px" boxShadow="lg">
      <Heading size="md" mb={5} color="red.500">
        Evaluating
      </Heading>
      <Box overflowY="auto" maxHeight="350px">
        <Table variant="simple" border="2px" borderColor="gray.300">
          <Thead>
            <Tr>
              <Th textAlign="center">Vendor Name</Th>
              <Th textAlign="center">Privacy</Th>
              <Th textAlign="center">Transparency</Th>
              <Th textAlign="center">Fairness</Th>
              <Th textAlign="center">Public Trust</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index} h={'small'}>
                <Td textAlign="center" cursor="pointer">
                  <Link onClick={() => handleVendorClick(item)} color="blue.500">
                    {item.vendorName}
                  </Link>
                </Td>
                <Td textAlign="center">{getSymbol(item.privacy)}</Td>
                <Td textAlign="center">{getSymbol(item.transparency)}</Td>
                <Td textAlign="center">{getSymbol(item.fairness)}</Td>
                <Td textAlign="center">{item.publicTrust}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedVendor && (
        <ScorecardModal isOpen={isOpen} onClose={onClose} vendor={selectedVendor} />
      )}
    </Box>
  );
};

export default EvaluationTable;