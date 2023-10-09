import React from 'react'
import { Flex, Box, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react';

const SignUp = () => {
  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={8}
        width="400px"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Sign Up
        </Heading>
        <form>
          <FormControl mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>

          <Button colorScheme="teal" size="lg" type="submit" w="100%">
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

export default SignUp
