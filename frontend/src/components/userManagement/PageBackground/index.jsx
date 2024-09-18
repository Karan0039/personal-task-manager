import React from 'react';
import styles from './index.module.css';
import {Box} from '@chakra-ui/react';

const PageBackground = () => {
  return (
    <Box className={styles.container} h={'100vh'}>
      <div className={styles.rectangle1}></div>
      <div className={styles.rectangle2}></div>
      <div className={styles.rectangle3}></div>
    </Box>
  );
};

export default PageBackground;
