const fp = require('fastify-plugin')
const Redis = require('ioredis')

/**
 * Fastify Redis Plugin using ioredis
 * 
 * @param {FastifyInstance} fastify 
 * @param {Object} options - expects redis config
 */
module.exports = fp(async function redisPlugin(fastify, options) {
  const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB } = options

  const redis = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD || undefined,
    db: REDIS_DB || 0,
  })

  // Log on connect
  redis.on('connect', () => {
    fastify.log.info('Redis connected')
  })

  redis.on('error', (err) => {
    fastify.log.error('Redis error:', err)
  })

  // Expose redis client on Fastify instance
  fastify.decorate('redis', redis)

  // Optionally attach redis per request
  fastify.addHook('onRequest', async (request) => {
    request.redis = redis
  })

  // Gracefully disconnect on server close
  fastify.addHook('onClose', async () => {
    await redis.quit()
    fastify.log.info('Redis connection closed')
  })
}, { name: 'redis-plugin' })
