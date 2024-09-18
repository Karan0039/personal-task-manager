import {Box} from '@chakra-ui/react';
import React from 'react';

const Page = props => {
  return (
    <Box bg="#faf9f8" width="100vw" p={8}>
      {props.children}
    </Box>
  );
};

export default Page;
