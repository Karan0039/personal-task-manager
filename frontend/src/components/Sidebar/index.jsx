import React, {useState} from 'react';
import {Box, Flex, Text, Icon} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {menu} from '../menu';

const Sidebar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const handleSelect = index => {
    setSelected(index);
    navigate(menu[index].path);
  };
  return (
    <Box
      as="nav"
      width={{base: '70%', md: '18%'}}
      height="95.5vh"
      bg="white"
      pt={10}
      borderRight={'1px'}
      borderColor={'gray.200'}
      shadow={'lg'}
    >
      <Flex direction="column">
        {menu.map((item, index) => (
          <Box
            key={index}
            py={4}
            px={7}
            cursor={'pointer'}
            _hover={{bg: '#f5f5f5'}}
            display="flex"
            alignItems="center"
            style={{
              backgroundColor: selected === index ? '#eff6fc' : '',
              borderLeft: selected === index ? '3px solid #2564cf' : '',
            }}
            onClick={() => handleSelect(index)}
          >
            <Icon as={item.icon} boxSize={6} mr={3} />
            <Text>{item.name}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
