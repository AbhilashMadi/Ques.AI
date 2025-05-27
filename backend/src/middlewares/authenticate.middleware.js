const { UnauthorizedException } = require('#utils/exceptions');
const storageKeys = require('#resources/storage-keys');
const { verifyAccessToken } = require('#lib/jwt');

/**
 * Authenticate Middleware
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  // Step 1: Retrieve access token from signed cookie
  const { valid, value: accessToken } = request.unsignCookie(request.cookies[storageKeys.ACCESS_TOKEN]);

  // Step 2: Validate presence and integrity of token
  if (!valid || !accessToken) {
    request.log.warn({
      msg: 'Access token is missing or unsigned',
      ip: request.ip,
      userAgent: request.headers['user-agent'] || 'unknown',
    });

    throw new UnauthorizedException('Access token is missing or invalid');
  }

  try {
    // Step 3: Verify token
    const payload = await verifyAccessToken(accessToken);

    // Step 4: Attach decoded user payload to request
    request.user = payload;

    request.log.info({
      msg: 'User authenticated successfully',
      userId: payload?.id,
      email: payload?.email,
      ip: request.ip,
      userAgent: request.headers['user-agent'] || 'unknown',
    });
  } catch (err) {
    request.log.error({
      msg: 'Invalid or expired access token during authentication',
      error: err.message,
      ip: request.ip,
      userAgent: request.headers['user-agent'] || 'unknown',
    });

    throw new UnauthorizedException('Invalid or expired access token');
  }
};
