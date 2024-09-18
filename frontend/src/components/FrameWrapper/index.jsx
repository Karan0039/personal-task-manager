import React, {useState} from 'react';
import TopBar from '../Topbar';
import {Flex} from '@chakra-ui/react';
import Sidebar from '../Sidebar';

const FrameWrapper = props => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <>
      <TopBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <Flex>
        {showMenu ? <Sidebar /> : ''}
        {props.children}
      </Flex>
    </>
  );
};

export default FrameWrapper;
