const express = require('express');
const router = express.Router();

router.post('/reminder', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/reminders', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/reminder/:id', function (req, res, next) {
  res.send('respond with a resource');
});

router.put('/reminder', function (req, res, next) {
  res.send('respond with a resource');
});

router.delete('/reminders', function (req, res, next) {
  res.send('respond with a resource');
});

router.delete('/reminder/:id', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
