const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
  await fastify.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'Podcast App API Docs',
        description: 'API documentation for Ques.AI Podcast Platform',
        version: '1.0.0',
      },
      tags: [
        { name: 'auth', description: 'Authentication routes' },
        { name: 'projects', description: 'Project management routes' },
        { name: 'podcast', description: 'Podcast upload routes' },
        { name: 'transcript', description: 'Transcript editing routes' },
      ],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  })

  await fastify.register(require('@scalar/fastify-api-reference'), {
    routePrefix: '/reference',
    configuration: {
      theme: 'purple',
    },
  })
}, { name: 'docs-plugin' })
