import React from "react";
import { Box } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import VendorIntakeForm from "../components/IntakeForm";

const IntagePage = () => {
  return (
    <Box display="flex">
      <Navigation />
      <Box ml="200px"  w="full">
        <VendorIntakeForm/>
      </Box>
    </Box>
  );
};

export default IntagePage;
