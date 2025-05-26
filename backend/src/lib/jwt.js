const jwt = require('jsonwebtoken');
const {
  UnauthorizedException,
  HttpException,
  BadRequestException,
} = require('#utils/exceptions');

const {
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXP,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXP,
  OTP_VERIFY_TOKEN_SECRET,
  OTP_VERIFY_TOKEN_EXP,
} = require('#configs/env.config');

/**
 * Generate an access token
 * @param {{ userId: string, role?: string }} payload - JWT payload
 * @param {string} [expiresIn=ACCESS_TOKEN_EXP] - Expiration string (e.g., '15m', '1d')
 * @returns {string} Signed JWT
 */
function generateAccessToken(payload, expiresIn = ACCESS_TOKEN_EXP) {
  try {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn,
    });
  } catch (err) {
    throw new HttpException('Failed to generate access token');
  }
}

/**
 * Generate a refresh token
 * @param {{ userId: string }} payload - JWT payload
 * @param {string} [expiresIn=REFRESH_TOKEN_EXP]
 * @returns {string} Signed JWT
 */
function generateRefreshToken(payload, expiresIn = REFRESH_TOKEN_EXP) {
  try {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn,
    });
  } catch (err) {
    throw new HttpException('Failed to generate refresh token');
  }
}

/**
 * Verify access token
 * @param {string} token - JWT token string
 * @returns {object} Decoded payload
 * @throws {UnauthorizedException}
 */
function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ['HS256'],
    });
  } catch (err) {
    throw new UnauthorizedException('Invalid or expired access token');
  }
}

/**
 * Verify refresh token
 * @param {string} token - JWT token string
 * @returns {object} Decoded payload
 * @throws {UnauthorizedException}
 */
function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET, {
      algorithms: ['HS256'],
    });
  } catch (err) {
    throw new UnauthorizedException('Invalid or expired refresh token');
  }
}

/**
 * Generate a short-lived OTP cookie token
 * Used to verify that OTP verification is done from the same client/device
 * 
 * @param {{ email: string, otpId: string }} payload - OTP payload
 * @param {string} [expiresIn=OTP_VERIFY_TOKEN_EXP]
 * @returns {string} JWT token
 */
function generateOtpCookieToken(payload, expiresIn = OTP_VERIFY_TOKEN_EXP) {
  try {
    return jwt.sign(payload, OTP_VERIFY_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn,
    });
  } catch (err) {
    throw new HttpException('Failed to generate OTP token');
  }
}

/**
 * Verify OTP cookie token
 * @param {string} token - JWT from cookie
 * @returns {object} Decoded payload
 * @throws {BadRequestException}
 */
function verifyOtpCookieToken(token) {
  try {
    return jwt.verify(token, OTP_VERIFY_TOKEN_SECRET, {
      algorithms: ['HS256'],
    });
  } catch (err) {
    console.error('OTP token verification failed:', err);
    throw new BadRequestException('Invalid or expired OTP token');
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateOtpCookieToken,
  verifyOtpCookieToken,
};
