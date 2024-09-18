import axios from './axios/index';
import config from '../config';
const {BASE_URL} = config;

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  return response;
};

export const signup = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/users/create`, {
    email,
    password,
  });
  return response;
};
export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${BASE_URL}/users/verify_otp`, {
    email,
    otp,
  });
  return response;
};

export const resendOtp = async email => {
  const response = await axios.post(`${BASE_URL}/users/resend_otp`, {
    email,
  });
  return response;
};

export const forgotPassword = async email => {
  const response = await axios.post(`${BASE_URL}/users/reset_password`, {
    email,
  });
  return response;
};
