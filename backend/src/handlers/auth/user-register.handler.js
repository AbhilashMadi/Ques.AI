const User = require('#models/user.model');
const StatusCodes = require('#utils/status-codes');
const StorageKeys = require('#resources/storage-keys');
const envConfig = require('#configs/env.config');
const otpTemplate = require('#templates/otp.template')

const { generateOtp } = require('#utils/generators');
const { BadRequestException, HttpException } = require('#utils/exceptions');

/**
 * Register user and initiate OTP verification
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  // Step 1: Extract user data from request body
  const { fullName, email, password } = request.body;

  // Step 2: Get Redis instance and user-agent header
  const userAgent = request.headers['user-agent'] || 'unknown';

  let user;
  // Step 3: Check if a user with the given email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // Step 4a: If user exists and is already verified, throw conflict error
    if (existingUser.isVerified) {
      throw new BadRequestException(`User with the email "${email}" already exists.`, StatusCodes.CONFLICT);
    } else {
      // Step 4b: If user exists but is not verified, update their info and save
      existingUser.fullName = fullName;
      existingUser.password = password;

      await existingUser.save();
      user = existingUser;

      reply.log.info(`Updated unverified user with email: ${email}`);
    }
  } else {
    // Step 5: If user does not exist, create a new user
    user = await User.create({ fullName, email, password });
  }

  // Step 6: Generate OTP for verification
  const otp = generateOtp();

  // Step 7: Store OTP in Redis with expiration time (TTL)
  reply.log.info(`Generated OTP for ${email}: ${otp}`);

  try {
    const key = StorageKeys.STORE_OTP(user.id);
    const ttl = envConfig.VERIFY_OTP_TTL;
    request.log.info(`Setting OTP in Redis with key: ${key}, TTL: ${ttl}s`);

    await request.redis.set(key, otp, { ex: ttl });
    request.log.info('OTP set successfully in Redis');
  } catch (error) {
    request.log.error(error);
    throw new HttpException('Could not store OTP, please try again later.');
  }

  // Step 8: Set OTP verification cookie with userId and userAgent, expires after TTL
  reply.setCookie(
    StorageKeys.OTP_VERIFY,
    JSON.stringify({ userId: user.id, userAgent }),
    { maxAge: envConfig.VERIFY_OTP_TTL }
  );

  try {
    // Step 9: Send OTP to the client
    await request.server.nodemailer.sendMail(
      otpTemplate({
        fullName,
        otp,
        email,
        expiryMinutes: envConfig.VERIFY_OTP_TTL / 60
      })
    );
  } catch (error) {
    request.log.error(error, 'Failed to send OTP email');
    return reply.fail('Failed to send OTP. Please try again later.', 'InternalServerError');
  }

  // Step 10: Respond with success message and user data
  return reply.success(user.toJSON(), 'User created or updated, please verify OTP', StatusCodes.CREATED);
};
