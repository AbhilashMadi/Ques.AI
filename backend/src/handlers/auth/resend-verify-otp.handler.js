const { generateOtp } = require('#utils/generators');
const { BadRequestException, NotFoundException, UnauthorizedException } = require('#utils/exceptions');
const StorageKeys = require('#resources/storage-keys');
const envConfig = require('#configs/env.config');
const User = require('#models/user.model');

/**
 * Resend OTP handler
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  // Step 1: Unsign and validate OTP verification cookie
  const { valid, value: cookie } = request.unsignCookie(request.cookies[StorageKeys.OTP_VERIFY]);

  if (!valid) {
    request.log.warn('Attempt to resend OTP with invalid or expired OTP cookie');
    throw new BadRequestException('Invalid or expired OTP cookie.');
  }

  // Step 2: Extract values from the cookie
  const { userId, userAgent } = JSON.parse(cookie);

  // Step 3: Ensure user-agent consistency for security
  const currentUserAgent = request.headers['user-agent'] || 'unknown';
  if (currentUserAgent !== userAgent) {
    request.log.warn(`User-agent mismatch for OTP resend. Expected: ${userAgent}, Received: ${currentUserAgent}`);
    throw new BadRequestException('User-agent mismatch. OTP request denied.');
  }

  // Step 4: Check if user still exists in the DB
  const user = await User.findOne({ _id: userId });
  if (!user) {
    request.log.warn(`OTP resend failed. User not found with ID: ${userId}`);
    throw new NotFoundException('User not found.');
  }

  // Step 5: Generate new OTP and store in Redis
  const otp = generateOtp();
  const email = user.email;

  await request.redis.set(StorageKeys.STORE_OTP(userId), otp, 'EX', envConfig.VERIFY_OTP_TTL);
  request.log.info(`Resent OTP for ${email}: ${otp}`);

  // Step 6: Reset OTP_VERIFY cookie with fresh expiry
  reply.setCookie(
    StorageKeys.OTP_VERIFY,
    JSON.stringify({ userId, userAgent }),
    { maxAge: envConfig.VERIFY_OTP_TTL }
  );

  // Step 7: Respond with success
  return reply.success(null, `OTP sent to ${email} successfully`);
};
