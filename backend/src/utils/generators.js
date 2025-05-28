const { randomBytes, randomUUID, createHash } = require('crypto');
const envConfig = require('#configs/env.config')

function generateUUID() {
  return randomUUID();
}

function generateRandomString(bytes = 16) {
  return randomBytes(bytes).toString('hex');
}

function generateOtp(length = envConfig.VERIFY_OTP_LENGTH) {
  if (length < 4 || length > 10) {
    throw new Error('OTP length must be between 4 and 10 digits');
  }

  const digits = '0123456789';
  let otp = '';

  const randomValues = randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % digits.length;
    otp += digits[randomIndex];
  }

  return otp;
}

function generatePasswordResetLink(token) {
  return `${envConfig.CLIENT}/auth/reset-password?token=${token}`;
}

function generatePasswordResetToken() {
  const rawToken = randomBytes(32).toString('hex');
  const hashedToken = createHash('sha256').update(rawToken).digest('hex');
  return { rawToken, hashedToken };
}

function verifyPasswordResetToken(rawToken) {
  return createHash('sha256').update(rawToken).digest('hex');
}

module.exports = {
  generateUUID,
  generateRandomString,
  generateOtp,
  generatePasswordResetLink,
  generatePasswordResetToken,
  verifyPasswordResetToken,
};