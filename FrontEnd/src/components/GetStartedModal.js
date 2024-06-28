// // src/components/GetStartedModal.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalCloseButton,
//   Button,
//   Input,
//   Text,
//   useDisclosure,
//   VStack,
//   Heading,
// } from "@chakra-ui/react";

// const GetStartedModal = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

// let navigate = useNavigate(); 
// const routeChange = () =>{ 
//     navigate(`/chat`);
//   }

//   return (
//     <>
//       <Button colorScheme="teal" size="lg" onClick={onOpen}>
//         Get Started
//       </Button>

//       <Modal isOpen={isOpen} onClose={onClose} isCentered>
//         <ModalOverlay />
//         <ModalContent bg="#01B8AA" color="white" maxW="md" p={8}>
//           <ModalCloseButton />
//           <VStack spacing={4}>
//             <Heading as="h1" size="lg">
//               governingAI
//             </Heading>
//             <Text>
//               To get started, provide the information below so that we can get to know your business and build your profile.
//             </Text>
//             <Input placeholder="Name" variant="filled" bg="white" color="black" />
//             <Input placeholder="Website" variant="filled" bg="white" color="black" />
//             <Button onClick={routeChange} colorScheme="teal" size="lg" bg="white" color="#01B8AA">
//               Proceed
//             </Button>
//           </VStack>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default GetStartedModal;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  Input,
  Text,
  useDisclosure,
  VStack,
  Heading,
  useToast
} from "@chakra-ui/react";

// import { UniversalContext } from './Idprovider';


const GetStartedModal = () => {
  // const { universalVariable, setUniversalVariable } = useContext(UniversalContext);
  
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");

  const sendData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/v1/getStarted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username":name,"website":website }),
      });

      if (response.ok) {
        console.error("sent successfully",name,website);
        const responseData = await response.json();
        let isProfile = 0;
        for (const [key, value] of Object.entries(responseData)) {
          if(value === null){
            isProfile = 1;
            break
          }
        }
        console.log(responseData)
        localStorage.setItem("userid",responseData.userid)
        localStorage.setItem("isProfile",isProfile)
        toast({
          title: "Welcome to governingAI",
          description: " Logged in successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate(`/chat`);

      } else {
        console.error("Failed to send user information to the API", name,website);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button colorScheme="teal" size="lg" onClick={onOpen}>
        Get Started
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#01B8AA" color="white" maxW="md" p={8}>
          <ModalCloseButton />
          <VStack spacing={4}>
            <Heading as="h1" size="lg">
              governingAI
            </Heading>
            <Text>
              To get started, provide the information below so that we can get to know your business and build your profile.
            </Text>
            <Input
              placeholder="Name"
              variant="filled"
              bg="white"
              color="black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Website"
              variant="filled"
              bg="white"
              color="black"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <Button onClick={sendData} colorScheme="teal" size="lg" bg="white" color="#01B8AA">
              Proceed
            </Button>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GetStartedModal;

