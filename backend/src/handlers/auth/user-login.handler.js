const User = require('#models/user.model');
const StorageKeys = require('#resources/storage-keys');
const { NotFoundException, ForbiddenException } = require('#utils/exceptions');
const { generateAccessToken, generateRefreshToken } = require('#lib/jwt');

/**
 * Login handler
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  const { email, password } = request.body;

  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundException(`No user found with email ${email}`);
  }

  // 2. Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ForbiddenException('Invalid credentials');
  }

  // 3. Generate tokens
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken({ userId: user._id, email: user.email }),
    generateRefreshToken({ userId: user._id, email: user.email }),
  ]);

  // 4. Set cookies
  reply
    .setCookie(StorageKeys.ACCESS_TOKEN, accessToken)
    .setCookie(StorageKeys.REFRESH_TOKEN, refreshToken);

  // 5. Respond with user info
  return reply.success(user.toJSON(), 'Logged in successfully');
};
