const dotenv = require('dotenv');
dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod' })

require('module-alias/register');
const envConfig = require('#configs/env.config')

// Fastify instance
const Fastify = require('fastify');
const app = Fastify({ logger: require('#configs/logger.config')[envConfig.NODE_ENV] });

// Register plugins
app.register(require('@fastify/helmet'), require('#configs/helmet.config')[envConfig.NODE_ENV]);
app.register(require('@fastify/cors'), require('#configs/cors.config.js'));
app.register(require('@fastify/cookie'), require('#configs/cookie.config'));
app.register(require('@fastify/rate-limit'), require('#configs/rate-limit.config'));
app.register(require('fastify-nodemailer'), require('#configs/mail-service.config'));

// Register Custom Plugins
app.register(require('#plugins/response.plugin'))
app.register(require('#plugins/docs.plugin'))
app.register(require('#plugins/mongoose.plugin'), {
  DB_URL: envConfig.DB_URL,
  DB_NAME: envConfig.DB_NAME,
})
app.register(require('#plugins/redisio.plugin'), {
  REDIS_HOST: envConfig.REDIS_HOST,
  REDIS_PORT: envConfig.REDIS_PORT,
  REDIS_PASSWORD: envConfig.REDIS_PASSWORD,
  REDIS_DB: envConfig.REDIS_DB,
})

// Register routes
app.register(require('#handlers/health/helth-check.handler')); // Health check endpoint / - baase
app.register(require('#routes/auth.routes'), { prefix: '/api/auth' }) // Auth endpoints /auth - base
app.register(require('#routes/project.routes', { prefix: '/api/projects' })) // Projects endpoints /projects - base
app.register(require('#routes/podcast.routes', { prefix: '/api/podcast' })) // Podcasts endpoints /prodcasts - base
app.setErrorHandler(require('#handlers/global/global-error.handler')); //Global Error handler

// Start server
const start = async () => {
  try {
    await app.listen({ port: envConfig.PORT, host: envConfig.HOST });
    app.log.info(`Server running on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

// Handle shutdown gracefully
process.on('SIGTERM', () => app.close());
process.on('SIGINT', () => app.close());

module.exports = app;