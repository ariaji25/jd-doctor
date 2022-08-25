import { Box } from '@chakra-ui/react';

const Content = ({ children }) => {
  return (
    <Box mx="auto" px={{ base: '3', md: '0' }}>
      {children}
    </Box>
  );
};

export default Content;
