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
  const { email, token } = request.query;
  const { password, confirmPassword } = request.body;

  // Step 1: Validate required fields
  if (!email || !token || !password || !confirmPassword) {
    throw new BadRequestException('Missing required fields');
  }

  // Step 2: Ensure passwords match
  if (password !== confirmPassword) {
    throw new BadRequestException('Passwords do not match');
  }

  // Step 3: Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundException('Invalid email or token');
  }

  // Step 4: Hash the provided raw token
  const hashedToken = verifyPasswordResetToken(token);

  // Step 5: Retrieve stored hashed token from Redis
  const redisKey = StorageKeys.STORE_TOKEN(user.id);
  const storedToken = await request.redis.get(redisKey);

  // Step 6: Validate token match
  if (!storedToken || storedToken !== hashedToken) {
    throw new BadRequestException('Token is invalid or has expired');
  }

  // Step 7: Update user password (ensure you have a pre-save hook to hash it)
  user.password = password;
  await user.save();

  // Step 8: Clean up the used token from Redis
  await request.redis.del(redisKey);

  // Step 9: Log and send response
  request.log.info({ msg: 'Password reset successful', userId: user._id });
  return reply.success(null, 'Your password has been reset successfully');
};
