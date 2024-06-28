import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Logo from "./Logo";
const Header = () => {
  return (
    <Flex minWidth="max-content" pt={10}>
      <Box pl="20">
        <Logo/>
      </Box>
    </Flex>
  );
};

export default Header;
