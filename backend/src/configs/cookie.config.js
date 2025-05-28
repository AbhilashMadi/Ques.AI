const envConfig = require('#configs/env.config')

/**
 * @type {import('@fastify/cookie').FastifyCookieOptions}
 */
module.exports = {
  secret: envConfig.SECURE_COOKIE_SECRET,
  hook: 'onRequest',
  parseOptions: {
    signed: true,
    httpOnly: true,
    secure: envConfig.NODE_ENV === 'production',
    sameSite: 'None',
    path: '/',
  }
}
