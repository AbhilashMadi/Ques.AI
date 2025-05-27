const { UnauthorizedException, NotFoundException } = require('#utils/exceptions');
const {
  verifyRefreshToken,
  generateRefreshToken,
  generateAccessToken,
} = require('#lib/jwt');
const StorageKeys = require('#resources/storage-keys');
const User = require('#models/user.model');
const envConfig = require('#configs/env.config');

/**
 * Refresh Token Handler
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  const { valid, value: refreshToken } = request.unsignCookie(request.cookies[StorageKeys.REFRESH_TOKEN]);

  if (!valid || !refreshToken) {
    request.log.warn('Missing or invalid refresh token');
    throw new UnauthorizedException('Invalid or missing refresh token');
  }

  let payload;
  try {
    payload = await verifyRefreshToken(refreshToken);
  } catch (err) {
    request.log.warn('Failed to verify refresh token');
    throw new UnauthorizedException('Refresh token expired or invalid');
  }

  const user = await User.findById(payload.userId);
  if (!user) {
    request.log.warn('User not found during token refresh');
    throw new NotFoundException('User not found');
  }

  const tokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const [newAccessToken, newRefreshToken] = await Promise.all([
    generateAccessToken(tokenPayload),
    generateRefreshToken(tokenPayload),
  ]);

  request.log.info('Access token refreshed');

  reply
    .setCookie(StorageKeys.ACCESS_TOKEN, newAccessToken, { maxAge: envConfig.ACCESS_TOKEN_TTL })
    .setCookie(StorageKeys.REFRESH_TOKEN, newRefreshToken, { maxAge: envConfig.REFRESH_TOKEN_TTL });

  return reply.success(null, 'Access token refreshed successfully');
};
