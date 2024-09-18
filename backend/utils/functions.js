/**
 * Generates a random 6-digit One-Time Password (OTP).
 *
 * @returns {number} A 6-digit OTP.
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

/**
 * Generates a random 8-character alphanumeric password.
 *
 * @returns {string} An 8-character alphanumeric password.
 */
const generatePass = () => {
  return (Math.random() * 10 ** 16).toString(36).slice(0, 8);
};

module.exports = {generateOtp, generatePass};
