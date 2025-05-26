const { randomBytes, randomUUID } = require('crypto');

function generateUUID() {
  return randomUUID();
}

function generateRandomString(bytes = 16) {
  return randomBytes(bytes).toString('hex');
}

function generateOtp(length = 6) {
  if (length < 4 || length > 12) {
    throw new Error('OTP length must be between 4 and 12 characters');
  }

  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let otp = '';

  // Use crypto.randomBytes for secure random number generation
  const randomValues = randomBytes(length);

  for (let i = 0; i < length; i++) {
    // Use modulo to get a random index within charset bounds
    const randomIndex = randomValues[i] % charset.length;
    otp += charset[randomIndex];
  }

  return otp;
}

module.exports = {
  generateUUID,
  generateRandomString,
  generateOtp,
};