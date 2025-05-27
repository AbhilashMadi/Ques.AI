const StorageKeys = require('#resources/storage-keys');
const User = require('#models/user.model');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('#lib/jwt');
const {
  BadRequestException,
  NotFoundException,
} = require('#utils/exceptions');
const StatusCodes = require('#utils/status-codes');

/**
 * Verify OTP and activate user account
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
module.exports = async (request, reply) => {
  const { otp } = request.body;
  const userAgent = request.headers['user-agent'];
  const redis = request.redis;

  // Step 1: Extract and verify cookie - more robust extraction
  const { valid, value } = request.unsignCookie(request.cookies[StorageKeys.OTP_VERIFY]);
  request.log.warn(valid, value);

  if (!valid) {
    throw new BadRequestException('Invalid or tampered OTP cookie');
  }

  const { userId, userAgent: savedUserAgent } = JSON.parse(value);

  // Step 2: Validate User-Agent
  if (userAgent !== savedUserAgent) {
    throw new BadRequestException('Device mismatch');
  }

  // Step 3: Retrieve user - added proper error handling
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  } else if (user.isVerified) {
    throw new BadRequestException(`${email} already verfied, Please try to login.`)
  }

  // Step 4: Verify OTP from Redis
  const storedOtp = await redis.get(StorageKeys.STORE_OTP(userId));
  if (!storedOtp) {
    throw new BadRequestException('OTP expired');
  } else if (storedOtp !== otp) {
    throw new BadRequestException('Invalid OTP');
  }

  // Step 5: Remove the existing OTP from cache
  request.redis.del(StorageKeys.STORE_OTP(userId))

  // Step 6: Mark user as verified
  user.isVerified = true;
  user.active = true;
  await user.save();

  // Step 7: Issue tokens
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken({ userId: user._id, email: user.email }),
    generateRefreshToken({ userId: user._id, email: user.email }),
  ]);

  // Step 8: Set cookies with proper options
  reply
    .clearCookie(StorageKeys.OTP_VERIFY)
    .setCookie(StorageKeys.ACCESS_TOKEN, accessToken, { signed: false })
    .setCookie(StorageKeys.REFRESH_TOKEN, refreshToken, { signed: false });

  // Step 9: Respond with success - using the actual user object
  return reply.success(user.toJSON(), 'User verified successfully', StatusCodes.CREATED);
};