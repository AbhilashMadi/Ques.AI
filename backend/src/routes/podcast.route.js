const {
  createPodcastSchema,
  deletePodcastSchema,
  getAllPodcastsSchema,
  getPodcastByIdSchema,
} = require('#schemas/podcast.dto');
const authMiddleware = require('#middlewares/authenticate.middleware');

module.exports = async function (fastify) {
  // Create a new podcast
  fastify.post('/podcasts', {
    schema: createPodcastSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/podcast/create-podcast.handler'),
  });

  // Get all podcasts with pagination
  fastify.get('/podcasts', {
    schema: getAllPodcastsSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/podcast/get-podcasts.handler'),
  });

  // Get podcast by ID
  fastify.get('/podcasts/:podcastId', {
    schema: getPodcastByIdSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/podcast/get-podcast-by-id.handler'),
  });

  // Delete podcast by ID
  fastify.delete('/podcasts/:podcastId', {
    schema: deletePodcastSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/podcast/delete-podcast.handler'),
  });
};
