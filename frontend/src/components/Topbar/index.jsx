import React, {useContext} from 'react';
import {Box, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import {CgProfile} from 'react-icons/cg';
import {AuthContext} from '../../context/auth';
import {useNavigate} from 'react-router-dom';
import {MdMenu} from 'react-icons/md';

const TopBar = ({showMenu, setShowMenu}) => {
  const navigate = useNavigate();
  const {signout} = useContext(AuthContext);
  const handleLogout = () => {
    signout();
    navigate('/');
  };
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={1}
      bg="#2564cf"
      color="white"
      justifyItems={'center'}
    >
      <Box cursor={'pointer'}>
        <Icon as={MdMenu} boxSize={5} mr={3} onClick={() => setShowMenu(!showMenu)} />
      </Box>
      <Text as={'b'} alignSelf={'center'}>
        Todify
      </Text>
      <Menu>
        <MenuButton>
          <Icon as={CgProfile} boxSize={5} mr={3} display="flex" />
        </MenuButton>
        <MenuList>
          <MenuItem color={'black'} onClick={handleLogout}>
            {' '}
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default TopBar;
