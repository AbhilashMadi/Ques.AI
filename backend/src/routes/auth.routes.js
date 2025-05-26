const {
  registerUserSchema,
  loginUserSchema,
  verifyOtpSchem,
} = require('#schemas/auth.dto')

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

  // Login (Access + Refresh Tokens)
  fastify.post('/login', {
    schema: loginUserSchema,
    handler: require('#handlers/auth/user-login.handler')
  });

  // Refresh Access Token
  fastify.post('/refresh-token', require('#handlers/auth/refresh-token.handler'));

  // Logout
  fastify.post('/logout', require('#handlers/auth/logout.handler'));

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
  // Resend Verification Email
  fastify.post('/resend-verification', require('#handlers/auth/resend-verify-otp.handler'));
  // Get Current User
  fastify.get('/me',
    // { preValidation: [authenticate] },
    require('#handlers/auth/me-claim.handler'));
}