const User = require('#models/user.model');
const StatusCodes = require('#utils/status-codes');
const StorageKeys = require('#resources/storage-keys');
const envConfig = require('#configs/env.config');

const { generateOtp } = require('#utils/generators');
const { BadRequestException } = require('#utils/exceptions');
const { generateOtpCookieToken } = require('#lib/jwt');

/**
 * Register user and initiate OTP verification
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  const { fullName, email, password } = request.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestException(`User with the email "${email}" already exists.`, StatusCodes.CONFLICT);
  }

  // Create new user
  const newUser = await User.create({ fullName, email, password });

  const redis = request.redis;
  const otp = generateOtp(); // 6-digit OTP
  const userAgent = request.headers['user-agent'] || 'unknown';

  // Store OTP in Redis with expiration
  await redis.set(StorageKeys.STORE_OTP(newUser._id), otp, 'EX', envConfig.VERIFY_OTP_TTL);
  reply.log.info(`Generated OTP for ${email}: ${otp}`);

  // Set signed, secure cookie to identify same device
  reply.setCookie(
    StorageKeys.OTP_VERIFY,
    JSON.stringify({ userId: newUser._id.toString(), userAgent }),
    { maxAge: envConfig.VERIFY_OTP_TTL });

  return reply.success(newUser.toJSON(), 'User created', StatusCodes.CREATED);
};
