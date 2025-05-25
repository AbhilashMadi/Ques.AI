require('module-alias/register');

const envConfig = require('#configs/env.config')
const loggerConfig = require('#configs/logger.config')
const corsConfig = require('#configs/cors.config.js')
const rateLimitConfig = require('#configs/rate-limit.config')

const Fastify = require('fastify');
const path = require('path');

// Fastify instance
const app = Fastify({ logger: loggerConfig[envConfig.NODE_ENV] });

// Register plugins
app.register(require('@fastify/helmet'));
app.register(require('@fastify/cors'), corsConfig);
app.register(require('@fastify/rate-limit'), rateLimitConfig);

// Register Custom Plugins
app.register(require('#plugins/response.plugin'))
app.register(require('#plugins/mongoose.plugin'))

// Register routes

// Health check endpoint
app.get('/health', async (req, res) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Error handler
app.setErrorHandler(require('#handlers/global-error-handler'));

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