const fp = require('fastify-plugin')
const mongoose = require('mongoose')

module.exports = fp(async function mongoosePlugin(fastify, options) {
  try {
    const { DB_URL, DB_NAME, NODE_ENV } = options;
    const conn = await mongoose.connect(`${DB_URL}${DB_NAME}`, {
      // Optional for better monitoring
      autoIndex: NODE_ENV === 'development',
    });

    fastify.log.info(`MongoDB connected: ${conn.connection.host}`);

    // Expose mongoose and connection to Fastify
    fastify.decorate('mongoose', mongoose);
    fastify.decorate('mongoConnection', conn.connection);
  } catch (err) {
    fastify.log.error({ err }, 'MongoDB connection failed');
    throw err;
  }

  // Clean up on app close
  fastify.addHook('onClose', async () => {
    await mongoose.connection.close();
    fastify.log.info('MongoDB connection closed');
  });

}, { name: 'mongoose-plugin' })
