import React from 'react';
import Page from '../../Page';
import {menu} from '../../menu';
import {Box, Card, CardBody, Flex, Heading, Icon, Text} from '@chakra-ui/react';
import {formateDate} from '../../../utils/formatDate';
import AddTask from '../AddTask';

const MyDay = () => {
  const {name, icon} = menu[0];
  const dateString = formateDate(new Date());
  return (
    <Page>
      <Flex alignItems={'center'}>
        <Icon as={icon} boxSize={8} mr={3} />
        <Heading size={'md'}>{name}</Heading>
      </Flex>
      <Text as={'sub'} fontSize={'xs'} color="gray">
        {dateString}
      </Text>
      <Box mt={8}>
        <AddTask />
        <Card mb={3}>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
        </Card>
      </Box>
    </Page>
  );
};

export default MyDay;
