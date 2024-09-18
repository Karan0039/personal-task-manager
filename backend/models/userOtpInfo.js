const mongoose = require('mongoose');

const userOtpInfoSchema = new mongoose.Schema(
  {
    email: {type: String, index: true, unique: true},
    password: {type: String},
    otp: {type: String},
  },
  {timestamps: {createdAt: 'c', updatedAt: 'u'}, versionKey: false}
);

const UserOtpInfo = mongoose.model('UserOtpInfo', userOtpInfoSchema, 'userOtpInfo');
module.exports = {UserOtpInfo};
