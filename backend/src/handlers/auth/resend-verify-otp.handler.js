const { generateOtp } = require('#utils/generators');
const { BadRequestException, NotFoundException } = require('#utils/exceptions');
const StorageKeys = require('#resources/storage-keys');
const envConfig = require('#configs/env.config');
const User = require('#models/user.model');

/**
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  const { valid, cookie } = request.unsignCookie(request.cookies[StorageKeys.OTP_VERIFY]);

  if (!valid) {
    throw new BadRequestException('Invalid or expired OTP cookie.');
  }

  const { userId, email } = JSON.parse(cookie);
  const userExists = await User.exists(userId);

  if (!userExists) {
    throw new NotFoundException('User not found.');
  }

  const otp = generateOtp();
  request.log.info(`OTP for ${email}: ${otp}`);

  // Store the OTP in Redis or DB here if needed
  request.redis.set(StorageKeys.STORE_OTP(userId), otp, 'EX', envConfig.VERIFY_OTP_TTL);

  // Re-set the OTP_VERIFY cookie with new expiry
  reply.setCookie(
    StorageKeys.OTP_VERIFY,
    JSON.stringify({ userId, email }),
    { maxAge: envConfig.VERIFY_OTP_TTL });

  return reply.success(null, `OTP sent to ${email} successfully`);
};
