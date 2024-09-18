import React, {useContext, useState} from 'react';
import PageBackground from '../PageBackground';
import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom'; // import styles from './index.module.css';
import {login} from '../../../api/auth';
import {emailValidator} from '../../../utils/validations';
import {AuthContext} from '../../../context/auth';

const SignIn = () => {
  const navigate = useNavigate();
  const {signin} = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const toast = useToast();
  const handleSignUpClick = () => {
    navigate('/sign-up');
  };
  const noEmailError = email === '';
  const noPasswordError = password === '';

  const handleSubmit = () => {
    if (noEmailError || noPasswordError) {
      toast({
        title: 'Error',
        description: 'Please enter email and password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else if (!emailValidator(email)) {
      toast({
        title: 'Error',
        description: 'Please enter valid email',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      login(email, password)
        .then(res => {
          if (res.data.status) {
            signin(res.data.data);
          }
        })
        .catch(err => {
          toast({
            title: 'Error',
            description: err.response.data.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <>
      <PageBackground />

      <Flex height="100vh" align="center" justify="center">
        <Card textAlign={'center'}>
          <CardBody>
            <Text fontSize="2xl" as="b">
              Login
            </Text>
            <VStack mt={'20%'}>
              <FormControl isInvalid={noEmailError}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={handleEmailChange} />
                {!noEmailError ? '' : <FormErrorMessage>Email is required.</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    isInvalid={noPasswordError}
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                variant="ghost"
                size="xs"
                alignSelf={'end'}
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Button>
              <Button
                mt={'10%'}
                w={'100%'}
                borderRadius={'20'}
                textColor={'white'}
                background="linear-gradient(45deg, rgba(45, 229, 255, 1) 0%, rgba(220, 91, 233, 1) 71%)"
                _hover={{bg: 'rgb(80 36 84)'}}
                type="button"
                onClick={handleSubmit}
              >
                LOGIN
              </Button>
              <Text fontSize={'xs'} mt={'20%'}>
                Or Sign Up Using
              </Text>
              <Button variant="ghost" size="sm" mb={'20%'} onClick={handleSignUpClick}>
                SIGN UP
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default SignIn;
