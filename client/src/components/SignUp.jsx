import React, { useState, useEffect } from 'react';
import {Flex, Box, FormControl, FormLabel, Input, Button, Heading, Grid, Link, GridItem} from '@chakra-ui/react';
import { register } from "../services.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    share_count: 0,
    threshold: 0,
  });
  const [downloadLinks, setDownloadLinks] = useState([]);



  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ ...formData });
      if(response.message === ''){
         toast.error(response.message)
      }
      if(response.name === formData.name){
        const links = response.shares.map((share, index) => {
          const blob = new Blob([share], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          return { url, filename: `share_${index + 1}.txt` };
        });

        setDownloadLinks(links);
      }

    } catch (error) {
      // Handle API call errors here and show an error toast message
      toast.error("Sign up failed. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
      <Flex align="center" justify="center" minH="100vh" direction={'column'}>
        <Box borderWidth="1px" borderRadius="lg" p={8} width="400px">
          <Heading as="h2" size="xl" textAlign="center" mb={4}>
            Sign Up
          </Heading>
          <form onSubmit={(e) => handleSignUp(e)}>
            <FormControl mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>share count</FormLabel>
              <Input
                  type="number"
                  name="share_count"
                  placeholder="Share count"
                  min={1}
                  value={formData.share_count}
                  onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>threshold</FormLabel>
              <Input
                  type="number"
                  name="threshold"
                  placeholder="Threshold"
                  min={1}
                  value={formData.threshold}
                  onChange={handleInputChange}
              />
            </FormControl>
            <Button colorScheme="teal" size="lg" type="submit" w="100%">
              Sign Up
            </Button>
          </form>
          <ToastContainer />
          <Box mt={2} textAlign="center">
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </Box>


        </Box>
        {downloadLinks.length > 0 && (
            <Flex direction={'column'} borderWidth="1px" borderRadius="lg" p={8} width="400px" my={'20'}>
              <Flex fontSize="2xl" fontWeight="bold" mb="4" textAlign={'center'} >
                Download Shares
              </Flex>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {downloadLinks.map((link, index) => (
                    <GridItem key={index} textAlign="center">
                      <Button>
                      <a href={link.url} download={link.filename}>
                        Share {index + 1}
                      </a>
                      </Button>
                    </GridItem>
                ))}
              </Grid>
            </Flex>
        )}

      </Flex>
  );
};

export default SignUp;

