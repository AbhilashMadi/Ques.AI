const User = require('#models/user.model');
const envConfig = require('#configs/env.config');
const {
  generatePasswordResetLink,
  generatePasswordResetToken
} = require('#utils/generators');
const storageKeys = require("#resources/storage-keys");
const passwordResetTemplate = require('#templates/password-reset.template');

/**
 * Forgot Password
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  const { email } = request.body;

  const user = await User.findOne({ email });

  // Step 1: Always respond with generic message
  if (!user) {
    request.log.info(`Password reset requested for non-existing email: ${email}`);
    return reply.success(null, 'If your account exists, you will receive a password reset link.');
  }

  // Step 2: Generate raw and hashed token
  const { rawToken, hashedToken } = generatePasswordResetToken();

  // Step 3: Store hashed token in Redis with expiration
  const redisKey = storageKeys.STORE_TOKEN(user.id);
  await request.redis.set(redisKey, hashedToken, 'EX', envConfig.PASSWORD_RESET_TOKEN_TTL);

  // Step 4: Generate password reset link
  const resetLink = generatePasswordResetLink(email, rawToken);
  request.log.info(`Generated password reset link for ${email}: ${resetLink}`);

  // Step 5: sendResetPasswordEmail(user.email, resetLink);
  try {
    // Step 9: Send OTP to the client
    await request.server.nodemailer.sendMail(
      passwordResetTemplate({
        email,
        fullName: user.fullName,
        from: envConfig.EMAIL_SMTP_USER,
        expiryMinutes: envConfig.PASSWORD_RESET_TOKEN_TTL / 60,
        resetLink,
      })
    );
  } catch (error) {
    request.log.error(error, 'Failed to send OTP email');
    return reply.fail('Failed to send password reset link. Please try again later.', 'InternalServerError');
  }

  // Step 6: Respond to client
  return reply.success(null, 'If your account exists, you will receive a password reset link.');
};
