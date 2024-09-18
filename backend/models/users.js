const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {type: String, index: true, unique: true},
    password: {type: String},
    temporaryPassword: {type: String},
  },
  {timestamps: {createdAt: 'c', updatedAt: 'u'}, versionKey: false}
);

const Users = mongoose.model('Users', userSchema);
module.exports = {Users};
