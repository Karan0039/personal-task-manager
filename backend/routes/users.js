const express = require('express');
const {createUser, verifyOtp, resendOtp, resetPassword, login} = require('../controllers/user');

const router = express.Router();

router.post('/create', createUser);

router.post('/verify_otp', verifyOtp);

router.post('/resend_otp', resendOtp);

router.post('/reset_password', resetPassword);

router.post('/login', login);

module.exports = router;
