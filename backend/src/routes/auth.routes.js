const {
  registerUserSchema,
  loginUserSchema,
  verifyOtpSchem,
  resendVerifyOtpSchem,
  logoutUserSchema,
  refreshUserTokensSchema,
} = require('#schemas/auth.dto');
const authMiddleware = require('#middlewares/authenticate.middleware');

module.exports = async function (fastify) {
  // User Registration
  fastify.post('/register', {
    schema: registerUserSchema,
    handler: require('#handlers/auth/user-register.handler')
  });

  // Verify Email
  fastify.post('/verify-email', {
    schema: verifyOtpSchem,
    handler: require('#handlers/auth/verify-email-otp.handler'),
  });

  // Resend Verification Email
  fastify.post('/resend-verification', {
    schema: resendVerifyOtpSchem,
    handler: require('#handlers/auth/resend-verify-otp.handler')
  });

  // Login (Access + Refresh Tokens)
  fastify.post('/login', {
    schema: loginUserSchema,
    handler: require('#handlers/auth/user-login.handler')
  });

  // Logout
  fastify.post('/logout', {
    schema: logoutUserSchema,
    preHandler: authMiddleware,
    handler: require('#handlers/auth/logout.handler')
  });

  // Refresh Access Token
  fastify.post('/refresh-token', {
    schema: refreshUserTokensSchema,
    handler: require('#handlers/auth/refresh-token.handler')
  });

  // Request Password Reset
  fastify.post('/forgot-password', require('#handlers/auth/forgot-password.handler'));

  // Reset Password
  fastify.post('/reset-password', require('#handlers/auth/reset-password.handler'));
  // Change Password (authenticated)
  // fastify.post('/change-password', { preValidation: [authenticate] }, async (request, reply) => {
  //   // TODO: Implement password change
  //   // - Verify current password
  //   // - Update to new password
  // });
  // Get Current User
  fastify.get('/me',
    // { preValidation: [authenticate] },
    require('#handlers/auth/me-claim.handler'));
}