// import { Box, VStack, Link, Heading, Spacer } from "@chakra-ui/react";

// import { useLocation } from "react-router-dom";

// const Navigation = () => {
//   const location = useLocation();
//   const isChatbotPage = location.pathname === "/chat";



// const Navigation = () => (
//   <Box bg="#01B8AA" pt={5} maxW={"min-content"} h = '100vh' >
//     <VStack p={2}  spacing={'10vh'}  align="center" justify="center" h="full" >
//       <Heading m={2} size={'md'} >governingAI</Heading>
//       <Link href="#">GAIA</Link>
//       <Link href="#">Dashboard</Link>
//       <Link href="#">Guiding Principles</Link>
//       <Link href="#">Intake</Link>
//       <Spacer/>
//       <Link href="#">Profile</Link>
//     </VStack>
//   </Box>
// );

// export default Navigation;


// src/components/Navigation.js

import { Box, VStack, Link, Spacer } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const Navigation = () => {
  const location = useLocation();

  // Define the links with their respective paths
  const links = [
    { name: 'GAIA', path: '/chat' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Guiding Principles', path: '/guiding-principles' },
    { name: 'Intake', path: '/intake' },
    { name: 'Profile', path: '/profile' }
  ];

  return (
    <Box bg="#018A80" p={4} h="100vh" w="200px" position="fixed">
      <VStack spacing="30px" align="center" w='fit-content'  h="full">
        <Logo/>
        {links.slice(0, -1).map(link => (
          <Link
            key={link.path}
            href={link.path}
            bg={location.pathname === link.path ? "white" : "transparent"}
            width={location.pathname === link.path ? "190px" : "default"}
            color={location.pathname === link.path ? "black" : "white"}
            p={2}
            borderRadius="md"
            >
            {link.name}
          </Link>
        ))}
        <Spacer />
        <Link
          href={links[links.length - 1].path}
          bg={location.pathname === links[links.length - 1].path ? "white" : "transparent"}
          width={location.pathname === links[links.length - 1].path ? "190px" : "default"}
          p={2}
          mb={2}
          borderRadius="md"
        >
          {links[links.length - 1].name}
        </Link>
      </VStack>
    </Box>
  );
};

export default Navigation;
