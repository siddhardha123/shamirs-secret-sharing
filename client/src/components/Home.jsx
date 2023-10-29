import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    // Assume you have a way to retrieve the user's name from your authentication system.
    const [userName, setUserName] = useState("John Doe"); // Replace with the actual user's name.
    const navigate = useNavigate()
    const handleLogout = () => {
          navigate('/login')
    };

    return (
        <Center h="100vh">
            <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                <Heading as="h1" size="2xl" mb={4}>
                    Welcome, {userName}!
                </Heading>
                <Text fontSize="xl" mb={4}>
                    Thank you for using our awesome app.
                </Text>
                <Button colorScheme="teal" size="lg" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Center>
    );
};

export default HomePage;
