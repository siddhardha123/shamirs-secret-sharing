import React, { useState } from 'react';
import { Box, Text, useDisclosure, Button } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

function FileDropField({ shares, setShares, fileNames, setFileNames }) {
    const [hovering, setHovering] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        for (const file of files) {
            // Read the file content as text
            const reader = new FileReader();

            reader.onload = (event) => {
                const extractedText = event.target.result;
                setShares([...shares, extractedText]);
                setFileNames([...fileNames, file.name]);
            };

            reader.readAsText(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setHovering(true);
    };

    const handleDragLeave = () => {
        setHovering(false);
    };

    const handleFileInput = (e) => {
        const files = e.target.files;

        for (const file of files) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const extractedText = event.target.result;
                setShares([...shares, extractedText]);
                setFileNames([...fileNames, file.name]);
            };

            reader.readAsText(file);
        }
    };

    const removeShare = (index) => {
        const updatedShares = [...shares];
        const updatedFileNames = [...fileNames];
        updatedShares.splice(index, 1);
        updatedFileNames.splice(index, 1);
        setShares(updatedShares);
        setFileNames(updatedFileNames);
    };

    return (
        <Box
            p={4}
            border="2px dashed"
            borderColor={hovering ? 'blue.500' : 'gray.200'}
            borderRadius="md"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            cursor="pointer"
            onClick={() => document.getElementById('fileInput').click()}
        >
            <input
                type="file"
                id="fileInput"
                accept=".txt"
                style={{ display: 'none' }}
                onChange={handleFileInput}
                multiple
            />
            <AddIcon mb={2} />
            <Text>Drag & Drop or Click to Upload Files</Text>
            {shares.map((share, index) => (
                <Box key={index} border="1px solid" p={2} mt={4}>
                    <Text>File Name: {fileNames[index]}</Text>
                    <Button
                        variant="link"
                        size="sm"
                        color="red.500"
                        onClick={() => removeShare(index)}
                        leftIcon={<CloseIcon />}
                    >
                        Remove
                    </Button>
                </Box>
            ))}
        </Box>
    );
}

export default FileDropField;
