import {Box, Text, Button, Image} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Image
        src="https://via.placeholder.com/400x300.png?text=404+Error"
        alt="404"
        maxWidth="400px"
        mb={6}
      />

      <Text fontSize="lg" color="gray.500" marginTop={'20px'}>
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Link to="/">
        <Button
          size="md"
          height="48px"
          width="200px"
          border="8px teal.500"
          marginTop="20px"
          cursor="pointer"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default PageNotFound;
