import React from "react";
import { Box } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import UserProfile from "../components/UserProfile";

const ProfilePage = () => {
  return (
    <Box display="flex">
      <Navigation />
      <Box ml="200px"  w="full">
        <UserProfile/>
      </Box>
    </Box>
  );
};

export default ProfilePage;
