const express = require('express');
const {changePassword, deleteAccount} = require('../controllers/userProfile');

const router = express.Router();

router.put('/change_password', changePassword);

router.delete('/delete_account', deleteAccount);

module.exports = router;
