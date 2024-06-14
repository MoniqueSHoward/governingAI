import React from "react";
import { Box } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import DashboardWindow from "../components/DashboardWindow";


const DashboardPage = () => {
  return (
    <Box display="flex">
      <Navigation />
      <Box ml="200px"  w="full">
        <DashboardWindow/>
      </Box>
      
    </Box>
  );
};

export default DashboardPage;
