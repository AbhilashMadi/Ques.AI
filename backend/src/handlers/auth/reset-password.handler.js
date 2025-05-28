const User = require('#models/user.model');
const StorageKeys = require('#resources/storage-keys');
const { BadRequestException, NotFoundException } = require('#utils/exceptions');
const { verifyPasswordResetToken } = require('#utils/generators');

/**
 * Reset Password Handler
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  try {
    const { token } = request.query;
    const { password, confirmPassword } = request.body;

    // Step 1: Validate required fields
    if (!token || !password || !confirmPassword) {
      throw new BadRequestException('Missing required fields.');
    }

    // Step 2: Ensure passwords match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    // Step 3: Lookup email from Redis using token
    const email = await request.redis.get(token);
    if (!email) {
      throw new BadRequestException('Invalid or expired token. Please request a new link.');
    }

    // Step 4: Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Step 5: Verify token matches the one stored in Redis
    const hashedToken = verifyPasswordResetToken(token);
    const redisKey = StorageKeys.STORE_TOKEN(user.id);
    const storedToken = await request.redis.get(redisKey);

    if (!storedToken || storedToken !== hashedToken) {
      throw new BadRequestException('Invalid or expired token. Please request a new link.');
    }

    // Step 6: Update user password
    user.password = password;
    await user.save(); // pre-save middleware hashes the password

    // Step 7: Clean up tokens in Redis
    await request.redis.del(redisKey);
    await request.redis.del(token);

    // Step 8: Final response
    request.log.info({ msg: 'Password reset successful', userId: user._id });
    return reply.success(null, 'Your password has been reset successfully.');
  } catch (error) {
    request.log.error(error);
    throw error;
  }
};
