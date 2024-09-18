const {Users} = require('../models/users');
const bcrypt = require('bcrypt');

/**
 * Changes the password for a user.
 * @function changePassword
 * @param {Object} req - Express request object.
 * @param {string} req.body.email - Email address of the user.
 * @param {string} req.body.oldPassword - Old password of the user.
 * @param {string} req.body.newPassword - New password of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 *
 * @throws {Error} 400 - Bad Request
 * @throws {Error} 500 - Internal Server Error
 */
const changePassword = async (req, res) => {
  try {
    const {email, oldPassword, newPassword} = req.body;

    const user = await Users.findOne({email});

    if (!user) {
      return res.status(400).send({status: false, message: 'User does not exist'});
    }

    const isMatch =
      (await bcrypt.compare(oldPassword, user.password)) ||
      (await bcrypt.compare(oldPassword, user.temporaryPassword));
    if (!isMatch) {
      return res.status(400).send({status: false, message: 'Incorrect password'});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.updateOne({email}, {$set: {password: hashedPassword, temporaryPassword: ''}});
    return res.status(200).send({status: true, message: 'Password changed successfully'});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Deletes a user's account and all associated data.
 * @function deleteAccount
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 *
 * @throws {Error} 500 - Internal Server Error
 */
const deleteAccount = async (req, res) => {
  try {
    const {_id} = req.user;
    await Users.deleteOne({_id});
    //delete all data later
    //
    //
    return res.status(200).send({status: true, message: 'Account deleted successfully'});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
module.exports = {changePassword, deleteAccount};
