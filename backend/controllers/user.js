require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendOtpMail} = require('../email/sendOtpEmail');
const {UserOtpInfo} = require('../models/userOtpInfo');
const {Users} = require('../models/users');
const {sendResetPasswordEmail} = require('../email/sendResetPasswordEmail');
const {generateOtp, generatePass} = require('../utils/functions');

/**
 * Creates a new user and sends a One-Time Password (OTP) to the provided email
 * address. The OTP is required to verify the user's email address.
 *
 * @function createUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const createUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    let user = await Users.findOne({email}).lean();
    if (user) {
      return res.status(400).send({status: false, message: 'Account already exists'});
    }
    const otp = generateOtp();
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userInfo = {
      email,
      password: encryptedPassword,
      otp,
    };

    let sendMailInfo = await sendOtpMail(email, otp);

    if (!sendMailInfo) {
      return res
        .status(500)
        .send({status: false, message: 'Failed to send OTP. Please try again.'});
    } else {
      await UserOtpInfo.findOneAndUpdate(
        {email},
        {$set: userInfo},
        {upsert: true, new: true}
      ).lean();
      return res.status(200).send({status: true, message: 'OTP sent successfully'});
    }
  } catch (err) {
    console.loglog(err);
    return res.sendStatus(500);
  }
};

/**
 * Verify the OTP sent to the user's email and create a new user in the Users collection.
 * @function verifyOtp
 * @param {Object} req - Express request object.
 * @param {string} req.body.email - Email address of the user.
 * @param {string} req.body.otp - OTP provided by the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const verifyOtp = async (req, res) => {
  try {
    const {email, otp} = req.body;
    let user = await UserOtpInfo.findOne({email}).lean();
    console.log(otp, user.otp);
    if (user.otp != otp) {
      return res.status(400).send({status: false, message: 'Invalid OTP'});
    }
    user = await Users.create(user);
    await UserOtpInfo.deleteOne({email});
    return res
      .status(200)
      .send({status: true, data: {token: user.token}, message: 'OTP verified successfully'});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Resends the OTP to a user's email
 * @function resendOtp
 * @param {Object} req - Express request object.
 * @param {string} req.body.email - Email address of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const resendOtp = async (req, res) => {
  try {
    const {email} = req.body;
    let user = await UserOtpInfo.findOne({email}).lean();
    if (!user) {
      return res.status(400).send({status: false, message: 'Account does not exist'});
    }

    let {otp} = user;

    if (await sendOtpMail(email, otp)) {
      return res
        .status(201)
        .send({status: true, data: {...user}, message: 'OTP sent successfully'});
    } else {
      return res.send({status: false, message: 'Failed to send OTP. Please try again.'});
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Resets the password for a user.
 *
 * @function resetPassword
 * @param {Object} req - Express request object.
 * @param {string} req.body.email - Email address of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const resetPassword = async (req, res) => {
  try {
    let {email} = req.body;
    const user = await Users.findOne({email: email}).exec();
    if (!user) return res.send({status: false, message: 'Account does not exist'});

    const newPassword = generatePass();

    await Users.updateOne({email}, {$set: {temporaryPassword: await bcrypt.hash(newPassword, 10)}});

    if (await sendResetPasswordEmail(email, newPassword)) {
      return res.status(200).send({status: true, message: 'Password reset successfully'});
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Logs in a user with given email and password.
 *
 * @function login
 * @param {Object} req - Express request object.
 * @param {string} req.body.email - Email address of the user.
 * @param {string} req.body.password - Password of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await Users.findOne({email}).lean();
  if (!user) {
    return res.status(400).send({status: false, message: 'User does not exist'});
  }
  const isMatch =
    (await bcrypt.compare(password, user.password)) ||
    (await bcrypt.compare(password, user.temporaryPassword));
  if (!isMatch) {
    return res.status(400).send({status: false, message: 'Incorrect password'});
  }
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY,
    {expiresIn: '3000m'}
  );
  return res.status(200).send({status: true, message: 'Logged in successfully', data: {token}});
};

module.exports = {createUser, verifyOtp, resendOtp, resetPassword, login};
// console.log(
//   Buffer.from(
//     'eyJ1c2VySWQiOiI2NmUzMTBiODAzODUyODUyYzA5YmEwMDEiLCJpYXQiOjE3MjYxNjQ2NDYsImV4cCI6MTcyNjM0NDY0Nn0',
//     'base64'
//   ).toString('utf-8')
// );
