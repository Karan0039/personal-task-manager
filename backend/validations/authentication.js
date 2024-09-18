require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Decodes a given JWT token and returns the decoded data.
 * Returns null if the token is invalid.
 * @param {string} token - The JWT token to decode.
 * @returns {Object|null} - The decoded data or null if the token is invalid.
 */
const decodeToken = function (token) {
  return jwt.verify(token, process.env.JWT_KEY, function (err, data) {
    if (err) return null;
    else return data;
  });
};

/**
 * Middleware to authenticate a request using the Authorization header.
 *
 * @function userAuthentication
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise<void>}
 *
 * @throws {Error} 500 - Internal Server Error
 * @throws {Error} 400 - Bad Request
 * @throws {Error} 401 - Unauthorized
 */
const userAuthentication = function (req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(400).send({status: false, message: 'Unauthorized Access!!'});
    token = token.split(' ')[1];
    let verifyToken = decodeToken(token);
    if (!verifyToken)
      return res.status(401).send({
        status: false,
        message: 'Token is either Invalid or Expired.',
      });
    req.user = verifyToken;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = {userAuthentication};
