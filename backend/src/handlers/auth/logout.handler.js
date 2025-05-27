const StorageKeys = require('#resources/storage-keys');
const User = require('#models/user.model');
const { NotFoundException } = require('#utils/exceptions');

/**
 * Logout Handler
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  const { userId, email } = request.user;

  // Step 1: Find the user in the database
  const user = await User.findById(userId);

  if (!user) {
    request.log.warn({
      msg: 'Logout attempted for non-existent user',
      userId,
      email,
      ip: request.ip,
      userAgent: request.headers['user-agent'] || 'unknown',
    });
    throw new NotFoundException('User not found');
  }

  // Step 2: Mark user as inactive
  user.active = false;
  await user.save();

  request.log.info({
    msg: 'User logged out successfully',
    userId,
    email,
    ip: request.ip,
    userAgent: request.headers['user-agent'] || 'unknown',
  });

  // Step 3: Clear authentication cookies
  reply
    .clearCookie(StorageKeys.ACCESS_TOKEN)
    .clearCookie(StorageKeys.REFRESH_TOKEN);

  // Step 4: Send success response
  return reply.success(null, 'User logged out successfully');
};
