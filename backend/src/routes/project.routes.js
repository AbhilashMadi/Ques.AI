const {
  createProjectSchema,
  deleteProjectSchema,
  getAllProjectsSchema,
  getProjectByIdSchema,
  getProjectPodcastsSchema,
} = require('#schemas/project.dto');
const authMiddleware = require('#middlewares/authenticate.middleware');

module.exports = async function (fastify) {
  // Create a new project
  fastify.post('/', {
    schema: createProjectSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/create-project.handler'),
  });

  // Get all projects for the logged-in user
  fastify.get('/', {
    schema: getAllProjectsSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/get-projects.handler'),
  });

  // Get project by ID
  fastify.get('/:projectId', {
    schema: getProjectByIdSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/get-project-by-id.handler'),
  });

  // Delete project by ID
  fastify.delete('/:projectId', {
    schema: deleteProjectSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/delete-project.handler'),
  });

  // Get All project podcasts
  fastify.get('/:projectId/podcasts', {
    schema: getProjectPodcastsSchema,
    preValidation: authMiddleware,
    handler: require('#handlers/project/get-project-podcasts.handler')
  })
};
