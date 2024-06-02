
import React from "react";
import { Box } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import ChatWindow from "../components/ChatWindow";

const ChatbotPage = () => {
  return (
    <Box display="flex">
      <Navigation />
      <Box ml="200px"  w="full">
        <ChatWindow/>
      </Box>
    </Box>
  );
};

export default ChatbotPage;
