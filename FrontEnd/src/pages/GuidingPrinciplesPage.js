import React from "react";
import { Box } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import GuidingPrinciplesTable from "../components/GuidingPrinciplesTable"

const GuidingPrinciplesPage = () => {
  return (
    <Box display="flex">
      <Navigation />
      <Box ml="200px"  w="full">
        <GuidingPrinciplesTable/>
      </Box>
    </Box>
  );
};

export default GuidingPrinciplesPage;
