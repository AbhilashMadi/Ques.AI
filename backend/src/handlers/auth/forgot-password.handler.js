const User = require('#models/user.model');
const envConfig = require('#configs/env.config');
const {
  generatePasswordResetLink,
  generatePasswordResetToken
} = require('#utils/generators');
const StorageKeys = require("#resources/storage-keys");
const passwordResetTemplate = require('#templates/password-reset.template');
const { HttpException } = require('#utils/exceptions');

/**
 * Forgot Password Handler
 * 
 * @param {import("fastify").FastifyRequest} request 
 * @param {import("fastify").FastifyReply} reply 
 */
module.exports = async (request, reply) => {
  const { email } = request.body;

  // Step 1: Look up the user
  const user = await User.findOne({ email });

  // Step 2: Always return a generic success response
  if (!user) {
    request.log.info(`Password reset requested for non-existent email: ${email}`);
    return reply.success(null, 'If your account exists, you will receive a password reset link.');
  }

  // Step 3: Generate raw and hashed token
  const { rawToken, hashedToken } = generatePasswordResetToken();

  // Step 4: Store hashed token in Redis (keyed by user ID) and raw token (keyed by token itself)
  try {
    const userTokenKey = StorageKeys.STORE_TOKEN(user.id); // For validation
    const tokenToEmailKey = rawToken; // For reverse lookup during reset

    const ttl = envConfig.PASSWORD_RESET_TOKEN_TTL;

    // Store hashed token for verification
    await request.redis.set(userTokenKey, hashedToken, { EX: ttl });

    // Store email against the raw token for reverse lookup
    await request.redis.set(tokenToEmailKey, email, { EX: ttl });

    request.log.info(`Password reset token stored: ${userTokenKey}, TTL: ${ttl}s`);
  } catch (error) {
    request.log.error(error);
    throw new HttpException('Could not process your request. Please try again later.');
  }

  // Step 5: Generate reset link and send email
  const resetLink = generatePasswordResetLink(rawToken);

  try {
    await request.server.nodemailer.sendMail(
      passwordResetTemplate({
        email,
        fullName: user.fullName,
        from: envConfig.EMAIL_SMTP_USER,
        expiryMinutes: envConfig.PASSWORD_RESET_TOKEN_TTL / 60,
        resetLink,
      })
    );
    request.log.info(`Reset password email sent to ${email}`);
  } catch (error) {
    request.log.error(error, 'Failed to send reset email');
    return reply.fail('Failed to send password reset link. Please try again later.', 'InternalServerError');
  }

  // Step 6: Final response
  return reply.success(null, 'If your account exists, you will receive a password reset link.');
};
