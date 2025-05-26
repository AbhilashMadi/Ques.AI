const jwt = require('jsonwebtoken');
const {
  UnauthorizedException,
  HttpException,
} = require('#utils/exceptions');

const {
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXP,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXP,
} = require('@configs/env.config');

/**
 * Generate an access token
 * @param {Object} payload - Payload to include (e.g., { userId, role })
 * @param {String} [expiresIn='15m']
 * @returns {String} signed JWT access token
 */
function generateAccessToken(payload, expiresIn = ACCESS_TOKEN_EXP) {
  try {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn });
  } catch (err) {
    throw new HttpException('Failed to generate access token');
  }
}

/**
 * Generate a refresh token
 * @param {Object} payload - Payload to include (e.g., { userId })
 * @param {String} [expiresIn='7d']
 * @returns {String} signed JWT refresh token
 */
function generateRefreshToken(payload, expiresIn = REFRESH_TOKEN_EXP) {
  try {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { algorithm: 'HS256', expiresIn });
  } catch (err) {
    throw new HttpException('Failed to generate refresh token');
  }
}

/**
 * Verify access token
 * @param {String} token - JWT string
 * @returns {Object} Decoded payload
 * @throws {UnauthorizedException}
 */
function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] });
  } catch (err) {
    throw new UnauthorizedException('Invalid or expired access token');
  }
}

/**
 * Verify refresh token
 * @param {String} token - JWT string
 * @returns {Object} Decoded payload
 * @throws {UnauthorizedException}
 */
function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET, { algorithms: ['HS256'] });
  } catch (err) {
    throw new UnauthorizedException('Invalid or expired refresh token');
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
