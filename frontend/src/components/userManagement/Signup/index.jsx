import React, {useState} from 'react';
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
import {useNavigate} from 'react-router-dom';
import {emailValidator, passwordValidator} from '../../../utils/validations';
import {signup} from '../../../api/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [show, setShow] = useState(false);

  const toast = useToast();
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleReEnteredPasswordChange = e => setReEnteredPassword(e.target.value);

  const handleClick = () => setShow(!show);

  const handleSubmit = () => {
    if (email === '' || password === '' || reEnteredPassword === '') {
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
    } else if (!passwordValidator(password)) {
      toast({
        title: 'Error',
        description:
          'Please enter a valid password between 8-25 characters with no trailing spaces.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else if (password !== reEnteredPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log(email, password, reEnteredPassword);
      signup(email, password)
        .then(res => {
          if (res.data.status) {
            toast({
              title: 'Success',
              description: res.data.message,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            navigate('/verify-otp', {state: {email: email}});
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

  const isError = email === '';
  const handleSignInClick = () => {
    navigate('/sign-in');
  };
  return (
    <>
      <PageBackground />
      <Flex height="100vh" align="center" justify="center">
        <Card textAlign={'center'}>
          <CardBody>
            <Text fontSize="2xl" as="b">
              SignUp
            </Text>
            <VStack mt={'20%'}>
              <FormControl isInvalid={isError}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={handleEmailChange} />
                {!isError ? '' : <FormErrorMessage>Email is required.</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
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
                </InputGroup>{' '}
              </FormControl>
              <FormControl>
                <FormLabel>Re-enter Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={reEnteredPassword}
                    onChange={handleReEnteredPasswordChange}
                  />
                </InputGroup>{' '}
              </FormControl>
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
                SIGNUP
              </Button>
              <Text fontSize={'xs'} mt={'20%'}>
                Already have an account?
              </Text>
              <Button variant="ghost" size="sm" mb={'20%'} onClick={handleSignInClick}>
                LOGIN
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default SignUp;
