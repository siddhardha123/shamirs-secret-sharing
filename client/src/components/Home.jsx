import React from 'react';
import {
    Box,
    Button,
    Flex,
    Link,
    Text,
    VStack,
    HStack,
    Heading,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <Box>
            {/* Navbar */}
            <Flex
                align="center"
                justifyContent="space-between"
                padding="1rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                backgroundColor="white"
            >
                <HStack spacing={4}>
                    <Link href="/signup" fontSize="lg">
                        Signup
                    </Link>
                    <Link href="/login" fontSize="lg">
                        Login
                    </Link>
                    <Link href="#" fontSize="lg">
                        Documentation
                    </Link>
                    <Link href="#" fontSize="lg">
                        Research Paper
                    </Link>
                </HStack>
                <Link href="https://github.com/siddhardha123/shamirs-secret-sharing" target={'_blank'}>
                    <FaGithub size={24} />
                </Link>
            </Flex>

            {/* Hero Section */}
            <VStack
                spacing={4}
                align="center"
                justify="center"
                height="80vh"
                background="linear-gradient(to bottom, #30D5C8, #1A7A76)"
                color="white"
            >
                <Heading fontSize="4xl" textAlign="center">
                    MULTI SPLIT ENCRYPTION SCHEME FOR PASSWORD AND RECOVERY
                </Heading>
                <Text fontSize="xl" textAlign="center">
                    Using Shamir's Secret Sharing Algorithm
                </Text>
                <Link href={'/login'}>
                    <Button size="lg" colorScheme="teal">
                        Get Started
                    </Button>
                </Link>
            </VStack>
        </Box>
    );
};

export default LandingPage;
