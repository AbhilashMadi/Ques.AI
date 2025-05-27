const User = require('#models/user.model');
const StorageKeys = require('#resources/storage-keys');
const envConfig = require('#configs/env.config');
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
  if (!user || !user.isVerified) {
    throw new NotFoundException(`No user found with email ${email}`);
  }

  // 2. Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ForbiddenException('Invalid credentials');
  }

  user.active = true;
  await user.save();

  // 3. Generate tokens
  const tokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role
  }

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(tokenPayload),
    generateRefreshToken(tokenPayload),
  ]);

  // 4. Set cookies
  reply
    .setCookie(StorageKeys.ACCESS_TOKEN, accessToken, { maxAge: envConfig.ACCESS_TOKEN_TTL })
    .setCookie(StorageKeys.REFRESH_TOKEN, refreshToken, { maxAge: envConfig.REFRESH_TOKEN_TTL });

  // 5. Respond with user info
  return reply.success(user.toJSON(), 'Logged in successfully');
};
