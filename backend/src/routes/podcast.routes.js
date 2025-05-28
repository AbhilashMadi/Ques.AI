const {
  createPodcastSchema,
  deletePodcastSchema,
  getPodcastByIdSchema,
  updatePodcastDto,
} = require('#schemas/podcast.dto');
const authMiddleware = require('#middlewares/authenticate.middleware');

module.exports = async function (fastify) {
  // Create a new podcast
  fastify.post('/', {
    schema: createPodcastSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/podcast/create-podcast.handler'),
  });

  // Get podcast by ID
  fastify.get('/:podcastId', {
    schema: getPodcastByIdSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/podcast/get-podcast-by-id.handler'),
  });

  // Update podcast
  fastify.patch('/:podcastId', {
    schema: updatePodcastDto,
    preValidation: authMiddleware,
    handler: require('#handlers/podcast/update-podcast.handler')
  })

  // Delete podcast by ID
  fastify.delete('/:podcastId', {
    schema: deletePodcastSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/podcast/delete-podcast.handler'),
  });
};
