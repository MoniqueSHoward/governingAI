import { Image, Box } from '@chakra-ui/react'
import React from 'react'
import heroImage from "../assets/logo-black.png";
const Logo = () => {
  return (
    <Box maxW="150px" m={2} overflow="hidden" >
        <Image src={heroImage} alt="logo Image" />
      </Box>
  )
}

export default Logo