
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Text,
} from '@chakra-ui/react';
import FileDropField from "./FileDropField.jsx";
import {login} from "../services.js";
import {toast, ToastContainer} from "react-toastify";

const Login = () => {
    const [shares, setShares] = useState([]);
    const [fileNames,setFileNames] = useState([])
    const [email, setEmail] = useState(""); // State variable for email
    const [password, setPassword] = useState(""); // State variable for password



    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login({email,password,shares})
        if(response.message === 'login successful'){
            toast.success(response.message)
        }else if(response.message){
            toast.error(response.message)
        }

    };

    return (
        <Flex align="center" justify="center" minH="100vh">
            <Box borderWidth="1px" borderRadius="lg" p={8} width="400px">
                <Heading as="h2" size="xl" textAlign="center" mb={4}>
                    Login
                </Heading>
                <form onSubmit={handleLogin}>
                    <FormControl mb={4}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FileDropField shares={shares} setShares={setShares} fileNames={fileNames} setFileNames={setFileNames} />
                    <Button colorScheme="teal" size="lg" type="submit" w="100%" mt={'4'}>
                        Login
                    </Button>
                </form>
                <ToastContainer />
                <Box mt={2} textAlign="center">
                    <span>Already have an account? </span>
                    <Link to="/signup">Sign Up</Link>
                </Box>
            </Box>
        </Flex>
    );
};

export default Login;
