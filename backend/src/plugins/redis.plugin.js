const fp = require('fastify-plugin');
const { Redis } = require('@upstash/redis');

/**
 * Fastify Redis Plugin using @upstash/redis
 * 
 * @param {import('fastify').FastifyInstance} fastify 
 * @param {Object} options - expects config { url, token }
 */
module.exports = fp(async function redisPlugin(fastify, options) {
  const redis = new Redis(options);

  // Log manually since @upstash/redis has no event emitters
  fastify.log.info('Upstash Redis client initialized');

  // Expose redis client on Fastify instance
  fastify.decorate('redis', redis);

  // Optionally attach redis per request
  fastify.addHook('onRequest', async (request) => {
    request.redis = redis;
  });

  // No quit method exists on @upstash/redis, so nothing onClose
}, { name: 'redis-plugin' });
