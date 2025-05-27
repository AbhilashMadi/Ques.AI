const User = require('#models/user.model');
const { UnauthorizedException, NotFoundException } = require('#utils/exceptions');

/**
 * Get Current Authenticated User
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  const { userId } = request.user;

  if (!userId) {
    request.log.warn('No userId found in request');
    throw new UnauthorizedException('User not authenticated');
  }

  const user = await User.findById(userId);

  if (!user) {
    request.log.warn('User not found');
    throw new NotFoundException('User not found');
  }

  request.log.info('User fetched successfully');
  return reply.success(user.toJSON(), 'User profile fetched');
};
