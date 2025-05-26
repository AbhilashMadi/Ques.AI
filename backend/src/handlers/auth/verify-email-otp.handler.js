const StorageKeys = require('#resources/storage-keys');
const User = require('#models/user.model');
const {
  verifyOtpCookieToken,
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
  const { valid, value: otpCookie } = request.unsignCookie(request.cookies[StorageKeys.OTP_VERIFY]);

  if (!valid || !otpCookie) {
    throw new BadRequestException('Invalid or tampered OTP cookie');
  }

  let payload;
  try {
    payload = verifyOtpCookieToken(otpCookie);
  } catch (err) {
    console.error('OTP Cookie verification failed:', err);
    throw new BadRequestException('Invalid or expired OTP cookie');
  }

  const { userId, userAgent: savedUserAgent } = payload;

  // Step 2: Validate User-Agent
  if (userAgent !== savedUserAgent) {
    throw new BadRequestException('Device mismatch');
  }

  // Step 3: Retrieve user - added proper error handling
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }

  // Step 4: Verify OTP from Redis
  const storedOtp = await redis.get(StorageKeys.STORE_OTP(userId));
  if (!storedOtp) {
    throw new BadRequestException('OTP expired');
  } else if (storedOtp !== otp) {
    throw new BadRequestException('Invalid OTP');
  }

  // Step 5: Mark user as verified
  user.isVerified = true;
  await user.save();

  // Step 6: Issue tokens
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken({ userId: user._id, email: user.email }),
    generateRefreshToken({ userId: user._id, email: user.email }),
  ]);

  // Step 7: Set cookies with proper options
  reply
    .clearCookie(StorageKeys.OTP_VERIFY)
    .setCookie(StorageKeys.ACCESS_TOKEN, accessToken)
    .setCookie(StorageKeys.REFRESH_TOKEN, refreshToken);

  // Step 8: Respond with success - using the actual user object
  return reply.success(user.toJSON(), 'User verified successfully', StatusCodes.CREATED);
};