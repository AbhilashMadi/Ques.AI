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

  // Step 1: Extract and verify cookie
  const otpCookie = request.getCookie(StorageKeys.OTP_VERIFY);
  if (!otpCookie) {
    throw new BadRequestException('Missing OTP verification cookie');
  }

  let payload;
  try {
    payload = await verifyOtpCookieToken(otpCookie);
  } catch {
    throw new BadRequestException('Invalid or expired OTP cookie');
  }

  const { userId, userAgent: savedUserAgent } = payload;

  // Step 2: Validate User-Agent
  if (userAgent !== savedUserAgent) {
    throw new BadRequestException('Device mismatch');
  }

  // Step 3: Retrieve user
  const { email } = await User.findById(userId);
  if (!email) {
    throw new NotFoundException('User not found');
  }

  // Step 4: Verify OTP from Redis
  const storedOtp = await redis.get(StorageKeys.STORE_OTP(userId));
  if (!storedOtp || storedOtp !== otp) {
    throw new BadRequestException('Invalid or expired OTP');
  }

  // Step 5: Mark user as verified
  await User.updateOne({ _id: userId }, { isVerified: true });

  // Step 6: Issue tokens
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken({ userId, email }),
    generateRefreshToken({ userId, email }),
  ]);

  // Step 7: Set cookies
  reply
    .setCookie(StorageKeys.ACCESS_TOKEN, accessToken)
    .setCookie(StorageKeys.REFRESH_TOKEN, refreshToken);

  // Step 8: Respond with success
  return reply.success(user.toJSON(), 'User verified successfully', StatusCodes.CREATED);
};
