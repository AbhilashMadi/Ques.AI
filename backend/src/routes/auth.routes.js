module.exports = async function (fastify) {
  // User Registration
  fastify.post('/register', require('#handlers/auth/user-regiser.handler'));

  // Verify Email
  fastify.post('/verify-email', require('#handlers/auth/user-login.handler'));

  // Login (Access + Refresh Tokens)
  fastify.post('/login', require('#handlers/auth/verify-email-otp.handler'));

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