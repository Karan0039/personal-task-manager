import React, {useState} from 'react';
import PageBackground from '../PageBackground';
import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {forgotPassword} from '../../../api/auth';
import {emailValidator} from '../../../utils/validations';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    if (email === '') {
      toast({
        title: 'Error',
        description: 'Please enter email',
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
    }
    forgotPassword(email)
      .then(res => {
        if (res.data.status) {
          toast({
            title: 'Success',
            description: 'A temporary password has been sent to your email',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/sign-in');
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
  };

  return (
    <>
      <PageBackground />
      <Flex height="100vh" align="center" justify="center">
        <Card textAlign={'center'}>
          <CardBody>
            <Text fontSize="2xl" as="b">
              Reset Password
            </Text>
            <VStack mt={'20%'}>
              <FormControl>
                <FormLabel>Enter your email</FormLabel>
                <Input type="email" value={email} onChange={handleEmailChange} />
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
                SUBMIT
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default ForgotPassword;
