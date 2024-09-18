import React, {useContext, useEffect, useState} from 'react';
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
import {useLocation, useNavigate} from 'react-router-dom';
import {resendOtp, verifyOtp} from '../../../api/auth';
import {AuthContext} from '../../../context/auth';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const {signin} = useContext(AuthContext);
  const toast = useToast();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!email) {
      navigate('/sign-up');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const handleOtpChange = e => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
  };
  const handleSubmit = () => {
    console.log(otp, email);
    verifyOtp(email, otp)
      .then(res => {
        if (res.data.status) {
          toast({
            title: 'Success',
            description: 'OTP verified successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          signin(res.data.data);
          navigate('/');
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

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsDisabled(false);
    }
  }, [counter]);

  const handleResendOTP = () => {
    setCounter(30);
    setIsDisabled(true);

    resendOtp(email)
      .then(res => {
        if (res.data.status) {
          toast({
            title: 'OTP Sent',
            description: 'OTP has been sent to your email',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
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
              Verify OTP
            </Text>
            <VStack mt={'20%'}>
              <FormControl>
                <FormLabel>OTP</FormLabel>
                <Input type="text" value={otp} onChange={handleOtpChange} />
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
              <Text fontSize={'xs'} mt={'20%'}>
                Didn't recieve?
              </Text>
              <Button
                variant="ghost"
                size="sm"
                mb={'20%'}
                onClick={handleResendOTP}
                isDisabled={isDisabled}
              >
                {`Resend OTP${counter > 0 ? ` in ${counter}s` : ''}`}
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default VerifyOtp;
